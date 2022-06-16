import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

export default function BlogPostCard(props){
  const containerClasses = `w-full h-[30rem] px-2 my-4`

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

  var truncatedDesc;
  if (props.post.description.length > 50) {
    truncatedDesc = props.post.description.slice(0,50) + "...";
  } else {
    truncatedDesc = props.post.description;
  }


  return (
      <div className={containerClasses}>
        <Link to={`/blog${props.slug}`}>
          <div className="flex flex-col justify-between space-y-4 h-full">
            <div className="h-full flex justify-center items-center">
              <div className="w-full overflow-clip">
                <GatsbyImage className={`object-cover w-full h-auto rounded-lg`} alt="Article" image={props.post.showcaseImage.childImageSharp.gatsbyImageData} />
              </div>
            </div>
            <div className="h-content">
              <span className="text-xs font-bold text-gray-500">{processedDate}</span>
              <h2 className="text-2xl font-bold font-heading">{props.post.title}</h2>
              <p className="text-lg text-gray-500 leading-loose overflow-hidden max-h-32">{truncatedDesc}</p>
              <div className="flex items-center">
                <span>Read More</span>
                <span>
                  <svg className="ml-1 w-5 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
              </span>
              </div>
            </div>
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