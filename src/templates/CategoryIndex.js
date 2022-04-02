import React from "react"
import Section from "../components/Section"
import NavigationBar from "../components/NavigationBar"
import Layout from "../components/Layout"
import { graphql, useStaticQuery } from "gatsby"
import Footer from "../components/Footer"
import NewsletterSignup from "../components/NewsletterSignup"
import BlogIndex from "../components/BlogIndex"

function CategoryIndex({pageContext}){
  const { posts, categoryTitle, upperHeading, subHeading } = pageContext;

  return (
    <Layout>
      <Section cNames="bg-offwhite">
        <NavigationBar logoColour="maroon" />
        <BlogIndex posts={posts} title={categoryTitle} subHeading={subHeading} upperHeading={upperHeading} />
      </Section>
      <Section cNames="bg-maroon py-6">
        <NewsletterSignup textColour="offwhite" />
        <Footer textColour="offwhite" />
      </Section>
    </Layout>
  )
}

export default CategoryIndex;