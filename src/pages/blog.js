import React from "react"
import Section from "../components/Section"
import NavigationBar from "../components/NavigationBar"
import Layout from "../components/Layout"
import { graphql, useStaticQuery } from "gatsby"
import Footer from "../components/Footer"
import GetInTouch from "../components/GetInTouch"
import BlogIndex from "../components/BlogIndex"

function Blog(){
  const articleData = useStaticQuery(graphql `
  query BlogPosts {
    data: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        frontmatter {
          title
          description
          date
          showcaseImage {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        fields {
          slug
        }
      }
    }
  }`)

  const allBlogPosts = articleData.data.nodes

  return (
    <Layout>
      <Section cNames="bg-offwhite py-6 xl:py-16">
        <NavigationBar logoColour="maroon" />
        <BlogIndex posts={allBlogPosts} />
      </Section>
      <Section cNames="bg-maroon py-6">
        <GetInTouch textColour="offwhite" />
        <Footer textColour="offwhite" />
      </Section>
    </Layout>
  )
}

export default Blog;