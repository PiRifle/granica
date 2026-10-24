import type { ReactNode } from 'react'
import * as Slider from '@radix-ui/react-slider'
import * as Progress from '@radix-ui/react-progress'
import { BlockMath } from 'react-katex'
import { RotateCcw } from 'lucide-react'
import ui from './UI.module.css'

export function Formula({ children, note, compact = false }: { children: string; note?: string; compact?: boolean }) {
  return (
    <div className={compact ? 'formula-card formula-card-compact' : 'formula-card'}>
      <BlockMath math={children} />
      {note && <p>{note}</p>}
    </div>
  )
}

interface ControlProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit: string
  onChange: (value: number) => void
  format?: (value: number) => string
}

export function Control({ label, value, min, max, step = 1, unit, onChange, format }: ControlProps) {
  return (
    <label className={ui.control}>
      <span className={ui['control-label']}>
        <span>{label}</span>
        <strong>
          {format ? format(value) : value} <small>{unit}</small>
        </strong>
      </span>
      <Slider.Root
        className={ui['slider-root']}
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([next]) => onChange(next)}
      >
        <Slider.Track className={ui['slider-track']}>
          <Slider.Range className={ui['slider-range']} />
        </Slider.Track>
        <Slider.Thumb
          className={ui['slider-thumb']}
          aria-label={label}
          aria-valuetext={`${format ? format(value) : value} ${unit}`}
        />
      </Slider.Root>
      <span className={ui['control-range']}>
        <span>{min}</span>
        <span>{max}</span>
      </span>
    </label>
  )
}

export interface SegmentOption<T extends string> {
  value: T
  label: string
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: ReadonlyArray<SegmentOption<T>>
  onChange: (value: T) => void
}) {
  return (
    <div className={`${ui.control} ${ui['segmented-control']}`}>
      <span className={ui['control-label']}>
        <span>{label}</span>
      </span>
      <div className={ui.segmented} role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={value === option.value ? `${ui.segment} ${ui.active}` : ui.segment}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Metric({ label, value, unit, tone }: { label: string; value: string; unit?: string; tone?: string }) {
  return (
    <div className={`${ui.metric} ${tone === 'accent' ? ui.accent : ''}`}>
      <span>{label}</span>
      <strong>
        {value} <small>{unit}</small>
      </strong>
    </div>
  )
}

export function Lab({
  title,
  instruction,
  visual,
  controls,
  metrics,
  onReset,
}: {
  title: string
  instruction: string
  visual: ReactNode
  controls: ReactNode
  metrics: ReactNode
  onReset: () => void
}) {
  return (
    <section className={ui.lab} aria-label={title}>
      <div className={ui['lab-heading']}>
        <div>
          <span className={ui['lab-tag']}>
            <i /> LABORATORIUM NA ŻYWO
          </span>
          <h2>{title}</h2>
          <p>{instruction}</p>
        </div>
        <button
          className="icon-button"
          onClick={onReset}
          aria-label="Przywróć ustawienia początkowe"
          title="Zacznij od nowa"
        >
          <RotateCcw size={18} />
        </button>
      </div>
      <div className={ui['lab-workspace']}>
        <div className={ui['lab-visual']}>{visual}</div>
        <div className={ui['lab-controls']}>
          <h3>Ty sterujesz</h3>
          {controls}
        </div>
      </div>
      <div className={ui.metrics} aria-live="polite">
        {metrics}
      </div>
    </section>
  )
}

export function CourseProgress({ value }: { value: number }) {
  return (
    <Progress.Root className="progress-root" value={value} aria-label={`Postęp kursu: ${Math.round(value)}%`}>
      <Progress.Indicator className="progress-indicator" style={{ transform: `translateX(-${100 - value}%)` }} />
    </Progress.Root>
  )
}

export const fmt = (value: number, digits = 1) =>
  new Intl.NumberFormat('pl-PL', { maximumFractionDigits: digits }).format(value)
