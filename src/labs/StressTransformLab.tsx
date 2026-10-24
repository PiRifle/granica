import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { stressTransform } from '../lib/advanced'
import { mohrCircle } from '../lib/engineering'

export function StressTransformLab() {
  const [sigmaXMPa, setSigmaXMPa] = useState(80)
  const [sigmaYMPa, setSigmaYMPa] = useState(20)
  const [tauXYMPa, setTauXYMPa] = useState(40)
  const [thetaDeg, setThetaDeg] = useState(30)
  const transformed = stressTransform(sigmaXMPa, sigmaYMPa, tauXYMPa, thetaDeg)
  const circle = mohrCircle(sigmaXMPa, sigmaYMPa, tauXYMPa)
  const padding = Math.max(10, circle.radiusMPa * 0.25)
  const minSigma = Math.min(0, circle.sigma2MPa) - padding
  const maxSigma = Math.max(0, circle.sigma1MPa) + padding
  const maxTau = Math.max(10, circle.radiusMPa * 1.3, Math.abs(transformed.tauNT) * 1.1)
  const scale = Math.min(300 / (maxSigma - minSigma), 125 / maxTau)
  const originX = 405 - minSigma * scale
  const originY = 190
  const centerX = originX + circle.centerMPa * scale
  const radius = Math.max(1.5, circle.radiusMPa * scale)
  const pointNX = originX + transformed.sigmaN * scale
  const pointNY = originY - transformed.tauNT * scale
  const sxHalf = 18 + Math.min(55, Math.abs(sigmaXMPa) * 0.42)
  const syHalf = 18 + Math.min(55, Math.abs(sigmaYMPa) * 0.42)
  const tauHalf = 14 + Math.min(46, Math.abs(tauXYMPa) * 0.42)
  const sxSign = sigmaXMPa < 0 ? -1 : 1
  const sySign = sigmaYMPa < 0 ? -1 : 1
  const tauSign = tauXYMPa < 0 ? -1 : 1

  return (
    <Lab
      title="Transformacja naprężeń i koło Mohra"
      instruction="Obracaj element o kąt θ. Funkcja stressTransform wyznacza σn, σt i τnt, a punkt N na kole Mohra odpowiada obrotowi przekroju o θ — na kole jest to 2θ."
      onReset={() => {
        setSigmaXMPa(80)
        setSigmaYMPa(20)
        setTauXYMPa(40)
        setThetaDeg(30)
      }}
      controls={
        <>
          <Control
            label="Naprężenie σx"
            value={sigmaXMPa}
            min={-100}
            max={150}
            step={5}
            unit="MPa"
            onChange={setSigmaXMPa}
          />
          <Control
            label="Naprężenie σy"
            value={sigmaYMPa}
            min={-100}
            max={150}
            step={5}
            unit="MPa"
            onChange={setSigmaYMPa}
          />
          <Control
            label="Naprężenie τxy"
            value={tauXYMPa}
            min={-100}
            max={100}
            step={5}
            unit="MPa"
            onChange={setTauXYMPa}
          />
          <Control
            label="Obrót elementu θ"
            value={thetaDeg}
            min={-90}
            max={90}
            step={5}
            unit="°"
            onChange={setThetaDeg}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Naprężenie normalne σn" value={fmt(transformed.sigmaN)} unit="MPa" tone="accent" />
          <Metric label="Naprężenie normalne σt" value={fmt(transformed.sigmaT)} unit="MPa" />
          <Metric label="Naprężenie styczne τnt" value={fmt(transformed.tauNT)} unit="MPa" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 760 390"
          width="100%"
          role="img"
          aria-label="Obrócony element naprężeniowy i odpowiadający mu punkt na kole Mohra"
        >
          <title>Transformacja płaskiego stanu naprężenia</title>
          <desc>
            Po lewej element obrócony o theta stopni z osiami n i t. Po prawej koło Mohra w megapaskalach z punktem N o
            współrzędnych sigma n i tau nt.
          </desc>
          <defs>
            <marker
              id="transform-normal-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10z" fill="#ff6b45" />
            </marker>
            <marker
              id="transform-axis-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10z" fill="currentColor" />
            </marker>
            <marker
              id="transform-shear-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10z" fill="#e0a14b" />
            </marker>
          </defs>
          <text x="170" y="28" textAnchor="middle" fontSize="16" fill="currentColor">
            Element po obrocie o θ = {thetaDeg}°
          </text>
          <text x="555" y="28" textAnchor="middle" fontSize="16" fill="currentColor">
            Koło Mohra [MPa]
          </text>
          <line x1="65" y1="180" x2="275" y2="180" stroke="currentColor" strokeDasharray="5 5" opacity="0.35" />
          <line x1="170" y1="75" x2="170" y2="285" stroke="currentColor" strokeDasharray="5 5" opacity="0.35" />
          <text x="280" y="185" fontSize="13" fill="currentColor" opacity="0.65">
            x
          </text>
          <text x="176" y="72" fontSize="13" fill="currentColor" opacity="0.65">
            y
          </text>
          <motion.g
            style={{ transformOrigin: '170px 180px' }}
            animate={{ rotate: thetaDeg }}
            transition={{ type: 'spring', stiffness: 150, damping: 22 }}
          >
            <rect
              x="105"
              y="115"
              width="130"
              height="130"
              fill="#4f6df5"
              fillOpacity="0.14"
              stroke="#4f6df5"
              strokeWidth="3"
            />
            <line
              x1="105"
              y1="180"
              x2={105 - sxSign * sxHalf}
              y2="180"
              stroke="#ff6b45"
              strokeWidth="3"
              markerEnd="url(#transform-normal-arrow)"
            />
            <line
              x1="235"
              y1="180"
              x2={235 + sxSign * sxHalf}
              y2="180"
              stroke="#ff6b45"
              strokeWidth="3"
              markerEnd="url(#transform-normal-arrow)"
            />
            <line
              x1="170"
              y1="115"
              x2="170"
              y2={115 - sySign * syHalf}
              stroke="#e0a14b"
              strokeWidth="3"
              markerEnd="url(#transform-normal-arrow)"
            />
            <line
              x1="170"
              y1="245"
              x2="170"
              y2={245 + sySign * syHalf}
              stroke="#e0a14b"
              strokeWidth="3"
              markerEnd="url(#transform-normal-arrow)"
            />
            <line
              x1={170 - (tauSign * tauHalf) / 2}
              y1="121"
              x2={170 + (tauSign * tauHalf) / 2}
              y2="121"
              stroke="#e0a14b"
              strokeWidth="2.5"
              markerEnd="url(#transform-shear-arrow)"
            />
            <line
              x1={170 + (tauSign * tauHalf) / 2}
              y1="239"
              x2={170 - (tauSign * tauHalf) / 2}
              y2="239"
              stroke="#e0a14b"
              strokeWidth="2.5"
              markerEnd="url(#transform-shear-arrow)"
            />
            <text
              x={170 - sxSign * (sxHalf + 8)}
              y="176"
              fontSize="12"
              fill="#ff6b45"
              textAnchor={sxSign > 0 ? 'end' : 'start'}
            >
              σx
            </text>
            <text x="178" y={115 - sySign * (syHalf + 6)} fontSize="12" fill="#e0a14b">
              σy
            </text>
            <text x={170 + tauSign * (tauHalf / 2 + 6)} y="112" fontSize="12" fill="#e0a14b">
              τ
            </text>
            <line
              x1="170"
              y1="180"
              x2="305"
              y2="180"
              stroke="currentColor"
              strokeWidth="1.5"
              markerEnd="url(#transform-axis-arrow)"
            />
            <line
              x1="170"
              y1="180"
              x2="170"
              y2="45"
              stroke="currentColor"
              strokeWidth="1.5"
              markerEnd="url(#transform-axis-arrow)"
            />
            <text x="310" y="185" fontSize="15" fill="currentColor">
              n
            </text>
            <text x="176" y="43" fontSize="15" fill="currentColor">
              t
            </text>
          </motion.g>
          <text x="170" y="318" textAnchor="middle" fontSize="14" fill="#ff6b45">
            σn = {fmt(transformed.sigmaN)} MPa
          </text>
          <text x="170" y="341" textAnchor="middle" fontSize="14" fill="#e0a14b">
            σt = {fmt(transformed.sigmaT)} MPa
          </text>
          <text x="170" y="364" textAnchor="middle" fontSize="14" fill="currentColor">
            τnt = {fmt(transformed.tauNT)} MPa
          </text>
          <line x1="390" y1={originY} x2="730" y2={originY} stroke="currentColor" strokeWidth="1.5" />
          <line x1={originX} y1="48" x2={originX} y2="326" stroke="currentColor" strokeWidth="1.5" />
          <path d="M730 190l-10-5v10z" fill="currentColor" />
          <path d={`M${originX} 48l-5 10h10z`} fill="currentColor" />
          <text x="738" y="195" fontSize="16" fill="currentColor">
            σ
          </text>
          <text x={originX + 9} y="55" fontSize="16" fill="currentColor">
            τ
          </text>
          <text x="724" y={originY + 22} textAnchor="end" fontSize="11" fill="currentColor">
            0
          </text>
          <motion.circle
            cy={originY}
            fill="#4f6df5"
            fillOpacity="0.12"
            stroke="#4f6df5"
            strokeWidth="3"
            animate={{ cx: centerX, r: radius }}
            transition={{ type: 'spring', stiffness: 150, damping: 23 }}
          />
          <motion.line
            y1={originY}
            stroke="#e0a14b"
            strokeWidth="2"
            strokeDasharray="5 4"
            animate={{ x1: centerX, x2: pointNX, y2: pointNY }}
            transition={{ type: 'spring', stiffness: 150, damping: 23 }}
          />
          <motion.circle
            r="6"
            fill="#ff6b45"
            stroke="white"
            strokeWidth="1.5"
            animate={{ cx: pointNX, cy: pointNY }}
            transition={{ type: 'spring', stiffness: 150, damping: 23 }}
          />
          <circle cx={originX + circle.sigma1MPa * scale} cy={originY} r="4" fill="#27835a" />
          <circle cx={originX + circle.sigma2MPa * scale} cy={originY} r="4" fill="#27835a" />
          <text
            x={originX + circle.sigma1MPa * scale}
            y={originY + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#27835a"
          >
            σ₁
          </text>
          <text
            x={originX + circle.sigma2MPa * scale}
            y={originY + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#27835a"
          >
            σ₂
          </text>
          <text x={centerX} y={originY + 18} textAnchor="middle" fontSize="12" fill="currentColor">
            C = {fmt(circle.centerMPa)}
          </text>
          <text x={pointNX} y={pointNY - 12} textAnchor="middle" fontSize="13" fill="#ff6b45">
            N(σn, τnt)
          </text>
          <text x="555" y="347" textAnchor="middle" fontSize="13" fill="currentColor">
            R = τmax = {fmt(circle.radiusMPa)} MPa
          </text>
          <text x="555" y="370" textAnchor="middle" fontSize="12" fill="currentColor">
            σn + σt = σx + σy = {fmt(sigmaXMPa + sigmaYMPa)} MPa
          </text>
        </svg>
      }
    />
  )
}
