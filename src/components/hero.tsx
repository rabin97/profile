"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitText from "./ui/split-text"
import { Button } from "./ui/button"
import { Download, Loader2 } from "lucide-react"
import { GitHub, Linkedin } from "./icons"
import dynamic from "next/dynamic"
import Image from "next/image"

// import PdfViewer from "./ui/PdfViewer"
const PdfViewer = dynamic(() => import("./ui/PdfViewer"), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin" /></div>
})

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


    const [showPdfViewer, setShowPdfViewer] = useState(false);

    const handleOpenViewer = () => {
        setShowPdfViewer(true);
    };

    const handleCloseViewer = () => {
        setShowPdfViewer(false);
    };

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
            className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
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
                <div className="text-center max-w-4xl mx-auto ">
                    <div className="flex items-center max-lg:flex-col justify-between mt-6 mb-12 max-md:flex-col">
                        <div>
                            <div ref={badgeRef} className="">
                                <div className=" text-center w-fit flex gap-2  text-blue-800 rounded-full text-sm font-medium font-mono">
                                    <div className="hover:animate-bounce animate-bounce">👋</div> hey, I&apos;m
                                </div>
                            </div>
                            <div className="flex  items-end max-md:items-start  w-full">
                                <SplitText
                                    text="Rabin "
                                    className="text-3xl sm:text-4xl  md:text-6xl font-heading font-bold text-gray-900 max-md:mb-0 mb-6 leading-tight font-geist-mono "
                                    delay={30}
                                    duration={0.8}
                                    ease="power3.out"
                                    splitType="chars"
                                    from={{ opacity: 0, y: 50 }}
                                    to={{ opacity: 1, y: 0 }}
                                    threshold={0.1}
                                    rootMargin="-100px"
                                    textAlign="left"
                                    onLetterAnimationComplete={handleAnimationComplete}
                                />

                                <SplitText
                                    text="Full Stack Developer"
                                    className="text-xl pl-1 md:text-2xl font-heading font-medium text-gray-700 mb-8 font-geist-mono"
                                    delay={60}
                                    duration={0.6}
                                    ease="power2.out"
                                    splitType="words"
                                    from={{ opacity: 0, y: 30 }}
                                    to={{ opacity: 1, y: 0 }}
                                    threshold={0.1}
                                    rootMargin="-80px"
                                    textAlign="left"
                                />
                            </div>
                            <SplitText
                                text="Passionate about crafting scalable and user-friendly applications with modern tech to create impactful digital experiences."
                                className="text-lg md:text-xl  text-gray-600 mb-12  mx-auto leading-relaxed -tracking-normal font-geist-mono"
                                delay={30}
                                duration={0.4}
                                ease="power2.out"
                                splitType="words"
                                from={{ opacity: 0, y: 20 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.1}
                                rootMargin="-60px"
                                textAlign="left"
                            />
                            <div ref={buttonsRef} className="flex flex-wrap sm:flex-row gap-4 justify-center items-center">
                                <Button
                                    size="lg"
                                    fillColor="#000"
                                    enableHoverAnimation
                                    variant="outline"
                                    className="h-14 hover:text-white "
                                    onClick={(e: React.MouseEvent) => {
                                        e.preventDefault()
                                        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                                    }}
                                >
                                    Projects
                                </Button>

                                <Button
                                    size="lg"
                                    fillColor="#000"
                                    enableHoverAnimation
                                    variant="outline"
                                    className="h-14 hover:text-white  "
                                    onClick={(e: React.MouseEvent) => {
                                        e.preventDefault()
                                        const link = document.createElement('a')
                                        link.href = '/assets/resume_rabin_.pdf'
                                        link.download = 'Rabin_Karmakar_Resume.pdf'
                                        document.body.appendChild(link)
                                        link.click()
                                        document.body.removeChild(link)
                                    }}
                                >
                                    <Download /> Resume
                                </Button>
                                <Button
                                    size="lg"
                                    fillColor="#000"
                                    enableHoverAnimation
                                    variant="outline"
                                    className="h-14 hover:text-white  "
                                    onClick={handleOpenViewer}
                                >
                                    View
                                </Button>
                            </div>

                        </div>
                        <Image
                            src="/assets/profile.jpeg"
                            alt="Rabin Karmakar"
                            width={350}
                            height={350}
                            className="rounded-full border-4 max-lg:hidden border-gray-300 shadow-lg object-cover"
                            priority={true}
                        />
                    </div>

                    <div ref={socialRef} className="mt-10 flex justify-center space-x-6">
                        {[
                            { href: "https://github.com/rabin97", label: "GitHub", icon: <GitHub /> },
                            { href: "https://www.linkedin.com/in/rabin-642894219/", label: "LinkedIn", icon: <Linkedin /> },
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10   flex items-center justify-center transition-all duration-300 text-xl hover:scale-110 hover:-translate-y-1"
                                aria-label={`Visit my ${social.label} profile`}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-4 sm:bottom-2 w-full flex items-center justify-center ">
                <a href="#projects">
                    <div
                        ref={scrollIndicatorRef}
                        className='w-[35px] h-[60px] rounded-3xl border-4 border-black flex justify-center items-start p-2'
                    >
                        <div
                            ref={circleRef}
                            className='w-3 h-3 rounded-full bg-gray-600'
                        />
                    </div>
                </a>
            </div>
            {showPdfViewer && (
                <PdfViewer
                    fileUrl="/assets/resume_rabin_.pdf"
                    fileName="resume_rabin_karmakar.pdf"
                    onClose={handleCloseViewer}
                />
            )}
        </section>
    )
}

export default Hero
