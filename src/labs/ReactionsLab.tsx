import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { spring } from './FundamentalsLabsShared'

export function ReactionsLab() {
  const [lengthMM, setLengthMM] = useState(4000)
  const [forceKN, setForceKN] = useState(20)
  const [positionMM, setPositionMM] = useState(1200)
  const rightKN = (forceKN * positionMM) / lengthMM
  const leftKN = forceKN - rightKN
  const maxMomentKNM = (forceKN * positionMM * (lengthMM - positionMM)) / lengthMM / 1000
  const forceX = 100 + (positionMM / lengthMM) * 500
  const updateLength = (next: number) => {
    setLengthMM(next)
    setPositionMM((current) => Math.min(current, next - 100))
  }

  return (
    <Lab
      title="Reakcje belki z równowagi momentów"
      instruction="Przesuwaj siłę P wzdłuż belki. Reakcję RB wyznaczamy z sumy momentów względem A, a RA z równowagi sił pionowych."
      onReset={() => {
        setLengthMM(4000)
        setForceKN(20)
        setPositionMM(1200)
      }}
      controls={
        <>
          <Control
            label="Rozpiętość L"
            value={lengthMM}
            min={1000}
            max={8000}
            step={100}
            unit="mm"
            onChange={updateLength}
          />
          <Control label="Siła skupiona P" value={forceKN} min={1} max={50} unit="kN" onChange={setForceKN} />
          <Control
            label="Położenie siły a"
            value={positionMM}
            min={100}
            max={lengthMM - 100}
            step={100}
            unit="mm"
            onChange={setPositionMM}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Reakcja RA = P − RB" value={fmt(leftKN, 2)} unit="kN" tone="accent" />
          <Metric label="Reakcja RB = P·a/L" value={fmt(rightKN, 2)} unit="kN" />
          <Metric label="Moment pod siłą Mmax" value={fmt(maxMomentKNM, 2)} unit="kN·m" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 330"
          width="100%"
          role="img"
          aria-label="Belka swobodnie podparta z siłą w dowolnym położeniu i reakcjami podpór"
        >
          <title>Równowaga belki swobodnie podpartej</title>
          <desc>Reakcje zmieniają się wraz z położeniem siły. Wymiary a i L-a opisują odległości od podpór.</desc>
          <defs>
            <marker
              id="fund-reactions-force"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill="#ff6b45" />
            </marker>
            <marker
              id="fund-reactions-support"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill="#27835a" />
            </marker>
          </defs>
          <text x="360" y="28" textAnchor="middle" fontSize="16" fill="currentColor">
            ΣMₐ = 0: RB·L − P·a = 0
          </text>
          <line x1="100" y1="135" x2="600" y2="135" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
          <path d="M78 169L100 143L122 169Z M578 169L600 143L622 169Z" fill="currentColor" opacity="0.35" />
          <circle cx="590" cy="174" r="6" fill="currentColor" opacity="0.45" />
          <circle cx="610" cy="174" r="6" fill="currentColor" opacity="0.45" />
          <motion.g animate={{ x: forceX }} transition={spring}>
            <line
              x1="0"
              y1="50"
              x2="0"
              y2="124"
              stroke="#ff6b45"
              strokeWidth="4"
              markerEnd="url(#fund-reactions-force)"
            />
            <text x="10" y="69" fontSize="15" fill="#ff6b45">
              P = {forceKN} kN
            </text>
          </motion.g>
          <line
            x1="100"
            y1="229"
            x2="100"
            y2="183"
            stroke="#27835a"
            strokeWidth={2 + (leftKN / forceKN) * 2}
            markerEnd="url(#fund-reactions-support)"
          />
          <line
            x1="600"
            y1="229"
            x2="600"
            y2="183"
            stroke="#27835a"
            strokeWidth={2 + (rightKN / forceKN) * 2}
            markerEnd="url(#fund-reactions-support)"
          />
          <text x="90" y="218" textAnchor="end" fontSize="14" fill="#27835a">
            RA = {fmt(leftKN, 2)} kN
          </text>
          <text x="628" y="218" fontSize="14" fill="#27835a">
            RB = {fmt(rightKN, 2)} kN
          </text>
          <text x="83" y="196" fontSize="14" fill="currentColor">
            A
          </text>
          <text x="613" y="196" fontSize="14" fill="currentColor">
            B
          </text>
          <line x1="100" y1="264" x2={forceX} y2="264" stroke="currentColor" />
          <line x1={forceX} y1="264" x2="600" y2="264" stroke="currentColor" />
          <line x1="100" y1="255" x2="100" y2="273" stroke="currentColor" />
          <motion.line
            x1={forceX}
            x2={forceX}
            y1="255"
            y2="273"
            animate={{ x1: forceX, x2: forceX }}
            stroke="currentColor"
            transition={spring}
          />
          <line x1="600" y1="255" x2="600" y2="273" stroke="currentColor" />
          <text x={(100 + forceX) / 2} y="288" textAnchor="middle" fontSize="13" fill="currentColor">
            a = {positionMM} mm
          </text>
          <text x={(forceX + 600) / 2} y="288" textAnchor="middle" fontSize="13" fill="currentColor">
            L − a = {lengthMM - positionMM} mm
          </text>
          <text x="360" y="316" textAnchor="middle" fontSize="14" fill="currentColor">
            ΣFy = 0: RA + RB − P = 0 · Mmax = RA·a = RB·(L−a)
          </text>
        </svg>
      }
    />
  )
}
