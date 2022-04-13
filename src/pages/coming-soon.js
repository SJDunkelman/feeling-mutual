import React from "react"
import NavigationBar from "../components/NavigationBar"
import Layout from "../components/Layout"
import Section from "../components/Section"
import NewsletterSignup from "../components/NewsletterSignup"
import Footer from "../components/Footer"

export default function ComingSoon(){
  return (
    <Layout>
      <Section cNames="bg-green text-tomato pb-12">
        <NavigationBar logoColour="pink" helloButton helloBg="pink" helloText="tomato" />
        <NewsletterSignup textColour="tomato" headline="Coming Soon!" subheading="Get notified when we release the latest content for Online Qual Research" />
        <Footer textColour="tomato" />
      </Section>
    </Layout>
  )
}