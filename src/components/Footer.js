import React from "react"
import { Link } from "gatsby"

function Footer() {
  return (
    <footer className="flex flex-col space-y-6 items-center pt-10 pb-4 text-gold">
      <Link to="/">
        <div className="w-16 h-16 bg-black rounded-full" />
      </Link>
      <ul className="hidden lg:flex items-center w-auto space-x-12 pt-4">
        <li><a href="#" className="text-md no-underline text-light hover:text-white">BLOG</a></li>
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

export default Footer;