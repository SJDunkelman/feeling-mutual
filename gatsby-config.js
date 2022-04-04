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
    `gatsby-plugin-mailgo`,
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
        path: `${__dirname}/src/content/featured-case-studies`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog-posts`,
        path: `${__dirname}/src/content/blog`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `reviews`,
        path: `${__dirname}/src/content/reviews`,
      },
    },
    `gatsby-remark-images`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 800,
            },
          },
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                "heading[depth=1]": "text-2xl",
                "heading[depth=2]": "text-xl",
                "paragraph": "text-base"
              }
            }
          },
        ],
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
    {
      resolve: `gatsby-plugin-anchor-links`,
      options: {
        offset: -100
      },
    },
  ],
}
