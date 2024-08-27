import { Blocks, CodeXml, VenetianMask } from 'lucide-react'
import Balancer from 'react-wrap-balancer'

function LandingProduct() {
  return (
    <section className="pt-16 md:pt-36 container flex flex-col items-center">
      <div
        id="product"
        className="text-blue font-semibold text-center"
      >
        How it works
      </div>
      <h2 className="mt-4 text-3xl md:text-4xl font-bold text-center">
        <Balancer>
          Lorem ipsum
        </Balancer>
      </h2>
      <div className="mt-2 md:text-lg text-neutral-700 text-center max-w-4xl">
        <Balancer>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Balancer>
      </div>
      <div className="mt-8 md:mt-16 grid md:grid-cols-2 gap-y-8 md:gap-y-24 md:gap-x-12 w-full md:w-auto">
        <div className="max-w-[460px] aspect-[1.618/1] border rounded-lg bg-white overflow-hidden">
          <img
            src="/images/landing/1.png"
            alt="1"
            className="w-full"
          />
        </div>
        <div className="-mt-4 md:mt-0">
          <div className="p-2 w-fit bg-blue flex items-center justify-center rounded-md">
            <VenetianMask className="w-6 h-6 text-white" />
          </div>
          <div className="mt-4 font-semibold">
            Lorem ipsum dolor sit amet
          </div>
          <div className="mt-1 md:mt-3 text-neutral-700 md:leading-relaxed max-w-lg">
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Balancer>
          </div>
        </div>
        <div className="block md:hidden max-w-[460px] aspect-[1.618/1] border rounded-lg bg-white overflow-hidden">
          <img
            src="/images/landing/2.png"
            alt="2"
            className="w-full"
          />
        </div>
        <div className="-mt-4 md:mt-0">
          <div className="p-2 w-fit bg-blue flex items-center justify-center rounded-md">
            <Blocks className="w-6 h-6 text-white" />
          </div>
          <div className="mt-4 font-semibold">
            Lorem ipsum dolor sit amet
          </div>
          <div className="mt-1 md:mt-3 text-neutral-700 md:leading-relaxed max-w-lg">
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Balancer>
          </div>
        </div>
        <div className="hidden md:block max-w-[460px] aspect-[1.618/1] border rounded-lg bg-white overflow-hidden">
          <img
            src="/images/landing/2.png"
            alt="2"
            className="w-full"
          />
        </div>
        <div className="max-w-[460px] aspect-[1.618/1] border rounded-lg bg-white overflow-hidden">
          <img
            src="/images/landing/3.png"
            alt="3"
            className="w-full"
          />
        </div>
        <div className="-mt-4 md:mt-0">
          <div className="p-2 w-fit bg-blue flex items-center justify-center rounded-md">
            <CodeXml className="w-6 h-6 text-white" />
          </div>
          <div className="mt-4 font-semibold">
            Lorem ipsum dolor sit amet
          </div>
          <div className="mt-1 md:mt-3 text-neutral-700 md:leading-relaxed max-w-lg">
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Balancer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingProduct
