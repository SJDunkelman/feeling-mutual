import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import sonyImage from "/src/content/featured-case-studies/sony/brand.png";
import easyJetImage from "/src/content/featured-case-studies/easy-jet/brand.png";
import boxPlusImage from "/src/content/featured-case-studies/box-plus/brand.png";
import setAppImage from "/src/content/featured-case-studies/set-app/brand.png";
import swingersImage from "/src/content/featured-case-studies/swingers/brand.png";
import virginPureImage from "/src/content/featured-case-studies/virgin-pure/brand.png";

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

  // const brandData = {
  //   'Sony': [sonyImage, "A short description on the case"],
  //   // 'easy'
  // }

  function renderGridCell(brandName, desc) {     // , imageSrc
    return (
    // <Link to={`/${props.slug}`}>
    <Link to="/">
      <div className="group flex flex-col items-center py-6 px-4 text-white relative">
        {/*<Img className="object-cover min-h-20 min-w-20 group-hover:opacity-50" fluid={imageSrc.fluid} alt={`Brand logo for ${brandName}`} />*/}
        {/*<img className="object-cover h-auto w-32 group-hover:opacity-0" src={imageSrc} alt="Brand Logo" />*/}
        <h2 className="opacity-0 hover:opacity-100 absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 text-4xl text-blue tracking-wider font-bold">{brandName}</h2>
        <p className="hidden hover:block font-light">{desc}</p>
      </div>
    </Link>)
  }

  console.log(featuredCaseStudies.data.nodes);

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
  // for (let i = 0; i < brandData; i++) {
  //   let node = featuredCaseStudies.data.nodes[i];
  //   gridCells.push(renderGridCell(node.frontmatter.showcaseTitle, node.frontmatter.showcaseDesc, node.frontmatter.showcaseImage.childImageSharp));
  // }

  // for (const [key, value] of Object.entries(brandData)) {
  //   gridCells.push(renderGridCell(key, value[1], value[0]));
  // }

  return (
    <div className="grid grid-cols-3 gap-x-16 gap-y-16 py-12">
      {caseStudyElements}
    </div>
  )
}

export default CaseStudyGrid;