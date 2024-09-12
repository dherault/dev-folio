import { getStripePayments } from '@invertase/firestore-stripe-payments'

import { app } from '~firebase'

const stripePayments = getStripePayments(app, {
  customersCollection: 'users',
  productsCollection: 'products',
})

export default stripePayments
