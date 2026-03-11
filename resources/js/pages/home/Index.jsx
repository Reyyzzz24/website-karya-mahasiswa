import React from "react";
import Navbar from "./partials/Navbar";
import Hero from "./partials/Hero";
import StudentProjects from "./partials/StudentProjects";
import Activities from "./partials/Activities";
import Contact from "./partials/Contact";
import Footer from "./partials/Footer";
import { MessageCircle, MessageCircleMore } from "lucide-react"; // Menggunakan lucide-react untuk ikon chat

const Home = ({ menus, heroData, logo, projects, activities, contactData, footerData }) => {
    // Ganti nomor ini dengan nomor WhatsApp tujuan (gunakan format internasional tanpa +)
    const whatsappNumber = "628123456789";
    const message = "Halo, saya ingin bertanya mengenai layanan Anda.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="relative">
            <Navbar menus={menus} logo={logo} />
            <main>
                <Hero data={heroData} />
                <Activities activities={activities} />
                <StudentProjects projects={projects} />
                <Contact data={contactData} />
            </main>
            <Footer data={footerData} />

            {/* Tombol WhatsApp Floating - Design: Smooth Expandable Center */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-start h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] transition-all duration-500 ease-in-out group min-w-[56px] hover:min-w-[200px] px-3.5"
                aria-label="Chat WhatsApp"
            >
                {/* Ikon Tetap di Posisinya */}
                <div className="flex-shrink-0 flex items-center justify-center">
                    <MessageCircleMore size={28} fill="currentColor" className="text-white" />
                </div>

                {/* Teks Muncul dengan Transisi Lebar dan Opacity */}
                <div className="max-w-0 group-hover:max-w-[140px] overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                    <span className="pl-3 font-semibold whitespace-nowrap">
                        Chat WhatsApp
                    </span>
                </div>
            </a>
        </div>
    );
};

export default Home;