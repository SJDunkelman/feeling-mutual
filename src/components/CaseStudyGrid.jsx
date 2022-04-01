import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const CaseStudyGrid = (props) => {
  const featuredCaseStudies = useStaticQuery(graphql`
    query FeaturedPosts {
      data: allFile(
        filter: {sourceInstanceName: {eq: "featured-posts"}, extension: {eq: "md"}}
      ) {
        nodes {
          childMarkdownRemark {
            frontmatter {
              showcaseTitle
              subCategory
              showcaseImage {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `)

  let caseStudyElements = featuredCaseStudies.data.nodes.map(function(study) {
    return (
      <Link to="/">
        <div className="group mobile-only:flex mobile-only:flex-col px-4 mobile-only:mb-12 text-center sm:relative sm:py-2 w-full h-auto lg:w-80">
          <div className="flex items-center justify-center w-full h-40 lg:group-hover:hidden mobile-only:mb-8">
            <GatsbyImage image={study.childMarkdownRemark.frontmatter.showcaseImage.childImageSharp.gatsbyImageData} className="object-fit w-full h-auto" />
          </div>
          <div className="flex mobile-only:flex-col mobile-only:items-center mobile-only:space-y-4 md:hidden md:group-hover:block md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full text-sandybrown">
            <h2 className="hidden lg:block text-sandybrown font-bold text-3xl">{study.childMarkdownRemark.frontmatter.showcaseTitle}</h2>
            <p className="font-semibold text-lg">Read the {study.childMarkdownRemark.frontmatter.subCategory} Case Study <i className="fa-solid fa-arrow-right-long" /></p>
          </div>
        </div>
      </Link>
        )
  });

  return (
    <div className="lg:flex lg:justify-center w-full items-center">
      <div className="flex flex-col justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-3 sm:gap-x-16 sm:gap-y-16 py-12">
        {caseStudyElements}
      </div>
    </div>
  )
}

export default CaseStudyGrid;