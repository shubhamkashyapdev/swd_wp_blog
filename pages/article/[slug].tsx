import { gql } from '@apollo/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import client from '../../apollo-client'

const Article = ({ post: { title, author, content, excerpt, featuredImage, id } }) => {
    return (
        <>
            <div style={{ fontSize: 32, fontWeight: 'bold', margin: "20px 0px" }} className="text-3xl font-bold">{title}</div>
            <div style={{ border: "2px solid purple", padding: 12, borderRadius: 12, margin: 30 }}>

                <div dangerouslySetInnerHTML={{ __html: excerpt }} />
            </div>
            <div style={{ padding: 30 }}>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </>
    )
}



export const getStaticProps: GetStaticProps = async (context) => {
    const slug = context.params.slug;
    console.log({ slug })
    const { data } = await client.query({
        query: gql`
        query getPosts($slug: ID!) {
            post(idType:SLUG, id: $slug) {
                id
                title
                excerpt
                content
                author {
                  node {
                    name
                  }
                }
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }    
        }
        }
        `,
        variables: {
            slug,
        }

    })
    return {
        props: { post: data.post },

    }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    const { data } = await client.query({
        query: gql`
        query {
            posts {
         nodes {
          slug
         }
       }
        }
         `
    })
    const slugs = data?.posts?.nodes;
    const slugParams = slugs.map(item => {
        return { params: { slug: item.slug } }
    })
    return {
        fallback: 'blocking',
        paths: slugParams,
    }
}

export default Article