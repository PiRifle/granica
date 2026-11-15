import { findPanelOverflow, intersectionArea } from './layoutDiagnostics'

export type SolutionLayoutIssue = {
  id: string
  kind: 'SVG / tekst' | 'tekst / tekst' | 'HTML / SVG' | 'panel / overflow'
  message: string
  rect: { left: number; top: number; width: number; height: number }
}

function visible(element: Element) {
  const style = getComputedStyle(element)
  const rect = element.getBoundingClientRect()
  const hasArea =
    element.tagName.toLowerCase() === 'text' ? rect.width > 0 && rect.height > 0 : rect.width > 0 || rect.height > 0
  return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0.05 && hasArea
}

function collisionRect(element: Element) {
  const rect = element.getBoundingClientRect()
  const strokeWidth = Number.parseFloat(getComputedStyle(element).strokeWidth) || 0
  const expandX = rect.width === 0 ? strokeWidth / 2 : 0
  const expandY = rect.height === 0 ? strokeWidth / 2 : 0
  return new DOMRect(rect.left - expandX, rect.top - expandY, rect.width + expandX * 2, rect.height + expandY * 2)
}

function label(element: Element) {
  return element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 70) || element.tagName.toLowerCase()
}

function staticLayoutElement(element: Element) {
  return !element.closest('[data-three-label]')
}

export function scanSolutionLayout(target: HTMLElement) {
  const targetRect = target.getBoundingClientRect()
  const found: SolutionLayoutIssue[] = []
  const add = (issue: Omit<SolutionLayoutIssue, 'id' | 'rect'>, rect: DOMRect) => {
    if (found.length >= 40 || found.some((entry) => entry.kind === issue.kind && entry.message === issue.message))
      return
    found.push({
      ...issue,
      id: `issue-${found.length + 1}`,
      rect: {
        left: rect.left - targetRect.left - 3,
        top: rect.top - targetRect.top - 3,
        width: rect.width + 6,
        height: rect.height + 6,
      },
    })
  }

  const sceneBadge = target.querySelector('[data-solution-scene-count]')
  const svgElements = Array.from(target.querySelectorAll('[data-solution-visual] svg'))
  const texts = svgElements.flatMap((svg) =>
    Array.from(svg.querySelectorAll('text')).filter((element) => staticLayoutElement(element) && visible(element)),
  )

  if (sceneBadge && visible(sceneBadge)) {
    const badgeRect = sceneBadge.getBoundingClientRect()
    for (const text of texts) {
      if (intersectionArea(badgeRect, text.getBoundingClientRect()) > 1) {
        add(
          { kind: 'HTML / SVG', message: `Licznik sceny nachodzi na „${label(text)}”.` },
          text.getBoundingClientRect(),
        )
      }
    }
  }

  for (const panel of target.querySelectorAll('[data-solution-copy]')) {
    for (const element of findPanelOverflow(panel)) {
      add(
        { kind: 'panel / overflow', message: `Treść prawego panelu wychodzi poza obszar: ${label(element)}.` },
        element.getBoundingClientRect(),
      )
    }
  }

  for (let first = 0; first < texts.length; first += 1) {
    const firstRect = texts[first].getBoundingClientRect()
    for (let second = first + 1; second < texts.length; second += 1) {
      const secondRect = texts[second].getBoundingClientRect()
      if (intersectionArea(firstRect, secondRect) > 2) {
        add(
          { kind: 'tekst / tekst', message: `„${label(texts[first])}” zachodzi na „${label(texts[second])}”.` },
          firstRect,
        )
      }
    }
  }

  for (const svg of svgElements) {
    const elements = Array.from(
      svg.querySelectorAll('text, line, path, rect, circle, ellipse, polyline, polygon'),
    ).filter((element) => !element.closest('defs') && staticLayoutElement(element) && visible(element))
    elements.forEach((element, index) => {
      if (element.tagName.toLowerCase() !== 'text') return
      const textRect = element.getBoundingClientRect()
      const textArea = Math.max(1, textRect.width * textRect.height)
      for (const shape of elements.slice(index + 1)) {
        if (shape.tagName.toLowerCase() === 'text' || shape.contains(element)) continue
        const shapeRect = collisionRect(shape)
        const overlap = intersectionArea(textRect, shapeRect)
        const isStroke = ['line', 'polyline'].includes(shape.tagName.toLowerCase())
        if (overlap > 2 && (isStroke || overlap / textArea > 0.18)) {
          add(
            { kind: 'SVG / tekst', message: `${shape.tagName.toLowerCase()} może zasłaniać „${label(element)}”.` },
            textRect,
          )
        }
      }
    })
  }

  return found
}
