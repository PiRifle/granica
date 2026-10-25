import { useState } from 'react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { pappusSurface, pappusVolume, torusSurface, torusVolume } from '../lib/statics'
import { staticsColors } from './StaticsLabsShared'

export function StaticsPappusLab() {
  const [majorMM, setMajorMM] = useState(60)
  const [minorMM, setMinorMM] = useState(18)

  const safeMinor = Math.min(minorMM, majorMM - 5)
  const circleArea = Math.PI * safeMinor ** 2
  const circleLength = 2 * Math.PI * safeMinor
  const volume = pappusVolume(circleArea, majorMM)
  const surface = pappusSurface(circleLength, majorMM)
  const torusV = torusVolume(majorMM, safeMinor)
  const torusS = torusSurface(majorMM, safeMinor)
  const scale = Math.min(190 / (majorMM + safeMinor), 120 / safeMinor)
  const centerX = 340
  const centerY = 160
  const outer = (majorMM + safeMinor) * scale
  const inner = (majorMM - safeMinor) * scale
  const tube = safeMinor * scale

  return (
    <Lab
      title="Twierdzenia Pappusa–Guldina: bryła obrotowa"
      instruction="Pole krążka wiruje wokół osi odległej o R. Objętość bryły to pole figury razy droga środka ciężkości, a powierzchnia — długość obwodu figury razy ta sama droga. Zwiększ promień R lub r i porównaj oba wzory."
      onReset={() => {
        setMajorMM(60)
        setMinorMM(18)
      }}
      controls={
        <>
          <Control label="Promień osi R" value={majorMM} min={30} max={100} step={5} unit="mm" onChange={setMajorMM} />
          <Control label="Promień przekroju r" value={minorMM} min={5} max={35} step={1} unit="mm" onChange={setMinorMM} />
        </>
      }
      metrics={
        <>
          <Metric label="Objętość V = 2π²Rr²" value={fmt(torusV, 0)} unit="mm³" tone="accent" />
          <Metric label="Powierzchnia S = 4π²Rr" value={fmt(torusS, 0)} unit="mm²" />
          <Metric label="Droga środka ciężkości" value={fmt(2 * Math.PI * majorMM, 0)} unit="mm" />
          <Metric label="Pole przekroju" value={fmt(circleArea, 0)} unit="mm²" />
        </>
      }
      visual={
        <svg viewBox="0 0 720 330" width="100%" role="img" aria-label="Bryła obrotowa powstała z krążka wirującego wokół osi">
          <title>Bryła obrotowa i twierdzenie Pappusa</title>
          <desc>Przekrój krążka, oś obrotu oraz powstały torus.</desc>
          <line x1="80" y1={centerY} x2="650" y2={centerY} stroke={staticsColors.axis} strokeWidth="2" strokeDasharray="7 5" />
          <text x="72" y={centerY - 10} fontSize="13" fill="currentColor">
            oś obrotu
          </text>
          <ellipse cx={centerX} cy={centerY} rx={outer} ry={outer * 0.32} fill="none" stroke={staticsColors.compression} strokeWidth="2" opacity="0.4" />
          <ellipse cx={centerX} cy={centerY} rx={inner} ry={inner * 0.32} fill="none" stroke={staticsColors.compression} strokeWidth="2" opacity="0.4" />
          <ellipse cx={centerX} cy={centerY} rx={outer} ry={tube} fill="currentColor" opacity="0.1" />
          <ellipse cx={centerX} cy={centerY} rx={outer} ry={tube} fill="none" stroke="currentColor" strokeWidth="2.5" />
          <ellipse cx={centerX} cy={centerY} rx={inner} ry={tube * (inner / outer)} fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
          <circle cx={centerX + (majorMM + safeMinor) * scale} cy={centerY} r={tube} fill="none" stroke={staticsColors.force} strokeWidth="2.5" />
          <circle cx={centerX + majorMM * scale} cy={centerY} r="4" fill={staticsColors.reaction} />
          <text x={centerX + majorMM * scale} y={centerY + 22} textAnchor="middle" fontSize="12" fill={staticsColors.reaction}>
            C
          </text>
          <line x1={centerX} y1={centerY} x2={centerX + majorMM * scale} y2={centerY} stroke={staticsColors.reaction} strokeWidth="2" />
          <text x={centerX + (majorMM * scale) / 2} y={centerY - 10} textAnchor="middle" fontSize="12" fill={staticsColors.reaction}>
            R = {majorMM} mm
          </text>
          <circle cx={centerX + (majorMM + safeMinor) * scale} cy={centerY - tube} r="5" fill={staticsColors.force} />
          <text x={centerX + (majorMM + safeMinor) * scale + 10} y={centerY - tube - 8} fontSize="12" fill={staticsColors.force}>
            r = {safeMinor} mm
          </text>
          <text x="360" y="312" textAnchor="middle" fontSize="13" fill="currentColor">
            V = 2πR·A = {fmt(volume, 0)} mm³, S = 2πR·L = {fmt(surface, 0)} mm².
          </text>
        </svg>
      }
    />
  )
}
