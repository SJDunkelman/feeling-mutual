import * as React from "react"
import { Link } from "gatsby"
import { AnchorLink } from "gatsby-plugin-anchor-links"
import "../styles/logo-filters.css";
import logoSVG from "../images/full-logo-black.svg";

export default function NavigationBar (props) {
  const [isOpen, setisOpen] = React.useState(false);

  function handleClick() {
    setisOpen(!isOpen);
  }

  let helloBtn = null;
  if (props.helloButton) {
    helloBtn = <button
      className={`hidden md:flex rounded-lg py-2 px-4 whitespace-nowrap bg-${props.helloBg} text-${props.helloText} hover:text-white`}>Say
      Hello
    </button>;
  }

  var logo;
  switch (props.logoColour) {
    case "tomato":
      logo = <img className="h-auto w-40 tomato-logo white-hover" src={logoSVG} alt="Logo" />
      break;
    case "maroon":
      logo = <img className="h-auto w-40 maroon-logo gold-hover" src={logoSVG} alt="Logo" />
      break;
    case "pink":
      logo = <img className="h-auto w-40 pink-logo tomato-hover" src={logoSVG} alt="Logo" />
      break;
    default:
      logo = <img className="h-auto w-40 blue-logo white-hover" src={logoSVG} alt="Logo" />
      break;
  }

  var mobileText;
  var hoverMobileText;
  switch (props.mobileNavText) {
    case "pink":
      mobileText = "pink";
      hoverMobileText = "offwhite";
      break;
    case "blue":
      mobileText = "blue";
      hoverMobileText = "offwhite";
      break;
  }

  return (
    <header className="min-w-screen px-4">
      <nav className="py-6">
        <div className="flex justify-between items-center">
          <Link to="/">
            {logo}
          </Link>
          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center w-auto whitespace-nowrap lg:space-x-12">
            <Link to="/services">
              <li className="no-underline font-light hover:text-white">SERVICES</li>
            </Link>
            <Link to="/training">
              <li className="no-underline font-light hover:text-white">TRAINING</li>
            </Link>
            <AnchorLink to="/#clients">
              <li className="no-underline font-light hover:text-white">CLIENTS</li>
            </AnchorLink>
            <Link to="/blog">
              <li className="no-underline font-light hover:text-white">BLOG</li>
            </Link>
          </ul>
          {helloBtn}

          {/* Mobile */}
          <button className="md:hidden" onClick={handleClick}>
            {isOpen && (<i className="fa-solid fa-xmark text-3xl menu-button"></i>)}
            {!isOpen && (<i className="fa-solid fa-bars text-2xl"></i>)}
          </button>
        </div>
        <div className={`md:hidden space-y-4 mt-4 ${isOpen ? "flex flex-col" : "hidden"}`}>
          <ul className="bg-primary rounded-lg w-full text-center">
            <Link to="/services">
              <li className="py-2 font-bold text-offwhite hover:text-pink border-b-[1px] border-white">SERVICES</li>
            </Link>
            <Link to="/training">
              <li className="py-2 font-bold text-offwhite hover:text-pink border-b-[1px] border-white">TRAINING</li>
            </Link>
            <Link to="/#clients">
              <li className="py-2 font-bold text-offwhite hover:text-pink border-b-[1px] border-white">CLIENTS</li>
            </Link>
            <Link to="/blog">
              <li className={`py-2 font-bold text-${mobileText} hover:text-${hoverMobileText}`}>BLOG</li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  )
}

NavigationBar.defaultProps = {
  helloButton: false,
  helloBg: "blue",
  helloText: "sandybrown",
  logoColour: "tomato",
  mobileNavText: "pink",
}