import React from "react"


function NewsletterSignup() {
  return (
    <section className="pt-10">
      <div className="flex flex-col flex-wrap items-center justify-center text-gold">
        <h3 className="text-5xl font-semibold font-heading pb-4">Sign up to our newsletter</h3>
        <p className="pb-4 font-light text-xl">Stay up-to-date with the cutting edge of online qualitative research</p>
        <div className="flex w-2/5">
          <input className="w-full mb-4 lg:mb-0 lg:mr-4 py-3 pl-4 text-sm text-white bg-transparent border border-blue rounded" type="text" placeholder="e.g tom@feelingmutual.com" />
          <button className="w-full lg:w-auto py-4 px-6 text-sm text-white font-medium leading-normal bg-red-400 hover:bg-red-300 rounded transition duration-200">Sign&nbsp;up</button>
        </div>
        <p className="font-extralight text-sm pt-2">Your <a href="/" className="underline hover:font-semibold">Privacy</a> is important to us. No Spam. Just Insight.</p>
        </div>
    </section>)
}

export default NewsletterSignup;