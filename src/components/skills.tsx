import React from 'react'
import { TechSkills } from './ui/TeckSkills'
import {
    React as ReactIcon,
    Next,
    TypeScript,
    JavaScript,
    HTML,
    CSS,
    TailwindCSS,
    NodeJS,
    MongoDB,
    PostgreSQL,
    Prisma,
    AWS,
    Docker,
    GitHub,
    VisualStudioCode,
    Postman,
    ESLint,
    Nest,
    GraphQL,
    Redis,
    DigitalOcean,
    Prettier
} from '../assets/techstack'




const SkillsData = [
    { name: "React", value: 90, icon: ReactIcon },
    { name: "Next.js", value: 85, icon: Next },
    { name: "TypeScript", value: 80, icon: TypeScript },
    { name: "JavaScript", value: 90, icon: JavaScript },
    { name: "HTML5", value: 95, icon: HTML },
    { name: "CSS3", value: 90, icon: CSS },
    { name: "Tailwind CSS", value: 85, icon: TailwindCSS },
    { name: "Bootstrap", value: 80, icon: "" },
    { name: "Styled Components", value: 70, icon: "" },
    { name: "Node.js", value: 85, icon: NodeJS },
    { name: "Nest.js", value: 85, icon: Nest },
    { name: "Express.js", value: 80, icon: "" },
    { name: "MongoDB", value: 75, icon: MongoDB },
    { name: "PostgreSQL", value: 70, icon: PostgreSQL },
    { name: "GraphQL", value: 65, icon: GraphQL },
    { name: "Prisma", value: 70, icon: Prisma },
    { name: "REST APIs", value: 80, icon: "" },
    { name: "AWS", value: 70, icon: AWS },
    { name: "DigitalOcean", value: 70, icon: DigitalOcean },
    { name: "Docker", value: 65, icon: Docker },
    { name: "GitHub", value: 90, icon: GitHub },
    { name: "Visual Studio Code", value: 95, icon: VisualStudioCode },
    { name: "Postman", value: 85, icon: Postman },
    { name: "ESLint", value: 70, icon: ESLint },
    { name: "Prettier", value: 70, icon: Prettier },
    { name: "Husky", value: 70, icon: "" },
    { name: "React Native", value: 80, icon: "" },
    { name: "Progressive Web Apps (PWA)", value: 70, icon: "" },
    { name: "Redis", value: 70, icon: Redis },
    { name: "WebSocket", value: 70, icon: "" },
    { name: "Sprint Planning", value: 70, icon: "" },
    { name: "Microservices", value: 70, icon: "" },
]



const Skills = () => {
    return (
        <div className='w-full max-w-6xl mx-auto'>
            <div className='flex flex-wrap gap-x-2 gap-y-4 justify-center'>
                <TechSkills items={
                    [...SkillsData].map((skill, index) => ({
                        id: index + 1,
                        name: skill.name,
                        value: skill.value,
                        icon: skill.icon
                    }))}
                />
            </div>
        </div>
    )
}

export default Skills
