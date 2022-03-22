import React from "react"

function CustomerReviewCard(props) {
  return (
    <div className="flex flex-col rounded-lg text-midnight pt-6 pb-2 px-4 space-y-2 bg-pink hover:drop-shadow-2xl">
      <i className="fa-solid fa-quote-left text-6xl opacity-25"></i>
      <p className="font-semibold">{props.headline}</p>
      <p>{props.subheading}</p>
      <div className="flex items-center pt-4">
        <div className="h-16 w-16 bg-black rounded-full" />
        <div className="flex flex-col pl-4 font-semibold">
          <p>{props.name}, {props.jobRole}</p>
          <p>{props.company}</p>
        </div>
      </div>
    </div>
  )
}

export default CustomerReviewCard;