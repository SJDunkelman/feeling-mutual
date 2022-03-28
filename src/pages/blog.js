import React, { useState, useEffect }  from "react"
import Section from "../components/Section"
import NavigationBar from "../components/NavigationBar"
import Layout from "../components/Layout"
import { graphql, useStaticQuery } from "gatsby"
import BlogPostCard from "../components/BlogPostCard"
import Footer from "../components/Footer"
import NewsletterSignup from "../components/NewsletterSignup"

function Blog(){
  const articleData = useStaticQuery(graphql `
    query BlogPosts {
      data: allFile(filter: {sourceInstanceName: {eq: "blog-posts"}}) {
        nodes {
          childMarkdownRemark {
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
  `)

  const allBlogPosts = articleData.data.nodes

  const [list, setList] = useState([...allBlogPosts.slice(0, 5)])
  const [loadMore, setLoadMore] = useState(false)
  const [hasMore, setHasMore] = useState(allBlogPosts.length > 5)

  // Load more button click
  const handleLoadMore = () => {
    setLoadMore(true)
  }

  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allBlogPosts.length
      const nextResults = isMore
        ? allBlogPosts.slice(currentLength, currentLength + 5)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < allBlogPosts.length
    setHasMore(isMore)
  }, [list]) //eslint-disable-line

  let articleCards = list.map(function(article, i) {
    if (i % 5 === 0) {
      return <BlogPostCard wide post={article.childMarkdownRemark.frontmatter} slug={article.childMarkdownRemark.fields.slug} />
    }
    return <BlogPostCard post={article.childMarkdownRemark.frontmatter} slug={article.childMarkdownRemark.fields.slug} />
  })

  return (
    <Layout>
      <Section cNames="bg-offwhite">
        <NavigationBar logoColour="maroon" />
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto mb-12 text-center text-maroon">
            <span className="text-sm text-blue uppercase">Lorem ipsum</span>
            <h2 className="mt-2 mb-4 text-4xl lg:text-5xl font-bold font-heading">Insights</h2>
            <p className="text-lg leading-loose">Subheading</p>
          </div>
          <div className="flex flex-wrap -mx-4 -mb-4">
            {articleCards}
          </div>
        </div>

        <div className="flex justify-center pt-4 pb-16">
          {hasMore ? (
            <button className="flex rounded-lg py-2 px-4 whitespace-nowrap bg-maroon text-white hover:bg-maroon/[0.75]" onClick={handleLoadMore}>Load More</button>
          ) : (
            <p>No more results</p>
          )}
        </div>
      </Section>
      <Section cNames="bg-maroon py-6">
        <NewsletterSignup textColour="offwhite" />
        <Footer textColour="offwhite" />
      </Section>
    </Layout>
  )
}

export default Blog;