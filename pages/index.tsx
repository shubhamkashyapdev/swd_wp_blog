import Head from "next/head"
import { gql } from "@apollo/client";
import client from "../apollo-client";
import ArticleList from "../components/ArticleList"

export default function Home({ articles = [] }) {
  return (
    <div>
      <Head>
        <title>WebDev News</title>
        <meta
          name="keywords"
          content="web development, programming, development"
        />
      </Head>
      <h1>Welcome To Next.js World!</h1>
      <ArticleList articles={articles} />
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
    query articles {
      posts {
    nodes {
      slug
      featuredImage {
        node {
          id
          mediaItemUrl
        }
      }
      title
      excerpt
      author {
				node {
          id
          name
        }
      }
    }
  }
    }`
  });

  return {
    props: {
      articles: data.posts.nodes,
    },
  };
}
