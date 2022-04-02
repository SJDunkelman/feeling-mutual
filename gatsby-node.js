const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `src/content` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

function dedupeTags(allMarkdownRemark) {
  const uniqueTags = new Set()
  // Iterate over all articles
  allMarkdownRemark.edges.forEach(({ node }) => {
    // Iterate over each category in an article
    node.frontmatter.tags.forEach(tag => {
      uniqueTags.add(tag)
    })
  })
  // Create new array with duplicates removed
  return Array.from(uniqueTags)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Query markdown files including data from frontmatter
  const {
    data: { allMarkdownRemark },
  } = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node{
          id
          frontmatter {
            title
            description
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
  `)

  const posts = allMarkdownRemark.edges;
  const uniqueCategories = [...new Set(posts.map(function({ node }) {
    return node.frontmatter.category;
  }))];

  // Create array of every category without duplicates
  const uniqueTags = dedupeTags(allMarkdownRemark)
  // Iterate over categories and create page for each
  uniqueTags.forEach(tag => {
    reporter.info(`Creating page: tag/${tag}`)
    createPage({
      path: `category/${tag}`,
      component: require.resolve("./src/templates/CategoryList.js"),
      // Create props for our CategoryList.js component
      context: {
        tag,
        // Create an array of ids of articles in this category
        ids: allMarkdownRemark.edges
          .filter(({ node }) => {
            return node.frontmatter.categories.includes(tag)
          })
          .map(({node}) => node.id),
      },
    })
  })
}