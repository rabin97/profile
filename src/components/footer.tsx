"use client"

import { motion } from "motion/react"
import StarBorder from "./ui/star-border"
import { GitHub, Linkedin } from "./icons"
const Footer = () => {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { href: "https://github.com/rabin97", label: "GitHub", icon: <GitHub /> },
        { href: "https://www.linkedin.com/in/rabin-642894219/", label: "LinkedIn", icon: <Linkedin /> },
    ]

    const quickLinks = [
        { label: 'About', href: '#about' },
        { label: 'Projects', href: '#projects' },
        { label: 'Skills', href: '#skills' },
        { label: 'Experience', href: '#experience' },
        { label: 'Education', href: '#education' },
        { label: 'Contact', href: '#contact' },
    ]

    const handleNavClick = (href: string) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <footer className="bg-gray-900 text-white py-12" role="contentinfo">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div>
                        <h3 className="text-2xl font-geist-mono font-bold mb-4">Rabin Karmakar</h3>
                        <p className="text-gray-300 mb-4 font-roboto leading-relaxed">
                            Full Stack Developer passionate about creating exceptional digital experiences with modern technologies
                            and best practices.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target={social.href.startsWith("http") ? "_blank" : undefined}
                                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="w-10 h-10 rounded-full flex items-center justify-center "
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={`Visit my ${social.label}`}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div
                    >
                        <h4 className="text-lg font-geist-mono font-semibold mb-4">Quick Links</h4>
                        <nav aria-label="Footer navigation">
                            <ul className="space-y-2">
                                {quickLinks.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleNavClick(link.href)
                                            }}
                                            className="text-gray-300 hover:text-white transition-colors font-roboto"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div >
                        <h4 className="text-lg font-geist-mono font-semibold mb-4">Connect with Me</h4>
                        <div className="space-y-2 text-gray-300 font-roboto">
                            <p>📧 rabinkarmakar947@gmail.com</p>
                            <p>📱 +91 8967873860</p>
                            <p>📍 Bankura West Bengal</p>
                        </div>
                        <StarBorder
                            className="mt-4 w-full"
                            color="#42f563"
                            speed="2s"
                        >
                            <p className="text-sm text-gray-300">Available for freelance projects and full-time opportunities</p>
                        </StarBorder>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center" >
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">© {currentYear} John Doe. All rights reserved.</p>
                    <p className="text-gray-400 text-sm">Built with Next.js 15 & Motion</p>
                </div>
            </div>
        </footer >
    )
}

export default Footer
