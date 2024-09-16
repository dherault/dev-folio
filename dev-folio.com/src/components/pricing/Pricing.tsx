import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { createCheckoutSession } from '@invertase/firestore-stripe-payments'
import { ArrowLeft } from 'lucide-react'

import { PRICING_SUCCESS_SEARCH_PARAMETER_KEY, PRO_PLAN_PRICE_ID } from '~constants'

import { stripePayments } from '~stripe'

import { Button } from '~components/ui/Button'
import PricingTable from '~components/pricing/PricingTable'

function Pricing() {
  const [checkoutSessionLoading, setCheckoutSessionLoading] = useState(false)
  const [checkoutSessionError, setCheckoutSessionError] = useState(false)

  const handleProPlanClick = useCallback(async () => {
    setCheckoutSessionLoading(true)
    setCheckoutSessionError(false)

    try {
      const { url } = await createCheckoutSession(stripePayments, {
        mode: 'payment',
        price: PRO_PLAN_PRICE_ID,
        success_url: `${window.location.origin}/~?${PRICING_SUCCESS_SEARCH_PARAMETER_KEY}=true`,
        cancel_url: `${window.location.origin}/pricing`,
      })

      window.location.href = url
    }
    catch {
      setCheckoutSessionError(true)
    }

    setCheckoutSessionLoading(false)
  }, [])

  return (
    <div className="mt-2 container">
      <Link to="/~">
        <Button
          variant="ghost"
          className="-ml-4"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to portfolio
        </Button>
      </Link>
      <h1 className="mt-1 text-3xl font-semibold text-center">
        Pricing
      </h1>
      {checkoutSessionError && (
        <div className="mt-2 text-red-500">
          An error occurred occured, please try again later or contact support.
        </div>
      )}
      <div className="mt-4">
        <PricingTable
          onProPlanClick={handleProPlanClick}
          proPlanLoading={checkoutSessionLoading}
        />
      </div>
    </div>
  )
}

export default Pricing
