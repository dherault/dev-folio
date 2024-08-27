import Balancer from 'react-wrap-balancer'

import Logo from '~components/common/logos/Logo'

function LandingQuote() {
  return (
    <section className="hidden pt-16 md:pt-36 container md:flex flex-col items-center">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src="/images/landing/developer.png"
          alt="Maker"
          className="w-[1024px] scale-x-[-1]"
        />
        <img
          src="images/landing/blur-purple.png"
          alt="Blur"
          className="absolute inset-0 w-[1024px] opacity-85"
          style={{ filter: 'hue-rotate(333deg)' }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="-mt-4 px-16 text-white">
            <Logo className="h-12" />
            <div className="mt-6 text-xl font-semibold leading-relaxed">
              <Balancer>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              </Balancer>
            </div>
            <div className="mt-6 font-semibold">
              David Hérault
            </div>
            <div className="mt-1 font-light">
              Maker of Dev Folio
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingQuote
