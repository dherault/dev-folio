import Stripe from 'stripe'

const IS_DEV = !!process.env.IS_FIREBASE_CLI
const STRIPE_API_KEY = IS_DEV
  ? process.env.STRIPE_API_KEY_DEVELOPMENT
  : process.env.STRIPE_SECRET_KEY_PRODUCTION

const stripe = new Stripe(STRIPE_API_KEY!)

export default stripe
