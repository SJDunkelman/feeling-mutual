import React from "react"
import ProfilePicture from "./ProfilePicture"
import { GatsbyImage } from "gatsby-plugin-image"

export default function BlogReviewCard(props) {
  return (
    <div className="w-full lg:w-1/3 px-4 mb-12 h-96 bg-blue text-offwhite rounded-lg">
        {/*<div className="flex h-96 mb-6">*/}
        {/*  <div className="w-full h-full bg-black rounded-lg" />*/}
        {/*</div>*/}
        {/*<h2 className="mb-2 text-3xl font-bold font-heading">{props.review.headline}</h2>*/}
        {/*<p className="mb-4 text-lg text-gray-500 leading-loose">{props.review.subheading}</p>*/}
      <i className="fa-solid fa-quote-left text-6xl opacity-25"></i>
      <p className="font-semibold text-xl">{props.review.headline}</p>
      <p className="font-light text-lg">{props.review.subheading}</p>
      <div className="flex flex-col items-center w-6/6 py-4">
        <div className="h-32 w-32">
          <GatsbyImage className="object-cover h-full rounded-full" image={props.review.profileImage.childImageSharp.gatsbyImageData} alt="Profile picture of a happy customer" />
        </div>
        <div className="flex items-center text-center pt-4">
          <div className="flex flex-col pl-4 font-semibold">
            <p className="text-sm">{props.review.name}</p>
            <p className="text-md">{props.review.jobRole}, {props.review.company}</p>
          </div>
        </div>
      </div>
    </div>
  )
}