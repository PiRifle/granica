import type { ReactNode } from 'react'
import * as Slider from '@radix-ui/react-slider'
import * as Progress from '@radix-ui/react-progress'
import { BlockMath } from 'react-katex'
import { RotateCcw } from 'lucide-react'

export function Formula({ children, note }: { children: string; note?: string }) {
  return <div className="formula-card"><BlockMath math={children} />{note && <p>{note}</p>}</div>
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
  return <label className="control">
    <span className="control-label"><span>{label}</span><strong>{format ? format(value) : value} <small>{unit}</small></strong></span>
    <Slider.Root className="slider-root" value={[value]} min={min} max={max} step={step} onValueChange={([next]) => onChange(next)}>
      <Slider.Track className="slider-track"><Slider.Range className="slider-range" /></Slider.Track>
      <Slider.Thumb className="slider-thumb" aria-label={label} aria-valuetext={`${format ? format(value) : value} ${unit}`} />
    </Slider.Root>
    <span className="control-range"><span>{min}</span><span>{max}</span></span>
  </label>
}

export function Metric({ label, value, unit, tone }: { label: string; value: string; unit?: string; tone?: string }) {
  return <div className={`metric ${tone ?? ''}`}><span>{label}</span><strong>{value} <small>{unit}</small></strong></div>
}

export function Lab({ title, instruction, visual, controls, metrics, onReset }: {
  title: string; instruction: string; visual: ReactNode; controls: ReactNode; metrics: ReactNode; onReset: () => void
}) {
  return <section className="lab" aria-label={title}>
    <div className="lab-heading"><div><span className="lab-tag"><i /> LABORATORIUM NA ŻYWO</span><h2>{title}</h2><p>{instruction}</p></div><button className="icon-button" onClick={onReset} aria-label="Przywróć ustawienia początkowe" title="Zacznij od nowa"><RotateCcw size={18} /></button></div>
    <div className="lab-workspace"><div className="lab-visual">{visual}</div><div className="lab-controls"><h3>Ty sterujesz</h3>{controls}</div></div>
    <div className="metrics" aria-live="polite">{metrics}</div>
  </section>
}

export function CourseProgress({ value }: { value: number }) {
  return <Progress.Root className="progress-root" value={value} aria-label={`Postęp kursu: ${Math.round(value)}%`}><Progress.Indicator className="progress-indicator" style={{ transform: `translateX(-${100 - value}%)` }} /></Progress.Root>
}

export const fmt = (value: number, digits = 1) => new Intl.NumberFormat('pl-PL', { maximumFractionDigits: digits }).format(value)
