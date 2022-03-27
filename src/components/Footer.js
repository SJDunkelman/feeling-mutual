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
        <li><Link to="/blog" className="text-md no-underline text-light hover:text-white">BLOG</Link></li>
        <li><a href="#" className="text-md no-underline text-light hover:text-white">WHAT WE DO</a></li>
        <li><a href="#" className="text-md no-underline text-light hover:text-white">HOW WE WORK</a></li>
        <li><a href="#" className="text-md no-underline text-light hover:text-white">WHO WE ARE</a></li>
        <li><a href="#" className="text-md no-underline text-light hover:text-white">OUR CUSTOMERS</a></li>
      </ul>
      <div className="space-x-8 pb-6">
        <Link to="/"><i className="fa-brands fa-twitter text-2xl text-gold opacity-25 hover:opacity-100"></i></Link>
        <Link to="/"><i className="fa-brands fa-linkedin text-2xl opacity-25 hover:opacity-100"></i></Link>
        <Link to="/"><i className="fa-solid fa-envelope text-2xl opacity-25 hover:opacity-100"></i></Link>
      </div>
    </footer>
  )
}

Footer.defaultProps = {
  logoColour: "tomato",
  textColour: "gold"
}