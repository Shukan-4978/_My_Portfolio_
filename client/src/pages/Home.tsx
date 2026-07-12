import { lazy, Suspense } from 'react'

// Eagerly load above-the-fold sections
import Hero from '@/components/sections/Hero'

// Lazy load below-the-fold sections for performance
const About = lazy(() => import('@/components/sections/About'))
const TechStack = lazy(() => import('@/components/sections/TechStack'))
const Projects = lazy(() => import('@/components/sections/Projects'))
const Experience = lazy(() => import('@/components/sections/Experience'))
const Achievements = lazy(() => import('@/components/sections/Achievements'))
const Contact = lazy(() => import('@/components/sections/Contact'))

// Simple section skeleton
function SectionSkeleton() {
  return (
    <div className="py-24 section-container">
      <div className="skeleton h-8 w-40 rounded-full mx-auto mb-4" />
      <div className="skeleton h-12 w-96 max-w-full rounded-xl mx-auto mb-4" />
      <div className="skeleton h-5 w-72 max-w-full rounded-lg mx-auto mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-52 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionSkeleton />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TechStack />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Achievements />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Contact />
      </Suspense>
    </>
  )
}
