import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { factorySolutionIds, loadFactorySolution, loadFactorySolutions } from './factoryRegistry'
import { workedSolutions } from './course'

describe('factoryRegistry — fabryki tylko dla debugu', () => {
  it('odkrywa fabryki z solution.data.ts i zachowuje stabilny porządek', () => {
    expect(factorySolutionIds.length).toBeGreaterThan(0)
    expect(factorySolutionIds).toContain('factory-statyka-reakcje-rama')
    expect(factorySolutionIds).toContain('factory-statyka-uklad-zbiezny')
    expect([...factorySolutionIds].sort((a, b) => a.localeCompare(b))).toEqual(factorySolutionIds)
  })

  it('fabryki nie wchodzą do workedSolutions', () => {
    const courseIds = new Set(workedSolutions.map((solution) => solution.id))
    for (const id of factorySolutionIds) {
      expect(courseIds.has(id), `${id} nie może być w workedSolutions`).toBe(false)
    }
    expect([...courseIds].some((id) => id.startsWith('factory-'))).toBe(false)
  })

  it('każda fabryka ma loadBody i wczytuje treść content.mdx', async () => {
    const factories = await loadFactorySolutions()
    expect(factories.length).toBe(factorySolutionIds.length)
    for (const factory of factories) {
      expect(typeof factory.loadBody, factory.id).toBe('function')
      const body = await factory.loadBody()
      expect(typeof body.default, factory.id).toBe('function')
      expect(factory.scenes.length, factory.id).toBeGreaterThan(0)
      expect(factory.id.length, factory.id).toBeGreaterThan(0)
    }
  })

  it('pojedyncza fabryka ładuje się deterministycznie z cache', async () => {
    const first = await loadFactorySolution('factory-statyka-reakcje-rama')
    const second = await loadFactorySolution('factory-statyka-reakcje-rama')
    expect(first.id).toBe('factory-statyka-reakcje-rama')
    expect(first).toBe(second)
  })

  it('fabryki nie są podpięte w lekcjach jako AnimatedSolution', () => {
    const lessonsRoot = path.join(process.cwd(), 'src/content/lessons')
    const bodies = fs
      .readdirSync(lessonsRoot, { recursive: true, withFileTypes: false })
      .map(String)
      .filter((file) => file.endsWith('content.mdx'))
      .map((file) => fs.readFileSync(path.join(lessonsRoot, file), 'utf8'))
      .join('\n')
    for (const id of factorySolutionIds) {
      expect(bodies).not.toContain(`<AnimatedSolution id="${id}" />`)
    }
  })
})
