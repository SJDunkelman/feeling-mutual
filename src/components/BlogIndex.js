import React, { useEffect, useState } from "react"
import BlogPostCard from "./BlogPostCard"
import BlogTagPills from "./BlogTagPills"

export default function BlogIndex({posts, title, upperHeading, subHeading}) {
  const [list, setList] = useState([...posts.slice(0, 6)])
  const [loadMore, setLoadMore] = useState(false)
  const [hasMore, setHasMore] = useState(posts.length > 6)

  // Load more button click
  const handleLoadMore = () => {
    setLoadMore(true)
  }

  // Handle loading more articles
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < posts.length
      const nextResults = isMore
        ? posts.slice(currentLength, currentLength + 6)
        : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore]) //eslint-disable-line

  //Check if there is more
  useEffect(() => {
    const isMore = list.length < posts.length
    setHasMore(isMore)
  }, [list]) //eslint-disable-line

  let articleCards = list.map(function(article, i) {
    return <BlogPostCard post={article.frontmatter} slug={article.fields.slug} />
  })

  return (
    <>
      <div className="container px-4">
        <div className="max-w-2xl mx-auto mb-12 text-center text-maroon">
          <span className="text-sm text-blue uppercase">{upperHeading}</span>
          <h2 className="mt-2 mb-4 text-4xl lg:text-5xl font-bold font-heading">{title}</h2>
          <p className="text-lg leading-loose">{subHeading}</p>
        </div>
        <div className="py-4">
          <BlogTagPills />
        </div>

        <div className="lg:flex lg:justify-center w-full items-center">
          <div className="flex flex-col justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-3 sm:gap-x-16 xl:gap-y-40">
            {articleCards}
          </div>
        </div>

        {/*<div className="grid grid-cols-3 gap-6 mx-4 mb-4">*/}
        {/*  {articleCards}*/}
        {/*</div>*/}
      </div>

      <div className="flex justify-center pt-4 pb-4 xl:mt-20">
        {hasMore ? (
          <button className="flex rounded-lg py-2 px-4 whitespace-nowrap bg-maroon text-white hover:bg-maroon/[0.75]" onClick={handleLoadMore}>Load More</button>
        ) : (
          <p>No more results</p>
        )}
      </div>
    </>
  )
}

BlogIndex.defaultProps = {
  upperHeading: 'Articles',
  title: 'Thinking',
  subHeading: 'The latest insights in Qual Research'
}