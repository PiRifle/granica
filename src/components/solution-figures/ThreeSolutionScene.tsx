import { useEffect, useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import type { SolutionAnimationProps } from '../../types'
import { local } from './shared'
import styles from './ThreeSolutionScene.module.css'

export type Vec3 = readonly [number, number, number]

type PrimitiveBase = {
  color?: string
  visibleAt?: number
  hideAt?: number
  opacity?: number
  pulse?: boolean
}

export type ThreePrimitive =
  | (PrimitiveBase & { kind: 'rod'; from: Vec3; to: Vec3; radius?: number; dashed?: boolean })
  | (PrimitiveBase & { kind: 'line'; points: Vec3[]; dashed?: boolean })
  | (PrimitiveBase & { kind: 'arrow'; from: Vec3; to: Vec3; radius?: number })
  | (PrimitiveBase & {
      kind: 'disc'
      at: Vec3
      radius: number
      thickness?: number
      axis?: Vec3
      spin?: number
    })
  | (PrimitiveBase & { kind: 'ring'; at: Vec3; radius: number; tube?: number; axis?: Vec3 })
  | (PrimitiveBase & { kind: 'plate'; points: Vec3[] })
  | (PrimitiveBase & { kind: 'box'; at: Vec3; size: Vec3 })
  | (PrimitiveBase & { kind: 'sphere'; at: Vec3; radius?: number })
  | (PrimitiveBase & { kind: 'support'; at: Vec3; support?: 'pin' | 'roller' | 'fixed' })

export type ThreeLabel = {
  id: string
  text: string
  at: Vec3
  color?: string
  size?: number
  weight?: number
  anchor?: 'start' | 'middle' | 'end'
  offset?: readonly [number, number]
  visibleAt?: number
  hideAt?: number
}

export type ThreeCamera = {
  position?: Vec3
  target?: Vec3
  viewSize?: number
}

type Props = Pick<SolutionAnimationProps, 'index' | 'playing' | 'sceneProgress'> & {
  label: string
  primitives: ThreePrimitive[]
  labels?: ThreeLabel[]
  camera?: ThreeCamera
  children?: ReactNode
}

const DEFAULT_COLOR = '#556273'
const vector = (value: Vec3) => new THREE.Vector3(...value)
const clamp01 = (value: number) => Math.max(0, Math.min(1, value))

function material(color: string, opacity = 1) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.72,
    metalness: 0.04,
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
  })
}

function addRod(group: THREE.Group, from: Vec3, to: Vec3, radius: number, color: string, opacity: number) {
  const start = vector(from)
  const end = vector(to)
  const direction = end.clone().sub(start)
  const length = direction.length()
  if (length < 1e-6) return
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 12), material(color, opacity))
  mesh.position.copy(start).add(end).multiplyScalar(0.5)
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())
  group.add(mesh)
}

function addArrow(group: THREE.Group, from: Vec3, to: Vec3, radius: number, color: string, opacity: number) {
  const start = vector(from)
  const end = vector(to)
  const direction = end.clone().sub(start)
  const length = direction.length()
  if (length < 1e-6) return
  const unit = direction.clone().normalize()
  const headLength = Math.min(length * 0.32, Math.max(radius * 7, length * 0.16))
  addRod(group, from, end.clone().addScaledVector(unit, -headLength).toArray(), radius, color, opacity)
  const head = new THREE.Mesh(new THREE.ConeGeometry(radius * 3.1, headLength, 16), material(color, opacity))
  head.position.copy(end).addScaledVector(unit, -headLength / 2)
  head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), unit)
  group.add(head)
}

function buildPrimitive(definition: ThreePrimitive) {
  const group = new THREE.Group()
  const color = definition.color ?? DEFAULT_COLOR
  const opacity = definition.opacity ?? 1

  if (definition.kind === 'rod') {
    if (definition.dashed) {
      const geometry = new THREE.BufferGeometry().setFromPoints([vector(definition.from), vector(definition.to)])
      const line = new THREE.Line(
        geometry,
        new THREE.LineDashedMaterial({ color, dashSize: 0.12, gapSize: 0.09, transparent: true, opacity }),
      )
      line.computeLineDistances()
      group.add(line)
    } else {
      addRod(group, definition.from, definition.to, definition.radius ?? 0.025, color, opacity)
    }
  } else if (definition.kind === 'line') {
    const geometry = new THREE.BufferGeometry().setFromPoints(definition.points.map(vector))
    const lineMaterial = definition.dashed
      ? new THREE.LineDashedMaterial({ color, dashSize: 0.12, gapSize: 0.09, transparent: true, opacity })
      : new THREE.LineBasicMaterial({ color, transparent: true, opacity })
    const line = new THREE.Line(geometry, lineMaterial)
    if (definition.dashed) line.computeLineDistances()
    group.add(line)
  } else if (definition.kind === 'arrow') {
    addArrow(group, definition.from, definition.to, definition.radius ?? 0.025, color, opacity)
  } else if (definition.kind === 'disc') {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(definition.radius, definition.radius, definition.thickness ?? 0.06, 48),
      material(color, opacity),
    )
    group.add(mesh)
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(Math.max(0.012, definition.radius * 0.07), 12, 8),
      material('#4f6df5', opacity),
    )
    marker.position.set(definition.radius * 0.65, (definition.thickness ?? 0.06) / 2 + 0.012, 0)
    group.add(marker)
    group.position.copy(vector(definition.at))
    group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vector(definition.axis ?? [0, 1, 0]).normalize())
    group.userData.spin = definition.spin
  } else if (definition.kind === 'ring') {
    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(definition.radius, definition.tube ?? 0.025, 12, 48),
      material(color, opacity),
    )
    group.add(mesh)
    group.position.copy(vector(definition.at))
    group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), vector(definition.axis ?? [0, 1, 0]).normalize())
  } else if (definition.kind === 'plate') {
    const points = definition.points.map(vector)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const indices = points.slice(2).flatMap((_, index) => [0, index + 1, index + 2])
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    group.add(new THREE.Mesh(geometry, material(color, opacity)))
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry),
      new THREE.LineBasicMaterial({ color: '#68727e', transparent: true, opacity: Math.min(1, opacity + 0.15) }),
    )
    group.add(edges)
  } else if (definition.kind === 'box') {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...definition.size), material(color, opacity))
    mesh.position.copy(vector(definition.at))
    group.add(mesh)
  } else if (definition.kind === 'sphere') {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(definition.radius ?? 0.055, 20, 14), material(color, opacity))
    mesh.position.copy(vector(definition.at))
    group.add(mesh)
  } else if (definition.kind === 'support') {
    const at = vector(definition.at)
    if (definition.support === 'fixed') {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.7, 0.7), material('#aab4bf', 0.7))
      wall.position.copy(at).add(new THREE.Vector3(-0.05, 0, 0))
      group.add(wall)
    } else {
      const support = new THREE.Mesh(
        new THREE.ConeGeometry(0.07, 0.14, definition.support === 'roller' ? 24 : 3),
        material('#68727e', opacity),
      )
      support.position.copy(at).add(new THREE.Vector3(0, 0, -0.08))
      support.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1))
      group.add(support)
      if (definition.support === 'roller') {
        const roller = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 12), material('#68727e', opacity))
        roller.position.copy(at).add(new THREE.Vector3(0, 0, -0.17))
        group.add(roller)
      }
    }
  }

  group.userData.definition = definition
  group.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      for (const entry of materials) entry.userData.baseOpacity = entry.opacity
    }
  })
  return group
}

export function ThreeSolutionScene({
  label,
  primitives,
  labels = [],
  camera = {},
  index,
  playing,
  sceneProgress,
  children,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<SVGSVGElement>(null)
  const primitivesRef = useRef(primitives)
  const controlsRef = useRef<OrbitControls | null>(null)
  const autoRotateRef = useRef(false)
  const currentRef = useRef({ index, playing, sceneProgress, labels })
  const [autoRotate, setAutoRotate] = useState(false)
  const [webglError, setWebglError] = useState(false)
  currentRef.current = { index, playing, sceneProgress, labels }
  autoRotateRef.current = autoRotate

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    } catch {
      setWebglError(true)
      return
    }

    setWebglError(false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0xffffff, 0)
    renderer.domElement.setAttribute('role', 'img')
    renderer.domElement.setAttribute('aria-label', label)
    renderer.domElement.dataset.threeCanvas = 'true'
    host.prepend(renderer.domElement)

    const scene = new THREE.Scene()
    scene.add(new THREE.HemisphereLight(0xffffff, 0xb8c2ce, 2.2))
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
    keyLight.position.set(4, -6, 10)
    scene.add(keyLight)
    const fillLight = new THREE.DirectionalLight(0xdde7ff, 0.8)
    fillLight.position.set(-6, 4, 2)
    scene.add(fillLight)

    const aspect = 460 / 340
    const viewSize = camera.viewSize ?? 6
    const viewCamera = new THREE.OrthographicCamera(
      (-viewSize * aspect) / 2,
      (viewSize * aspect) / 2,
      viewSize / 2,
      -viewSize / 2,
      0.01,
      500,
    )
    viewCamera.up.set(0, 0, 1)
    viewCamera.position.copy(vector(camera.position ?? [7, -9, 7]))
    const target = vector(camera.target ?? [0, 0, 0])
    viewCamera.lookAt(target)

    const controls = new OrbitControls(viewCamera, renderer.domElement)
    controls.target.copy(target)
    controls.enableDamping = true
    controls.dampingFactor = 0.09
    controls.rotateSpeed = 0.65
    controls.zoomSpeed = 0.8
    controls.minZoom = 0.55
    controls.maxZoom = 3.5
    controls.autoRotateSpeed = 0.75
    controls.update()
    controls.saveState()
    controlsRef.current = controls

    const groups = primitivesRef.current.map((definition) => {
      const group = buildPrimitive(definition)
      scene.add(group)
      return group
    })

    let needsRender = true
    const invalidate = () => {
      needsRender = true
    }
    controls.addEventListener('change', invalidate)
    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = Math.max(1, entry.contentRect.width)
      const height = Math.max(1, entry.contentRect.height)
      renderer.setSize(width, height, false)
      const nextAspect = width / height
      viewCamera.left = (-viewSize * nextAspect) / 2
      viewCamera.right = (viewSize * nextAspect) / 2
      viewCamera.updateProjectionMatrix()
      invalidate()
    })
    resizeObserver.observe(host)

    const projected = new THREE.Vector3()
    const renderLabels = () => {
      const overlay = overlayRef.current
      if (!overlay) return
      for (const item of currentRef.current.labels) {
        const element = overlay.querySelector<SVGTextElement>(`[data-three-label="${item.id}"]`)
        if (!element) continue
        projected.copy(vector(item.at)).project(viewCamera)
        element.setAttribute('x', String((projected.x * 0.5 + 0.5) * 460 + (item.offset?.[0] ?? 0)))
        element.setAttribute('y', String((-projected.y * 0.5 + 0.5) * 340 + (item.offset?.[1] ?? 0)))
      }
    }

    let frame = 0
    let previousTime = performance.now()
    const tick = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05)
      previousTime = time
      const current = currentRef.current
      controls.autoRotate = autoRotateRef.current
      const controlsChanged = controls.update(delta)
      let animating = false
      const reveal = current.playing ? clamp01(current.sceneProgress * 4) : 1

      for (const group of groups) {
        const definition = group.userData.definition as ThreePrimitive
        const visibleAt = definition.visibleAt ?? 0
        const hideAt = definition.hideAt ?? Number.POSITIVE_INFINITY
        group.visible = current.index >= visibleAt && current.index < hideAt
        if (!group.visible) continue
        const groupReveal = visibleAt === current.index && current.index > 0 ? 0.25 + reveal * 0.75 : 1
        const pulse = definition.pulse && current.playing ? 0.78 + Math.sin(time * 0.004) * 0.22 : 1
        group.traverse((child) => {
          if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
            const materials = Array.isArray(child.material) ? child.material : [child.material]
            for (const entry of materials) entry.opacity = (entry.userData.baseOpacity ?? 1) * groupReveal * pulse
          }
        })
        if (definition.pulse && current.playing) animating = true
        if (group.userData.spin && current.playing) {
          group.rotateY(group.userData.spin * delta)
          animating = true
        }
        if (groupReveal < 1) animating = true
      }

      if (needsRender || controlsChanged || animating || autoRotateRef.current) {
        renderLabels()
        renderer.render(scene, viewCamera)
        needsRender = false
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      controls.removeEventListener('change', invalidate)
      controls.dispose()
      controlsRef.current = null
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.Line) {
          child.geometry.dispose()
          const materials = Array.isArray(child.material) ? child.material : [child.material]
          for (const entry of materials) entry.dispose()
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <div className={styles.scene} ref={hostRef} role="group" aria-label={label} data-three-scene>
          <div className={styles.toolbar} role="group" aria-label="Sterowanie widokiem 3D">
            <button type="button" onClick={() => controlsRef.current?.reset()} title="Przywróć początkowy widok">
              Reset
            </button>
            <button
              type="button"
              className={autoRotate ? styles.active : undefined}
              aria-pressed={autoRotate}
              onClick={() => setAutoRotate((value) => !value)}
              title="Włącz lub wyłącz automatyczny obrót"
            >
              Obrót
            </button>
          </div>
          <span className={styles.hint}>przeciągnij · scroll = zoom</span>
          {webglError && <span className={styles.fallback}>WebGL jest niedostępny w tej przeglądarce.</span>}
          <svg ref={overlayRef} className={styles.overlay} viewBox="0 0 460 340" aria-hidden="true">
            {!webglError &&
              labels.map((item) =>
                index >= (item.visibleAt ?? 0) && index < (item.hideAt ?? Number.POSITIVE_INFINITY) ? (
                  <text
                    key={item.id}
                    data-three-label={item.id}
                    fill={item.color ?? '#17202a'}
                    fontSize={item.size ?? 10}
                    fontWeight={item.weight ?? 600}
                    textAnchor={item.anchor ?? 'start'}
                  >
                    {item.text}
                  </text>
                ) : null,
              )}
            {children}
          </svg>
        </div>
      </div>
    </div>
  )
}
