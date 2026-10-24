import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getLesson, lessonIds } from './content/course'
import { toolPaths, type View } from './lib/navigation'
import { Home } from './components/Home'
import { LessonView } from './components/LessonView'
import { Training } from './components/Training'
import { Exam } from './components/Exam'
import { CheatSheet, SyllabusMap } from './components/StudyTools'

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
  return <Home onStart={(id) => navigate(`/lesson/${id}`)} onTool={openTool} />
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

export default function App() {
  return (
    <BrowserRouter useTransitions={false}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/lesson/:lessonId" element={<LessonRoute />} />
        <Route path="/training" element={<TrainingRoute />} />
        <Route path="/exam" element={<ExamRoute />} />
        <Route path="/cheatsheet" element={<CheatSheetRoute />} />
        <Route path="/syllabus" element={<SyllabusRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
