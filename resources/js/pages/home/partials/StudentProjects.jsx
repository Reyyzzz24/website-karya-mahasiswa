import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ExternalLink, Search, X } from "lucide-react"; // Tambah Search & X

const StudentProjects = ({ projects = [] }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State untuk search

    // Logika Filtering: Mencari berdasarkan judul, nama mahasiswa, atau NIM
    const filteredProjects = projects.filter((project) => {
        const query = searchQuery.toLowerCase();
        return (
            project.title?.toLowerCase().includes(query) ||
            project.student_name?.toLowerCase().includes(query) ||
            project.nim?.toLowerCase().includes(query)
        );
    });

    return (
        <section id='karya' className="py-16 bg-gray-50 dark:bg-gray-950">
            <div className="container mx-auto px-6 max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
                    Karya Mahasiswa
                </h2>
                <div className="h-1.5 w-20 bg-cyan-500 mx-auto rounded-full mb-6"></div>

                <p className="text-center text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8 px-4">
                    Kumpulan inovasi dan riset terbaik dari mahasiswa kami.
                </p>

                {/* --- INPUT SEARCH --- */}
                <div className="max-w-md mx-auto mb-12 relative group">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Cari judul, nama, atau NIM..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all dark:text-white"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* --- GRID PROJECTS --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout // Animasi perpindahan posisi saat filter
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileHover={{ y: -8 }}
                                    className="h-[400px] w-full cursor-pointer"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <Card className="relative h-full w-full overflow-hidden rounded-2xl border-0 shadow-lg group">
                                        <div className="absolute inset-0 bg-gray-200">
                                            {project.project_image && (
                                                <img
                                                    src={`/storage/${project.project_image}`}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        </div>
                                        <div className="relative h-full p-6 flex flex-col justify-end text-white">
                                            <h3 className="text-xl font-bold leading-tight">{project.title}</h3>
                                            <p className="text-sm text-gray-300 mt-1">
                                                {project.student_name} - {project.nim}
                                            </p>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-20 text-center text-gray-500"
                            >
                                <p className="text-lg italic">Tidak ada karya yang sesuai dengan pencarian Anda.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* --- MODAL (Tetap sama) --- */}
            <Modal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title=""
                maxWidth="3xl"
                noPadding={true}
            >
                {selectedProject && (
                    <div className="flex flex-col">
                        <div className="relative h-72 w-full shrink-0">
                            <img
                                src={`/storage/${selectedProject.project_image}`}
                                alt={selectedProject.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        <div className="p-8 space-y-6">
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                {selectedProject.title}
                            </h2>

                            <div>
                                <h4 className="font-bold text-xs text-gray-500 uppercase tracking-widest mb-2">Deskripsi</h4>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {selectedProject.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-zinc-800/50 p-5 rounded-2xl">
                                <DetailField label="Mahasiswa" value={selectedProject.student_name} />
                                <DetailField label="NIM" value={selectedProject.nim} />
                                <DetailField label="Pembimbing 1" value={selectedProject.supervisor_1} />
                                <DetailField label="Pembimbing 2" value={selectedProject.supervisor_2} />
                                <div className="md:col-span-2">
                                    <DetailField label="Pembimbing Akademik" value={selectedProject.academic_advisor} />
                                </div>
                            </div>

                            <div className="border-t pt-6 flex justify-between items-center">
                                <div className="flex gap-2">
                                    {selectedProject.project_url && (
                                        <a href={selectedProject.project_url} target="_blank" rel="noreferrer">
                                            <Button variant="secondary" className="gap-2">
                                                <ExternalLink size={16} /> Link Project
                                            </Button>
                                        </a>
                                    )}
                                    {selectedProject.journal_url && (
                                        <a href={selectedProject.journal_url} target="_blank" rel="noreferrer">
                                            <Button variant="secondary" className="gap-2">
                                                <ExternalLink size={16} /> Link Jurnal
                                            </Button>
                                        </a>
                                    )}
                                </div>
                                <Button onClick={() => setSelectedProject(null)} variant="outline">
                                    Tutup
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
};

const DetailField = ({ label, value }) => (
    <div>
        <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">{label}</p>
        <p className="font-semibold text-gray-900 dark:text-gray-100 mt-0.5">{value || '-'}</p>
    </div>
);

export default StudentProjects;