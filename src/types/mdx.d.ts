declare module '*.mdx' {
  import type { MDXContent } from 'mdx/types.js'
  const Content: MDXContent
  export default Content
}
