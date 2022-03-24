import * as React from "react"
import { Link } from "gatsby"
import "../styles/logo-filters.css";
import logoSVG from "../images/full-logo-white.svg";

export default function NavigationBar (props) {

  const [isOpen, setisOpen] = React.useState(false);

  function handleClick() {
    setisOpen(!isOpen);
  }

  let helloBtn = null;
  if (props.helloButton) {
    helloBtn = <button
      className="hidden lg:flex rounded-lg py-2 px-4 whitespace-nowrap bg-blue text-sandybrown hover:text-white">Say
      Hello
    </button>;
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
            <Link to="/services">
              <li className="no-underline font-light hover:text-white">SERVICES</li>
            </Link>
            <Link to="/">
              <li className="no-underline font-light hover:text-white">TRAINING</li>
            </Link>
            <Link to="/">
              <li className="no-underline font-light hover:text-white">CLIENTS</li>
            </Link>
            <Link to="/">
              <li className="no-underline font-light hover:text-white">INSIGHTS</li>
            </Link>
          </ul>
          {helloBtn}
        </div>
      </nav>
    </header>
  )
}

NavigationBar.defaultProps = {
  helloButton: true,
  helloBg: "blue",
  helloText: "sandybrown"
}