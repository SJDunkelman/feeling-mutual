import { graphql, Link } from "gatsby"
import * as React from "react";
import Layout from "../../components/Layout";
import Section from "../../components/Section";
import NavigationBar from "../../components/NavigationBar"
import ProfilePicture from "../../components/ProfilePicture"

import TomProfilePic from "../../images/tom_profile.jpg";

export default function BlogPostTemplate({ data: { markdownRemark } }) {
  const { frontmatter, html } = markdownRemark;
  const articleCategory = frontmatter.category.charAt(0).toUpperCase() + frontmatter.category.slice(1);
  return (
    <Layout>
      <Section cNames="bg-maroon">
        <NavigationBar helloButton />
        <div className="flex mobile-only:flex-col flex-row py-6">
          <div className="w-full lg:w-1/2">
            <div className="flex flex-wrap mb-6 lg:pt-10 md:flex-col text-sandybrown">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center justify-center text-xs text-pink font-semibold">
                  <Link to="/">Home</Link>
                  <span className="inline-block px-1">/</span>
                  <Link to="/articles">Blog</Link>
                  <span className="inline-block px-1">/</span>
                  <Link to="#">{articleCategory}</Link>
                </div>
              </div>
              <h1 className="mb-10 text-4xl font-semibold text-center lg:text-left">{frontmatter.title}</h1>
              <div className="flex items-center justify-center">
                <div className="mr-6">
                  <ProfilePicture imageSrc={TomProfilePic} />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-semibold font-heading">Tom Woodnutt</h3>
                  <p className="opacity-75 font-light">Founder, Feeling Mutual</p>
                  <p className="font-extralight">{frontmatter.date}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 lg:mt-20 lg:pl-8 bg-black">
            {/*<Img fixed={featureImage} alt={imageAlt} />*/}
          </div>
        </div>
      </Section>
      <Section>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
      </Section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        category
        title
      }
    }
  }
`;