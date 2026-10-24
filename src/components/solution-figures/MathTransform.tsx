import { useMemo } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { InlineMath } from 'react-katex'
import { splitFormula, tokenizeFormula, type MathToken } from '../../lib/mathAnimation'
import styles from '../SolutionPlayer.module.css'

const local = (...values: Array<string | false | null | undefined>) =>
  values
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((name) => styles[name] ?? name)
    .join(' ')

function changedTokenRatio(previous: MathToken[], current: MathToken[]) {
  if (previous.length === 0) return 0
  const counts = new Map<string, number>()
  for (const token of previous) counts.set(token.math, (counts.get(token.math) ?? 0) + 1)
  let unchanged = 0
  for (const token of current) {
    const count = counts.get(token.math) ?? 0
    if (count > 0) {
      unchanged += 1
      counts.set(token.math, count - 1)
    }
  }
  return 1 - unchanged / Math.max(previous.length, current.length)
}

export function MathTransform({ formula, progress }: { formula: string; progress: number }) {
  const steps = useMemo(() => splitFormula(formula), [formula])
  const active = Math.min(steps.length - 1, Math.max(0, Math.floor(progress * steps.length)))
  const stepProgress = Math.max(0, Math.min(1, progress * steps.length - active))
  const currentFormula = steps[active] ?? formula
  const tokens = useMemo(() => tokenizeFormula(currentFormula), [currentFormula])
  const contextFormula = useMemo(() => {
    for (let stepIndex = active; stepIndex >= 1; stepIndex -= 1) {
      const from = steps[stepIndex - 1]
      const to = steps[stepIndex]
      if (changedTokenRatio(tokenizeFormula(from), tokenizeFormula(to)) > 0.7) return from
    }
    return undefined
  }, [steps, active])
  const contextTokens = useMemo(() => (contextFormula ? tokenizeFormula(contextFormula) : []), [contextFormula])
  const totalTokenLength = tokens.reduce((sum, token) => sum + token.math.length, 0)
  const longestToken = tokens.reduce((longest, token) => Math.max(longest, token.math.length), 0)
  const density = Math.min(
    totalTokenLength >= 520
      ? 0.64
      : totalTokenLength >= 380
        ? 0.72
        : totalTokenLength >= 260
          ? 0.8
          : totalTokenLength >= 160
            ? 0.88
            : totalTokenLength >= 100
              ? 0.94
              : 1,
    longestToken >= 90 ? 0.8 : 1,
  )

  return (
    <div className={local('solution-derivation', 'math-transform')}>
      <div className={local('derivation-head')}>
        <span className={local('derivation-kicker')}>PRZEKSZTAŁCENIE</span>
        <span className={local('derivation-counter')}>
          {active + 1} / {steps.length}
        </span>
      </div>
      <div className={local('math-stage')}>
        <AnimatePresence initial={false} mode="popLayout">
          {contextFormula && (
            <motion.div
              key={`context-${contextFormula}`}
              className={local('math-context')}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 0.45, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={local('math-tokens')}>
                {contextTokens.map((token) => (
                  <span key={token.id} className={local('math-token')}>
                    <InlineMath math={`\\displaystyle ${token.math}`} />
                  </span>
                ))}
              </div>
              <span className={local('math-arrow')} aria-hidden="true">
                ↓
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          layout
          className={local('math-current')}
          style={{ fontSize: `${density}em` }}
          transition={{ layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className={local('math-tokens')}>
            <AnimatePresence initial={false} mode="popLayout">
              {tokens.map((token) => (
                <motion.span
                  key={token.id}
                  layout
                  className={local('math-token')}
                  initial={{ opacity: 0, y: 18, scale: 0.65 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.65 }}
                  transition={{
                    layout: { type: 'spring', stiffness: 340, damping: 34, mass: 0.8 },
                    default: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  }}
                >
                  <InlineMath math={`\\displaystyle ${token.math}`} />
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <div className={local('math-steps')} aria-hidden="true">
        {steps.map((_, stepIndex) => (
          <span
            key={stepIndex}
            className={local('math-step', stepIndex < active && 'done', stepIndex === active && 'active')}
          >
            {stepIndex === active && (
              <motion.span
                className={local('math-step-fill')}
                initial={false}
                animate={{ scaleX: stepProgress }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
