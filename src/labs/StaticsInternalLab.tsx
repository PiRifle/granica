import { useState } from 'react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { beamInternalsPointLoad, simplySupportedPointLoad } from '../lib/statics'
import { staticsColors, staticsMarker } from './StaticsLabsShared'

export function StaticsInternalLab() {
  const [lengthM, setLengthM] = useState(6)
  const [forceKN, setForceKN] = useState(18)
  const [positionM, setPositionM] = useState(2.5)
  const [sectionM, setSectionM] = useState(1.5)

  const safePosition = Math.min(positionM, lengthM - 0.2)
  const safeSection = Math.min(sectionM, lengthM)
  const reactions = simplySupportedPointLoad(forceKN, lengthM, safePosition)
  const internal = beamInternalsPointLoad(safeSection, forceKN, lengthM, safePosition)
  const beamStart = 90
  const beamEnd = 630
  const beamY = 100
  const scaleX = (beamEnd - beamStart) / lengthM
  const loadX = beamStart + safePosition * scaleX
  const sectionX = beamStart + safeSection * scaleX
  const maxMoment = (forceKN * safePosition * (lengthM - safePosition)) / lengthM
  const shearBaseY = 190
  const shearAmplitude = 30
  const momentBaseY = 300
  const momentAmplitude = 50
  const shearScale = shearAmplitude / Math.max(reactions.ra, reactions.rb, 0.001)
  const momentScale = maxMoment === 0 ? 0 : momentAmplitude / maxMoment
  const shearY = (value: number) => shearBaseY - value * shearScale
  const momentY = (value: number) => momentBaseY - value * momentScale

  return (
    <Lab
      title="Siły wewnętrzne w belce: przekrój, T(x) i M(x)"
      instruction="Przesuwaj przekrój po belce. Siła tnąca T jest sumą sił po jednej stronie przekroju (dodatnia w lewo), a moment zginający M — sumą ich momentów (dodatni rozciąga dół). Skok T pojawia się w miejscu siły skupionej."
      onReset={() => {
        setLengthM(6)
        setForceKN(18)
        setPositionM(2.5)
        setSectionM(1.5)
      }}
      controls={
        <>
          <Control label="Rozpiętość L" value={lengthM} min={3} max={10} step={0.5} unit="m" onChange={setLengthM} />
          <Control label="Siła P" value={forceKN} min={4} max={40} unit="kN" onChange={setForceKN} />
          <Control
            label="Położenie siły a"
            value={positionM}
            min={0.5}
            max={lengthM - 0.5}
            step={0.5}
            unit="m"
            onChange={setPositionM}
          />
          <Control
            label="Przekrój x"
            value={sectionM}
            min={0}
            max={lengthM}
            step={0.25}
            unit="m"
            onChange={setSectionM}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Reakcja RA" value={fmt(reactions.ra, 2)} unit="kN" />
          <Metric label="Reakcja RB" value={fmt(reactions.rb, 2)} unit="kN" />
          <Metric label="Siła tnąca T(x)" value={fmt(internal.shear, 2)} unit="kN" tone="accent" />
          <Metric label="Moment M(x)" value={fmt(internal.moment, 2)} unit="kN·m" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 330"
          width="100%"
          role="img"
          aria-label="Belka z przekrojem i wykresami siły tnącej oraz momentu"
        >
          <title>Siły wewnętrzne w belce</title>
          <desc>Belka swobodnie podparta, przekrój obliczeniowy, wykres siły tnącej i momentu zginającego.</desc>
          <defs>
            {staticsMarker('internal-load', staticsColors.force)}
            {staticsMarker('internal-react', staticsColors.reaction)}
          </defs>
          <line
            x1={beamStart}
            y1={beamY}
            x2={beamEnd}
            y2={beamY}
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d={`M${beamStart - 22} ${beamY + 24}L${beamStart} ${beamY + 9}L${beamStart + 22} ${beamY + 24}Z`}
            fill="currentColor"
            opacity="0.5"
          />
          <path
            d={`M${beamEnd - 22} ${beamY + 24}L${beamEnd} ${beamY + 9}L${beamEnd + 22} ${beamY + 24}Z`}
            fill="currentColor"
            opacity="0.3"
          />
          <line
            x1={loadX}
            y1="24"
            x2={loadX}
            y2={beamY - 14}
            stroke={staticsColors.force}
            strokeWidth="4"
            markerEnd="url(#internal-load)"
          />
          <text x={loadX + 8} y="40" fontSize="14" fill={staticsColors.force}>
            P = {forceKN} kN
          </text>
          <line
            x1={beamStart}
            y1={beamY + 50}
            x2={beamStart}
            y2={beamY + 14}
            stroke={staticsColors.reaction}
            strokeWidth="3"
            markerEnd="url(#internal-react)"
          />
          <text x={beamStart} y={beamY + 70} textAnchor="middle" fontSize="12" fill={staticsColors.reaction}>
            RA = {fmt(reactions.ra, 1)}
          </text>
          <line
            x1={beamEnd}
            y1={beamY + 50}
            x2={beamEnd}
            y2={beamY + 14}
            stroke={staticsColors.reaction}
            strokeWidth="3"
            markerEnd="url(#internal-react)"
          />
          <text x={beamEnd} y={beamY + 70} textAnchor="middle" fontSize="12" fill={staticsColors.reaction}>
            RB = {fmt(reactions.rb, 1)}
          </text>
          <line
            x1={sectionX}
            y1={beamY - 26}
            x2={sectionX}
            y2={beamY + 26}
            stroke={staticsColors.accent}
            strokeWidth="2.5"
            strokeDasharray="5 4"
          />
          <text x={sectionX} y={beamY - 32} textAnchor="middle" fontSize="12" fill={staticsColors.accent}>
            przekrój x = {fmt(safeSection, 2)} m
          </text>

          <line
            x1={beamStart}
            y1={shearBaseY}
            x2={beamEnd}
            y2={shearBaseY}
            stroke={staticsColors.axis}
            strokeWidth="1.5"
          />
          <text x={beamStart - 30} y={shearBaseY - 45} textAnchor="end" fontSize="12" fill="currentColor">
            T [kN]
          </text>
          <text x={beamStart - 6} y={shearBaseY + 14} textAnchor="end" fontSize="10" fill={staticsColors.axis}>
            0
          </text>
          <path
            d={`M${beamStart} ${shearBaseY} L${beamStart} ${shearY(reactions.ra)} L${loadX} ${shearY(reactions.ra)} L${loadX} ${shearBaseY} Z`}
            fill={staticsColors.tension}
            opacity="0.12"
          />
          <path
            d={`M${loadX} ${shearBaseY} L${loadX} ${shearY(-reactions.rb)} L${beamEnd} ${shearY(-reactions.rb)} L${beamEnd} ${shearBaseY} Z`}
            fill={staticsColors.tension}
            opacity="0.18"
          />
          <path
            d={`M${beamStart} ${shearBaseY} L${beamStart} ${shearY(reactions.ra)} L${loadX} ${shearY(reactions.ra)} L${loadX} ${shearY(-reactions.rb)} L${beamEnd} ${shearY(-reactions.rb)} L${beamEnd} ${shearBaseY}`}
            fill="none"
            stroke={staticsColors.tension}
            strokeWidth="2.5"
          />
          <text
            x={(beamStart + loadX) / 2}
            y={shearY(reactions.ra) - 6}
            textAnchor="middle"
            fontSize="11"
            fill={staticsColors.tension}
          >
            +{fmt(reactions.ra, 1)}
          </text>
          <text
            x={(loadX + beamEnd) / 2}
            y={shearY(-reactions.rb) + 14}
            textAnchor="middle"
            fontSize="11"
            fill={staticsColors.tension}
          >
            −{fmt(reactions.rb, 1)}
          </text>
          <circle cx={sectionX} cy={shearY(internal.shear)} r="4" fill={staticsColors.accent} />

          <line
            x1={beamStart}
            y1={momentBaseY}
            x2={beamEnd}
            y2={momentBaseY}
            stroke={staticsColors.axis}
            strokeWidth="1.5"
          />
          <text x={beamStart - 30} y={momentBaseY - 25} textAnchor="end" fontSize="12" fill="currentColor">
            M [kN·m]
          </text>
          <text x={beamStart - 6} y={momentBaseY + 14} textAnchor="end" fontSize="10" fill={staticsColors.axis}>
            0
          </text>
          <path
            d={`M${beamStart} ${momentBaseY} L${loadX} ${momentY(maxMoment)} L${beamEnd} ${momentBaseY} Z`}
            fill={staticsColors.compression}
            opacity="0.12"
          />
          <path
            d={`M${beamStart} ${momentBaseY} L${loadX} ${momentY(maxMoment)} L${beamEnd} ${momentBaseY}`}
            fill="none"
            stroke={staticsColors.compression}
            strokeWidth="2.5"
          />
          <circle cx={sectionX} cy={momentY(internal.moment)} r="4" fill={staticsColors.accent} />
          <text
            x={loadX + (loadX < 360 ? 8 : -8)}
            y={momentY(maxMoment) - 6}
            textAnchor={loadX < 360 ? 'start' : 'end'}
            fontSize="11"
            fill={staticsColors.compression}
          >
            Mmax = {fmt(maxMoment, 1)}
          </text>
          <text x="360" y="322" textAnchor="middle" fontSize="12.5" fill="currentColor">
            T = +RA po lewej, −RB po prawej (dlatego T &lt; 0). M rośnie do Mmax i wraca do zera — M &gt; 0 na całej
            belce.
          </text>
        </svg>
      }
    />
  )
}
