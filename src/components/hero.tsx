"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitText from "./ui/split-text"
import { Button } from "./ui/button"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {

    const heroRef = useRef<HTMLElement>(null)
    const backgroundRef1 = useRef<HTMLDivElement>(null)
    const backgroundRef2 = useRef<HTMLDivElement>(null)
    const badgeRef = useRef<HTMLDivElement>(null)
    const buttonsRef = useRef<HTMLDivElement>(null)
    const socialRef = useRef<HTMLDivElement>(null)
    const scrollIndicatorRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()

            // Animate badge
            if (badgeRef.current) {
                tl.fromTo(badgeRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
                )
            }

            // Animate buttons
            if (buttonsRef.current) {
                tl.fromTo(buttonsRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                    "-=0.3"
                )
            }

            // Animate social links
            if (socialRef.current) {
                tl.fromTo(socialRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                    "-=0.3"
                )
            }

            // Animate scroll indicator
            if (scrollIndicatorRef.current) {
                tl.fromTo(scrollIndicatorRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                    "-=0.3"
                )

                // Continuous bounce animation for scroll indicator circle
                if (circleRef.current) {
                    gsap.to(circleRef.current, {
                        keyframes: [
                            { y: 0, scale: 1, rotation: 0 },
                            { y: 10, scale: 1.2, rotation: 10 },
                            { y: 0, scale: 1, rotation: 0 },
                            { y: 24, scale: 1.2, rotation: -10 },
                            { y: 0, scale: 1, rotation: 0 }
                        ],
                        duration: 1.5,
                        ease: "power2.inOut",
                        repeat: -1,
                        repeatType: "reverse"
                    })
                }
            }
        }, heroRef)

        return () => ctx.revert()
    }, [])

    const handleAnimationComplete = () => {
        console.log('Hero text animation completed!')
    }

    return (
        <section
            ref={heroRef}
            id="hero"
            className="min-h-screen flex items-center justify-center relative overflow-hidden "
            aria-label="Hero section"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    ref={backgroundRef1}
                    className="absolute w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
                    style={{
                        left: "10%",
                        top: "20%",
                    }}
                />
                <div
                    ref={backgroundRef2}
                    className="absolute w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"
                    style={{
                        right: "10%",
                        bottom: "20%",
                    }}
                />
            </div>

            <div className="container-custom relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <div ref={badgeRef} className="mb-6">
                        <div className=" text-center px-4 py-2 flex gap-2  text-blue-800 rounded-full text-sm font-medium font-mono">
                            <div className="hover:animate-bounce animate-bounce">👋</div> Hello, I'm
                        </div>
                    </div>

                    <SplitText
                        text="Rabin Karmakar"
                        className="text-5xl  md:text-7xl font-heading font-bold text-gray-900 mb-6 leading-tight"
                        delay={30}
                        duration={0.8}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 50 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="center"
                        onLetterAnimationComplete={handleAnimationComplete}
                    />

                    <SplitText
                        text="Full Stack Developer"
                        className="text-2xl md:text-3xl font-heading font-medium text-gray-700 mb-8"
                        delay={60}
                        duration={0.6}
                        ease="power2.out"
                        splitType="words"
                        from={{ opacity: 0, y: 30 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-80px"
                        textAlign="center"
                    />

                    <SplitText
                        text="I craft exceptional digital experiences with modern technologies. Passionate about creating scalable, user-friendly applications that make a difference."
                        className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
                        delay={30}
                        duration={0.4}
                        ease="power2.out"
                        splitType="words"
                        from={{ opacity: 0, y: 20 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-60px"
                        textAlign="center"
                    />

                    <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            size="lg"
                            fillColor="#fcba03"
                            enableHoverAnimation
                            variant="outline"
                            className="h-14"
                        >
                            Get Started
                        </Button>

                        <a
                            href="#contact"
                            onClick={(e: React.MouseEvent) => {
                                e.preventDefault()
                                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                            }}
                            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                            aria-label="Get in touch with me"
                        >
                            Get In Touch
                        </a>
                    </div>

                    <div ref={socialRef} className="mt-16 flex justify-center space-x-6">
                        {[
                            { href: "https://github.com", label: "GitHub", icon: "🔗" },
                            { href: "https://linkedin.com", label: "LinkedIn", icon: "💼" },
                            { href: "https://twitter.com", label: "Twitter", icon: "🐦" },
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 text-xl hover:scale-110 hover:-translate-y-1"
                                aria-label={`Visit my ${social.label} profile`}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-4 sm:bottom-2 w-full flex items-center justify-center z-30">
                <a href="#about">
                    <div
                        ref={scrollIndicatorRef}
                        className='w-[35px] h-[64px] rounded-3xl border-4 border-gray-600 flex justify-center items-start p-2'
                    >
                        <div
                            ref={circleRef}
                            className='w-3 h-3 rounded-full bg-gray-600'
                        />
                    </div>
                </a>
            </div>
        </section>
    )
}

export default Hero
