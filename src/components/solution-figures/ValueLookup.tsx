import { motion } from 'motion/react'
import { local, valueRevealed } from './shared'

export function ValueLookup({
  values,
  focus,
  revealed,
  sceneIndex = 0,
  revealedMath = '',
}: {
  values?: Array<{ label: string; value: string; focus?: string; reveal?: number }>
  focus?: string
  revealed?: string[]
  sceneIndex?: number
  revealedMath?: string
}) {
  if (!values || values.length === 0) return null
  const hasVisible = values.some(
    (item) =>
      valueRevealed(item, sceneIndex, revealedMath) &&
      (!item.focus || !revealed || revealed.includes(item.focus) || item.focus === focus),
  )
  return (
    <motion.div
      layout
      className={local('lookup')}
      animate={{
        paddingTop: hasVisible ? 7 : 0,
        paddingBottom: hasVisible ? 7 : 0,
        borderColor: hasVisible ? '#e2e6eb' : 'transparent',
        opacity: hasVisible ? 1 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {values.map((item) => {
        const visible =
          valueRevealed(item, sceneIndex, revealedMath) &&
          (!item.focus || !revealed || revealed.includes(item.focus) || item.focus === focus)
        return (
          <motion.div
            key={`${item.label}-${item.value}`}
            className={local('lookup-row-wrap')}
            initial={false}
            animate={{
              height: visible ? 24 : 0,
              opacity: visible ? 1 : 0,
              marginBottom: visible ? 3 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={local('lookup-row value', item.focus === focus && 'active')}>
              <span className={local('lookup-label')}>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
