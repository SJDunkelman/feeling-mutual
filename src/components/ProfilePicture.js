import React from "react"

export default function ProfilePicture(props) {
  if (props.imageSrc) {
    return (
        <img className={`w-${props.width} h-${props.height} object-cover rounded-full`} src={props.imageSrc} alt="Profile Picture"/>
    )
  }
}

ProfilePicture.defaultProps = {
  width: 20,
  height: 16
}