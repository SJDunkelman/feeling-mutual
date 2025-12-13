import React from "react"

export default function GetInTouch(props) {
  let buttonClasses = "rounded-lg py-3 px-6 font-medium transition duration-200 hover:opacity-75";
  switch (props.buttonColour) {
    case "pink":
      buttonClasses += " bg-pink text-white";
      break;
    case "maroon":
      buttonClasses += " bg-maroon text-sandybrown";
      break;
    default:
      buttonClasses += " bg-red-400 text-white";
      break;
  }

  return (
    <section className="pt-10">
      <div className={`flex flex-col space-y-4 items-center justify-center text-${props.textColour}`}>
        <h3 className="text-5xl font-semibold font-heading pb-4">{props.headline}</h3>
        <p className="pb-4 font-light text-xl">{props.subheading}</p>
        <a href="mailto:tom@feelingmutual.com">
          <button className={buttonClasses}>
            Get in Touch
          </button>
        </a>
      </div>
    </section>
  )
}

GetInTouch.defaultProps = {
  headline: "Get in Touch",
  subheading: "We'd love to hear from you",
  textColour: "gold",
  buttonColour: "default"
}
