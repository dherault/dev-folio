import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { firestore } from '../firebase'
import stripe from '../stripe-instance'
import { getUserFromCallableRequest } from '../authentication/getUser'

const assignIsPremium = onCall(
  {
    enforceAppCheck: true,
    cors: ['https://dev-folio.com'],
  },
  async request => {
    const { user, userDocument } = await getUserFromCallableRequest(request)

    if (!user) throw new HttpsError('permission-denied', 'You are not authenticated')

    const checkoutSessionSnapshot = await firestore.collection('users').doc(user.id).collection('checkout_sessions').get()

    let isPremium = false

    for (const checkoutSessionDocument of checkoutSessionSnapshot.docs) {
      const { sessionId } = checkoutSessionDocument.data()

      if (!sessionId) continue

      const session = await stripe.checkout.sessions.retrieve(sessionId)

      if (session.payment_status === 'paid') {
        isPremium = true
        break
      }
    }

    await userDocument.update({
      isPremium,
    })

    return {
      message: 'ok',
    }
  }
)

export default assignIsPremium
