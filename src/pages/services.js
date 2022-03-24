import React, { useState } from "react"
import Layout from "../components/Layout"
import Section from "../components/Section"
import NavigationBar from "../components/NavigationBar"


function Services() {
  const [service, setService] = useState("Full Service");

  var serviceText;
  var servicePoints;
  switch(service) {
    case "Training":
      serviceText = "This is a description of the training service";
      servicePoints = ['Qual research', 'UX design', 'Web'];
      break;
    case "Project Design":
      serviceText = "This is a description of project design";
      servicePoints = ['Qual research', 'UX design', 'Web'];
      break;
    case "Moderation / Reporting":
      serviceText = "This is a description of the moderation service";
      servicePoints = ['Qual research', 'UX design', 'Web'];
      break;
    default:
      serviceText = "This is a description of the full service";
      servicePoints = ['Qual research', 'UX design', 'Web'];
      break;
  }

  const activeClasses = ' underline underline-offset-8 decoration-sandybrown';

  return (
    <Layout>
      <Section cNames="bg-blue text-tomato h-full">
        <NavigationBar helloButton={false} />
        <h1 className="text-5xl mt-10 mb-10 px-4">Our Services</h1>
        <div className="flex w-full px-8">
          <div className="w-1/2 text-right text-3xl">
            <div className="p-4 font-light">
              <button onClick={() => setService("Full Service")}
                      className={`font-bold text-tomato${service==="Full Service" ? activeClasses : '/50'}`}>
                Full Service
              </button>
            </div>
            <div className="p-4">
              <button onClick={() => setService("Project Design")}
                      className={`font-bold text-tomato${service==="Project Design" ? activeClasses : '/50'}`}>
                Project Design
              </button>
            </div>
            <div className="p-4">
              <button onClick={() => setService("Moderation / Reporting")}
                      className={`font-bold text-tomato${service==="Moderation / Reporting" ? activeClasses : '/50'}`}>
                Moderation & Reporting
              </button>
            </div>
            <div className="p-4">
              <button onClick={() => setService("Training")}
                      className={`font-bold text-tomato${service==="Training" ? activeClasses : '/50'}`}>
                Training
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center px-6 py-4 w-1/2">
            <h2 className="text-4xl font-semibold">{service}</h2>
            <ul className="py-4 tick-list">
              {servicePoints.map(o => <li key={o}>{o}</li>)}
            </ul>
            <p>{serviceText}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="py-16 flex w-full px-4 justify-center">
            <div className="w-2/5">
              <h2 className="text-5xl font-semibold">LET'S WORK TOGETHER</h2>
              <p className="text-lg font-extralight py-4">Like what you see? Send a message to get in touch!</p>
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
    </Layout>
  )
}

export default Services;