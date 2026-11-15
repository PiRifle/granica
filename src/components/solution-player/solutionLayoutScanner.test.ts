import { describe, expect, it } from 'vitest'
import { scanSolutionLayout } from './solutionLayoutScanner'

function rect(left: number, top: number, width: number, height: number): DOMRect {
  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => ({}),
  }
}

function fixture() {
  const target = document.createElement('div')
  const visual = document.createElement('div')
  visual.setAttribute('data-solution-visual', '')
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  visual.append(svg)
  target.append(visual)
  document.body.append(target)
  Object.defineProperty(target, 'getBoundingClientRect', { value: () => rect(0, 0, 500, 400) })
  return { target, svg }
}

function svgText(svg: SVGSVGElement, value: string, dynamic = false) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  element.textContent = value
  element.style.opacity = '1'
  if (dynamic) element.setAttribute('data-three-label', value)
  Object.defineProperty(element, 'getBoundingClientRect', { value: () => rect(20, 20, 100, 20) })
  svg.append(element)
  return element
}

describe('kolizje elementów statycznych i Three.js', () => {
  it('pomija rzutowane etykiety Three.js przy kolizjach z elementami statycznymi', () => {
    const { target, svg } = fixture()
    svgText(svg, 'B', true)
    svgText(svg, 'A_z', true)
    const shape = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    shape.style.opacity = '1'
    Object.defineProperty(shape, 'getBoundingClientRect', { value: () => rect(20, 20, 100, 20) })
    svg.append(shape)

    expect(scanSolutionLayout(target)).toEqual([])
    target.remove()
  })

  it('nadal zgłasza kolizje między statycznymi etykietami i kształtami', () => {
    const { target, svg } = fixture()
    svgText(svg, 'B', true)
    svgText(svg, 'Kontrola')
    svgText(svg, 'ΣF = 0')
    const shape = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    shape.style.opacity = '1'
    Object.defineProperty(shape, 'getBoundingClientRect', { value: () => rect(20, 20, 100, 20) })
    svg.append(shape)

    const issues = scanSolutionLayout(target)
    expect(issues.some((issue) => issue.kind === 'tekst / tekst')).toBe(true)
    expect(issues.some((issue) => issue.kind === 'SVG / tekst')).toBe(true)
    expect(issues.every((issue) => !issue.message.includes('„B”'))).toBe(true)
    target.remove()
  })
})
