import * as React from "react"
import { Link } from "gatsby"
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
      className={`hidden lg:flex rounded-lg py-2 px-4 whitespace-nowrap bg-${props.helloBg} text-${props.helloText} hover:text-white`}>Say
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
    default:
      logo = <img className="h-auto w-40 blue-logo white-hover" src={logoSVG} alt="Logo" />
      break;
  }

  return (
    <header className="min-w-screen px-4">
      <nav className="py-4 ">
        <div className="flex justify-between items-center">
          <Link to="/">
            {logo}
          </Link>

          <ul className="hidden lg:flex items-center w-auto whitespace-nowrap lg:space-x-12">
            <Link to="/services">
              <li className="no-underline font-light hover:text-white">SERVICES</li>
            </Link>
            <Link to="/">
              <li className="no-underline font-light hover:text-white">TRAINING</li>
            </Link>
            <Link to="/">
              <li className="no-underline font-light hover:text-white">CLIENTS</li>
            </Link>
            <Link to="/blog">
              <li className="no-underline font-light hover:text-white">BLOG</li>
            </Link>
          </ul>
          {helloBtn}
        </div>
      </nav>
    </header>
  )
}

NavigationBar.defaultProps = {
  helloButton: false,
  helloBg: "blue",
  helloText: "sandybrown",
  logoColour: "tomato"
}