import React from "react"


function ProfilePicture(props) {
  return (
    <div className="w-16 max-h-16">
      <img className="object-cover h-full rounded-full" src={props.imageSrc} alt="Profile Picture"/>
    </div>
  )
}

export default ProfilePicture;