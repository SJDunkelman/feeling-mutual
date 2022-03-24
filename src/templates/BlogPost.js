import React from "react";
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from "../components/Layout";
import NavigationBar from "../components/NavigationBar";
import ProfilePicture from "../components/ProfilePicture";
import Section from "../components/Section"
import { Link } from "gatsby";
import Img from 'gatsby-image';


const BlogPost = ({ pageContext }) => {
  const { blogTitle, blogCategory, blogDate, featureImage, imageAlt, body } = pageContext;

  function getDateString(date) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let pattern = /(\d{2})-(\d{2})-(\d{4})/;
    let dateStr = date.toString();
    let processedDate = new Date(dateStr.replace(pattern, '$3-$2-$1'));
    return months[processedDate.getMonth()] + " " + processedDate.getFullYear()
  }

  const processedDate = getDateString(blogDate);

  return (
    <Layout>
      <Section>
        <NavigationBar />
        <div className="flex mobile-only:flex-col flex-row">
          <div className="w-full lg:w-1/2">
            <div className="flex flex-wrap mb-6 lg:pt-10 md:flex-col">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center justify-center text-xs text-gray-500 font-semibold">
                  <Link to="/">Home</Link>
                  <span className="inline-block px-1">/</span>
                  <Link to="/articles">Blog</Link>
                  <span className="inline-block px-1">/</span>
                  <Link to="#">{blogCategory}</Link>
                </div>
              </div>
              <h1 className="mb-10 text-4xl font-semibold text-center lg:text-left">{blogTitle}</h1>
              <div className="flex items-center justify-center">
                <div className="mr-6">
                  <ProfilePicture />
                </div>
                <div className="text-left">
                  <h3 className="mb-2 text-2xl font-semibold font-heading">Simon Dunkelman</h3>
                  <p className="text-gray-500">{processedDate}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 lg:mt-20 lg:pl-8">
            <Img fixed={featureImage} alt={imageAlt} />
          </div>
        </div>

        <div className="py-10">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto">
              <div className="prose">
                <MDXRenderer>{body}</MDXRenderer>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

export default BlogPost;