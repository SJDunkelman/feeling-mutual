import * as React from "react"
import { Link } from "gatsby"
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
            <a href="#what-we-do"><li className="no-underline font-light hover:text-white">WHAT WE DO</li></a>
            <a href="#how-we-work"><li className="no-underline font-light hover:text-white">HOW WE WORK</li></a>
            <a href="#who-we-are"><li className="no-underline font-light hover:text-white">WHO WE ARE</li></a>
            <a href="#our-customers"><li className="no-underline font-light hover:text-white">OUR CUSTOMERS</li></a>
            {/*<li><AnchorLink to="/#how-we-work" title="HOW WE WORK" className="no-underline font-light hover:text-white" /></li>*/}
            {/*<li><AnchorLink to="/#who-we-are" title="WHO WE ARE" className="no-underline font-light hover:text-white" /></li>*/}
            {/*<li><AnchorLink to="/#our-customers" title="OUR CUSTOMERS" className="no-underline font-light hover:text-white" /></li>*/}
          </ul>
          <button className="hidden lg:flex rounded-lg py-2 px-4 whitespace-nowrap bg-blue text-sandybrown hover:text-white">Say Hello</button>
        </div>
      </nav>
    </header>
  )
}

export default NavigationBar;
