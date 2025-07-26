"use client"
import React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const menuItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
]

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className='flex items-center space-x-2'>
            <span className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-3xl font-bold font-playfair-display text-transparent px-2 py-1 rounded'>RK</span>
        </div>
    )
}

const ProfileHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    // Initialize with a function to get the initial scroll state on client-side
    const [isScrolled, setIsScrolled] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return window.scrollY > 50
        }
        return false
    })

    React.useLayoutEffect(() => {
        // Use layoutEffect for immediate DOM updates before paint
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        // Set initial state immediately
        handleScroll()

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-50 w-full px-2 group"
                style={{
                    '--scroll-state': isScrolled ? '1' : '0'
                } as React.CSSProperties}>
                <div className={cn(
                    'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
                    isScrolled && 'bg-background/95 max-w-4xl rounded-2xl border border-border/50 backdrop-blur-xl shadow-sm lg:px-5'
                )}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <Button
                                variant="outline"
                                size="icon"
                                fillColor="#000"
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="hover:text-white relative z-20 -m-2.5 -mr-4 my-auto  cursor-pointer p-2.5 lg:hidden flex items-center justify-center">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </Button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-foreground block duration-150 font-roboto uppercase font-medium ">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden ', "hover:text-white")}>
                                    <Link href="#contact">
                                        <span>Contact</span>
                                    </Link>
                                </Button>
                                <Button
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden')}>
                                    <Link href="#projects">
                                        <span>View Work</span>
                                    </Link>
                                </Button>
                                <Button
                                    size="sm"
                                    className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                    <Link href="#contact">
                                        <span>Hire Me</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default ProfileHeader
