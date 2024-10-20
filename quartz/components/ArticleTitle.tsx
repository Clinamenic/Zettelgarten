import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface ArticleTitleOptions {
  showTitle?: (frontmatter: Frontmatter) => boolean
}

interface Frontmatter {
  title?: string
  hideTitle?: boolean
  // ... other frontmatter properties
}

const defaultOptions: ArticleTitleOptions = {
  showTitle: (frontmatter: Frontmatter) => !frontmatter.hideTitle,
}

export default ((opts?: ArticleTitleOptions) => {
  const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const showTitle = opts?.showTitle ?? defaultOptions.showTitle
    const title = fileData.frontmatter?.title

    if (!showTitle || !showTitle(fileData.frontmatter) || !title) {
      return null
    }

    return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
  }

  ArticleTitle.css = `
  .article-title {
    padding: 2rem 0rem 1rem 0rem;
    margin-top: 0rem;
    text-align: center;
  }
  `


  return ArticleTitle
}) satisfies QuartzComponentConstructor