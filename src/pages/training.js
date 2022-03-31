import React, { useState } from "react"
import Layout from "../components/Layout"
import NavigationBar from "../components/NavigationBar"
import Section from "../components/Section"

import CoverPhoto from "../images/splash/team-meeting.jpeg";
import CustomerProfileImage from "../images/profiles/fran-walton.png"
import Footer from "../components/Footer"

export default function Training(){
  const [courseModule, setModule] = useState("Plan");

  var moduleText;
  switch(courseModule) {
    case "Run":
      moduleText = "This is a description of the run module";
      break;
    case "Win":
      moduleText = "This is a description of win module";
      break;
    case "Psychology":
      moduleText = "This is a description of the psychology module";
      break;
    default:
      moduleText = "This is a description of the plan module";
      break;
  }

  const activeClasses = ' text-white bg-blue ';

  const [reviewQuote, setQuote] = useState(0);
  const quotes = [
    {name: 'John Smith', job: 'CEO', company: 'Apple', quote: "Tom's insight has been a breakthrough for our marketing team"},
    {name: 'Jane Doe', job: 'COO', company: 'Samsung', quote: "I loved this course!!"},
    {name: 'Adam Harvard', job: 'VP of Sales', company: 'BBC', quote: "10/10 would recommend again"},
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

  return(
    <Layout>
      <Section cNames="bg-gold text-tomato min-h-[95vh]">
        {/*<NavigationBar helloButton helloBg="offwhite" helloText="tomato" />*/}
        <NavigationBar />
        <div className="flex h-auto pt-20">
          <div className="w-1/2 h-full text-left justify-center items-center px-4">
            <h1 className="text-[3rem] leading-snug font-bold text-offwhite">Mastering Online Qualitative Research</h1>
            <div className="flex space-x-2 py-4 items-center">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star text-offwhite"></i>
              <p>(35+)</p>
            </div>
            <p className="font-light text-xl">Subheading about why this is the greatest course on the internet</p>
            <div className="flex space-x-6 items-end justify-center">
              <button className="mt-4 py-2 px-4 bg-tomato text-offwhite rounded-full font-semibold hover:bg-tomato/50">Enroll Now!</button>
              <div className="flex items-center hover:text-white">
                <i className="fa-solid fa-circle-play text-4xl"></i>
                <p className="text-xl pl-3 ">Watch Video</p>
              </div>
            </div>
            <div className="flex space-x-10 justify-center py-8 text-offwhite">
              <div className="flex flex-col text-center w-32 ">
                <h4 className="font-semibold text-3xl">15+</h4>
                <p className="text-xl">Hours Content</p>
              </div>
              <div className="flex flex-col text-center w-32 ">
                <h4 className="font-semibold text-3xl">20+</h4>
                <p className="text-xl">Happy Businesses</p>
              </div>
              <div className="flex flex-col text-center w-32 ">
                <h4 className="font-semibold text-3xl">9</h4>
                <p className="text-xl">Awards & Nominations</p>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <img className="object-cover h-full rounded-md" src={CoverPhoto} alt="A qual research meeting of happy people around a computer" />
          </div>
        </div>
      </Section>
      <Section cNames="bg-offwhite text-tomato h-auto py-8">
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-5xl font-semibold pt-8">Learn from an award winning team</h2>
          <p className="text-xl font-light pt-4 pb-12">This is a subheading summarising the course benefits</p>
          <div className="flex text-5xl space-x-12 justify-center text-tomato py-4">
            <button onClick={() => setModule("Plan")}
              className={`flex flex-col space-y-4 items-center rounded-lg p-4 w-32 ${courseModule==="Plan" ? activeClasses : "bg-offwhite"}`}>
              <i className="fa-solid fa-chalkboard-user"></i>
              <p className="text-2xl font-semibold1">Plan</p>
              <i className={`fa-solid fa-angle-right rotate-90 ${courseModule==="Plan" ? "visible" : "invisible"}`}></i>
            </button>
            <button onClick={() => setModule("Run")}
              className={`flex flex-col space-y-4 items-center rounded-lg p-4 w-32 ${courseModule==="Run" ? activeClasses : "bg-offwhite"}`}>
              <i className="fa-solid fa-people-group"></i>
              <h4 className="text-2xl font-semibold1">Run</h4>
              <i className={`fa-solid fa-angle-right rotate-90 ${courseModule==="Run" ? "visible" : "invisible"}`}></i>
            </button>
            <button onClick={() => setModule("Win")}
              className={`flex flex-col space-y-4 items-center rounded-lg p-4 w-32 ${courseModule==="Win" ? activeClasses : "bg-offwhite"}`}>
              <i className="fa-solid fa-trophy-star"></i>
              <h4 className="text-2xl font-semibold1">Win</h4>
              <i className={`fa-solid fa-angle-right rotate-90 ${courseModule==="Win" ? "visible" : "invisible"}`}></i>
            </button>
            <button onClick={() => setModule("Psychology")}
              className={`flex flex-col space-y-4 items-center rounded-lg p-4 w-32 ${courseModule==="Psychology" ? activeClasses : "bg-offwhite"}`}>
              <i className="fa-solid fa-head-side-brain"></i>
              <h4 className="text-2xl font-semibold1">Psychology</h4>
              <i className={`fa-solid fa-angle-right rotate-90 ${courseModule==="Psychology" ? "visible" : "invisible"}`}></i>
            </button>
          </div>
          <div className="py-6 px-12 w-3/5 bg-blue rounded-lg justify-center text-offwhite">
            {moduleText}
          </div>
          <div className="flex justify-center relative py-6 bg-black">
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
          <div className="mt-16 flex flex-col py-4 px-4 bg-maroon/50 rounded-lg text-pink items-center w-3/5">
            <p className="text-xl font-light">"{quotes[reviewQuote].quote}"</p>
            <div className="flex items-center text-center pt-4">
              <div className="flex flex-col font-semibold">
                <p className="text-lg">{quotes[reviewQuote].name}</p>
                <p className="text-lg">{quotes[reviewQuote].job}, {quotes[reviewQuote].company}</p>
              </div>
            </div>
            <div className="flex space-x-4 justify-between py-4 text-xs">
              <i className={`fa-solid ${reviewQuote === 0 ? 'fa-circle-dot' : 'fa-circle'}`}></i>
              <i className={`fa-solid ${reviewQuote === 1 ? 'fa-circle-dot' : 'fa-circle'}`}></i>
              <i className={`fa-solid ${reviewQuote === 2 ? 'fa-circle-dot' : 'fa-circle'}`}></i>
            </div>
          </div>
          <button onClick={increaseQuoteCount}
            className="p-2 hover:text-blue">
            <i className="fa-solid fa-chevron-right text-xl" />
          </button>
        </div>
        <div className="flex items-center">
          <div className="py-16 flex w-full px-4 justify-center">
            <div className="w-2/5">
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
      <Section cNames="bg-offwhite">
        <Footer />
      </Section>
    </Layout>
  )
}