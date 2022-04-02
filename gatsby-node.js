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

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    {
    uniqueCategories: allMarkdownRemark {
      distinct(field: frontmatter___category)
    }
    article: allMarkdownRemark(
      filter: {frontmatter: {category: {eq: "article"}}}) {
      nodes {
        fields {
          slug
        }
        frontmatter{
          title
          description
          date
          showcaseImage {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
    
    caseStudy: allMarkdownRemark(
      filter: {frontmatter: {category: {eq: "case-study"}}}) {
      nodes {
        fields {
          slug
        }
        frontmatter{
          title
          description
          date
          showcaseImage {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
    
    training: allMarkdownRemark(
      filter: {frontmatter: {category: {eq: "training"}}}) {
      nodes {
        fields {
          slug
        }
        frontmatter{
          title
          description
          date
          showcaseImage {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
  `);

  if (result.errors) {
    reporter.panic("failed to create posts ", result.errors);
  }

  const categories = result.data.uniqueCategories.distinct;

  const CategoryPageData = [
    {
      title: 'Articles',
      upperHeading: 'Lorem',
      subHeading: 'Lorem ipsum subheading',
      posts: result.data.article.nodes,
    },
    {
      title: 'Case Studies',
      upperHeading: 'Lorem',
      subHeading: 'Lorem ipsum subheading',
      posts: result.data.caseStudy.nodes,
    },
    {
      title: 'Training',
      upperHeading: 'Lorem',
      subHeading: 'Lorem ipsum subheading',
      posts: result.data.training.nodes,
    },
  ]

  categories.forEach((category) => {
    var categoryData;

    switch(category) {
      case "case-study":
        categoryData = CategoryPageData[1]
        break;
      case "training":
        categoryData = CategoryPageData[2]
        break;
      default:
        categoryData = CategoryPageData[0]
        break;
    }

    actions.createPage({
      path: `/category/${category}`,
      component: require.resolve("./src/templates/CategoryIndex.js"),
      context: {
        posts: categoryData.posts,
        categoryTitle: categoryData.title,
        upperHeading: categoryData.upperHeading,
        subHeading: categoryData.subHeading,
      },
    });
  });
}