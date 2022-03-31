import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

export default function BlogPostCard(props){
  const containerClasses = `w-full ${props.wide ? 'lg:w-2/3' : 'lg:w-1/3'} px-4 mb-12`

  function getDateString(date) {
    if (date === null) {
      // console.log(date);
      return "Coming Soon"
    }
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let pattern = /(\d{2})-(\d{2})-(\d{4})/;
    let dateStr = date.toString();
    let processedDate = new Date(dateStr.replace(pattern, '$3-$2-$1'));
    return months[processedDate.getMonth()] + " " + processedDate.getFullYear()
  }

  const processedDate = getDateString(props.post.date)

  return (
      <div className={containerClasses}>
        <Link to={`/blog${props.slug}`}>
          <div className="flex h-96 mb-6">
            <div className="w-full h-full bg-black rounded-lg" />
          </div>
          <span className="text-xs font-bold text-gray-500">{processedDate}</span>
          <h2 className="mb-2 text-3xl font-bold font-heading">{props.post.title}</h2>
          <p className="mb-4 text-lg text-gray-500 leading-loose">{props.post.description}</p>

            <div className="flex items-center">
              <span>Read More</span>
              <span>
              <svg className="ml-1 w-5 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
            </div>
        </Link>
      </div>
  )
}

BlogPostCard.defaultProps = {
  wide: false,
  title: "Coming Soon",
  date: "10 jun 2020 19:40",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan aliquet orci."
}