import React, { useEffect, useState } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

function Tag(props) {
  let tagClasses = `rounded-full whitespace-nowrap px-[0.75rem] py-[0.375rem] text-sm font-semibold max-w-fit inline-block mr-2 bg-${props.bgColour} text-${props.textColour}`;
  return (
    <div className={tagClasses}>
      {props.text}
    </div>
  )
}

export default function BlogTagPills() {
  const categoryGroups = useStaticQuery(graphql`
  {
    allMarkdownRemark {
      nodes {
        frontmatter {
          category
          tags
        }
      }
    }
  }
  `)

  // Get unique categories & tags
  const uniqueCategories = [...new Set(categoryGroups.allMarkdownRemark.nodes.map(function(article) {
    return article.frontmatter.category;
  }))];

  // Render tags
  const categoryTags = uniqueCategories.map(function(category){
    return <Link to={`/category/${category}`}><Tag text={category.replace('-',' ').toUpperCase()} bgColour="blue" textColour="offwhite" /></Link>
  })

  return (
    <div className="flex w-full">
      {categoryTags}
      {/*{list}*/}
      {/*<button onClick={handleLoadMore}>*/}
      {/*  <i className={`fa-solid fa-chevron-${loadMore ? "left" : 'right'}`} />*/}
      {/*</button>*/}
    </div>
  )
}