import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
    const data = [
        {
            title: "Dec 2023 – Present",
            content: (
                <div>
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                        Full Stack Developer
                    </h3>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-4">
                        Explorogent International Services Pvt. Ltd. (Stackkaroo)
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                        <li>Led 10-person agile development team delivering enterprise applications with 99.9% uptime.</li>
                        <li>Implemented CI/CD pipeline reducing deployment time by 40%</li>
                        <li>Developed CryoFlow, a Full-Stack Cold/Non-cold chain logistics and pharmaceutical delivery management system using Backend: in Node.js (NestJS), and Frontend: in React.js (Next.js), and PostgreSQL, implementing complex order processing, temperature monitoring, compliance features.</li>
                        <li>Designed scalable architecture with JWT authentication, AWS S3 integration, and real-time tracking, enhancing operational efficiency and regulatory compliance.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Oct 2022 – Dec 2023",
            content: (
                <div>
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                        MERN Stack Developer
                    </h3>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-4">
                        Explorogent International Services Pvt. Ltd. (Stackkaroo)
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                        <li>Engineered high-performance RESTful APIs with JWT authentication using Access Token and Refresh Token to handling substantial monthly traffic</li>
                        <li>Enhanced database efficiency by optimizing MongoDB aggregation pipelines, reducing processing time by 28%</li>
                        <li>Streamlined application architecture with Redux Toolkit integration improving code maintainability</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "April 2022 – Oct 2022",
            content: (
                <div>
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                        Backend Developer
                    </h3>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-4">
                        Explorogent International Services Pvt. Ltd. (Stackkaroo)
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                        <li>Developed high-performance RESTful APIs using Node.js and Express.js</li>
                        <li>Architected scalable MongoDB database schemas with strategic indexing for optimized performance</li>
                    </ul>
                </div>
            ),
        },
    ];
    return (
        <div className="relative w-full overflow-clip">
            <Timeline data={data} />
        </div>
    );
}
