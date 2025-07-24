"use client"
import Hero from "@/components/hero"
import ProfileHeader from "@/components/profile-header"
import Typography from "@/components/ui/typography"
import { useEffect } from "react"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
// import { TimelineDemo } from "@/components/experience"
import Education from "@/components/education"
import HireMeForm from "@/components/contact"
import Footer from "@/components/footer"
import ModernTimeline from "@/components/experience"


export default function Home() {
  useEffect(() => {
    // Smooth scrolling polyfill for older browsers
    if (typeof window !== "undefined") {
      import("smoothscroll-polyfill").then((smoothscroll) => {
        smoothscroll.polyfill()
      })
    }
  }, [])


  return (
    <>
      <ProfileHeader />
      <main id="main-content" className="">
        <section id="about" className="min-h-screen bg-gradient-to-b from-white to-indigo-50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto  text-center">
            <Hero />
          </div>

        </section >

        <section id="projects" className="min-h-screen   bg-gradient-to-b  from-indigo-50 to-white py-4 scroll-mt-20  flex items-center justify-center">
          <div className="max-w-4xl mx-auto  text-left ">
            <div className="flex flex-col items-start justify-start mb-6 ">
              <Typography
                variant="h2"
                className="text-3xl md:text-4xl font-bold  text-foreground font-geist-mono"
              >
                Recent Projects
              </Typography>
              <Typography
                variant="body"
                className="text-lg text-muted-foreground leading-relaxed mb-4 font-roboto"
              >
                Explore my latest work and see how I bring ideas to life with code.
              </Typography>
            </div>
            <Projects />
          </div>
        </section>

        <section id="skills" className="min-h-screen scroll-mt-12  bg-gradient-to-b from-white to-indigo-50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto  text-left">
            <div className="flex flex-col items-start justify-start mb-6">
              <Typography
                variant="h2"
                className="text-3xl md:text-4xl font-bold mb-1  text-foreground font-geist-mono"
              >
                Technologies & Skills
              </Typography>
              <Typography
                variant="body"
                className="text-lg text-muted-foreground  mb-4 leading-tight font-roboto"
              >
                I specialize in a wide range of technologies, from web development to mobile applications. Here&apos;s a glimpse of my skill set.
              </Typography>
            </div>
            <Skills />

          </div>
        </section>

        <section id="experience" className="min-h-screen scroll-mt-24  bg-gradient-to-b to-white from-indigo-50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto w-full text-left px-4">
            <div className="flex flex-col items-start justify-start mb-6">
              <Typography
                variant="h2"
                className="text-3xl md:text-4xl font-bold mb-1  font-geist-mono "
              >
                Professional Journey
              </Typography>
              <Typography
                variant="body"
                className="text-lg text-muted-foreground  mb-4 leading-tight font-roboto "
              >
                A timeline of growth, innovation, and technical excellence
              </Typography>
            </div>

            <ModernTimeline />

          </div>
        </section>

        <section id="education" className="min-h-screen pt-12 scroll-mt-12 bg-gradient-to-b from-white to-indigo-50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-left">
            <div className="flex flex-col items-start justify-start mb-6">
              <Typography
                variant="h2"
                className="text-3xl md:text-4xl font-bold mb-1 text-foreground font-geist-mono"
              >
                Education
              </Typography>
              <Typography
                variant="body"
                className="text-lg text-muted-foreground mb-4 leading-tight font-roboto"
              >
                My academic journey in Computer Science & Engineering, building a strong foundation in software development and advanced technologies.
              </Typography>
            </div>
            <Education />
          </div>
        </section>

        <section id="contact" className="min-h-screen scroll-mt-12  bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
          <div className="max-w-4xl mx-auto w-full text-center">
            <div className="flex flex-col items-start justify-start mb-6">
              <Typography
                variant="h2"
                className="text-3xl md:text-4xl font-bold mb-1 text-foreground font-geist-mono tracking-tight"
              >
                Connect With Me
              </Typography>
              <Typography
                variant="body"
                className="text-lg text-muted-foreground mb-4 leading-tight font-roboto"
              >
                I&apos;m always open to discussing new projects and opportunities.
              </Typography>
            </div>
            <HireMeForm />
          </div>
        </section>
      </main >
      <Footer />
    </>
  )
}
