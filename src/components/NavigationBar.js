import * as React from "react"
import { Link } from "gatsby"
import { AnchorLink } from "gatsby-plugin-anchor-links";
import "../styles/logo-filters.css";

import logoSVG from "../images/full-logo-white.svg";

function NavigationBar () {
  const [isOpen, setisOpen] = React.useState(false);

  function handleClick() {
    setisOpen(!isOpen);
  }

  return (
    <header className="min-w-screen px-4">
      <nav className="py-4 ">
        <div className="flex justify-between items-center">
          {/*<h3 className="font-bold text-3xl hover:text-white"><Link to="/">Feeling Mutual</Link></h3>*/}
          {/*<img className="w-32 h-auto" src={fullLogo} alt="Feeling Mutual logo" />*/}
          <Link to="/">
            <img className="h-auto w-40 tomato-logo white-hover" src={logoSVG} alt="Logo" />
          </Link>

          <ul className="hidden lg:flex items-center w-auto whitespace-nowrap lg:space-x-12">
            <a href="#what-we-do" className="no-underline font-light hover:text-white">
              <li>WHAT WE DO</li>
            </a>
            <a href="#how-we-work" className="no-underline font-light hover:text-white">
              <li>HOW WE WORK</li>
            </a>
            <a href="#who-we-are" className="no-underline font-light hover:text-white">
              <li>WHO WE ARE</li>
            </a>
            <a href="#our-customers" className="no-underline font-light hover:text-white">
              <li>OUR CUSTOMERS</li>
            </a>
          </ul>
          <button className="hidden lg:flex rounded-lg py-2 px-4 whitespace-nowrap bg-blue text-sandybrown hover:text-white">Say Hello</button>
        </div>
      </nav>
    </header>
  )
}

export default NavigationBar;
