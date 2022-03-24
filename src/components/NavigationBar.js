import * as React from "react"
import { Link } from "gatsby"
import { HashLink} from "react-router-hash-link"
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
            <Link to="/"><li className="no-underline font-light hover:text-white">SERVICES</li></Link>
            <Link to="/"><li className="no-underline font-light hover:text-white">TRAINING</li></Link>
            <Link to="/"><li className="no-underline font-light hover:text-white">CLIENTS</li></Link>
            <Link to="/"><li className="no-underline font-light hover:text-white">INSIGHTS</li></Link>
          </ul>

          <button className="hidden lg:flex rounded-lg py-2 px-4 whitespace-nowrap bg-blue text-sandybrown hover:text-white">Say Hello</button>
        </div>
      </nav>
    </header>
  )
}

export default NavigationBar;
