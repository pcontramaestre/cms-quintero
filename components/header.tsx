"use client" 
import {useState} from "react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {Menu, PhoneIcon, MailIcon} from "lucide-react"
import {FacebookIcon, YoutubeIcon, InstagramIcon, TwitterIcon} from "@/components/icons"
import Image from "next/image"
import GoogleTranslate from "@/components/GoogleTranslate"

const navigation = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "About",
        href: "/about"
    },
    {
        name: "Services",
        href: "/services"
    },
    {
        name: "Blog",
        href: "/blog"
    }, {
        name: "Business Toolkit",
        href: "/business-toolkit"
    }, {
        name: "Contact",
        href: "/contact"
    },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <header className="header-top bg-[#002749] text-white pt-4 pb-4">
                <div className="container">

                    <div className="header-social flex items-center justify-between flex-wrap gap-4">
                        <div className="top-info-left">
                            <ul className="text-white flex gap-4">
                                <li>
                                    <Link href="https://www.facebook.com/QuinteroAndAssociates" target="_blank">
                                        <FacebookIcon/>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.twitter.com/QuinteroAndAssociates" target="_blank">
                                        <TwitterIcon/>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.instagram.com/QuinteroAndAssociates" target="_blank">
                                        <InstagramIcon/>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.youtube.com/QuinteroAndAssociates" target="_blank">
                                        <YoutubeIcon/>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="top-info-right font-light">
                            <ul className="list-unstyled flex gap-4 text-white items-center">
                                <li>
                                    <Link href="tel:+13055294929" className="flex items-center gap-2 text-sm">
                                        <PhoneIcon/>
                                        +1 (305) 529-4929
                                    </Link>
                                </li>
                                <li>
                                    <Link href="mailto:info@quinteroandassociates.com" className="flex items-center gap-2 text-sm">
                                        <MailIcon/>
                                        info@quinteroandassociates.com
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            <header className="sticky top-0 z-50 w-full border-b bg-white">
                <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            {/* <span className="text-xl font-bold text-gray-900">Quintero & Associates</span> */}
                            <Image 
                                src="/logo.webp" 
                                alt="Quintero & Associates"
                                width={150}
                                height={70}
                                quality={80}
                                priority
                                className="pt-2"
                            />
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex md:items-center md:space-x-8">
                        {
                        navigation.map((item) => (
                            <Link key={
                                    item.name
                                }
                                href={
                                    item.href
                                }
                                className="text-sm font-medium text-gray-700 hover:text-gray-900">
                                {
                                item.name
                            } </Link>
                        ))
                    }
                        <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                    </nav>

                    {/* Mobile navigation */}
                    <div className="flex md:hidden">
                        <Sheet open={isMenuOpen}
                            onOpenChange={setIsMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
                                    <Menu className="h-5 w-5"/>
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <div className="flex flex-col space-y-4 py-6">
                                    {
                                    navigation.map((item) => (
                                        <Link key={
                                                item.name
                                            }
                                            href={
                                                item.href
                                            }
                                            className="text-base font-medium text-gray-900 hover:text-gray-700"
                                            onClick={
                                                () => setIsMenuOpen(false)
                                        }>
                                            {
                                            item.name
                                        } </Link>
                                    ))
                                }
                                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Get Started</Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
        </>
    )
}
