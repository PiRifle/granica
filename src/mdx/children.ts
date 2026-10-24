import { Children, isValidElement } from 'react'
import type { ReactNode } from 'react'

export function inline(node: ReactNode): ReactNode {
  const children = Children.toArray(node)
  if (children.length === 1 && isValidElement<{ children?: ReactNode }>(children[0]) && children[0].type === 'p') {
    return children[0].props.children
  }
  return node
}
