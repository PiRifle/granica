export function intersectionArea(a: DOMRect, b: DOMRect) {
  const width = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left))
  const height = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
  return width * height
}

export function isRectOverflow(parent: DOMRect, child: DOMRect, tolerance = 1) {
  return (
    child.left < parent.left - tolerance ||
    child.right > parent.right + tolerance ||
    child.top < parent.top - tolerance ||
    child.bottom > parent.bottom + tolerance
  )
}

export function findPanelOverflow(panel: Element) {
  const panelRect = panel.getBoundingClientRect()
  if (panel.scrollWidth > panel.clientWidth + 1) return [panel]
  const content = Array.from(
    panel.querySelectorAll('p, [data-math-values], [data-solution-derivation], [data-math-current], [data-math-value]'),
  )
  return content.filter((element) => {
    const style = getComputedStyle(element)
    if (style.display === 'none' || style.visibility === 'hidden') return false
    const rect = element.getBoundingClientRect()
    return rect.width > 0 && rect.height > 0 && isRectOverflow(panelRect, rect)
  })
}
