module.exports = {
  siteMetadata: {
    title: `Feeling Mutual`,
    description: `Insert description.`,
    author: `Simon Dunkelman`,
    siteUrl: `https://www.feelingmutual.com/`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-netlify-cms'
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `featured-posts`,
        path: `${__dirname}/content/featured-case-studies`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog-posts`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        // defaultLayout: require.resolve('./src/templates/BlogPost.js'),
      },
    },
    'gatsby-plugin-postcss',
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Neue Haas Unica"],
          urls: ["/fonts/fonts.css"],
        },
      },
    },
  ],
}
