import React, { useEffect, useState } from "react"
import Section from "../components/Section"
import NavigationBar from "../components/NavigationBar"
import NewsletterSignup from "../components/NewsletterSignup"
import Footer from "../components/Footer"
import Layout from "../components/Layout"
import { graphql, useStaticQuery } from "gatsby"
import BlogPostCard from "../components/BlogPostCard"
import BlogReviewCard from "../components/BlogReviewCard"

export default function CaseStudies(){
  const caseStudyData = useStaticQuery(graphql `
    query CaseStudyAndReviews {
    reviews: allFile(
      filter: {sourceInstanceName: {eq: "reviews"}, extension: {eq: "md"}}) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            name
            headline
            subheading
            company
            jobRole
            profileImage {
              childImageSharp {
                 gatsbyImageData
              }
            }
          }
        }
      }
    }
    caseStudies: allMarkdownRemark(
      filter: {frontmatter: {category: {eq: "case-study"}}}) {
      nodes {
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
  `)

  const allCaseStudies = caseStudyData.caseStudies.nodes
  const allReviews = caseStudyData.reviews.nodes

  const [list, setList] = useState([...allCaseStudies.slice(0, 5)])
  const [loadMore, setLoadMore] = useState(false)
  const [hasMore, setHasMore] = useState(allCaseStudies.length > 5)

  // Load more button click
  const handleLoadMore = () => {
    setLoadMore(true)
  }

  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allCaseStudies.length
      const nextResults = isMore
        ? allCaseStudies.slice(currentLength, currentLength + 5)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < allCaseStudies.length
    setHasMore(isMore)
  }, [list]) //eslint-disable-line


  let reviewCounter = 0;
  let articleCards = list.map(function(article, i) {
    if (i % 5 === 0) {
      return <BlogPostCard wide post={article.frontmatter} slug={article.fields.slug} key={i} />
    }
    if (i % 5 === 1 || i % 5 === 3) {
      if (reviewCounter < allReviews.length) {
        let review = allReviews[reviewCounter];
        reviewCounter += 1;
        // console.log(review);
        return <BlogReviewCard review={review.childMarkdownRemark.frontmatter} key={i} />
      }
      else {
        return <BlogPostCard post={article.frontmatter} slug={article.fields.slug} key={i} />
      }
    }
    else{
      return <BlogPostCard post={article.frontmatter} slug={article.fields.slug} />
    }
  })

  articleCards = articleCards.slice(0,5);

  return (
    <Layout>
      <Section cNames="bg-offwhite">
        <NavigationBar logoColour="maroon" />
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto mb-12 text-center text-maroon">
            <span className="text-sm text-blue uppercase">Lorem ipsum</span>
            <h2 className="mt-2 mb-4 text-4xl lg:text-5xl font-bold font-heading">Our Clients</h2>
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
        <NewsletterSignup textColour="offwhite" emailTextColour="white" emailBorderColour="gold" signUpButtonColour="red" />
        <Footer textColour="offwhite" />
      </Section>
    </Layout>
  )
}