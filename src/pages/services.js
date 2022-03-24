import React from "react"
import Layout from "../components/Layout"
import Section from "../components/Section"
import NavigationBar from "../components/NavigationBar"


function Services() {
  return (
    <Layout>
      <Section cNames="bg-blue text-tomato h-screen">
        <NavigationBar />
      </Section>
    </Layout>
  )
}

export default Services;