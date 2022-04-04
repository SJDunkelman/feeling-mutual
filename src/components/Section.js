import React from "react"

function Section(props) {
  const classes = `${props.cNames} px-8 md:px-24 lg:px-40 xl:px-64`;
  return (
    <section className={classes}>
      {props.children}
    </section>
  )
}

export default Section;