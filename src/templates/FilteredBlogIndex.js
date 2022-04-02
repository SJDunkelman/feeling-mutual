import React from "react"
import Section from "../components/Section"
import NavigationBar from "../components/NavigationBar"
import Layout from "../components/Layout"
import Footer from "../components/Footer"
import NewsletterSignup from "../components/NewsletterSignup"
import BlogIndex from "../components/BlogIndex"

const FilteredBlogIndex = ({
        pageContext: { tag },
        data: { allMarkdownRemark },
      }) => (
    <Layout>
      <Section cNames="bg-offwhite">
        <NavigationBar logoColour="maroon" />
        <BlogIndex posts={allMarkdownRemark.edges} title={tag} />
      </Section>
      <Section cNames="bg-maroon py-6">
        <NewsletterSignup textColour="offwhite" />
        <Footer textColour="offwhite" />
      </Section>
    </Layout>
)

export const query = graphql`
  query TagListQuery($ids: [String]!) {
    allMarkdownRemark(filter: { id: { in: $ids } }) {
      edges {
        node {
          frontmatter {
            title
            description
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default FilteredBlogIndex;