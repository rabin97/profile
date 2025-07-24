"use client";
import React from 'react'
import Typography from './ui/typography'
import Image from 'next/image';
import { Card } from './ui/card';
import { TracingBeam } from './ui/tracing-beam';



interface Project {
    title: string;
    description: string;
    image: string;
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
        link: "https://ui.winkty.com/",
        tags: ["React", "TypeScript", "UI/UX Design", "Component Library"],
        date: "December 24, 2024 - January 15, 2025",
        featured: true,
    },


]

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className='flex flex-col  mb-8'>
            <Typography variant="h6" className="mb-2 font-roboto leading-5">
                {project.title} <br />
                <span className="text-sm text-muted-foreground">{project.date}</span>
            </Typography>
            <Typography variant="body2" className="mb-4 max-w-3/4 font-roboto leading-tight">
                {project.description}
            </Typography>
            <Card className="relative w-full aspect-video h-[30rem]  overflow-hidden rounded-lg shadow-lg">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="rounded-lg"
                />
            </Card>
        </div>
    )
}

const Projects = () => {
    return (
        <TracingBeam className="pr-3">
            <div className='pl-12'>

                {
                    projectsData.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))

                }
            </div>

        </TracingBeam>
    )
}

export default Projects
