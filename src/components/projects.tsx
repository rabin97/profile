"use client";
import React from 'react'
import Typography from './ui/typography'
import Image from 'next/image';
import { Card } from './ui/card';
import { TracingBeam } from './ui/tracing-beam';
import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';



interface Project {
    title: string;
    description: string;
    image: string;
    video?: string;
    link: string;
    tags: string[];
    date: string;
    featured?: boolean;
}

const projectsData: Project[] = [
    {
        title: "PayPulse",
        description: "Enterprise Payroll Management System for Efficient Salary Processing and Employee Management",
        image: "/project/paypulse.png",
        video: "/project/paypulse.mp4",
        link: "https://github.com/rabin97/payslips-main",
        tags: ["React", "Node.js", "MongoDB", "Payroll"],
        date: "March 15, 2025 - Now",
        featured: true,
    },

    {
        title: "BeringTime",
        description: "A 3D/AR ring configurator for Bering Time that lets users design Custom rings in real-time and an AR 'Try-On' mode to preview rings on the hand.",
        image: "/project/beringtime.png",
        link: "https://beringtime-ring.netlify.app/",
        tags: ["React", "Firebase", "Time Tracking"],
        date: "April 10, 2024 - June 15, 2024",
        featured: true,
    },
    {
        title: "Winkty UI",
        description: "A comprehensive React component library designed for building scalable and maintainable user interfaces in",
        image: "/project/winkty.png",
        video: "/project/winktyui.mp4",
        link: "https://ui.winkty.com/",
        tags: ["React", "TypeScript", "UI/UX Design", "Component Library"],
        date: "December 24, 2024 - January 15, 2025",
        featured: true,
    },
    {
        title: "Emerge-x",
        description: "Created a user-friendly safety platform with Next.js, using Framer Motion animations to simplify incident reporting and tracking.",
        image: "/project/emerge-x.jpeg",
        video: "/project/emergex.mp4",
        link: "https://emerge-x.com/",
        tags: ["React", "TypeScript", "UI/UX Design", "Component Library"],
        date: "March 24, 2024 - September 12, 2024",
        featured: true,
    },


]

const ProjectCard = React.memo(({ project }: { project: Project }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    // Preload video when component mounts
    React.useEffect(() => {
        if (videoRef.current && project.video) {
            const video = videoRef.current;

            const handleCanPlayThrough = () => {
                setIsVideoLoaded(true);
            };

            const handleLoadedMetadata = () => {
                // Video metadata is loaded, video is ready to play
                video.currentTime = 0;
            };

            video.addEventListener('canplaythrough', handleCanPlayThrough);
            video.addEventListener('loadedmetadata', handleLoadedMetadata);

            // Start loading the video
            video.load();

            return () => {
                video.removeEventListener('canplaythrough', handleCanPlayThrough);
                video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, [project.video]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current && project.video) {
            const video = videoRef.current;
            video.currentTime = 0;

            // Try to play immediately if loaded, otherwise wait for it to be ready
            if (isVideoLoaded) {
                video.play().catch(console.error);
            } else {
                // If video isn't fully loaded yet, play as soon as it's ready
                const playWhenReady = () => {
                    if (isHovered) { // Only play if still hovered
                        video.play().catch(console.error);
                    }
                    video.removeEventListener('canplaythrough', playWhenReady);
                };
                video.addEventListener('canplaythrough', playWhenReady);
            }
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <Link href={project.link} target="_blank" className="hover:text-blue-500 group">
            <div className='flex flex-col mb-8'>
                <Typography variant="h6" className="font-roboto leading-5">
                    <span className='flex items-center gap-2'>
                        {project.title}
                        <SquareArrowOutUpRight size={15} className='group-hover:block hidden' />
                    </span>
                    <br />
                    <span className="text-sm text-muted-foreground">{project.date}</span>
                </Typography>
                <Typography variant="body2" className="mb-4 max-w-3/4 font-roboto leading-tight">
                    {project.description}
                </Typography>

                <Card
                    className="relative group w-full aspect-[6/3.2] overflow-hidden rounded-lg shadow-lg p-0 cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={`rounded-lg object-cover transition-opacity duration-300 `}
                        priority={false}
                        loading="lazy"
                    />
                    {project.video && (
                        <video
                            ref={videoRef}
                            src={project.video}
                            className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        />
                    )}
                </Card>
            </div>
        </Link>

    )
});

ProjectCard.displayName = 'ProjectCard';

const Projects = React.memo(() => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const content = (
        <div className={isMobile ? 'px-4' : 'pl-12'}>
            {projectsData.map((project) => (
                <ProjectCard key={project.title} project={project} />
            ))}
        </div>
    );

    if (isMobile) {
        return content;
    }

    return (
        <TracingBeam className="pr-3">
            {content}
        </TracingBeam>
    )
});

Projects.displayName = 'Projects';

export default Projects
