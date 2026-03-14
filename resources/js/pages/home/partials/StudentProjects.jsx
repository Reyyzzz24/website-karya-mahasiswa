import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Search, X, MapPin, ExternalLink, ArrowUpRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

const StudentProjects = ({ projects = [] }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // --- Logic Pagination ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredProjects = projects.filter((project) => {
        const query = searchQuery.toLowerCase();
        return (
            project.title?.toLowerCase().includes(query) ||
            project.student_name?.toLowerCase().includes(query) ||
            project.nim?.toLowerCase().includes(query)
        );
    });

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

    // Reset ke halaman 1 jika user mengetik di search bar
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <section id='karya' className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header ala Hero Section Referensi */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="space-y-4">
                        <span className="text-blue-600 dark:text-blue-500 font-mono tracking-widest uppercase text-sm">
                            Showcase Inovasi
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Karya <span className="text-cyan-500 dark:text-cyan-600">Mahasiswa.</span>
                        </h2>
                    </div>

                    {/* Navigation & Search Group */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cari karya..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-10 py-3 bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-white text-sm"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Grid Projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                    <AnimatePresence mode='popLayout'>
                        {currentItems.length > 0 ? (
                            currentItems.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    whileHover={{ y: -10 }}
                                    className="group cursor-pointer relative"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className="relative h-[450px] w-full bg-zinc-900 border border-gray-100 dark:border-white/[0.05] rounded-[32px] overflow-hidden flex flex-col justify-end transition-all hover:shadow-2xl dark:hover:shadow-none">
                                        <div className="absolute inset-0 z-0">
                                            <img
                                                src={`/storage/${project.project_image}`}
                                                alt={project.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-60"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                                        </div>

                                        <div className="absolute top-6 right-6 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all transform -translate-y-4 group-hover:translate-y-0 text-white">
                                            <ArrowUpRight size={20} />
                                        </div>

                                        <div className="relative z-20 p-8 flex flex-col w-full">
                                            <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 transition-colors group-hover:text-blue-400">
                                                {project.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <p className="text-sm font-medium">
                                                    {project.student_name} — {project.nim}
                                                </p>
                                            </div>
                                            <div className="h-1 w-16 bg-blue-500 rounded-full mt-4 transform scale-x-100 group-hover:w-full transition-all duration-700 origin-left" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div className="col-span-full py-20 text-center">
                                <p className="text-gray-500 italic">Karya tidak ditemukan...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pagination Info */}
                {filteredProjects.length > 0 && (
                    <div className="mt-12 flex flex-col items-center gap-4">
                        <div className="flex justify-between items-center w-full text-sm font-medium text-gray-500 dark:text-gray-400">
                            <span>Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredProjects.length)} dari {filteredProjects.length} Karya</span>
                            <div className="flex items-center gap-2">
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg">Halaman {currentPage}</span>
                                <span>dari {totalPages}</span>
                            </div>
                        </div>
                        {/* Tombol Navigasi Halaman */}
                        {totalPages > 1 && (
                            <div className="flex gap-4">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`p-3 rounded-full border border-gray-200 dark:border-white/10 transition ${currentPage === 1 ? 'opacity-30 cursor-not-allowed text-gray-400' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-900 dark:text-white'}`}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className={`p-3 rounded-full border transition ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed border-gray-200 text-gray-400' : 'border-gray-900 dark:border-white/10 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-white/5 text-white'}`}
                                >
                                    <ChevronRight size={20}
                                        className='text-white dark:text-black' />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal Detail Modern */}
            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title="Detail Karya Mahasiswa"
                maxWidth="3xl"
                noPadding={true}
            >
                {selectedProject && (
                    <div className="bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
                        <div className="relative h-80 w-full">
                            <img
                                src={`/storage/${selectedProject.project_image}`}
                                alt={selectedProject.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0f0f0f] to-transparent" />
                        </div>

                        <div className="p-10 -mt-12 relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                                {selectedProject.title}
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-[10px] font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest mb-3">Abstrak / Deskripsi</h4>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg italic">
                                        "{selectedProject.description}"
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-[#161616] p-8 rounded-[24px] border border-gray-100 dark:border-white/5">
                                    <DetailField label="Nama Mahasiswa" value={selectedProject.student_name} />
                                    <DetailField label="NIM" value={selectedProject.nim} />
                                    <DetailField label="Pembimbing 1" value={selectedProject.supervisor_1} />
                                    <DetailField label="Pembimbing 2" value={selectedProject.supervisor_2} />
                                    <div className="md:col-span-2">
                                        <DetailField label="Pembimbing Akademik" value={selectedProject.academic_advisor} />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-2">
                                    {/* Tombol Lihat Project */}
                                    {selectedProject.project_url && (
                                        <a href={selectedProject.project_url} target="_blank" rel="noreferrer" className="flex-1">
                                            <Button variant="default" size='lg' className="w-full flex-1">
                                                <ExternalLink size={18} className="mr-2" /> Lihat Project
                                            </Button>
                                        </a>
                                    )}

                                    {/* Tombol Lihat Jurnal */}
                                    {selectedProject.journal_url && (
                                        <a href={selectedProject.journal_url} target="_blank" rel="noreferrer" className="flex-1">
                                            <Button variant="outline" size='lg' className="w-full flex-1">
                                                <BookOpen size={18} className="mr-2 text-blue-500" /> Lihat Jurnal
                                            </Button>
                                        </a>
                                    )}

                                    {/* Tombol Tutup */}
                                    <Button
                                        onClick={() => setSelectedProject(null)}
                                        className="w-full flex-1"
                                        variant="outline"
                                        size='lg'
                                    >
                                        Tutup
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
};

const DetailField = ({ label, value }) => (
    <div className="space-y-1">
        <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-400 dark:text-gray-500">{label}</p>
        <p className="font-bold text-gray-900 dark:text-white text-base">{value || '-'}</p>
    </div>
);

export default StudentProjects;