import React from "react"
import { Link } from "gatsby";


const ServiceCard = (props) => {
  const linkSlug = props.slug;
  const fontAwesomeIcon = props.iconClasses;
  const cardTitle = props.title;
  const description = props.description;

  return (
    <Link to={linkSlug} className="no-underline">
      <div className="group flex flex-col mx-4 px-4 pt-8 pb-6 w-full max-w-2/5 h-52 md:h-56 rounded-lg max-w-32 lg:max-w-72 space-y-2 bg-white/[0.75] text-maroon hover:bg-pink hover:text-gold hover:drop-shadow-lg">
        <i className={`${fontAwesomeIcon} text-5xl text-tomato`}></i>
        <h4 className="font-semibold text-xl">{cardTitle}</h4>
        <p className="font-light group-hover:hidden">{description}</p>
        <p className="hidden group-hover:block">Learn More <i className="fa-solid fa-arrow-right-long"></i></p>
      </div>
    </Link>
  )
}

export default ServiceCard;