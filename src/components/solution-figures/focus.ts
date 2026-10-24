import type { SolutionFigure, SolutionScene } from '../../types'

export interface Focus {
  metric?: string
  segment?: string
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\varepsilon/g, 'ε')
    .replace(/\\sigma/g, 'σ')
}

export function inferFocus(scene: SolutionScene, figure: SolutionFigure): Focus {
  const text = normalizeText(`${scene.title} ${scene.narration} ${scene.formula ?? ''}`)
  const title = normalizeText(scene.title)

  if (figure.kind === 'axial') {
    const hasThermal = figure.segments.some((segment) => segment.freeDeltaL != null)
    const metricFrom = (value: string) => {
      if (/αδt/.test(value) || (/α/.test(value) && /delta|δt/.test(value))) return 'αΔT'
      if (hasThermal && /swobod|termiczn|składow|l_t/.test(value)) return 'ΔL_T'
      if (/wydłuż|przemieszcz|delta\s*l|δl|Δl/.test(value)) return 'ΔL'
      if (/odkształ|epsilon|ε/.test(value)) return 'ε'
      if (/napręż|sigma|σ/.test(value)) return 'σ'
      if (/pole|pola|mm²|cm²|a_1|a₁/.test(value)) return 'A'
      if (/reakcj|metoda przekroj|wykres n|równowag|n_|n\(/.test(value)) return 'N'
      return undefined
    }
    const metric = metricFrom(title) ?? metricFrom(text)

    const mentioned = figure.segments.filter(
      (segment) =>
        text.includes(segment.id.toLowerCase()) ||
        text.includes(segment.label.toLowerCase()) ||
        text.includes(segment.label.replace(/[ąę]/g, '').toLowerCase()),
    )
    let segment: string | undefined
    if (mentioned.length === 1) segment = mentioned[0].id
    else if (/doln/.test(title)) segment = figure.segments[figure.segments.length - 1]?.id
    else if (/górn/.test(title)) segment = figure.segments[0]?.id
    else if (/środk/.test(title) && figure.segments.length >= 3) segment = figure.segments[1]?.id
    return { metric, segment }
  }

  if (figure.kind === 'beam') {
    let metric: string | undefined
    if (/reakcj/.test(title)) metric = 'reaction'
    else if (/wskaźnik|średnic|dobór|warunek|wytrzymałości/.test(title)) metric = 'design'
    else if (/moment/.test(title)) metric = 'M'
    else if (/poprzecz|siła t|t\(x\)|tnąc/.test(title)) metric = 'T'
    else if (/obciąż|wypadkow/.test(title)) metric = 'load'
    else if (/r_|reakcj/.test(text)) metric = 'reaction'
    else if (/t_|t\(|poprzecz/.test(text)) metric = 'T'
    else if (/m_|m\(|moment/.test(text)) metric = 'M'
    return { metric }
  }

  if (figure.kind === 'section') {
    let metric: string | undefined
    if (/moment względem osi y|i_y|oś y|osi y/.test(title)) metric = 'Iy'
    else if (/moment względem osi x|i_x|steiner|przenieś moment|zsumuj moment względem osi x/.test(title)) metric = 'Ix'
    else if (/środek ciężkości|centroid|y_c|centroidy/.test(title)) metric = 'centroid'
    else if (/pole|pola/.test(title)) metric = 'section'
    else if (/zinterpret/.test(title)) metric = 'centroid'
    else if (/i_y/.test(text)) metric = 'Iy'
    else if (/i_x|steiner/.test(text)) metric = 'Ix'
    else if (/y_c|centroid/.test(text)) metric = 'centroid'
    else if (/a_g|a_s|a_d|pole|a=/.test(text)) metric = 'section'
    return { metric }
  }

  if (figure.kind === 'cube') {
    let metric: string | undefined
    if (/warunk|więz|brzeg/.test(title)) metric = 'constraints'
    else if (/objętoś/.test(title)) metric = 'volume'
    else if (/napręż|nacisk|sigma|σ/.test(title)) metric = 'stress'
    else if (/odkształ|epsilon|ε/.test(title)) metric = 'strain'
    else if (/objętoś|delta v|Δv|θ/.test(text)) metric = 'volume'
    else if (/odkształ|epsilon|varepsilon|ε/.test(text)) metric = 'strain'
    else if (/napręż|sigma|σ|nacisk/.test(text)) metric = 'stress'
    return { metric }
  }

  let metric: string | undefined
  if (/postaciow/.test(title)) metric = 'shear'
  else if (/kierunk|kąt|φ/.test(title)) metric = 'angle'
  else if (/napręż|sigma|σ/.test(title)) metric = 'stress'
  else if (/główne/.test(title)) metric = 'principal'
  else if (/środek|promień|koło/.test(title)) metric = 'mohr'
  else if (/odczyty|przypisz|osie|pomiar/.test(title)) metric = 'gauges'
  else if (/r_ε|ε_sr|ε_\{?sr/.test(text)) metric = 'mohr'
  else if (/postaciow|gamma|γ/.test(text)) metric = 'shear'
  else if (/kierunk|kąt|φ|angle/.test(text)) metric = 'angle'
  else if (/napręż|sigma|σ/.test(text)) metric = 'stress'
  else if (/główne|principal/.test(text)) metric = 'principal'
  return { metric }
}

const FOCUS_DEFAULTS: Record<SolutionFigure['kind'], string> = {
  axial: 'N',
  beam: 'M',
  section: 'section',
  cube: 'constraints',
  rosette: 'gauges',
}

export function resolveFocus(scene: SolutionScene, figure: SolutionFigure): Focus {
  const inferred = inferFocus(scene, figure)
  return {
    metric: scene.focus?.metric ?? inferred.metric ?? FOCUS_DEFAULTS[figure.kind],
    segment: scene.focus?.segment ?? inferred.segment,
  }
}
