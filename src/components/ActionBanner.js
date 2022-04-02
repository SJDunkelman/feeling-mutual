import React from "react"
import { Link } from "gatsby"

export default function ActionBanner(props) {
  return (
    <section className="pt-10">
      <div className={`flex flex-col space-y-4 flex-wrap text-center items-center justify-center text-${props.textColour}`}>
        <h3 className="text-5xl font-semibold whitespace-pre-line font-heading pb-4">{props.headline}</h3>
        <p className="font-light text-xl">{props.subheading}</p>
        <Link to="/downloads">
        <p className="text-lg">Find out more <i className="fa-solid fa-arrow-right-long text-lg" /></p>
        </Link>
      </div>
    </section>
  )
}

ActionBanner.defaultProps = {
  headline: "Get Access to free Whitepapers, Research\n& More",
  subheading: "Download more in depth handbooks and whitepapers for free with your email.",
  textColour: "pink",
  actionSlug: "/download"
}