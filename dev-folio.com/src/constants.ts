/* ---
  Common
--- */

export const APP_URL = 'https://dev-folio.com'

/* ---
  Authentication
--- */

export const AUTHENTICATION_ERRORS = {
  default: 'An error occurred, please try again',
  terms: 'You must accept the Terms and Conditions',
  'auth/email-already-in-use': 'This email is already in use',
  'auth/invalid-email': 'You must provide a valid email',
  'auth/weak-password': 'Your password must be at least 8 characters',
  'auth/user-disabled': 'This account has been disabled',
  'auth/user-not-found': 'This account does not exist, please sign up',
  'auth/wrong-password': 'Your password is incorrect',
}

/* ---
  Stripe
--- */

export const PRO_PLAN_PRICE_ID = import.meta.env.DEV
  ? 'price_1Py7AbKxkNSsWVP6SGLMiPZi'
  : 'price_1Py7BbKxkNSsWVP6WDRPhfPZ'

export const PRICING_SUCCESS_SEARCH_PARAMETER_KEY = 'pricing-success'

/* ---
  Legal
--- */

export const LEGAL_COMPANY_NAME = 'Microentreprise David Hérault'

export const LEGAL_DATE = '1 September 2024'

export const LEGAL_LAST_UPDATED_DATE = '1 September 2024'

/* ---
  Support
--- */

export const SUPPORT_EMAIL = 'dherault@gmail.com'

/* ---
  Other
--- */

export const NULL_DOCUMENT_ID = '_null_'
