import React from "react"
import styles from "../styles/Article.module.css"
import ArticleItem from "./ArticleItem"

const ArticleList = ({ articles }) => {
  return (
    <div className={styles.grid}>
      {articles.map((article, index) => (
        <React.Fragment key={`article-item${index}`}>
          <ArticleItem {...article} index={index} />
        </React.Fragment>
      ))}
    </div>
  )
}

export default ArticleList
