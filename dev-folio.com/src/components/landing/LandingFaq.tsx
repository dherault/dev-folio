import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~components/ui/Accordion'

function LandingFaq() {
  return (
    <section className="pt-16 md:pt-32 pb-8 md:pb-16 container max-w-[calc(1024px+64px)]">
      <div className="font-semibold">
        Frequently Asked Questions
      </div>
      <Accordion
        type="multiple"
        className="mt-4"
      >
        <AccordionItem value="what">
          <AccordionTrigger>
            What is Dev Folio?
          </AccordionTrigger>
          <AccordionContent>
            Foo bar
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="github">
          <AccordionTrigger>
            Is Dev Folio open-source?
          </AccordionTrigger>
          <AccordionContent>
            Yes,
            {' '}
            <a
              href="https://github.com/dherault/dev-folio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover:underline"
            >
              hosted on GitHub
            </a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

export default LandingFaq
