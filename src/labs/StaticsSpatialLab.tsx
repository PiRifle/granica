import { useState } from 'react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { cross3, magnitude3, vector3FromAngles, type Vec3 } from '../lib/statics'
import { staticsColors, staticsMarker } from './StaticsLabsShared'

const AXIS_LENGTH = 5
const VIEWPORT = { width: 720, height: 330, centerX: 360, centerY: 165, paddingX: 40, paddingY: 40 }

const rawProject = (vector: Vec3) => ({
  x: (vector.x - vector.y) * 0.95,
  y: -vector.z * 1.25 + (vector.x + vector.y) * 0.36,
})

export function StaticsSpatialLab() {
  const [magnitude, setMagnitude] = useState(20)
  const [azimuth, setAzimuth] = useState(35)
  const [elevation, setElevation] = useState(25)
  const [position, setPosition] = useState<Vec3>({ x: 2, y: 1, z: 3 })

  const force = vector3FromAngles(magnitude, azimuth, elevation)
  const moment = cross3(position, force)
  const momentMagnitude = magnitude3(moment)

  const forceEndRaw = {
    x: position.x + (force.x / (magnitude || 1)) * 2.2,
    y: position.y + (force.y / (magnitude || 1)) * 2.2,
    z: position.z + (force.z / (magnitude || 1)) * 2.2,
  }

  const rawPoints = [
    { x: 0, y: 0, z: 0 },
    { x: AXIS_LENGTH, y: 0, z: 0 },
    { x: 0, y: AXIS_LENGTH, z: 0 },
    { x: 0, y: 0, z: AXIS_LENGTH },
    position,
    forceEndRaw,
  ].map(rawProject)

  const minX = Math.min(...rawPoints.map((point) => point.x))
  const maxX = Math.max(...rawPoints.map((point) => point.x))
  const minY = Math.min(...rawPoints.map((point) => point.y))
  const maxY = Math.max(...rawPoints.map((point) => point.y))
  const usableWidth = VIEWPORT.width - 2 * VIEWPORT.paddingX
  const usableHeight = VIEWPORT.height - 2 * VIEWPORT.paddingY
  const scale = Math.min(usableWidth / Math.max(maxX - minX, 0.001), usableHeight / Math.max(maxY - minY, 0.001))
  const center = {
    x: VIEWPORT.centerX - ((minX + maxX) / 2) * scale,
    y: VIEWPORT.centerY - ((minY + maxY) / 2) * scale,
  }
  const project = (vector: Vec3) => {
    const point = rawProject(vector)
    return { x: center.x + point.x * scale, y: center.y + point.y * scale }
  }

  const origin = project({ x: 0, y: 0, z: 0 })
  const axisX = project({ x: AXIS_LENGTH, y: 0, z: 0 })
  const axisY = project({ x: 0, y: AXIS_LENGTH, z: 0 })
  const axisZ = project({ x: 0, y: 0, z: AXIS_LENGTH })
  const point = project(position)
  const forceEnd = project(forceEndRaw)

  const updatePosition = (key: keyof Vec3, value: number) => {
    setPosition((current) => ({ ...current, [key]: value }))
  }

  return (
    <Lab
      title="Siła i moment w przestrzeni"
      instruction="Ustaw położenie punktu przyłożenia i kierunek siły. Moment względem początku układu to iloczyn wektorowy M = r × F. Zmieniaj składowe położenia, aby zobaczyć, która składowa momentu rośnie."
      onReset={() => {
        setMagnitude(20)
        setAzimuth(35)
        setElevation(25)
        setPosition({ x: 2, y: 1, z: 3 })
      }}
      controls={
        <>
          <Control label="Moduł F" value={magnitude} min={5} max={40} unit="kN" onChange={setMagnitude} />
          <Control label="Azymut F" value={azimuth} min={0} max={355} step={5} unit="°" onChange={setAzimuth} />
          <Control label="Elewacja F" value={elevation} min={-80} max={80} step={5} unit="°" onChange={setElevation} />
          <Control
            label="Położenie r: x"
            value={position.x}
            min={-3}
            max={5}
            step={0.5}
            unit="m"
            onChange={(value) => updatePosition('x', value)}
          />
          <Control
            label="Położenie r: y"
            value={position.y}
            min={-3}
            max={5}
            step={0.5}
            unit="m"
            onChange={(value) => updatePosition('y', value)}
          />
          <Control
            label="Położenie r: z"
            value={position.z}
            min={0}
            max={5}
            step={0.5}
            unit="m"
            onChange={(value) => updatePosition('z', value)}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Składowe F" value={`${fmt(force.x, 1)} / ${fmt(force.y, 1)} / ${fmt(force.z, 1)}`} unit="kN" />
          <Metric
            label="Moment M = r × F"
            value={`${fmt(moment.x, 1)} / ${fmt(moment.y, 1)} / ${fmt(moment.z, 1)}`}
            unit="kN·m"
            tone="accent"
          />
          <Metric label="Moduł momentu" value={fmt(momentMagnitude, 2)} unit="kN·m" />
        </>
      }
      visual={
        <svg viewBox="0 0 720 330" width="100%" role="img" aria-label="Siła i moment w przestrzeni trójwymiarowej">
          <title>Siła i moment w przestrzeni</title>
          <desc>Osie x, y, z, wektor położenia r, siła F i moment względem początku układu.</desc>
          <defs>
            {staticsMarker('spatial-r', staticsColors.reaction)}
            {staticsMarker('spatial-f', staticsColors.force)}
            {staticsMarker('spatial-axis', staticsColors.neutral)}
          </defs>
          {[
            { end: axisX, label: 'x' },
            { end: axisY, label: 'y' },
            { end: axisZ, label: 'z' },
          ].map((axis) => (
            <g key={axis.label}>
              <line
                x1={origin.x}
                y1={origin.y}
                x2={axis.end.x}
                y2={axis.end.y}
                stroke={staticsColors.axis}
                strokeWidth="2"
                markerEnd="url(#spatial-axis)"
              />
              <text x={axis.end.x + 8} y={axis.end.y + 4} fontSize="14" fill="currentColor">
                {axis.label}
              </text>
            </g>
          ))}
          <line
            x1={origin.x}
            y1={origin.y}
            x2={point.x}
            y2={point.y}
            stroke={staticsColors.reaction}
            strokeWidth="3"
            markerEnd="url(#spatial-r)"
          />
          <text x={point.x + 6} y={point.y - 8} fontSize="13" fill={staticsColors.reaction}>
            r = ({fmt(position.x, 1)}, {fmt(position.y, 1)}, {fmt(position.z, 1)}) m
          </text>
          <line
            x1={point.x}
            y1={point.y}
            x2={forceEnd.x}
            y2={forceEnd.y}
            stroke={staticsColors.force}
            strokeWidth="4"
            markerEnd="url(#spatial-f)"
          />
          <text x={forceEnd.x + 6} y={forceEnd.y - 8} fontSize="13" fill={staticsColors.force}>
            F = {fmt(magnitude, 0)} kN
          </text>
          <line
            x1={origin.x}
            y1={origin.y}
            x2={point.x}
            y2={point.y}
            stroke={staticsColors.reaction}
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          <line
            x1={point.x}
            y1={point.y}
            x2={point.x}
            y2={origin.y}
            stroke={staticsColors.axis}
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.45"
          />
          <circle cx={origin.x} cy={origin.y} r="4" fill="currentColor" />
          <text x={origin.x - 12} y={origin.y + 18} fontSize="13" fill="currentColor">
            O
          </text>
          <text x="360" y="318" textAnchor="middle" fontSize="13" fill="currentColor">
            M = r × F = (r_yF_z − r_zF_y, r_zF_x − r_xF_z, r_xF_y − r_yF_x)
          </text>
        </svg>
      }
    />
  )
}
