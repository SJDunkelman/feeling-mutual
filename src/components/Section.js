import React from "react"

function Section(props) {
  const classes = `${props.cNames} px-40`;
  return (
    <section className={classes}>
      {props.children}
    </section>
  )
}

export default Section;