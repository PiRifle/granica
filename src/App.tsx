import { lazy, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { courses, defaultCourse, findCourse, getCourseForLesson, getCourseForModule } from './content/course'
import type { Course, CourseTool } from './types'
import { courseLessonPath, courseModulePath, coursePath, courseToolPath } from './lib/navigation'
import { useCourseStore } from './store'
import { Landing } from './components/Landing'
import { Home } from './components/Home'
import { LessonView } from './components/LessonView'
import { ModuleView } from './components/ModuleView'
import { Library } from './components/Library'
import { Training } from './components/Training'
import { Exam } from './components/Exam'
import { CheatSheet, SyllabusMap } from './components/StudyTools'
import { CourseToolPlaceholder } from './components/CourseToolPlaceholder'
import { Issues } from './components/Issues'

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

function useCourseParam(): Course | undefined {
  const { courseId } = useParams()
  return findCourse(courseId)
}

function useCourseNavigation(course: Course) {
  const navigate = useNavigate()
  return {
    home: () => navigate(coursePath(course.id)),
    lesson: (id: string) => navigate(courseLessonPath(course.id, id)),
    module: (id: string) => navigate(courseModulePath(course.id, id)),
    tool: (view: CourseTool) => navigate(courseToolPath(course.id, view)),
  }
}

function LandingRoute() {
  const navigate = useNavigate()
  const { lastCourseId, lastLessonByCourse } = useCourseStore()
  const resume = () => {
    const course = findCourse(lastCourseId) ?? defaultCourse
    const stored = lastLessonByCourse[course.id]
    const lesson = course.lessons.find((entry) => entry.id === stored) ?? course.lessons[0]
    navigate(lesson ? courseLessonPath(course.id, lesson.id) : coursePath(course.id))
  }
  const firstLesson = defaultCourse.lessons[0]
  return (
    <Landing
      onCourse={(id) => navigate(coursePath(id))}
      onResume={resume}
      onFirstLesson={() =>
        firstLesson
          ? navigate(courseLessonPath(defaultCourse.id, firstLesson.id))
          : navigate(coursePath(defaultCourse.id))
      }
    />
  )
}

function CourseHomeRoute() {
  const course = useCourseParam()
  const navigate = useNavigate()
  if (!course) return <Navigate to="/" replace />
  const nav = useCourseNavigation(course)
  return (
    <Home
      course={course}
      onStart={nav.lesson}
      onModule={nav.module}
      onTool={nav.tool}
      onCourses={() => navigate('/')}
      onCourse={(id) => navigate(coursePath(id))}
    />
  )
}

function ModuleRoute() {
  const course = useCourseParam()
  const { moduleId } = useParams()
  const navigate = useNavigate()
  if (!course) return <Navigate to="/" replace />
  const nav = useCourseNavigation(course)
  const module = course.modules.find((entry) => entry.id === moduleId)
  if (!module) return <Navigate to={coursePath(course.id)} replace />
  return <ModuleView course={course} module={module} onBack={nav.home} onLesson={nav.lesson} onModule={nav.module} />
}

function LessonRoute() {
  const course = useCourseParam()
  const { lessonId } = useParams()
  const navigate = useNavigate()
  if (!course) return <Navigate to="/" replace />
  const nav = useCourseNavigation(course)
  const lesson = course.lessons.find((entry) => entry.id === lessonId)
  if (!lesson) return <Navigate to={coursePath(course.id)} replace />
  return (
    <LessonView
      course={course}
      lesson={lesson}
      onHome={nav.home}
      onLesson={nav.lesson}
      onModule={nav.module}
      onTool={nav.tool}
    />
  )
}

function TrainingRoute() {
  const course = useCourseParam()
  if (!course) return <Navigate to="/" replace />
  const nav = useCourseNavigation(course)
  if (!course.tools.training) return <CourseToolPlaceholder course={course} tool="training" onBack={nav.home} />
  return <Training course={course} onBack={nav.home} />
}

function ExamRoute() {
  const course = useCourseParam()
  if (!course) return <Navigate to="/" replace />
  const nav = useCourseNavigation(course)
  if (!course.tools.exam) return <CourseToolPlaceholder course={course} tool="exam" onBack={nav.home} />
  return <Exam course={course} onBack={nav.home} />
}

function CheatSheetRoute() {
  const course = useCourseParam()
  if (!course) return <Navigate to="/" replace />
  const nav = useCourseNavigation(course)
  if (!course.tools.cheatsheet) return <CourseToolPlaceholder course={course} tool="cheatsheet" onBack={nav.home} />
  return <CheatSheet course={course} onBack={nav.home} />
}

function SyllabusRoute() {
  const course = useCourseParam()
  if (!course) return <Navigate to="/" replace />
  const nav = useCourseNavigation(course)
  if (!course.tools.syllabus) return <CourseToolPlaceholder course={course} tool="syllabus" onBack={nav.home} />
  return <SyllabusMap course={course} onBack={nav.home} />
}

function LibraryRoute() {
  const course = useCourseParam()
  if (!course) return <Navigate to="/" replace />
  const nav = useCourseNavigation(course)
  if (!course.tools.library) return <CourseToolPlaceholder course={course} tool="library" onBack={nav.home} />
  return <Library course={course} onBack={nav.home} onModule={nav.module} />
}

function LegacyLessonRoute() {
  const { lessonId } = useParams()
  const course = getCourseForLesson(lessonId)
  if (!lessonId || !course) return <Navigate to="/" replace />
  return <Navigate to={courseLessonPath(course.id, lessonId)} replace />
}

function LegacyModuleRoute() {
  const { moduleId } = useParams()
  const course = getCourseForModule(moduleId)
  if (!moduleId || !course) return <Navigate to="/" replace />
  return <Navigate to={courseModulePath(course.id, moduleId)} replace />
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
        <Route path="/" element={<LandingRoute />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/course/:courseId" element={<CourseHomeRoute />} />
        <Route path="/course/:courseId/module/:moduleId" element={<ModuleRoute />} />
        <Route path="/course/:courseId/lesson/:lessonId" element={<LessonRoute />} />
        <Route path="/course/:courseId/training" element={<TrainingRoute />} />
        <Route path="/course/:courseId/exam" element={<ExamRoute />} />
        <Route path="/course/:courseId/cheatsheet" element={<CheatSheetRoute />} />
        <Route path="/course/:courseId/syllabus" element={<SyllabusRoute />} />
        <Route path="/course/:courseId/library" element={<LibraryRoute />} />
        <Route path="/lesson/:lessonId" element={<LegacyLessonRoute />} />
        <Route path="/module/:moduleId" element={<LegacyModuleRoute />} />
        {courses.map((course) => (
          <Route
            key={course.id}
            path={`/${encodeURIComponent(course.id)}`}
            element={<Navigate to={coursePath(course.id)} replace />}
          />
        ))}
        <Route path="/training" element={<Navigate to={courseToolPath(defaultCourse.id, 'training')} replace />} />
        <Route path="/exam" element={<Navigate to={courseToolPath(defaultCourse.id, 'exam')} replace />} />
        <Route path="/cheatsheet" element={<Navigate to={courseToolPath(defaultCourse.id, 'cheatsheet')} replace />} />
        <Route path="/syllabus" element={<Navigate to={courseToolPath(defaultCourse.id, 'syllabus')} replace />} />
        <Route path="/biblioteka" element={<Navigate to={courseToolPath(defaultCourse.id, 'library')} replace />} />
        {import.meta.env.DEV && <Route path="/debug/labs" element={<LabDebugRoute />} />}
        {import.meta.env.DEV && <Route path="/debug/solutions" element={<SolutionDebugRoute />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
