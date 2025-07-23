"use client"
import Hero from "@/components/hero"
import ProfileHeader from "@/components/profile-header"
import SplitText from "@/components/ui/split-text"
import { Button } from "@/components/ui/button"
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
      <main id="main-content" className="">
        <section id="about" className="min-h-screen bg-background flex items-center justify-center border-b border-border/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Hero />
          </div>
        </section >

        <section id="skills" className="min-h-screen bg-slate-50 flex items-center justify-center border-b border-border/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <SplitText
              text="Skills"
              className="text-3xl md:text-5xl font-bold mb-6 text-foreground"
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
              text="This section demonstrates the smooth scrolling navigation with clean typography"
              className="text-lg text-muted-foreground leading-relaxed mb-8"
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

            {/* Test Button for Animation */}
            <div className="flex gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                fillColor="#3b82f6"
                enableHoverAnimation={true}
                animationDuration={0.8}
              >
                Test Fill Animation
              </Button>
              <Button
                variant="outline"
                size="lg"
                fillColor="#f59e0b"
                enableHoverAnimation={true}
                animationDuration={1.2}
              >
                Another Test
              </Button>
            </div>
          </div>
        </section>

        <section id="projects" className="min-h-screen bg-background flex items-center justify-center border-b border-border/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <SplitText
              text="Projects"
              className="text-3xl md:text-5xl font-bold mb-6 text-foreground"
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
              text="Notice how the header changes when you scroll with elegant backdrop blur"
              className="text-lg text-muted-foreground leading-relaxed"
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
        </section>

        <section id="experience" className="min-h-screen bg-slate-50 flex items-center justify-center border-b border-border/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <SplitText
              text="Experience"
              className="text-3xl md:text-5xl font-bold mb-6 text-foreground"
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
              text="The mobile menu is fully functional with smooth animations"
              className="text-lg text-muted-foreground leading-relaxed"
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
        </section>

        <section id="contact" className="min-h-screen bg-background flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <SplitText
              text="Contact"
              className="text-3xl md:text-5xl font-bold mb-6 text-foreground"
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
              text="Ready to get in touch? The header adapts perfectly to your content with crisp light theme styling."
              className="text-lg text-muted-foreground leading-relaxed"
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
        </section>
      </main >
    </>
  )
}
