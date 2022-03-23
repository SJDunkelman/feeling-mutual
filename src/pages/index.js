import * as React from "react"
import { Link} from "gatsby"
import ServiceCard from "../components/ServiceCard";
import CaseStudyGrid from "../components/CaseStudyGrid";
import CustomerReviewCard from "../components/CustomerReviewCard";

import Layout from "../components/Layout"
import Section from "../components/Section"
import AwardsMarquee from "../components/AwardsMarquee"
import Footer from "../components/Footer"
import NewsletterSignup from "../components/NewsletterSignup"
import NavigationBar from "../components/NavigationBar"

function IndexPage () {
  return (
    <Layout>
      {/* Hero Above the Fold */}
      <Section cNames="bg-maroon text-pink">
        <NavigationBar  />
        <div className="flex flex-col justify-center items-center py-8 md:py-32 lg:py-[9rem] space-y-4 min-h-[80vh]">
          <h1 className="text-6xl md:text-[4rem] text-center md:text-left font-semibold text-sandybrown">Agile Online Qualitative Research</h1>
          <h4 className="text-2xl font-extralight text-center md:text-left">Inspiring more mutualistic relationships between brands and people</h4>
          <div className="space-x-6 pt-6">
            <button className="rounded-md font-semibold py-2 px-4 bg-sandybrown text-maroon hover:bg-sandybrown/75 hover:text-white">
              Research
            </button>
            <button className="rounded-md font-semibold py-2 px-4 bg-pink text-maroon hover:bg-pink/75 hover:text-white">
              Training
            </button>
          </div>
        </div>
      </Section>

      <div className="bg-maroon">
        <AwardsMarquee />
      </div>

      <Section id="what-we-do" cNames="flex mobile-only:flex-col py-20 bg-green mobile-only:text-center">
        <div className="flex flex-col w-full lg:w-1/2 space-y-6 text-sandybrown lg:pr-8">
          <p className="font-light">What We Do</p>
          <h2 className="text-5xl font-semibold">Curating authentic conversations between brands and people.</h2>
          <p className="text-lg font-light">A network of award winning senior consultants with the expertise in qualitative research to help you
            inspire more mutual relationships between brands and people.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full lg:w-1/2 pt-6">
          <ServiceCard slug="/" iconClasses="fa-solid fa-bell-concierge" title="Full Service"
                       description="Cover all stages of research using cutting edge methods" />
          <ServiceCard slug="/" iconClasses="fa-solid fa-compass-drafting" title="Project Design"
                       description="Cover all stages of research using cutting edge methods" />
          <ServiceCard slug="/" iconClasses="fa-solid fa-people-group" title="Moderation / Reporting"
                       description="Cover all stages of research using cutting edge methods" />
          <ServiceCard slug="/" iconClasses="fa-solid fa-graduation-cap" title="Training"
                       description="Cover all stages of research using cutting edge methods" />
        </div>
      </Section>

      <Section id="how-we-work" cNames="flex flex-col justify-center items-center py-12 bg-offwhite mobile-only:text-center">
        <p className="font-light pb-6 text-gold">How We Work</p>
        <h2 className="text-5xl font-semibold pb-16 text-gold text-center">We inform agile workflows, with authentic insights that inspire better decisions</h2>
        <div className="grid grid-cols-1 mobile-only:space-y-4 lg:grid-cols-3 lg:space-x-6">

          <Link to="/">
            <div className="flex flex-col items-center space-y-6 text-center w-72 text-gold hover:drop-shadow-md hover:bg-offwhite/[0.50] rounded-lg py-4">
              <i className="fa-light fa-forward-fast text-6xl"></i>
              <h3 className="text-4xl font-semibold text-maroon">Agile</h3>
              <p className="font-light text-lg">Research is only agile if it is <span
                className="font-semibold">collaborative</span></p>
            </div>
          </Link>

          <Link to="/">
            <div className="flex flex-col items-center space-y-6 text-center w-72 text-gold hover:drop-shadow-md hover:bg-offwhite/[0.50] rounded-lg py-4">
              <i className="fa-light fa-lightbulb-on text-6xl"></i>
              <h3 className="text-4xl font-semibold text-maroon">Authentic</h3>
              <p className="font-light text-lg">Research can only be <span className="font-semibold">trusted</span> if it
                is authentic</p>
            </div>
          </Link>

          <Link to="/">
            <div className="flex flex-col items-center space-y-6 text-center w-72 text-gold hover:drop-shadow-md hover:bg-offwhite/[0.50] rounded-lg py-4">
              <i className="fa-light fa-brain text-6xl"></i>
              <h3 className="text-4xl font-semibold text-maroon">Inspiring</h3>
              <p className="font-light text-lg">Research is only valuable if it inspires <span className="font-semibold">better decisions</span>
              </p>
            </div>
          </Link>

          {/*<BenefitGrid title="Agile" iconClasses="fa-light fa-forward-fast" description="Research is only agile if it is collaborative" />*/}
          {/*<BenefitGrid title="Authentic" iconClasses="fa-light fa-lightbulb-on" description="Research can only be trusted if it is authentic" />*/}
          {/*<BenefitGrid title="Inspiring" iconClasses="fa-light fa-award" description="Research is only valuable if it inspires better decisions" />*/}
        </div>
        <CaseStudyGrid />
      </Section>

      <Section id="our-customers" cNames="py-16 bg-blue">
        <p className="font-light pb-6 text-pink">Our Clients</p>
        <div className="flex mobile-only:space-x-4 justify-between items-center text-pink">
          <h2 className="mobile-only:text-4xl text-5xl font-semibold">What today’s brands say about us</h2>
          <p>Read More <i className="fa-solid fa-arrow-right-long pl-2"></i></p>
        </div>
        <div className="flex mobile-only:flex-col mobile-only:space-y-6 lg:space-x-6 pt-10 lg:px-12">
          <CustomerReviewCard headline="Feeling Mutual were able to reduce our product-to-market by weeks."
                              subheading="Their novel approach to asynchronous concept testing was the key to warp speed progress"
                              name="John Smith"
                              jobRole="VP Product"
                              company="Apple" />
          <CustomerReviewCard headline="Feeling Mutual were able to reduce our product-to-market by weeks."
                              subheading="Their novel approach to asynchronous concept testing was the key to warp speed progress"
                              name="John Smith"
                              jobRole="VP Product"
                              company="Apple" />
          <CustomerReviewCard headline="Feeling Mutual were able to reduce our product-to-market by weeks."
                              subheading="Their novel approach to asynchronous concept testing was the key to warp speed progress"
                              name="John Smith"
                              jobRole="VP Product"
                              company="Apple" />
        </div>
      </Section>

      <Section cNames="flex py-16 px-12 justify-center bg-sandybrown mobile-only:text-center">
        <div className="w-full lg:w-2/5 lg:mr-6 space-y-2 items-start text-green">
          <h4 className="text-5xl font-semibold">Tom Woodnutt</h4>
          <p className="text-lg font-bold">Founder</p>
          <div className="flex justify-center relative py-6">
            <div className="w-full h-72 bg-white/50" />
            <i className="fa-solid fa-play-pause absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 text-4xl"></i>
          </div>

          <p className="font-light text-justify">Through empathy, brands can create more value for people. In return, they earn trust,
            loyalty and attention.</p>
          <p className="font-bold text-center text-2xl mobile-only:my-6">This is mutuality.</p>
          <p className="font-light">At Feeling Mutual we gather insight that help brands nurture more mutual relationships with people.</p>
        </div>
        {/*<div className="max-h-72">*/}
        {/*  <img className="object-cover h-full rounded-lg" src={FounderImage}*/}
        {/*       alt="A photo of the Founder Tom Woodnutt in a suit" />*/}
        {/*</div>*/}
      </Section>

      <Section cNames="bg-pink py-6">
        <NewsletterSignup />
        <Footer />
      </Section>
    </Layout>
  )
}

export default IndexPage
