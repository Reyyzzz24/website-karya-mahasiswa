import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { MapPin, Phone, Mail, Send, CheckCircle2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://formspree.io/f/xrbgknkv", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                setShowSuccessModal(true);
                reset();
            }
        });
    };

    return (
        <section id="hubungi" className="py-24 bg-gray-50 dark:bg-[#030303] transition-colors duration-500 overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                
                {/* Header Section */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-4"
                    >
                       {/*  <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-600/20">
                            <Mail className="text-blue-600 dark:text-blue-400" size={20} />
                        </div> */}
                        <span className="text-blue-600 dark:text-blue-500 font-mono tracking-widest text-sm uppercase">Contact Us</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Let's build something <span className="text-gray-400 dark:text-zinc-600">together.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* KIRI: Info & World Map Visual */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <p className="text-gray-600 dark:text-zinc-400 text-lg leading-relaxed max-w-md">
                                Silakan hubungi kami melalui formulir atau klik kontak di bawah ini untuk terhubung langsung dengan tim kami.
                            </p>
                            
                            <div className="flex flex-col gap-4 text-gray-500 dark:text-zinc-500 text-sm font-medium">
                                <a href="mailto:filkom@unida.ac.id" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                                    filkom@unida.ac.id
                                </a>
                                <a href="https://wa.me/6282518240773" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                                    +62 251 8240 773
                                </a>
                            </div>
                        </div>

                        {/* World Map Placeholder (Visual ala referensi) */}
                        <div className="relative h-64 w-full opacity-50 dark:opacity-30 grayscale group">
                             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent blur-3xl" />
                             <Globe className="w-full h-full text-zinc-300 dark:text-zinc-800" strokeWidth={0.5} />
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-blue-500/40 rounded-full blur-xl animate-pulse" />
                                    <div className="h-3 w-3 bg-blue-500 rounded-full border-2 border-white dark:border-zinc-900 relative z-10" />
                                    <div className="absolute top-0 left-5 bg-white dark:bg-zinc-800 px-3 py-1 rounded-lg shadow-xl text-[10px] font-bold dark:text-white whitespace-nowrap border dark:border-white/10">
                                        We are here
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* KANAN: Form Card ala Aceternity */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            {/* Card Background dengan Grid Effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[32px] opacity-0 group-hover:opacity-10 transition duration-500" />
                            
                            <div className="relative bg-white dark:bg-[#0c0c0c] p-8 md:p-12 rounded-[32px] border border-gray-100 dark:border-white/[0.05] shadow-2xl shadow-gray-200/50 dark:shadow-none overflow-hidden">
                                {/* Subtle Grid Pattern */}
                                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[length:32px_32px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />
                                
                                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 dark:text-zinc-500">Name</label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                placeholder="Your Name"
                                                required
                                                className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/[0.05] rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 dark:text-zinc-500">Email Address</label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                placeholder="Your Email Address"
                                                required
                                                className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/[0.05] rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-zinc-700"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 dark:text-zinc-500">Message</label>
                                        <textarea
                                            rows={5}
                                            value={data.message}
                                            onChange={e => setData('message', e.target.value)}
                                            placeholder="Type your message here..."
                                            required
                                            className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/[0.05] rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none placeholder:text-gray-300 dark:placeholder:text-zinc-700"
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={processing}
                                        className="w-full md:w-max px-12 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                    >
                                        {processing ? 'Sending...' : 'Submit'}
                                        {!processing && <Send size={16} />}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Success Modal yang Diperhalus */}
            <AnimatePresence>
                {showSuccessModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSuccessModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-white dark:bg-[#0c0c0c] p-10 rounded-[40px] shadow-2xl max-w-sm w-full text-center border dark:border-white/10"
                        >
                            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Pesan Terkirim!</h3>
                            <p className="text-gray-500 dark:text-zinc-500 mb-8 text-sm">
                                Tim kami akan segera merespons pesan Anda.
                            </p>
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="w-full py-4 bg-gray-100 dark:bg-zinc-800 dark:text-white font-bold rounded-2xl transition-all"
                            >
                                Tutup
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Contact;