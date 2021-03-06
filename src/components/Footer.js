import React from "react"
import { Link } from "gatsby"

import symbol from "../images/symbol-black.svg";

export default function Footer(props) {

  var logo;
  switch (props.logoColour){
    case "tomato":
      logo = <img className="h-auto w-16 tomato-logo gold-hover" src={symbol} alt="Feeling Mutual Icon" />
      break;
    case "maroon":
      logo = <img className="h-auto w-16 maroon-logo gold-hover" src={symbol} alt="Feeling Mutual Icon" />
      break;
  }

  return (
    <footer className={`flex flex-col space-y-6 items-center pt-10 pb-4 text-${props.textColour}`}>
      <Link to="/">
        {logo}
      </Link>
      <ul className="hidden lg:flex items-center w-auto space-x-12 pt-4">
        <li><Link to="/services" className="text-md no-underline text-light hover:text-white">SERVICES</Link></li>
        <li><Link to="/training" className="text-md no-underline text-light hover:text-white">TRAINING</Link></li>
        <li><Link to="/#clients" className="text-md no-underline text-light hover:text-white">CLIENTS</Link></li>
        <li><Link to="/blog" className="text-md no-underline text-light hover:text-white">BLOG</Link></li>
        <li><a href="mailto:tom@feelingmutual.com" className="text-md no-underline text-light hover:text-white">SAY HELLO</a></li>
      </ul>
      <div className="lg:hidden">
        <ul className="flex justify-center items-center w-auto space-x-6 md:space-x-12 pt-2">
          <li><Link to="/services" className="text-md no-underline text-light hover:text-white">SERVICES</Link></li>
          <li><Link to="/training" className="text-md no-underline text-light hover:text-white">TRAINING</Link></li>
          <li><Link to="/#clients" className="text-md no-underline text-light hover:text-white">CLIENTS</Link></li>
        </ul>
        <ul className="flex justify-center items-center w-auto space-x-6 md:space-x-12 pt-2">
          <li><Link to="/blog" className="text-md no-underline text-light hover:text-white">BLOG</Link></li>
          <li><a href="mailto:tom@feelingmutual.com" className="text-md no-underline text-light hover:text-white">SAY HELLO</a></li>
        </ul>
      </div>
      <div className={`space-x-8 pb-6 text-${props.textColour}`}>
        <a href="https://twitter.com/tomwoodnutt"><i className="fa-brands fa-twitter text-2xl opacity-50 hover:opacity-100"></i></a>
        <a href="https://www.linkedin.com/company/feeling-mutual-limited/"><i className="fa-brands fa-linkedin text-2xl opacity-50 hover:opacity-100"></i></a>
        <a href="mailto:tom@feelingmutual.com"><i className="fa-solid fa-envelope text-2xl opacity-50 hover:opacity-100"></i></a>
      </div>
    </footer>
  )
}

Footer.defaultProps = {
  logoColour: "tomato",
  textColour: "gold"
}