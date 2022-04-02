import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

function Tag(props) {
  let tagClasses = `rounded-full px-[0.75rem] py-[0.375rem] text-sm font-semibold max-w-fit inline-block mr-2 bg-${props.bgColour} text-${props.textColour}`;
  return (
    <div className={tagClasses}>
      {props.text}
    </div>
  )
}

export default function BlogTagPills() {
  const filterItems = useStaticQuery(graphql`
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
  const uniqueCategories = [...new Set(filterItems.allMarkdownRemark.nodes.map(function(article) {
    return article.frontmatter.category.replace('-',' ').toUpperCase();
  }))];

  function dedupeTags(allMarkdownRemark) {
    const tagSet = new Set()
    // Iterate over all articles
    allMarkdownRemark.nodes.forEach(function(node) {
      node.frontmatter.tags.forEach(function(tag) {
        tagSet.add(tag)
      })
    })
    return Array.from(tagSet)
  }

  const uniqueTags = dedupeTags(filterItems.allMarkdownRemark);

  // Render tags
  const categoryTags = uniqueCategories.map(function(category){
    return <Tag text={category} bgColour="blue" textColour="offwhite" />
  })

  const articleTags = uniqueTags.map(function(tag){
    return <Tag text={tag} bgColour="maroon" textColour="offwhite" />
  })

  const [list, setList] = useState([...articleTags.slice(0, 3)])
  const [loadMore, setLoadMore] = useState(false)
  const [hasMore, setHasMore] = useState(articleTags.length > 3)

  // Load more button click
  const handleLoadMore = () => {
    setLoadMore(!loadMore)
  }

  // Handle loading more articles
  useEffect(() => {
    if (loadMore) {
      setList(articleTags.slice(0, articleTags.length))
      setLoadMore(true);
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  // Handle loading more articles
  useEffect(() => {
    if (!loadMore) {
      setList(articleTags.slice(0, 3))
      setLoadMore(false);
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  return (
    <div className="flex w-full">
      {categoryTags}
      {list}
      <button onClick={handleLoadMore}>
        <i className={`fa-solid fa-chevron-${loadMore ? "left" : 'right'}`} />
      </button>
    </div>
  )
}