import React, { useState } from "react"
import Layout from "../components/Layout"
import Section from "../components/Section"
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"
import Accordion from "../components/Accordion"


function Services() {
  const [service, setService] = useState("Full Service");

  const serviceData = [
    {
      name: 'Training',
      serviceText: 'We also offer training to upskill researchers so they can win, plan and run online and mobile qualitative studies that are more insightful and profitable.',
      serviceLogo: 'fa-light fa-bell-concierge'
    },
    {
      name: 'Project Design / Set Up',
      serviceText: 'If you can moderate and report, we can just design the method and sample, and / or set up the platform, and / or recruit and incentivise participants.',
      serviceLogo: 'fa-light fa-compass-drafting'
    },
    {
      name: 'Moderation / Reporting',
      serviceText: 'If you set up the project yourself, we can provide expert moderators in any market and if required, we can analyse and report.',
      serviceLogo: 'fa-light fa-comment-arrow-up-right'
    },
    {
      name: 'Full Service',
      serviceText: 'We take your brief and then design the most robust sample and method.  We also assemble an expert team for moderation and reporting.',
      serviceLogo: 'fa-light fa-graduation-cap'
    }
  ]

  var serviceText;
  var serviceLogo;
  switch(service) {
    case "Training":
      serviceText = serviceData[0].serviceText;
      serviceLogo = serviceData[0].serviceLogo;
      break;
    case "Project Design":
      serviceText = serviceData[1].serviceText;
      serviceLogo = serviceData[1].serviceLogo;
      break;
    case "Moderation / Reporting":
      serviceText = serviceData[2].serviceText;
      serviceLogo = serviceData[2].serviceLogo;
      break;
    default:
      serviceText = serviceData[3].serviceText;
      serviceLogo = serviceData[3].serviceLogo;
      break;
  }

  const activeClasses = ' underline underline-offset-8 decoration-sandybrown';

  return (
    <Layout>
      <Section cNames="bg-blue text-tomato h-full xl:h-screen">
        <NavigationBar helloButton={false} />
        <h1 className="text-5xl mt-10 mb-16 px-4 no-desktop:text-center">Our Services</h1>
        {/* Desktop */}
        <div className="flex no-desktop:hidden w-full px-20">
          <div className="w-1/2 text-left text-3xl whitespace-nowrap">
            <div className="lg:p-4 py-4 font-light">
              <button onClick={() => setService("Full Service")}
                      className={`font-bold text-tomato${service==="Full Service" ? activeClasses : '/50'}`}>
                Full Service
              </button>
            </div>
            <div className="lg:p-4 py-4">
              <button onClick={() => setService("Project Design")}
                      className={`font-bold text-tomato${service==="Project Design" ? activeClasses : '/50'}`}>
                Project Design
              </button>
            </div>
            <div className="lg:p-4 py-4">
              <button onClick={() => setService("Moderation / Reporting")}
                      className={`font-bold text-tomato${service==="Moderation / Reporting" ? activeClasses : '/50'}`}>
                Moderation & Reporting
              </button>
            </div>
            <div className="lg:p-4 py-4">
              <button onClick={() => setService("Training")}
                      className={`font-bold text-tomato${service==="Training" ? activeClasses : '/50'}`}>
                Training
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center px-6 py-4 w-1/2">
            <i className={`${serviceLogo} text-7xl pb-4 text-center`} />
            <p>{serviceText}</p>
          </div>
        </div>

        {/* Mobile/Tablet */}
        <div className="lg:hidden flex flex-col">
          <Accordion title={serviceData[3].name}>
            <p>{serviceData[3].serviceText}</p>
          </Accordion>
          <Accordion title={serviceData[1].name}>
            <p>{serviceData[1].serviceText}</p>
          </Accordion>
          <Accordion title={serviceData[2].name}>
            <p>{serviceData[2].serviceText}</p>
          </Accordion>
          <Accordion title={serviceData[0].name}>
            <p>{serviceData[0].serviceText}</p>
          </Accordion>
        </div>

        <div className="flex items-center">
          <div className="pt-16 flex no-desktop:flex-col w-full px-4 justify-center">
            <div className="w-full lg:w-2/5 no-desktop:pb-6 pr-4">
              <h2 className="text-5xl font-semibold">Get in touch to find out more</h2>
              <p className="text-lg font-extralight py-4">Fill in the form to set up a call.</p>
            </div>
            <div>
              <form action="">
                <div className="flex flex-col space-y-4">
                  <input type="text" name="name" placeholder="Name" className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-300 placeholder-tomato text-tomato leading-tight focus:outline-none focus:shadow-outline" required />
                  <input type="email" name="email" placeholder="Email Address" className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-300 placeholder-tomato text-tomato leading-tight focus:outline-none focus:shadow-outline" required />
                  <select name = "dropdown" className="shadow appearance-none border rounded bg-slate-300 placeholder-tomato text-tomato px-3 py-2 leading-tight focus:outline-none focus:shadow-outline">
                    <option value = "full-service" selected disabled>Select Enquiry</option>
                    <option value = "full-service" >Full Service</option>
                    <option value = "project-design">Project Design</option>
                    <option value = "moderation-reporting">Moderation / Reporting</option>
                    <option value = "training">Training</option>
                    <option value = "other">Other</option>
                  </select>
                  <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder="Message" className="shadow appearance-none border rounded bg-slate-300 placeholder-tomato text-tomato px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" />
                  <button
                    className="w-min whitespace-nowrap mx-auto bg-sandybrown hover:bg-sandybrown/75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Section>
      <Section cNames="py-6 bg-blue">
        <Footer textColour="tomato" />
      </Section>
    </Layout>
  )
}

export default Services;