import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '~components/ui/Button'

type Props = {
  onProPlanClick: () => void
  proPlanLoading?: boolean
}

const priceBase = 'Free'
const pricePro = '$24.99'
const descriptionBase = 'For getting a portfolio quickly.'
const descriptionPro = 'For developers who want a more serious portfolio.'
const featuresBase = [
  '1 portfolio',
  'All components',
  'Community support',
]
const featuresPro = [
  'Everything from Solo plan',
  'Custom domain',
  'Dark mode',
  '24-hour support response time',
]

function PricingTable({ onProPlanClick, proPlanLoading = false }: Props) {
  return (
    <section className="mx-auto flex flex-col items-center max-w-6xl">
      <div className="block space-y-4 md:flex items-end justify-center">
        <div className="p-8 border md:border-0 md:border-y md:border-l rounded-lg md:rounded-none md:rounded-l-3xl bg-white flex flex-col gap-6 flex-1">
          <div className="text-lg font-semibold">
            Base
          </div>
          <div className="text-sm">
            {descriptionBase}
          </div>
          <div className="text-3xl font-bold">
            {priceBase}
          </div>
          <div className="flex flex-col gap-4 text-sm">
            {featuresBase.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <Check className="w-6 h-6 text-blue" />
                {feature}
              </div>
            ))}
            <div className="h-6 hidden md:block" />
          </div>
          <div className="-mt-6 grow" />
          <Link to="/~">
            <Button
              variant="outline"
              className="w-full"
            >
              Get started
            </Button>
          </Link>
        </div>
        <div className="p-8 border md:border-0 md:border-y md:border-l md:border-r rounded-lg md:rounded-none md:rounded-t-3xl md:rounded-r-3xl bg-white flex flex-col gap-6 flex-1">
          <div className="text-lg font-semibold">
            Pro
          </div>
          <div className="text-sm">
            {descriptionPro}
          </div>
          <div className="text-3xl font-bold flex items-baseline">
            {pricePro}
            <div className="text-sm font-normal ml-2">
              Lifetime
            </div>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            {featuresPro.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <Check className="w-6 h-6 text-blue" />
                {feature}
              </div>
            ))}
            <div className="h-6 hidden md:block" />
          </div>
          <div className="-mt-6 grow" />
          <Button
            className="w-full"
            onClick={onProPlanClick}
            loading={proPlanLoading}
          >
            Buy plan
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PricingTable
