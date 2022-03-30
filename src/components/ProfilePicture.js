import React from "react"
import Img from 'gatsby-image';


export default function ProfilePicture(props) {
  if (props.imageSrc) {
    return (
      <div className={`w-${props.width} h-${props.height}`}>
        <img className="object-cover h-full rounded-full" src={props.imageSrc} alt="Profile Picture"/>
      </div>
    )
  }
}

ProfilePicture.defaultProps = {
  width: 20,
  height: 16
}