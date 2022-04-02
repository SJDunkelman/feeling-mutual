import React from "react"
import Section from "../components/Section"
import NavigationBar from "../components/NavigationBar"
import Layout from "../components/Layout"
import { graphql, useStaticQuery } from "gatsby"
import Footer from "../components/Footer"
import NewsletterSignup from "../components/NewsletterSignup"
import BlogIndex from "../components/BlogIndex"

function Blog(){
  const articleData = useStaticQuery(graphql `
  query BlogPosts {
    data: allMarkdownRemark {
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
      <Section cNames="bg-offwhite">
        <NavigationBar logoColour="maroon" />
        <BlogIndex posts={allBlogPosts} />
      </Section>
      <Section cNames="bg-maroon py-6">
        <NewsletterSignup textColour="offwhite" />
        <Footer textColour="offwhite" />
      </Section>
    </Layout>
  )
}

export default Blog;