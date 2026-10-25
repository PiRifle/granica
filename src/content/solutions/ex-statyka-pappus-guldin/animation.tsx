import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const INK = '#17202a'
const MUTED = '#87929d'
const AXIS = '#9aa5b1'
const DISC = '#4f6df5'
const ARC = '#ff6b45'
const CENTROID = '#27835a'
const VSPHERE = '#6e86cf'

const CX = 200
const CY = 190
const R = 100
const DISC_CENTROID_Y = CY - (4 * 20 * 5) / (3 * Math.PI)
const ARC_CENTROID_Y = CY - (2 * 20 * 5) / Math.PI

const halfDisc = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY} Z`
const halfArc = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`

export function PappusGuldinAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const draw = Math.min(1, 0.25 + p * 1.3)
  const showDiscCentroid = index >= 1
  const showSphere = index >= 2
  const showVolume = index >= 2
  const showVolumeCheck = index >= 3
  const showArc = index >= 4
  const showSurface = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Twierdzenia Pappusa-Guldina dla kuli">
          <title>Objętość i powierzchnia kuli z twierdzeń Pappusa-Guldina</title>
          <desc>Półkole i półokrąg obracane wokół średnicy, centroidy, objętość i powierzchnia kuli.</desc>

          <line x1="60" y1={CY} x2="340" y2={CY} stroke={AXIS} strokeWidth="1.6" strokeDasharray="7 4" />
          <text x="66" y={CY + 18} fontSize="9.5" fill={MUTED}>
            oś obrotu
          </text>

          <motion.path
            d={halfDisc}
            fill={DISC}
            fillOpacity={showArc ? 0.05 : 0.22}
            stroke={DISC}
            strokeWidth={showArc ? 1.2 : 2.4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {showSphere && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: showArc ? 0.35 : 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <circle cx={CX} cy={CY} r={R} fill={VSPHERE} fillOpacity="0.13" stroke={VSPHERE} strokeWidth="1.6" />
              <ellipse cx={CX} cy={CY} rx={R} ry="24" fill="none" stroke={VSPHERE} strokeWidth="1" opacity="0.55" />
              <ellipse cx={CX} cy={CY} rx="32" ry={R} fill="none" stroke={VSPHERE} strokeWidth="1" opacity="0.55" />
              <ellipse cx={CX} cy={CY} rx="66" ry={R} fill="none" stroke={VSPHERE} strokeWidth="1" opacity="0.4" />
              <motion.ellipse
                cx={CX}
                cy={CY}
                rx="14"
                ry={R}
                fill="none"
                stroke={VSPHERE}
                strokeWidth="1.1"
                strokeDasharray="4 4"
                opacity="0.7"
                animate={{ rotate: playing ? 360 : 0 }}
                transition={{ duration: 6, repeat: playing ? Infinity : 0, ease: 'linear' }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
              {showSurface && (
                <>
                  <ellipse
                    cx={CX}
                    cy={CY - 50}
                    rx="86"
                    ry="11"
                    fill="none"
                    stroke={VSPHERE}
                    strokeWidth="0.8"
                    opacity="0.4"
                  />
                  <ellipse
                    cx={CX}
                    cy={CY + 50}
                    rx="86"
                    ry="11"
                    fill="none"
                    stroke={VSPHERE}
                    strokeWidth="0.8"
                    opacity="0.4"
                  />
                  <ellipse
                    cx={CX}
                    cy={CY - 80}
                    rx="60"
                    ry="7"
                    fill="none"
                    stroke={VSPHERE}
                    strokeWidth="0.8"
                    opacity="0.35"
                  />
                  <ellipse
                    cx={CX}
                    cy={CY + 80}
                    rx="60"
                    ry="7"
                    fill="none"
                    stroke={VSPHERE}
                    strokeWidth="0.8"
                    opacity="0.35"
                  />
                </>
              )}
            </motion.g>
          )}

          <line x1={CX} y1={CY} x2={CX} y2={CY - R} stroke={MUTED} strokeWidth="1.2" />
          <text x={CX + 7} y={CY - 52} fontSize="9.5" fill={MUTED}>
            r = 20 mm
          </text>

          {showDiscCentroid && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <line
                x1={CX - 46}
                y1={DISC_CENTROID_Y}
                x2={CX + 46}
                y2={DISC_CENTROID_Y}
                stroke={CENTROID}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <circle cx={CX} cy={DISC_CENTROID_Y} r="5" fill="#fff" stroke={CENTROID} strokeWidth="2.2" />
              <text x={CX + 12} y={DISC_CENTROID_Y - 7} fontSize="10" fontWeight="700" fill={CENTROID}>
                r̄ = 8,49 mm
              </text>
              <text x={CX + 12} y={DISC_CENTROID_Y + 8} fontSize="9" fill={CENTROID}>
                centroid półkola: 4r/3π
              </text>
              <text x={CX + 70} y={CY + 74} fontSize="9.5" fill={DISC}>
                A = 628,32 mm²
              </text>
            </motion.g>
          )}

          {showVolume && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <text x={CX + 118} y="76" fontSize="11" fontWeight="700" fill={VSPHERE}>
                V = 33 510 mm³
              </text>
              <text x={CX + 118} y="92" fontSize="9" fill={VSPHERE}>
                kula z obrotu półkola
              </text>
              <path
                d={`M ${CX - R - 22} ${CY - 62} A ${R + 22} ${R + 22} 0 0 1 ${CX - R + 4} ${CY - R + 8}`}
                fill="none"
                stroke={DISC}
                strokeWidth="1.4"
                strokeDasharray="5 4"
                opacity="0.75"
              />
              <text x={CX - R - 34} y={CY - 80} fontSize="9" fill={DISC}>
                2π
              </text>
            </motion.g>
          )}

          {showVolumeCheck && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <text x={CX + 118} y="116" fontSize="9" fill={CENTROID}>
                kontrola: 4πr³/3 ✓
              </text>
            </motion.g>
          )}

          {showArc && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <motion.path
                d={halfArc}
                fill="none"
                stroke={ARC}
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={CX - 46}
                y1={ARC_CENTROID_Y}
                x2={CX + 46}
                y2={ARC_CENTROID_Y}
                stroke={CENTROID}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <circle cx={CX} cy={ARC_CENTROID_Y} r="5" fill="#fff" stroke={CENTROID} strokeWidth="2.2" />
              <text x={CX + 12} y={ARC_CENTROID_Y - 7} fontSize="10" fontWeight="700" fill={CENTROID}>
                r̄ = 12,73 mm
              </text>
              <text x={CX + 12} y={ARC_CENTROID_Y + 8} fontSize="9" fill={CENTROID}>
                centroid łuku: 2r/π
              </text>
              <text x={CX - 92} y={CY - R - 14} fontSize="9.5" fill={ARC}>
                L = πr = 62,83 mm
              </text>
            </motion.g>
          )}

          {showSurface && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <text x={CX + 118} y="270" fontSize="11" fontWeight="700" fill={VSPHERE}>
                S = 5 026,5 mm²
              </text>
              <text x={CX + 118} y="286" fontSize="9" fill={CENTROID}>
                kontrola: 4πr² ✓
              </text>
            </motion.g>
          )}

          <text x="230" y="330" textAnchor="middle" fontSize="10" fill={INK}>
            {showSurface
              ? 'Linia daje powierzchnię, figura daje objętość — to dwa różne twierdzenia'
              : showArc
                ? 'Półokrąg ma inny centroid niż półkole'
                : 'Twierdzenie: miara obiektu razy droga centroidu'}
          </text>
        </svg>
      </div>
    </div>
  )
}
