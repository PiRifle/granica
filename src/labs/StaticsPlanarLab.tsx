import { useState } from 'react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { simplySupportedWithDistributed } from '../lib/statics'
import { staticsColors, staticsMarker } from './StaticsLabsShared'

export function StaticsPlanarLab() {
  const [lengthM, setLengthM] = useState(6)
  const [forceKN, setForceKN] = useState(18)
  const [positionM, setPositionM] = useState(2)
  const [distributedKNM, setDistributedKNM] = useState(4)

  const reactions = simplySupportedWithDistributed(forceKN, positionM, distributedKNM, lengthM)
  const totalLoad = forceKN + distributedKNM * lengthM
  const maxMoment = Math.max(0, reactions.ra * positionM - (distributedKNM * positionM ** 2) / 2)
  const beamStart = 110
  const beamEnd = 620
  const beamY = 160
  const loadX = beamStart + (positionM / lengthM) * (beamEnd - beamStart)
  const distributedHeight = 14 + distributedKNM * 3

  return (
    <Lab
      title="Reakcje belki: siła skupiona i obciążenie ciągłe"
      instruction="Na belkę działa siła skupiona P i równomierne obciążenie q na całej długości. Zastąp q wypadkową qL w środku belki, a następnie ułóż dwa równania momentów. Reakcje muszą sumować się do całkowitego obciążenia."
      onReset={() => {
        setLengthM(6)
        setForceKN(18)
        setPositionM(2)
        setDistributedKNM(4)
      }}
      controls={
        <>
          <Control label="Rozpiętość L" value={lengthM} min={3} max={10} step={0.5} unit="m" onChange={setLengthM} />
          <Control label="Siła P" value={forceKN} min={0} max={40} unit="kN" onChange={setForceKN} />
          <Control label="Położenie a" value={positionM} min={0.5} max={lengthM - 0.5} step={0.5} unit="m" onChange={setPositionM} />
          <Control
            label="Obciążenie q"
            value={distributedKNM}
            min={0}
            max={12}
            step={0.5}
            unit="kN/m"
            onChange={setDistributedKNM}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Reakcja RA" value={fmt(reactions.ra, 2)} unit="kN" tone="accent" />
          <Metric label="Reakcja RB" value={fmt(reactions.rb, 2)} unit="kN" />
          <Metric label="Obciążenie całkowite" value={fmt(totalLoad, 2)} unit="kN" />
          <Metric label="Moment pod siłą" value={fmt(maxMoment, 2)} unit="kN·m" />
        </>
      }
      visual={
        <svg viewBox="0 0 720 330" width="100%" role="img" aria-label="Belka z siłą skupioną i obciążeniem ciągłym">
          <title>Reakcje belki obciążonej siłą i obciążeniem ciągłym</title>
          <desc>Schemat belki z podporami, siłą skupioną, obciążeniem równomiernym i reakcjami.</desc>
          <defs>
            {staticsMarker('planar-load', staticsColors.force)}
            {staticsMarker('planar-react', staticsColors.reaction)}
            {staticsMarker('planar-dist', staticsColors.compression)}
          </defs>
          <line x1={beamStart} y1={beamY} x2={beamEnd} y2={beamY} stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <path d={`M${beamStart - 24} ${beamY + 26}L${beamStart} ${beamY + 10}L${beamStart + 24} ${beamY + 26}Z`} fill="currentColor" opacity="0.5" />
          <path d={`M${beamEnd - 24} ${beamY + 26}L${beamEnd} ${beamY + 10}L${beamEnd + 24} ${beamY + 26}Z`} fill="currentColor" opacity="0.3" />
          <circle cx={beamEnd - 12} cy={beamY + 30} r="5" fill="currentColor" opacity="0.45" />
          <circle cx={beamEnd + 10} cy={beamY + 30} r="5" fill="currentColor" opacity="0.45" />
          {Array.from({ length: 13 }, (_, index) => {
            const x = beamStart + (index / 12) * (beamEnd - beamStart)
            return (
              <line
                key={index}
                x1={x}
                y1={beamY - 4}
                x2={x}
                y2={beamY - 4 - distributedHeight}
                stroke={staticsColors.compression}
                strokeWidth="1.6"
                markerEnd="url(#planar-dist)"
                opacity="0.75"
              />
            )
          })}
          <line x1={beamStart} y1={beamY - 4 - distributedHeight} x2={beamEnd} y2={beamY - 4 - distributedHeight} stroke={staticsColors.compression} strokeWidth="2" />
          <text x={beamEnd - 10} y={beamY - 22 - distributedHeight} textAnchor="end" fontSize="13" fill={staticsColors.compression}>
            q = {distributedKNM} kN/m
          </text>
          {forceKN > 0 && (
            <>
              <line x1={loadX} y1="52" x2={loadX} y2={beamY - 18} stroke={staticsColors.force} strokeWidth="4" markerEnd="url(#planar-load)" />
              <text x={loadX + 8} y="70" fontSize="14" fill={staticsColors.force}>
                P = {forceKN} kN
              </text>
            </>
          )}
          <line x1={beamStart} y1={beamY + 76} x2={beamStart} y2={beamY + 26} stroke={staticsColors.reaction} strokeWidth="3" markerEnd="url(#planar-react)" />
          <text x={beamStart} y={beamY + 96} textAnchor="middle" fontSize="13" fill={staticsColors.reaction}>
            RA = {fmt(reactions.ra, 1)} kN
          </text>
          <line x1={beamEnd} y1={beamY + 76} x2={beamEnd} y2={beamY + 26} stroke={staticsColors.reaction} strokeWidth="3" markerEnd="url(#planar-react)" />
          <text x={beamEnd} y={beamY + 96} textAnchor="middle" fontSize="13" fill={staticsColors.reaction}>
            RB = {fmt(reactions.rb, 1)} kN
          </text>
          <line x1={beamStart} y1={beamY + 122} x2={loadX} y2={beamY + 122} stroke="currentColor" />
          <line x1={loadX} y1={beamY + 122} x2={beamEnd} y2={beamY + 122} stroke="currentColor" />
          <text x={(beamStart + loadX) / 2} y={beamY + 142} textAnchor="middle" fontSize="12" fill="currentColor">
            a = {fmt(positionM, 1)} m
          </text>
          <text x={(loadX + beamEnd) / 2} y={beamY + 142} textAnchor="middle" fontSize="12" fill="currentColor">
            L − a = {fmt(lengthM - positionM, 1)} m
          </text>
          <text x="360" y="318" textAnchor="middle" fontSize="13" fill="currentColor">
            ΣM_A = 0: RB·L = P·a + qL·L/2 — obciążenie ciągłe zastępujemy wypadkową w środku.
          </text>
        </svg>
      }
    />
  )
}
