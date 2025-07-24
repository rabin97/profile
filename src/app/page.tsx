"use client"
import Hero from "@/components/hero"
import ProfileHeader from "@/components/profile-header"
import SplitText from "@/components/ui/split-text"
import { useEffect } from "react"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import { TimelineDemo } from "@/components/experience"
import Education from "@/components/education"
import HireMeForm from "@/components/contact"
import Footer from "@/components/footer"


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

        <section id="projects" className="min-h-screen  bg-gradient-to-b  from-indigo-50 to-white py-4 scroll-mt-20  flex items-center justify-center">
          <div className="max-w-4xl mx-auto  text-left ">
            <div className="flex flex-col items-start justify-start ">
              <SplitText
                text="Recent Projects"
                className="text-3xl md:text-4xl font-bold  text-foreground font-playfair-display"
                delay={80}
                duration={0.5}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-80px"
                textAlign="center"
              />
              <SplitText
                text="Explore my latest work and see how I bring ideas to life with code."
                className="text-lg text-muted-foreground leading-relaxed mb-4"
                delay={40}
                duration={0.4}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 15 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-60px"
                textAlign="center"
              />
            </div>
            <Projects />
          </div>
        </section>

        <section id="skills" className="min-h-screen  bg-gradient-to-b from-white to-indigo-50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto  text-left">
            <div className="flex flex-col items-start justify-start mb-6">
              <SplitText
                text="Technologies & Skills"
                className="text-3xl md:text-4xl font-bold mb-1  text-foreground font-playfair-display"
                delay={80}
                duration={0.5}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-80px"
                textAlign="left"
              />
              <SplitText
                text=" I specialize in a wide range of technologies, from web development to mobile applications. Here's a glimpse of my skill set."
                className="text-lg text-muted-foreground  mb-4 leading-tight"
                delay={40}
                duration={0.4}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 15 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-60px"
                textAlign="left"
              />
            </div>
            <Skills />

          </div>
        </section>

        <section id="experience" className="min-h-screen  bg-gradient-to-b to-white from-indigo-50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto  text-left">
            <div className="flex flex-col items-start justify-start mb-6">
              <SplitText
                text="Experience"
                className="text-3xl md:text-4xl font-bold mb-1  text-foreground font-playfair-display"
                delay={80}
                duration={0.5}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-80px"
                textAlign="left"
              />
              <SplitText
                text="I have worked with a variety of technologies, including React, Node.js, and Next js. Here's a glimpse of my experience."
                className="text-lg text-muted-foreground  mb-4 leading-tight"
                delay={40}
                duration={0.4}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 15 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-60px"
                textAlign="left"
              />
            </div>

            <TimelineDemo />

          </div>
        </section>

        <section id="education" className="min-h-screen pt-12 bg-gradient-to-b from-white to-indigo-50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-left">
            <div className="flex flex-col items-start justify-start mb-6">
              <SplitText
                text="Education"
                className="text-3xl md:text-4xl font-bold mb-1 text-foreground font-playfair-display"
                delay={80}
                duration={0.5}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-80px"
                textAlign="left"
              />
              <SplitText
                text="My academic journey in Computer Science & Engineering, building a strong foundation in software development and advanced technologies."
                className="text-lg text-muted-foreground mb-4 leading-tight"
                delay={40}
                duration={0.4}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 15 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-60px"
                textAlign="left"
              />
            </div>
            <Education />
          </div>
        </section>

        <section id="contact" className="min-h-screen scroll-mt-20  bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
          <div className="max-w-4xl mx-auto  text-center">
            <div className="flex flex-col items-start justify-start mb-6">
              <SplitText
                text="Get In Touch"
                className="text-3xl md:text-4xl font-bold mb-1 text-foreground font-playfair-display"
                delay={80}
                duration={0.5}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-80px"
                textAlign="left"
              />
              <SplitText
                text="I'm always open to discussing new projects and opportunities."
                className="text-lg text-muted-foreground mb-4 leading-tight"
                delay={40}
                duration={0.4}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 15 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-60px"
                textAlign="left"
              />
            </div>
            <HireMeForm />
          </div>
        </section>
      </main >
      <Footer />
    </>
  )
}
