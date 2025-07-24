"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"

const Education = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const education = [
        {
            id: 1,
            degree: "M.Tech in Computer Science & Engineering",
            school: "Bankura Unnayani Institute of Engineering",
            period: "2024 – 2026",
            location: "Bankura, India",
            gpa: "8.09/10",
            status: "Pursuing",
            description: "Currently pursuing Master of Technology in Computer Science & Engineering with focus on advanced software engineering concepts and research.",
            coursework: ["Advanced Algorithms", "Machine Learning", "Software Architecture", "Data Mining", "Research Methodology"],
        },
        {
            id: 2,
            degree: "B.Tech in Computer Science & Engineering",
            school: "Bankura Unnayani Institute of Engineering",
            period: "2020 – 2024",
            location: "Bankura, India",
            gpa: "8.66/10",
            status: "Completed",
            description: "Bachelor of Technology in Computer Science & Engineering with strong foundation in software development, data structures, and algorithms.",
            coursework: ["Data Structures", "Algorithms", "Database Systems", "Software Engineering", "Web Development", "Operating Systems"],
        },
    ]

    // Future certifications can be added here if needed

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    }

    return (
        <section id="education" aria-label="Education and certifications" ref={ref}>
            <motion.div
                className="mb-16"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >

                <div className="space-y-8">
                    {education.map((edu) => (
                        <motion.div
                            key={edu.id}
                            className="bg-white rounded-2xl p-8 "
                            variants={itemVariants}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                                <div className="mb-4 lg:mb-0 flex-1">
                                    <h4 className="text-2xl font-semibold text-gray-900  font-roboto">{edu.degree}</h4>
                                    <p className="text-lg font-medium text-blue-600 mb-1">{edu.school}</p>
                                    <p className="text-gray-600 mb-2">{edu.location}</p>
                                </div>
                                <div className="text-left lg:text-right">
                                    <p className="font-mono text-gray-600 mb-2">{edu.period}</p>
                                    <p className="text-sm font-medium text-green-600 mb-1">CGPA: {edu.gpa}</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${edu.status === 'Pursuing'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-green-100 text-green-800'
                                        }`}>
                                        {edu.status}
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-6">{edu.description}</p>

                            <div>
                                <h5 className="font-semibold text-gray-900 mb-3">Relevant Coursework:</h5>
                                <div className="flex flex-wrap gap-2">
                                    {edu.coursework.map((course) => (
                                        <span key={course} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section >
    )
}

export default Education
