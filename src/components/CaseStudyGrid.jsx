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
        <div className="group mobile-only:flex mobile-only:flex-col px-4 mobile-only:mb-12 text-center lg:relative lg:py-2 w-full h-auto lg:w-60 lg:h-40">
          <div className="flex items-center justify-center w-60 h-40 lg:group-hover:hidden mobile-only:mb-8">
            <GatsbyImage image={study.frontmatter.showcaseImage.childImageSharp.gatsbyImageData} className="object-fit w-full h-auto" />
          </div>
          <div className="flex mobile-only:flex-col mobile-only:items-center mobile-only:space-y-2 lg:hidden lg:group-hover:block lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-full text-sandybrown">
            <h2 className="hidden lg:block text-sandybrown font-bold text-3xl">{study.frontmatter.showcaseTitle}</h2>
            <p className="font-light text-lg">{study.frontmatter.showcaseDesc}</p>
            <p className="font-semibold text-sm">Read the Case Study <i className="fa-solid fa-arrow-right-long" /></p>
          </div>
        </div>
      </Link>
        )
  });

  return (
    <div className="flex flex-col justify-center items-center lg:grid lg:grid-cols-3 lg:gap-x-16 lg:gap-y-16 py-12">
      {caseStudyElements}
    </div>
  )
}

export default CaseStudyGrid;