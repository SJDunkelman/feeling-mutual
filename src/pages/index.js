import React from "react"
import { Link } from "gatsby"
import ServiceCard from "../components/ServiceCard";
import CaseStudyGrid from "../components/CaseStudyGrid";
import CustomerReviewCard from "../components/CustomerReviewCard";

import Layout from "../components/Layout"
import Section from "../components/Section"
import AwardsMarquee from "../components/AwardsMarquee"
import Footer from "../components/Footer"
import NewsletterSignup from "../components/NewsletterSignup"
import NavigationBar from "../components/NavigationBar"

import TimWhirledgeProfile from "../images/profiles/tim-whirledge.png";
import TomStazickerProfile from "../images/profiles/tom-stazicker.png";
import FranWaltonProfile from "../images/profiles/fran-walton.png";

function IndexPage () {
  return (
    <Layout>
      <Section cNames="bg-maroon text-pink">
        <NavigationBar helloButton />

        <div className="flex flex-col justify-center items-center py-8 md:py-32 lg:py-[9rem] space-y-4 min-h-[60vh] md:min-h-[70vh]">
          <h1 className="text-6xl md:text-[4rem] text-center md:text-left font-semibold text-sandybrown">Agile Online Qualitative Research</h1>
          <h4 className="text-2xl font-extralight text-center md:text-left">Inspiring more mutualistic relationships between brands and people</h4>
          <div className="space-x-6 pt-6">
            <Link to="/services">
              <button className="rounded-md font-semibold py-2 px-4 bg-sandybrown text-maroon hover:bg-sandybrown/75 hover:text-white">
                Research
              </button>
            </Link>
            <Link to="/training">
              <button className="rounded-md font-semibold py-2 px-4 bg-pink text-maroon hover:bg-pink/75 hover:text-white">
                Training
              </button>
            </Link>
          </div>
        </div>
      </Section>

      <div className="bg-maroon py-6">
        <AwardsMarquee />
      </div>

      <Section id="what-we-do" cNames="flex mobile-only:flex-col py-20 bg-green mobile-only:text-center">
        <div className="flex flex-col w-full lg:w-1/2 space-y-6 text-sandybrown lg:pr-8">
          <p className="font-light">What We Do</p>
          <h2 className="text-5xl font-semibold">Curate authentic conversations between brands and people.</h2>
          <p className="text-lg font-light">We provide a range of online qualitative research services through our international network of senior consultants and specialist partners</p>
          <p className="text-lg font-light">We tackle diverse research briefs, from brand and strategic development to communications development, innovation, customer experience, service design and UX.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full lg:w-1/2 pt-6">
          <ServiceCard slug="/services" iconClasses="fa-light fa-bell-concierge" title="Full Service"
                       description="We can offer everything, from design, to set up, moderation and reporting" />
          <ServiceCard slug="/services" iconClasses="fa-light fa-compass-drafting" title="Project Design / Set Up"
                       description="Our set-up and design, inspires deep engagement, vivid colour and strong validity" />
          <ServiceCard slug="/services" iconClasses="fa-light fa-comment-arrow-up-right" title="Moderation / Reporting"
                       description="We make strategic discussions and craft directional reports" />
          <ServiceCard slug="/services" iconClasses="fa-light fa-graduation-cap" title="Training"
                       description="We upskill researchers to do more insightful and profitable online qual" />
        </div>
      </Section>

      <Section id="how-we-work" cNames="flex flex-col justify-center items-center py-12 bg-offwhite mobile-only:text-center">
        <p className="font-light pb-6 text-gold">How We Work</p>
        <h2 className="text-5xl font-semibold pb-16 text-gold text-center">We inform agile workflows, with authentic insights that inspire better decisions</h2>
        <div className="grid grid-cols-1 justify-center mobile-only:space-y-4 md:grid-cols-3 md:space-x-6">

          <Link to="/">
            <div className="flex flex-col items-center space-y-6 text-center w-72 text-gold hover:drop-shadow-md hover:bg-offwhite/[0.50] rounded-lg py-4">
              <i className="fa-light fa-recycle text-6xl"></i>
              <h3 className="text-4xl font-semibold text-maroon">Agile</h3>
              <p className="font-light text-lg">Research is only agile if it is <span
                className="font-semibold">collaborative</span></p>
            </div>
          </Link>

          <Link to="/">
            <div className="flex flex-col items-center space-y-6 text-center w-72 text-gold hover:drop-shadow-md hover:bg-offwhite/[0.50] rounded-lg py-4">
              <i className="fa-light fa-badge-check text-6xl"></i>
              <h3 className="text-4xl font-semibold text-maroon">Authentic</h3>
              <p className="font-light text-lg">Research can only be <span className="font-semibold">trusted</span> if it
                is authentic</p>
            </div>
          </Link>

          <Link to="/">
            <div className="flex flex-col items-center space-y-6 text-center w-72 text-gold hover:drop-shadow-md hover:bg-offwhite/[0.50] rounded-lg py-4">
              <i className="fa-light fa-heart-pulse text-6xl"></i>
              <h3 className="text-4xl font-semibold text-maroon">Inspiring</h3>
              <p className="font-light text-lg">Research is only valuable if it inspires <span className="font-semibold">better decisions</span>
              </p>
            </div>
          </Link>
        </div>
        <div className="text-xl font-light text-maroon pt-4">
          <p className="text-center font-bold text-gold underline">TOOLS:</p>
          <ul className="tool-list pt-4 text-left pl-0 ml-0">
            <li>Webcam groups and depths</li>
            <li>Mobile video and photos</li>
            <li>Collages, mapping and concept scoring</li>
            <li>Screen recording with audio</li>
            <li>Forums, diaries and communities</li>
          </ul>
        </div>
      </Section>

      <Section cNames="py-16 bg-gold">
        <p id="clients" className="font-light pb-6 text-offwhite">Case Studies</p>
        <h2 className="mobile-only:text-4xl text-5xl text-offwhite font-semibold pb-6">Examples of our work</h2>
        <CaseStudyGrid />
        <p className="font-light text-xl text-center text-offwhite">We work across categories, from Technology to media, FMCG. retail and more.</p>
      </Section>

      <Section cNames="py-16 bg-blue">
        <p className="font-light pb-6 text-pink">Our Clients</p>
        <div className="flex mobile-only:space-x-4 justify-between items-center text-pink">
          <h2 className="mobile-only:text-4xl text-5xl font-semibold">What clients say about us</h2>
          <p>Read More <i className="fa-solid fa-arrow-right-long pl-2" /></p>
        </div>
        <div className="flex no-desktop:flex-col no-desktop:space-y-6 space-x-2 lg:space-x-6 pt-10 lg:px-12">
          <CustomerReviewCard headline="50% increase in sales"
                              subheading="After acting on their recommendations we had an uplift of over 50% in website sales and reengineered our retention strategy."
                              name="Tom Stazicker"
                              jobRole="CEO"
                              imageSrc={TomStazickerProfile}
                              company="Virgin Pure" />
          <CustomerReviewCard headline="Inspired a Cannes Gold Lion Award"
                              subheading="Feeling Mutual helped develop a brand strategy that went on to achieve a Cannes Gold Lion award and rapid growth for our client"
                              name="Tim Whirledge"
                              imageSrc={TimWhirledgeProfile}
                              jobRole="Head of Strategy"
                              company="McCann Manchester" />
          <CustomerReviewCard headline="Upskilled our global workforce"
                              subheading="They truly get how insight inspires agile innovation.  The training across our global offices helped us upskill in digital ethnography”"
                              name="Fran Walton"
                              imageSrc={FranWaltonProfile}
                              jobRole="Head of Insight"
                              company="Publicis Sapient" />
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
      </Section>

      <Section cNames="bg-pink py-6">
        <NewsletterSignup />
        <Footer textColour="gold" />
      </Section>
    </Layout>
  )
}

export default IndexPage
