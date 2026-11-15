import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import baseConfig from './vite.config.ts'

function cachedChromium() {
  const cache = path.join(os.homedir(), '.cache', 'ms-playwright')
  if (!fs.existsSync(cache)) return undefined
  const revisions = fs
    .readdirSync(cache)
    .filter((entry) => entry.startsWith('chromium_headless_shell-'))
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
  for (const revision of revisions) {
    const executable = path.join(revision, 'chrome-headless-shell-linux64', 'chrome-headless-shell')
    if (fs.existsSync(path.join(cache, executable))) return path.join(cache, executable)
  }
  return undefined
}

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ?? cachedChromium()

export default defineConfig({
  ...baseConfig,
  test: {
    include: ['src/**/*.browser.test.tsx'],
    reporter: 'verbose',
    maxConcurrency: 4,
    browser: {
      enabled: true,
      headless: true,
      screenshotFailures: false,
      provider: playwright({
        launchOptions: executablePath ? { executablePath } : {},
      }),
      instances: [{ browser: 'chromium' }],
    },
  },
})
