import React, { useState } from "react"
import Layout from "../components/Layout"
import NavigationBar from "../components/NavigationBar"
import Section from "../components/Section"
import { AnchorLink } from "gatsby-plugin-anchor-links";
import CoverPhoto from "../images/splash/team-meeting.jpeg";
import Footer from "../components/Footer"
import ProfilePicture from "../components/ProfilePicture"

import Customer1ProfileImage from "../images/profiles/caroline-hayter.jpeg"
import Customer2ProfileImage from "../images/profiles/jill-elston.jpeg"
import Accordion from "../components/Accordion"

export default function Training(){
  const [courseModule, setModule] = useState("Win");

  const courseModuleData = [
    {
      name: 'Run',
      description: "This covers what you need to know during fieldwork, including:\nBest practice in moderation, management and analysis",
    },
    {
      name: 'Win',
      description: `This covers what you need to know at proposal stage, including:\nBest practice in choosing method, technology and doing costs`,
    },
    {
      name: 'Psychology',
      description: "Inspired by a literature review of psychology; learn how to increase engagement, strengthen validity and inspire more emotional disclosure in online qual.",
    },
    {
      name: 'Full Service',
      description: "This covers what you need to know before the project is live, including:\nBest practice in designing the project, sample, tasks and questions",
    },
  ]

  var moduleText;
  switch(courseModule) {
    case "Run":
      moduleText = courseModuleData[0].description;
      break;
    case "Win":
      moduleText = courseModuleData[1].description;
      break;
    case "Psychology":
      moduleText = courseModuleData[2].description;
      break;
    default:
      moduleText = courseModuleData[3].description;
      break;
  }

  const activeClasses = ' text-white bg-blue ';

  const [reviewQuote, setQuote] = useState(0);
  const quotes = [
    {name: 'Caroline Hayter',
      job: 'Founder',
      company: 'Acacia Avenue',
      quote: "The online qual training embraced the latest thinking on the subject and included a plethora of practical tips.  It really allowed us to sharpen our focus",
      image: Customer1ProfileImage,
    },
    {name: 'Jill Elston',
      job: 'Founder',
      company: 'Insightful Research',
      quote: "A few years ago, I attended the course having never used online qual before.  It gave me a fantastic grounding and lots of practical tips.  Online qual is now a central part of my offer to clients.",
      image: Customer2ProfileImage},
  ]

  const increaseQuoteCount = () => {
    if (reviewQuote + 1 < quotes.length) {
      setQuote(reviewQuote + 1);
    }
    else {
      setQuote(0);
    }
  }

  const decreaseQuoteCount = () => {
    if (reviewQuote - 1 >= 0) {
      setQuote(reviewQuote + 1);
    }
    else {
      setQuote(quotes.length - 1);
    }
  }

  let quoteCircles = [];
  for (var i = 0; i < quotes.length; i++) {
    quoteCircles.push(<i className={`fa-solid ${reviewQuote === i ? 'fa-circle-dot' : 'fa-circle'}`} />)
  }

  return(
    <Layout>
      <Section cNames="bg-gold text-tomato min-h-[95vh]">
        {/*<NavigationBar helloButton helloBg="offwhite" helloText="tomato" />*/}
        <NavigationBar />
          <div className="flex no-desktop:flex-col no-desktop:space-y-6 min-h-[80vh] pt-16 pb-10 items-center">
            <div className="w-full lg:w-1/2 h-full text-left justify-center items-center px-4 text-offwhite">
              <h1 className="text-6xl leading-snug font-bold">Online Qual Mastery</h1>
              <p className="font-light text-xl py-4">This video series will help researchers do online qual that is more insightful, valid and profitable.</p>
              <div className="flex space-x-6 items-end justify-center py-4 text-tomato">
                <AnchorLink to="/training#contact">
                  <button className="mt-4 py-2 px-4 bg-tomato text-offwhite rounded-full font-semibold hover:bg-tomato/50">Enroll Now!</button>
                </AnchorLink>
                <AnchorLink to="/training#video">
                  <div className="flex items-center hover:text-white">
                    <i className="fa-solid fa-circle-play text-4xl" />
                    <p className="text-xl pl-3 ">Watch Video</p>
                  </div>
                </AnchorLink>
              </div>
              <div className="flex space-x-4 lg:space-x-10 justify-center py-4 text-offwhite">
                <div className="flex flex-col text-center w-32">
                  <h4 className="font-semibold text-2xl md:text-3xl">100+</h4>
                  <p className="text-lg md:text-xl">Researchers Taught</p>
                </div>
                <div className="flex flex-col text-center w-32 ">
                  <h4 className="font-semibold text-2xl md:text-3xl">4+</h4>
                  <p className="text-lg md:text-xl">Hours Video</p>
                </div>
                <div className="flex flex-col text-center w-32 ">
                  <h4 className="font-semibold text-2xl md:text-3xl">20+</h4>
                  <p className="text-lg md:text-xl">Valuable Downloads</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 h-full">
              <img className="object-cover h-full rounded-md" src={CoverPhoto} alt="A qual research meeting of happy people around a computer" />
            </div>
          </div>
      </Section>
      <Section cNames="bg-offwhite text-tomato h-auto py-8">
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-5xl font-semibold pt-8"> 4 modules that will inspire better Online Qual</h2>
          <p className="text-2xl font-light pt-4 pb-12">Choose one or more of the following training modules</p>
          <div className="no-desktop:hidden flex text-5xl space-x-12 justify-center text-tomato py-4">
            <button onClick={() => setModule("Win")}
                    className={`flex flex-col space-y-4 items-center rounded-lg p-4 w-32 ${courseModule==="Win" ? activeClasses : "bg-offwhite"}`}>
              <i className="fa-solid fa-trophy-star"></i>
              <h4 className="text-2xl font-semibold1">Win</h4>
              <i className={`fa-solid fa-angle-right rotate-90 ${courseModule==="Win" ? "visible" : "invisible"}`}></i>
            </button>
            <button onClick={() => setModule("Plan")}
              className={`flex flex-col space-y-4 items-center rounded-lg p-4 w-32 ${courseModule==="Plan" ? activeClasses : "bg-offwhite"}`}>
              <i className="fa-solid fa-sitemap"></i>
              <p className="text-2xl font-semibold1">Plan</p>
              <i className={`fa-solid fa-angle-right rotate-90 ${courseModule==="Plan" ? "visible" : "invisible"}`}></i>
            </button>
            <button onClick={() => setModule("Run")}
              className={`flex flex-col space-y-4 items-center rounded-lg p-4 w-32 ${courseModule==="Run" ? activeClasses : "bg-offwhite"}`}>
              <i className="fa-solid fa-gears"></i>
              <h4 className="text-2xl font-semibold1">Run</h4>
              <i className={`fa-solid fa-angle-right rotate-90 ${courseModule==="Run" ? "visible" : "invisible"}`}></i>
            </button>
            <button onClick={() => setModule("Psychology")}
              className={`flex flex-col space-y-4 items-center rounded-lg p-4 w-32 ${courseModule==="Psychology" ? activeClasses : "bg-offwhite"}`}>
              <i className="fa-solid fa-head-side-brain"></i>
              <h4 className="text-2xl font-semibold1">Psychology</h4>
              <i className={`fa-solid fa-angle-right rotate-90 ${courseModule==="Psychology" ? "visible" : "invisible"}`}></i>
            </button>
          </div>
          <div className="no-desktop:hidden py-6 px-12 w-3/5 bg-blue rounded-lg justify-center text-offwhite whitespace-pre-wrap">
            {moduleText}
          </div>
          <div className="lg:hidden flex flex-col w-full min-h-72">
            <Accordion title="Win" >
              <p className="whitespace-pre-line">{courseModuleData[0].description}</p>
            </Accordion>
            <Accordion title="Plan" >
              <p className="whitespace-pre-line">{courseModuleData[1].description}</p>
            </Accordion>
            <Accordion title="Run" >
              <p className="whitespace-pre-line">{courseModuleData[2].description}</p>
            </Accordion>
            <Accordion title="Psychology" >
              <p className="whitespace-pre-line">{courseModuleData[3].description}</p>
            </Accordion>
          </div>
          <div id="video" className=" flex justify-center relative py-6 bg-black">
            <div className="w-full h-72" />
            <i className="fa-solid fa-play-pause absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 text-4xl"></i>
          </div>
        </div>
      </Section>
      <Section cNames="bg-maroon text-pink h-auto py-8">
        <div className="flex items-center justify-center">
          <button onClick={decreaseQuoteCount}
            className="p-2 hover:text-blue">
            <i className="fa-solid fa-chevron-left text-xl" />
          </button>
          <div className="mt-16 flex flex-col py-4 px-4 bg-maroon/50 rounded-lg text-pink items-center w-full lg:w-3/5">
            <p className="no-desktop:pb-4 text-xl font-light">"{quotes[reviewQuote].quote}"</p>
            <div className="flex no-desktop:flex-col items-center text-center pt-4">
              <ProfilePicture imageSrc={quotes[reviewQuote].image} />
              <div className="flex flex-col font-semibold ml-4">
                <p className="text-lg">{quotes[reviewQuote].name}</p>
                <p className="text-lg">{quotes[reviewQuote].job}, {quotes[reviewQuote].company}</p>
              </div>
            </div>
            <div className="flex space-x-4 justify-between py-4 text-xs">
              {quoteCircles}
            </div>
          </div>
          <button onClick={increaseQuoteCount}
            className="p-2 hover:text-blue">
            <i className="fa-solid fa-chevron-right text-xl" />
          </button>
        </div>
        <div id="contact" className="flex items-center">
          <div className="py-16 flex no-desktop:flex-col w-full px-4 justify-center">
            <div className="w-full lg:w-2/5">
              <h2 className="text-5xl font-semibold">LET'S LEARN TOGETHER</h2>
              <p className="text-lg font-extralight py-4">Like what you see? Send a message to get in touch!</p>
            </div>
            <div>
              <form action="">
                <div className="flex flex-col space-y-4 w-full">
                  <input type="text" name="name" placeholder="Name" className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-300 placeholder-tomato text-tomato leading-tight focus:outline-none focus:shadow-outline" required />
                  <input type="email" name="email" placeholder="Email Address" className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-300 placeholder-tomato text-tomato leading-tight focus:outline-none focus:shadow-outline" required />
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
      <Section cNames="bg-offwhite relative xl:h-72">
        <Footer />
      </Section>
    </Layout>
  )
}