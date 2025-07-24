import React from "react";
import { motion } from "motion/react";

interface TimelineItem {
    title: string;
    role: string;
    company: string;
    description: string;
    achievements: string[];
    tech: string[];
    bgColor?: string;
    color?: string;
}

export default function ModernTimeline() {


    const data: TimelineItem[] = [
        {
            title: "Dec 2023 – Present",
            role: "Full Stack Developer",
            company: "Explorogent International Services Pvt. Ltd. (Stackkaroo)",
            description: "Leading enterprise application development with focus on scalability and performance.",
            achievements: [
                "Led 10-person agile development team delivering enterprise applications with 99.9% uptime",
                "Implemented CI/CD pipeline reducing deployment time by 40%",
                "Developed CryoFlow - Full-Stack Cold/Non-cold chain logistics system",
                "Designed scalable architecture with JWT authentication and AWS S3 integration"
            ],
            tech: ["Node.js", "React.js", "PostgreSQL", "AWS", "Next.js"],
        },
        {
            title: "Oct 2022 – Dec 2023",
            role: "MERN Stack Developer",
            company: "Explorogent International Services Pvt. Ltd. (Stackkaroo)",
            description: "Specialized in building high-performance full-stack applications using the MERN stack.",
            achievements: [
                "Engineered high-performance RESTful APIs with JWT authentication",
                "Enhanced database efficiency by optimizing MongoDB aggregation pipelines",
                "Reduced processing time by 28% through strategic optimizations",
                "Streamlined application architecture with Redux Toolkit integration"
            ],
            tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux"],
        },
        {
            title: "April 2022 – Oct 2022",
            role: "Backend Developer",
            company: "Explorogent International Services Pvt. Ltd. (Stackkaroo)",
            description: "Focused on backend development and database architecture for scalable applications.",
            achievements: [
                "Developed high-performance RESTful APIs using Node.js and Express.js",
                "Architected scalable MongoDB database schemas with strategic indexing",
                "Implemented optimized database queries for enhanced performance",
                "Built robust backend infrastructure supporting high traffic loads"
            ],
            tech: ["Node.js", "Express.js", "MongoDB", "REST APIs"],

        }
    ];

    const TimelineNode = ({ item, index }: { item: TimelineItem; index: number; }) => {
        return (
            <div
                className="relative group"
            >
                {/* Floating Date Badge */}
                <motion.div
                    className={`absolute  -top-4 ${index % 2 === 0 ? 'left-0' : 'right-0'} z-20`}
                >
                    <div className={`px-4 py-2 rounded-full border text-sm font-semibold  bg-white shadow-lg`}>
                        {item.title}
                    </div>
                </motion.div>

                {/* Main Content Card */}
                <motion.div
                    className={`relative ${index % 2 === 0 ? 'mr-auto ml-0' : 'ml-auto mr-0'}  p-6 rounded-2xl overflow-hidden ${item.bgColor} border border-gray-400  backdrop-blur-sm`}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    {/* Decorative Corner */}
                    <div className={`absolute rounded-sm ${index % 2 === 0 ? 'top-0 right-0' : 'top-0 left-0'} w-20 h-20 bg-gradient-to-br ${item.color} opacity-10 rounded-${index % 2 === 0 ? 'bl' : 'br'}-2xl`} />

                    {/* Role and Company */}
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {item.role}
                        </h3>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {item.company}
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                        {item.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Key Achievements</h4>
                        <div className="space-y-2">
                            {item.achievements.map((achievement: string, idx: number) => (
                                <motion.div
                                    key={achievement}
                                    className="flex items-start space-x-2"
                                    initial={{ x: -10 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0`} />
                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {achievement}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                            {item.tech.map((tech: string, idx: number) => (
                                <motion.span
                                    key={tech}
                                    className={`px-2 py-1 text-xs rounded-full  text-black font-medium shadow-sm`}
                                    // whileHover={{ scale: 1.1 }}
                                    initial={{ scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                </motion.div>
            </div>
        );
    };


    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8" >
            {data.map((item, index) => (
                <TimelineNode
                    key={item.title}
                    item={item}
                    index={index}
                />
            ))}

        </div>
    );
}