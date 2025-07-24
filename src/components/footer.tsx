"use client"

import { motion } from "motion/react"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { href: "https://github.com", label: "GitHub", icon: "📚" },
        { href: "https://linkedin.com", label: "LinkedIn", icon: "💼" },
        { href: "https://twitter.com", label: "Twitter", icon: "🐦" },
        { href: "mailto:john.doe@example.com", label: "Email", icon: "📧" },
    ]

    const quickLinks = [
        { href: "#hero", label: "Home" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" },
        { href: "#experience", label: "Experience" },
        { href: "#contact", label: "Contact" },
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
                        <h3 className="text-2xl font-playfair-display font-bold mb-4">Rabin Karmakar</h3>
                        <p className="text-gray-300 mb-4 leading-relaxed">
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
                                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={`Visit my ${social.label}`}
                                >
                                    <span aria-hidden="true">
                                        {social.icon}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div
                    >
                        <h4 className="text-lg font-playfair-display font-semibold mb-4">Quick Links</h4>
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
                                            className="text-gray-300 hover:text-white transition-colors"
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
                        <h4 className="text-lg font-playfair-display font-semibold mb-4">Get In Touch</h4>
                        <div className="space-y-2 text-gray-300">
                            <p>📧 john.doe@example.com</p>
                            <p>📱 +1 (555) 123-4567</p>
                            <p>📍 San Francisco, CA</p>
                        </div>
                        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                            <p className="text-sm text-gray-300">Available for freelance projects and full-time opportunities</p>
                        </div>
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
