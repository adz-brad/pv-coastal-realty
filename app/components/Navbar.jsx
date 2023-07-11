'use client'

import Link from "next/link"
import Image from "next/image"
import { navMenu } from "@/data"
import { IoLogoInstagram, IoLogoFacebook, IoMenuSharp, IoChatboxEllipsesOutline } from 'react-icons/io5'
import { useState } from "react"

const Navbar = () => {

    const [ open, setOpen ] = useState(false)

  return (

    <nav className="absolute top-0 z-50 w-full">

        <div className="flex flex-row items-center">

        <Link 
            href="/" 
            className="relative m-4"
        >
            <Image 
                priority
                loading="eager"
                src="/pv-coastal-realty-logo.png"
                alt="PV Coastal Realty - Discover Your Paradise"
                width={120}
                height={120}
                className="scale-75 md:scale-100"
            />
        </Link>

        <div className={`absolute translate-y-48 space-y-8 md:space-y-0 md:translate-y-0 p-8 md:p-0 rounded-md bg-zinc-50 md:bg-transparent flex-col md:flex-row items-center w-full ${open ? 'flex' : 'hidden md:flex'}`}>
        <ul className="relative md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-zinc-950 md:text-zinc-50 text-2xl font-medium">
            {navMenu.map((item, i) => {
                return (   
                <li 
                    key={i}
                    tabIndex={i}
                >
                    <Link onClick={() => setOpen(false)} href={item.path} className="hover:text-sky-300 transition-colors">
                        {item.title}
                    </Link>      
                </li>
                )
            })}
        </ul>

        <div className="flex flex-row items-center space-x-3 text-3xl text-sky-400 md:text-sky-300 md:ml-auto md:mr-4">
            <a 
                title="Facebook"
                href="https://www.facebook.com/pvcoastalrealty" 
                target="_blank" 
                referrerPolicy="no-referrer"
            >
                <IoLogoFacebook
                 className="hover:scale-105 hover:text-sky-400 drop-shadow-lg"
                />
            </a>
            <a 
                title="Instagram"
                href="https://www.instagram.com/pvcoastalrealty/" 
                target="_blank" 
                referrerPolicy="no-referrer"
            >
                <IoLogoInstagram
                 className="hover:scale-105 hover:text-sky-400 drop-shadow-lg"
                />
            </a>
            <Link
                title="Contact"
                href="/contact"
            >
                <IoChatboxEllipsesOutline
                    className="hover:scale-105 hover:text-sky-400 drop-shadow-lg"
                />
            </Link>
        </div>
        </div>
        <button
            title="Toggle Mobile Navigation"
            onClick={open ? () => setOpen(false) : () => setOpen(true)}
            className={`ml-auto mr-4 text-4xl md:hidden ${open ? 'text-sky-400 hover:text-zinc-50' : 'text-zinc-50 hover:text-sky-400'} transition-colors`}
        >
            <IoMenuSharp />
        </button>
        </div>
    </nav>
  )
}

export default Navbar