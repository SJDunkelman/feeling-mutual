import * as React from "react"
import { Link } from "gatsby"
import "../styles/logo-filters.css";

import fullLogo from "../images/logo-full-tomato.png";
import logoSVG from "../images/full-logo-white.svg";

const NavigationBar = () => (
  <header className="min-w-screen px-4">
    <nav className="py-4">
      <div className="flex justify-between items-center">
        {/*<h3 className="font-bold text-3xl hover:text-white"><Link to="/">Feeling Mutual</Link></h3>*/}
        {/*<img className="w-32 h-auto" src={fullLogo} alt="Feeling Mutual logo" />*/}
        <Link to="/">
          <img className="h-auto w-40 tomato-logo white-hover" src={logoSVG} alt="Logo" />
        </Link>
        <ul className="flex items-center w-auto space-x-12">
          <Link to="#what-we-do" className="no-underline font-light hover:text-white">
            <li>WHAT WE DO</li>
          </Link>
          <Link to="#how-we-work" className="no-underline font-light hover:text-white">
            <li>HOW WE WORK</li>
          </Link>
          <Link to="#who-we-are" className="no-underline font-light hover:text-white">
            <li>WHO WE ARE</li>
          </Link>
          <Link to="#our-customers" className="no-underline font-light hover:text-white">
            <li>OUR CUSTOMERS</li>
          </Link>
        </ul>
        <button className="rounded-lg py-2 px-4 bg-blue text-sandybrown hover:text-white">Say Hello</button>
      </div>
    </nav>
  </header>
)

export default NavigationBar;
