import { getStripePayments } from '@invertase/firestore-stripe-payments'

import { app } from '~firebase'

export const stripePayments = getStripePayments(app, {
  customersCollection: 'users',
  productsCollection: 'products',
})
