import React from "react"
import { Link } from "gatsby"


export default function NewsletterSignup(props) {
  return (
    <section className="pt-10">
      <div className={`flex flex-col space-y-4 flex-wrap items-center justify-center text-${props.textColour}`}>
        <h3 className="text-5xl font-semibold font-heading pb-4">{props.headline}</h3>
        <p className="pb-4 font-light text-xl">{props.subheading}</p>
        <div className="flex mobile-only:flex-col mobile-only:items-center w-full lg:w-2/5">
          <input className="w-full mb-4 lg:mb-0 lg:mr-4 py-3 pl-4 text-sm text-white bg-transparent border border-blue rounded" type="text" placeholder="e.g tom@feelingmutual.com" />
          <button className="w-full mobile-only:w-3/5 lg:w-auto py-4 px-6 text-sm text-white font-medium leading-normal bg-red-400 hover:bg-red-300 rounded transition duration-200">Sign&nbsp;up</button>
        </div>
        <p className="font-extralight text-sm pt-2">Your <Link to="/privacy-policy" className="underline hover:font-semibold">Privacy</Link> is important to us. No Spam. Just Insight.</p>
        </div>
    </section>)
}

NewsletterSignup.defaultProps = {
  headline: "Sign up to our newsletter",
  subheading: "Stay up-to-date with the cutting edge of online qualitative research",
  textColour: "gold"
}