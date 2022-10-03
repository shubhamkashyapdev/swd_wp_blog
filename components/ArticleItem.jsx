import React from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Article.module.css"

const ArticleItem = ({ title, excerpt, slug, author, featuredImage }) => {
  const imageUrl = featuredImage?.node.mediaItemUrl
  const authorName = author.node.name
  return (
    <Link href={`/article/[id]`} as={`/article/${slug}`}>
      <a className={styles.card}>
        <div className="card bg-base-100 shadow-xl">
          <Image
            height={300}
            width={400}
            objectFit="cover"
            src={imageUrl}
            alt="Shoes"
          />
          <div className="card-body">
            <h2 className="card-title">{`${title}`.substring(0, 32)}...</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: `${excerpt}`.substring(0, 100) + "...",
              }}
            />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ArticleItem
