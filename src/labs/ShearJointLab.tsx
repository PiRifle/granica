import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, Segmented, fmt } from '../components/UI'
import { shearBearingMPa } from '../lib/advanced'
import { ShearMode } from './ShearBeamLabsShared'

export function ShearJointLab() {
  const [forceKN, setForceKN] = useState(40)
  const [diameterMM, setDiameterMM] = useState(16)
  const [mode, setMode] = useState<ShearMode>('single')
  const shearPlanes = mode === 'single' ? 1 : 2
  const areaMM2 = (Math.PI * diameterMM ** 2) / 4
  const tauMPa = shearBearingMPa(forceKN, shearPlanes, areaMM2)
  const forcePerPlaneKN = forceKN / shearPlanes
  const rivetWidth = 10 + diameterMM * 0.65
  const forceStroke = 3 + forceKN / 25

  return (
    <Lab
      title="Ścinanie nitu: jedno- i dwucięcie"
      instruction="Zmień siłę, średnicę nitu i liczbę płaszczyzn ścinania. Średnie naprężenie styczne τ = F/(n·A); bez granicy materiału nie oceniamy bezpieczeństwa połączenia."
      onReset={() => {
        setForceKN(40)
        setDiameterMM(16)
        setMode('single')
      }}
      controls={
        <>
          <Segmented
            label="Rodzaj połączenia"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'single', label: 'Jednocięcie · n = 1' },
              { value: 'double', label: 'Dwucięcie · n = 2' },
            ]}
          />
          <Control label="Siła F" value={forceKN} min={5} max={100} step={5} unit="kN" onChange={setForceKN} />
          <Control label="Średnica nitu d" value={diameterMM} min={8} max={30} unit="mm" onChange={setDiameterMM} />
        </>
      }
      metrics={
        <>
          <Metric label="Średnie naprężenie τ" value={fmt(tauMPa)} unit="MPa" tone="accent" />
          <Metric label="Siła na płaszczyznę F/n" value={fmt(forcePerPlaneKN)} unit="kN" />
          <Metric label="Pole przekroju nitu A" value={fmt(areaMM2)} unit="mm²" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 340"
          width="100%"
          role="img"
          aria-label={mode === 'single' ? 'Nit ścinany w jednej płaszczyźnie' : 'Nit ścinany w dwóch płaszczyznach'}
        >
          <title>{mode === 'single' ? 'Połączenie jednocięte' : 'Połączenie dwucięte'}</title>
          <desc>
            Nit o średnicy d przenosi siłę F przez jedną lub dwie zaznaczone płaszczyzny ścinania. Pole jednego
            przekroju wynosi pi d kwadrat przez cztery.
          </desc>
          <defs>
            <marker
              id="shear-joint-force"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10z" fill="#ff6b45" />
            </marker>
            <linearGradient id="shear-joint-rivet" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#596775" />
              <stop offset="0.5" stopColor="#c5d0d9" />
              <stop offset="1" stopColor="#596775" />
            </linearGradient>
          </defs>
          <text x="360" y="28" textAnchor="middle" fontSize="16" fill="currentColor">
            {mode === 'single' ? 'Jedna płaszczyzna ścinania' : 'Dwie płaszczyzny ścinania'} · A = πd²/4
          </text>
          {mode === 'single' ? (
            <>
              <rect x="105" y="105" width="310" height="65" rx="4" fill="#4f6df5" opacity="0.82" />
              <rect x="305" y="170" width="310" height="65" rx="4" fill="#e0a14b" opacity="0.82" />
              <line
                x1="105"
                y1="137"
                x2="42"
                y2="137"
                stroke="#ff6b45"
                strokeWidth={forceStroke}
                markerEnd="url(#shear-joint-force)"
              />
              <line
                x1="615"
                y1="202"
                x2="678"
                y2="202"
                stroke="#ff6b45"
                strokeWidth={forceStroke}
                markerEnd="url(#shear-joint-force)"
              />
              <text x="70" y="120" textAnchor="middle" fontSize="15" fill="#ff6b45">
                F
              </text>
              <text x="650" y="185" textAnchor="middle" fontSize="15" fill="#ff6b45">
                F
              </text>
              <motion.line
                x1="285"
                x2="435"
                y1="170"
                y2="170"
                stroke="#ff6b45"
                strokeWidth="3"
                strokeDasharray="7 5"
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <text x="448" y="175" fontSize="14" fill="#ff6b45">
                płaszczyzna 1
              </text>
            </>
          ) : (
            <>
              <rect x="105" y="85" width="510" height="48" rx="4" fill="#4f6df5" opacity="0.78" />
              <rect x="185" y="133" width="350" height="74" rx="4" fill="#e0a14b" opacity="0.85" />
              <rect x="105" y="207" width="510" height="48" rx="4" fill="#4f6df5" opacity="0.78" />
              <line
                x1="105"
                y1="109"
                x2="42"
                y2="109"
                stroke="#ff6b45"
                strokeWidth={forceStroke}
                markerEnd="url(#shear-joint-force)"
              />
              <line
                x1="105"
                y1="231"
                x2="42"
                y2="231"
                stroke="#ff6b45"
                strokeWidth={forceStroke}
                markerEnd="url(#shear-joint-force)"
              />
              <line
                x1="535"
                y1="170"
                x2="678"
                y2="170"
                stroke="#ff6b45"
                strokeWidth={forceStroke}
                markerEnd="url(#shear-joint-force)"
              />
              <text x="70" y="92" textAnchor="middle" fontSize="15" fill="#ff6b45">
                F/2
              </text>
              <text x="70" y="260" textAnchor="middle" fontSize="15" fill="#ff6b45">
                F/2
              </text>
              <text x="645" y="151" textAnchor="middle" fontSize="15" fill="#ff6b45">
                F
              </text>
              {[133, 207].map((y, index) => (
                <g key={y}>
                  <motion.line
                    x1="285"
                    x2="435"
                    y1={y}
                    y2={y}
                    stroke="#ff6b45"
                    strokeWidth="3"
                    strokeDasharray="7 5"
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.25 }}
                  />
                  <text x="448" y={y + 5} fontSize="14" fill="#ff6b45">
                    płaszczyzna {index + 1}
                  </text>
                </g>
              ))}
            </>
          )}
          <motion.rect
            x={360 - rivetWidth / 2}
            y={mode === 'single' ? 88 : 68}
            height={mode === 'single' ? 164 : 204}
            rx={rivetWidth / 2}
            fill="url(#shear-joint-rivet)"
            stroke="currentColor"
            strokeWidth="1.5"
            animate={{ width: rivetWidth, x: 360 - rivetWidth / 2 }}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
          />
          <line
            x1="360"
            y1={mode === 'single' ? 76 : 56}
            x2="360"
            y2={mode === 'single' ? 263 : 283}
            stroke="white"
            strokeDasharray="4 4"
            opacity="0.55"
          />
          <text x="360" y="302" textAnchor="middle" fontSize="15" fill="currentColor">
            d = {diameterMM} mm · F = {forceKN} kN · n = {shearPlanes}
          </text>
          <text x="360" y="326" textAnchor="middle" fontSize="13" fill="currentColor">
            τ = {fmt(tauMPa)} MPa = {fmt(tauMPa)} N/mm²
          </text>
        </svg>
      }
    />
  )
}
