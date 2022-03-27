import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

export default function BlogPostCard(props){
    const containerClasses = `w-full ${props.wide ? 'lg:w-2/3' : 'lg:w-1/3'} px-4 mb-12`
      return (
        <div className={containerClasses}>
          <div className="flex h-96 mb-6">
            <div className="w-full h-full bg-black rounded-lg" />
          </div>
          <span className="text-xs font-bold text-gray-500">{props.post.date}</span>
          <h2 className="mb-2 text-3xl font-bold font-heading">{props.post.title}</h2>
          <p className="mb-4 text-lg text-gray-500 leading-loose">{props.post.description}</p>
          <a className="flex items-center text-lg font-bold text-gray-700 hover:text-gray-800" href="#">
            <span>Read More</span>
            <span>
              <svg className="ml-1 w-5 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </a>
        </div>
      )
}

BlogPostCard.defaultProps = {
  wide: false,
  title: "Coming Soon",
  date: "10 jun 2020 19:40",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing\n" +
    "            elit. Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan aliquet orci."
}