"use client"
import ProfileHeader from "@/components/profile-header"
import { useEffect } from "react"


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
      <main id="main-content" className="pt-20">
        <section id="about" className="min-h-screen bg-background flex items-center justify-center border-b border-border/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Welcome to My Portfolio
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A modern, responsive header component with smooth scrolling navigation and beautiful light theme design
            </p>
          </div>
        </section >

        <section id="skills" className="min-h-screen bg-slate-50 flex items-center justify-center border-b border-border/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Skills</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This section demonstrates the smooth scrolling navigation with clean typography
            </p>
          </div>
        </section>

        <section id="projects" className="min-h-screen bg-background flex items-center justify-center border-b border-border/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Projects</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Notice how the header changes when you scroll with elegant backdrop blur
            </p>
          </div>
        </section>

        <section id="experience" className="min-h-screen bg-slate-50 flex items-center justify-center border-b border-border/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Experience</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The mobile menu is fully functional with smooth animations
            </p>
          </div>
        </section>

        <section id="contact" className="min-h-screen bg-background flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Contact</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ready to get in touch? The header adapts perfectly to your content with crisp light theme styling.
            </p>
          </div>
        </section>
      </main >
    </>
  )
}
