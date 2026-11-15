import { createRoot } from 'react-dom/client'
import { act, useRef } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { SolutionDebugDiagnostics } from './SolutionDebugDiagnostics'

const mounted: Array<{ root: ReturnType<typeof createRoot>; container: HTMLDivElement }> = []

afterEach(() => {
  for (const { root, container } of mounted.splice(0)) {
    act(() => root.unmount())
    container.remove()
  }
})

function Harness({ runtimeErrors = [] }: { runtimeErrors?: string[] }) {
  const targetRef = useRef<HTMLDivElement | null>(null)
  return (
    <div ref={targetRef}>
      <div data-solution-copy>
        <div data-math-values>P = 20 kN</div>
      </div>
      <SolutionDebugDiagnostics
        targetRef={targetRef}
        sceneIndex={1}
        remountCount={0}
        runtimeErrors={runtimeErrors}
        onClearErrors={() => {}}
      />
    </div>
  )
}

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

describe('SolutionDebugDiagnostics', () => {
  it('renderuje liczniki i komunikat stanu pustego bez pomiaru layoutu', async () => {
    const container = document.createElement('div')
    document.body.append(container)
    const root = createRoot(container)
    mounted.push({ root, container })
    await act(async () => root.render(<Harness />))
    await act(async () => new Promise((resolve) => setTimeout(resolve, 650)))

    const diagnostics = container.querySelector('[aria-label="Diagnostyka odtwarzacza"]')
    expect(diagnostics?.textContent).toContain('Diagnostyka sceny 2')
    expect(diagnostics?.textContent).toContain('0 błędów')
    expect(diagnostics?.textContent).toContain('0 wskazań kolizji')
    expect(diagnostics?.textContent).toContain('Brak wykrytych błędów i kolizji dla bieżącego widoku.')
  })

  it('dodaje overflow prawego widgetu do listy diagnostycznej', async () => {
    const container = document.createElement('div')
    document.body.append(container)
    const root = createRoot(container)
    mounted.push({ root, container })
    await act(async () => root.render(<Harness />))
    const panel = container.querySelector('[data-solution-copy]') as HTMLElement
    const values = container.querySelector('[data-math-values]') as HTMLElement
    Object.defineProperty(panel, 'getBoundingClientRect', { value: () => rect(300, 100, 400, 500) })
    Object.defineProperty(values, 'getBoundingClientRect', { value: () => rect(310, 120, 410, 40) })
    await act(async () => new Promise((resolve) => setTimeout(resolve, 650)))

    const diagnostics = container.querySelector('[aria-label="Diagnostyka odtwarzacza"]')
    expect(diagnostics?.textContent).toContain('1 wskazań kolizji')
    expect(diagnostics?.textContent).toContain('panel / overflow')
    expect(diagnostics?.textContent).toContain('Treść prawego panelu wychodzi poza obszar')
  })

  it('pokazuje błędy runtime na liście diagnostycznej', async () => {
    const container = document.createElement('div')
    document.body.append(container)
    const root = createRoot(container)
    mounted.push({ root, container })
    await act(async () => root.render(<Harness runtimeErrors={['cw1-1: Nie można odczytać sceny']} />))

    const diagnostics = container.querySelector('[aria-label="Diagnostyka odtwarzacza"]')
    expect(diagnostics?.textContent).toContain('1 błędów')
    expect(diagnostics?.textContent).toContain('cw1-1: Nie można odczytać sceny')
    expect(diagnostics?.textContent).toContain('Wyczyść błędy')
  })
})
