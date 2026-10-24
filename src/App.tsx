import { lazy, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getLesson, getModule, lessonIds, modules } from './content/course'
import { toolPaths, type View } from './lib/navigation'
import { Home } from './components/Home'
import { LessonView } from './components/LessonView'
import { ModuleView } from './components/ModuleView'
import { Library } from './components/Library'
import { Training } from './components/Training'
import { Exam } from './components/Exam'
import { CheatSheet, SyllabusMap } from './components/StudyTools'

const LabDebug = import.meta.env.DEV
  ? lazy(() => import('./components/LabDebug').then((module) => ({ default: module.LabDebug })))
  : null

const SolutionDebug = import.meta.env.DEV
  ? lazy(() => import('./components/SolutionDebug').then((module) => ({ default: module.SolutionDebug })))
  : null

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function HomeRoute() {
  const navigate = useNavigate()
  const openTool = (view: View) => navigate(view === 'home' || view === 'lesson' ? '/' : toolPaths[view])
  return (
    <Home onStart={(id) => navigate(`/lesson/${id}`)} onModule={(id) => navigate(`/module/${id}`)} onTool={openTool} />
  )
}

function ModuleRoute() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  if (!moduleId || !modules.some((module) => module.id === moduleId)) return <Navigate to="/" replace />
  return (
    <ModuleView
      module={getModule(moduleId)}
      onBack={() => navigate('/')}
      onLesson={(id) => navigate(`/lesson/${id}`)}
    />
  )
}

function LessonRoute() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  if (!lessonId || !lessonIds.includes(lessonId)) return <Navigate to="/" replace />
  const openTool = (view: View) => navigate(view === 'home' || view === 'lesson' ? '/' : toolPaths[view])
  return (
    <LessonView
      lesson={getLesson(lessonId)}
      onHome={() => navigate('/')}
      onLesson={(id) => navigate(`/lesson/${id}`)}
      onModule={(id) => navigate(`/module/${id}`)}
      onTool={openTool}
    />
  )
}

function TrainingRoute() {
  const navigate = useNavigate()
  return <Training onBack={() => navigate('/')} />
}

function ExamRoute() {
  const navigate = useNavigate()
  return <Exam onBack={() => navigate('/')} />
}

function CheatSheetRoute() {
  const navigate = useNavigate()
  return <CheatSheet onBack={() => navigate('/')} />
}

function SyllabusRoute() {
  const navigate = useNavigate()
  return <SyllabusMap onBack={() => navigate('/')} />
}

function LibraryRoute() {
  const navigate = useNavigate()
  return <Library onBack={() => navigate('/')} onModule={(id) => navigate(`/module/${id}`)} />
}

function LabDebugRoute() {
  const navigate = useNavigate()
  if (!LabDebug) return <Navigate to="/" replace />
  return <LabDebug onBack={() => navigate('/')} />
}

function SolutionDebugRoute() {
  const navigate = useNavigate()
  if (!SolutionDebug) return <Navigate to="/" replace />
  return <SolutionDebug onBack={() => navigate('/')} />
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export default function App() {
  return (
    <BrowserRouter basename={basename} useTransitions={false}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/lesson/:lessonId" element={<LessonRoute />} />
        <Route path="/module/:moduleId" element={<ModuleRoute />} />
        <Route path="/training" element={<TrainingRoute />} />
        <Route path="/exam" element={<ExamRoute />} />
        <Route path="/cheatsheet" element={<CheatSheetRoute />} />
        <Route path="/syllabus" element={<SyllabusRoute />} />
        <Route path="/biblioteka" element={<LibraryRoute />} />
        {import.meta.env.DEV && <Route path="/debug/labs" element={<LabDebugRoute />} />}
        {import.meta.env.DEV && <Route path="/debug/solutions" element={<SolutionDebugRoute />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
