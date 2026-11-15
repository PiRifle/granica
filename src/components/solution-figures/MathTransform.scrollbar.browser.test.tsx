import { createRoot } from 'react-dom/client'
import { act } from 'react'
import { expect, it } from 'vitest'
import 'katex/dist/katex.min.css'
import '../../styles/global.css'
import { MathTransform } from './MathTransform'
import { SolutionPlayer } from '../SolutionPlayer'
import { workedSolutions } from '../../content/course'

Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { value: true, configurable: true })

const VALUES_FORMULA =
  'A_x=-1{,}429\\ \\mathrm{kN},\\qquad A_y=-3{,}541\\ \\mathrm{kN},\\qquad B_y=8{,}111\\ \\mathrm{kN}'
const STEPS_FORMULA = '\\sum F_x=0:\\quad A_x+2{,}8-1{,}371=0,\\qquad \\sum F_y=0:\\quad A_y-4{,}570+B_y=0'

function classicScrollbarExtent(element: HTMLElement) {
  const style = getComputedStyle(element)
  const borderX = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth)
  const borderY = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
  return {
    horizontal: Math.max(0, element.offsetHeight - borderY - element.clientHeight),
    vertical: Math.max(0, element.offsetWidth - borderX - element.clientWidth),
  }
}

async function renderForFocusWidth(element: React.ReactElement, width: number, container: HTMLElement) {
  const root = createRoot(container)
  await act(async () => {
    root.render(<div style={{ width: `${width}px` }}>{element}</div>)
  })
  await document.fonts.ready
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 60))
  })
  return root
}

it('chipy wartości: przewijanie działa, pasek ukryty', async () => {
  const container = document.createElement('div')
  document.body.append(container)
  const root = await renderForFocusWidth(<MathTransform formula={VALUES_FORMULA} progress={1} />, 150, container)
  const chips = [...container.querySelectorAll<HTMLElement>('[data-math-value]')]
  expect(chips.length).toBeGreaterThan(0)
  for (const chip of chips) {
    const style = getComputedStyle(chip)
    expect(style.overflowX, 'przewijanie poziome zachowane').toBe('auto')
    expect(style.scrollbarWidth, 'ukryty pasek przewijania').toBe('none')
    expect(classicScrollbarExtent(chip).horizontal).toBe(0)
    expect(chip.querySelectorAll('.katex').length).toBeGreaterThan(0)
    await act(async () => {
      chip.scrollLeft = 30
    })
    expect(chip.scrollLeft, 'programowe przewijanie działa').toBeGreaterThan(0)
  }
  await act(async () => root.unmount())
  container.remove()
})

it('okno PRZEKSZTAŁCENIA: przewijanie działa, pasek ukryty', async () => {
  const container = document.createElement('div')
  document.body.append(container)
  const root = await renderForFocusWidth(<MathTransform formula={STEPS_FORMULA} progress={1} />, 260, container)
  const current = container.querySelector<HTMLElement>('[data-math-current]')
  expect(current).not.toBeNull()
  const style = getComputedStyle(current!)
  expect(style.overflowX, 'przewijanie poziome zachowane').toBe('auto')
  expect(style.scrollbarWidth, 'ukryty pasek przewijania').toBe('none')
  expect(style.textOverflow).not.toBe('ellipsis')
  const extent = classicScrollbarExtent(current!)
  expect(extent.horizontal).toBe(0)
  expect(extent.vertical).toBe(0)
  expect(current!.querySelectorAll('.katex').length).toBeGreaterThan(0)
  await act(async () => root.unmount())
  container.remove()
})

async function playbackScrollbarProbe(solutionId: string, sceneIndex: number, ms: number) {
  const solution = workedSolutions.find((entry) => entry.id === solutionId)
  expect(solution, solutionId).toBeDefined()
  const container = document.createElement('div')
  document.body.append(container)
  const root = await renderForFocusWidth(
    <SolutionPlayer solution={solution!} sceneRequest={{ index: sceneIndex, token: 1 }} />,
    620,
    container,
  )
  const clickButton = (label: string) => {
    const button = [...container.querySelectorAll('button')].find(
      (candidate) => candidate.textContent?.trim() === label,
    )
    expect(button, `przycisk ${label}`).toBeDefined()
    act(() => button!.dispatchEvent(new MouseEvent('click', { bubbles: true })))
  }
  clickButton('2×')
  clickButton('Odtwarzaj')
  const stats = { max: 0, styleChecked: 0, styleOk: 0, tokens: 0 }
  const end = Date.now() + ms
  while (Date.now() < end) {
    await new Promise((resolve) => requestAnimationFrame(resolve))
    container.querySelectorAll<HTMLElement>('[data-math-current], [data-math-value]').forEach((element) => {
      const extent = classicScrollbarExtent(element)
      stats.max = Math.max(stats.max, extent.horizontal, extent.vertical)
      const style = getComputedStyle(element)
      stats.styleChecked += 1
      if (style.scrollbarWidth === 'none' && style.overflowX === 'auto') stats.styleOk += 1
    })
  }
  stats.tokens = [...container.querySelectorAll('[data-math-current] .katex')].length
  await act(async () => root.unmount())
  container.remove()
  return stats
}

it('odtwarzanie 2×: bez widocznego paska w trakcie przejść tokenów', { timeout: 60_000 }, async () => {
  const a01 = await playbackScrollbarProbe('rama-pion-q-pas-ukosny', 5, 5000)
  const a08 = await playbackScrollbarProbe('rama-ukosny-pas-4-5', 3, 5000)
  for (const stats of [a01, a08]) {
    expect(stats.max, 'geometria paska = 0').toBe(0)
    expect(stats.styleOk).toBe(stats.styleChecked)
    expect(stats.tokens).toBeGreaterThan(0)
  }
})
