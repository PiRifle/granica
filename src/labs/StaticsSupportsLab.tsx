import { useState } from 'react'
import { Control, Lab, Metric, Segmented, fmt } from '../components/UI'
import { simplySupportedPointLoad } from '../lib/statics'
import { staticsColors, staticsMarker } from './StaticsLabsShared'

type Schema = 'beam' | 'cantilever'

export function StaticsSupportsLab() {
  const [schema, setSchema] = useState<Schema>('beam')
  const [forceKN, setForceKN] = useState(20)
  const [positionMM, setPositionMM] = useState(1400)
  const lengthMM = 4000
  const beamStart = 120
  const beamEnd = 620
  const beamY = 150
  const loadX = beamStart + (positionMM / lengthMM) * (beamEnd - beamStart)

  const reactions = simplySupportedPointLoad(forceKN, lengthMM, positionMM)
  const cantileverMoment = (forceKN * positionMM) / 1000

  return (
    <Lab
      title="Więzy, podpory i reakcje — budowa schematu"
      instruction="Wybierz schemat i przesuwaj siłę. Podpora przegubowa odbiera dwa kierunki, podpora ruchoma jeden, a utwierdzenie dodatkowo moment. Liczba reakcji musi odpowiadać liczbie równań równowagi."
      onReset={() => {
        setSchema('beam')
        setForceKN(20)
        setPositionMM(1400)
      }}
      controls={
        <>
          <Segmented
            label="Schemat statyczny"
            value={schema}
            options={[
              { value: 'beam', label: 'Belka A–B' },
              { value: 'cantilever', label: 'Wspornik' },
            ]}
            onChange={setSchema}
          />
          <Control label="Siła skupiona P" value={forceKN} min={5} max={40} step={1} unit="kN" onChange={setForceKN} />
          <Control
            label="Położenie siły a"
            value={positionMM}
            min={200}
            max={lengthMM - 200}
            step={100}
            unit="mm"
            onChange={setPositionMM}
          />
        </>
      }
      metrics={
        schema === 'beam' ? (
          <>
            <Metric label="Niewiadome reakcje" value="3" unit="—" />
            <Metric label="RAy = P(L−a)/L" value={fmt(reactions.ra, 2)} unit="kN" tone="accent" />
            <Metric label="RBy = P·a/L" value={fmt(reactions.rb, 2)} unit="kN" />
            <Metric label="RAx" value="0" unit="kN" />
          </>
        ) : (
          <>
            <Metric label="Niewiadome reakcje" value="3" unit="—" />
            <Metric label="RAy = P" value={fmt(forceKN, 2)} unit="kN" tone="accent" />
            <Metric label="M_A = P·a" value={fmt(cantileverMoment, 2)} unit="kN·m" />
            <Metric label="RAx" value="0" unit="kN" />
          </>
        )
      }
      visual={
        <svg viewBox="0 0 720 330" width="100%" role="img" aria-label="Schemat belki lub wspornika z reakcjami">
          <title>Więzy i reakcje podpór</title>
          <desc>Schemat belki swobodnie podpartej lub wspornika z zaznaczonymi reakcjami.</desc>
          <defs>
            {staticsMarker('sup-load', staticsColors.force)}
            {staticsMarker('sup-reaction', staticsColors.reaction)}
          </defs>
          <line x1="60" y1={beamY} x2="660" y2={beamY} stroke={staticsColors.axis} strokeWidth="1" strokeDasharray="4 6" />
          <rect x={beamStart} y={beamY - 9} width={beamEnd - beamStart} height="18" rx="4" fill="currentColor" opacity="0.18" />
          <line x1={beamStart} y1={beamY} x2={beamEnd} y2={beamY} stroke="currentColor" strokeWidth="7" strokeLinecap="round" />

          <line
            x1={loadX}
            y1="48"
            x2={loadX}
            y2={beamY - 16}
            stroke={staticsColors.force}
            strokeWidth="4"
            markerEnd="url(#sup-load)"
          />
          <text x={loadX + 8} y="66" fontSize="14" fill={staticsColors.force}>
            P = {forceKN} kN
          </text>

          {schema === 'beam' ? (
            <>
              <path
                d={`M${beamStart - 26} ${beamY + 28}L${beamStart} ${beamY + 12}L${beamStart + 26} ${beamY + 28}Z`}
                fill="currentColor"
                opacity="0.5"
              />
              <circle cx={beamStart} cy={beamY + 12} r="5" fill="currentColor" />
              <path
                d={`M${beamEnd - 26} ${beamY + 28}L${beamEnd} ${beamY + 12}L${beamEnd + 26} ${beamY + 28}Z`}
                fill="currentColor"
                opacity="0.3"
              />
              <circle cx={beamEnd - 14} cy={beamY + 32} r="5" fill="currentColor" opacity="0.45" />
              <circle cx={beamEnd + 10} cy={beamY + 32} r="5" fill="currentColor" opacity="0.45" />
              <line
                x1={beamStart}
                y1={beamY + 74}
                x2={beamStart}
                y2={beamY + 30}
                stroke={staticsColors.reaction}
                strokeWidth="3"
                markerEnd="url(#sup-reaction)"
              />
              <text x={beamStart - 8} y={beamY + 94} textAnchor="middle" fontSize="13" fill={staticsColors.reaction}>
                RAy = {fmt(reactions.ra, 1)} kN
              </text>
              <line
                x1={beamEnd}
                y1={beamY + 74}
                x2={beamEnd}
                y2={beamY + 30}
                stroke={staticsColors.reaction}
                strokeWidth="3"
                markerEnd="url(#sup-reaction)"
              />
              <text x={beamEnd + 10} y={beamY + 94} textAnchor="middle" fontSize="13" fill={staticsColors.reaction}>
                RBy = {fmt(reactions.rb, 1)} kN
              </text>
              <text x={beamStart} y={beamY - 18} textAnchor="middle" fontSize="14" fill="currentColor">
                A — przegub
              </text>
              <text x={beamEnd} y={beamY - 18} textAnchor="middle" fontSize="14" fill="currentColor">
                B — podpora ruchoma
              </text>
            </>
          ) : (
            <>
              <rect x={beamStart - 30} y={beamY - 44} width="18" height="88" fill="currentColor" opacity="0.55" />
              {[0, 1, 2, 3, 4].map((index) => (
                <line
                  key={index}
                  x1={beamStart - 30}
                  y1={beamY - 36 + index * 18}
                  x2={beamStart - 44}
                  y2={beamY - 28 + index * 18}
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.45"
                />
              ))}
              <line
                x1={beamStart}
                y1={beamY + 70}
                x2={beamStart}
                y2={beamY + 28}
                stroke={staticsColors.reaction}
                strokeWidth="3"
                markerEnd="url(#sup-reaction)"
              />
              <text x={beamStart + 10} y={beamY + 90} textAnchor="middle" fontSize="13" fill={staticsColors.reaction}>
                RAy = {fmt(forceKN, 1)} kN
              </text>
              <path
                d={`M${beamStart + 16} ${beamY - 40} A 40 40 0 0 1 ${beamStart + 16} ${beamY + 40}`}
                fill="none"
                stroke={staticsColors.reaction}
                strokeWidth="3"
                markerEnd="url(#sup-reaction)"
              />
              <text x={beamStart + 30} y={beamY + 6} fontSize="13" fill={staticsColors.reaction}>
                M_A = {fmt(cantileverMoment, 1)} kN·m
              </text>
              <text x={beamStart} y={beamY - 58} textAnchor="middle" fontSize="14" fill="currentColor">
                A — utwierdzenie
              </text>
            </>
          )}

          <line x1={beamStart} y1={beamY + 118} x2={loadX} y2={beamY + 118} stroke="currentColor" />
          <line x1={loadX} y1={beamY + 118} x2={beamEnd} y2={beamY + 118} stroke="currentColor" />
          <line x1={beamStart} y1={beamY + 111} x2={beamStart} y2={beamY + 125} stroke="currentColor" />
          <line x1={loadX} y1={beamY + 111} x2={loadX} y2={beamY + 125} stroke="currentColor" />
          <line x1={beamEnd} y1={beamY + 111} x2={beamEnd} y2={beamY + 125} stroke="currentColor" />
          <text x={(beamStart + loadX) / 2} y={beamY + 140} textAnchor="middle" fontSize="12" fill="currentColor">
            a = {positionMM} mm
          </text>
          <text x={(loadX + beamEnd) / 2} y={beamY + 140} textAnchor="middle" fontSize="12" fill="currentColor">
            L − a = {lengthMM - positionMM} mm
          </text>
          <text x="360" y="320" textAnchor="middle" fontSize="13" fill="currentColor">
            {schema === 'beam'
              ? 'Belka: ΣFx = 0, ΣFy = 0, ΣM = 0 — trzy równania, trzy reakcje.'
              : 'Wspornik: utwierdzenie daje RAx, RAy i M_A — również trzy niewiadome.'}
          </text>
        </svg>
      }
    />
  )
}
