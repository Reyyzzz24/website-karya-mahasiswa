import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Pages",
            links: ["All Products", "Studio", "Clients", "Pricing", "Blog"]
        },
        {
            title: "Socials",
            links: ["Facebook", "Instagram", "Twitter", "LinkedIn"]
        },
        {
            title: "Legal",
            links: ["Privacy Policy", "Terms of Service", "Cookie Policy"]
        },
        {
            title: "Register",
            links: ["Sign Up", "Login", "Forgot Password"]
        }
    ];

    return (
        <footer className="relative bg-white dark:bg-[#0a0a0a] pt-24 pb-12 overflow-hidden transition-colors duration-500">
            {/* Dekorasi Garis Atas Halus */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                    
                    {/* Brand Section */}
                    <div className="col-span-2 lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                                <span className="text-white dark:text-black font-black text-xl">f</span>
                            </div>
                            <span className="text-xl font-bold dark:text-white tracking-tight">FILKOM</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-zinc-500 leading-relaxed">
                            © copyright FILKOM {currentYear}. <br />
                            All rights reserved.
                        </p>
                    </div>

                    {/* Links Sections */}
                    {footerSections.map((section, idx) => (
                        <div key={idx} className="space-y-6">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <a 
                                            href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="text-sm text-gray-500 dark:text-zinc-500 hover:text-blue-500 dark:hover:text-white transition-colors duration-300"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Big Background Text (Aura Branding) */}
                <div className="relative mt-20 select-none pointer-events-none">
                    <h1 className="text-[12vw] font-bold text-gray-100 dark:text-white/[0.02] text-center leading-none tracking-tighter">
                        FILKOM
                    </h1>
                </div>
            </div>
        </footer>
    );
};

export default Footer;