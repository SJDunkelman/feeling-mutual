import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const CaseStudyGrid = (props) => {
  const featuredCaseStudies = useStaticQuery(graphql`
    query FeaturedPosts {
    data: allMdx {
      nodes {
        frontmatter {
          showcaseTitle
          showcaseDesc
          showcaseImage {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }`)

  let caseStudyElements = featuredCaseStudies.data.nodes.map(function(study) {
    return (
      <Link to="/">
        <div className="group relative py-6 px-4 text-center w-60 h-40">
          <div className="flex items-center justify-center w-60 h-40 group-hover:hidden">
            <GatsbyImage image={study.frontmatter.showcaseImage.childImageSharp.gatsbyImageData} className="object-fit w-full h-auto" />
          </div>
          <div className="hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-gold">
            <h2 className="text-maroon font-bold text-3xl">{study.frontmatter.showcaseTitle}</h2>
            <p className="font-light text-lg">{study.frontmatter.showcaseDesc}</p>
            <p className="font-semibold text-sm">Read More <i className="fa-solid fa-arrow-right-long" /></p>
          </div>
        </div>
      </Link>
        )
  });

  return (
    <div className="grid grid-cols-3 gap-x-16 gap-y-16 py-12">
      {caseStudyElements}
    </div>
  )
}

export default CaseStudyGrid;