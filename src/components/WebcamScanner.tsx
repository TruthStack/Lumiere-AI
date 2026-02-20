'use client'

import React, { useRef, useCallback, useImperativeHandle, forwardRef } from 'react'
import Webcam from 'react-webcam'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Mic, MicOff, User } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface WebcamScannerProps {
    isAnalyzing: boolean;
    isVoiceActive: boolean;
    onCapture: (image: string) => void;
    onToggleVoice: () => void;
    statusMessage: string;
}

export interface WebcamScannerHandle {
    snap: () => void;
}

const WebcamScanner = forwardRef<WebcamScannerHandle, WebcamScannerProps>(({
    isAnalyzing,
    isVoiceActive,
    onCapture,
    onToggleVoice,
    statusMessage,
}, ref) => {
    const webcamRef = useRef<Webcam>(null)

    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot()
        if (imageSrc) {
            onCapture(imageSrc)
        }
    }, [webcamRef, onCapture])

    useImperativeHandle(ref, () => ({
        snap: () => {
            handleCapture()
        }
    }))

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            <div className="glass-card rounded-[2rem] overflow-hidden relative aspect-[4/3] group glow-border shadow-2xl">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover"
                    videoConstraints={{ facingMode: 'user' }}
                />

                {/* Scanning Animation */}
                <AnimatePresence>
                    {isAnalyzing && (
                        <motion.div
                            initial={{ top: '0%' }}
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10"
                        />
                    )}
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />

                {/* Voice Visualizer Overlay */}
                <AnimatePresence>
                    {isVoiceActive && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-blue-600/5 backdrop-blur-[2px] pointer-events-none flex items-center justify-center"
                        >
                            <div className="flex items-center gap-1.5 h-12">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            height: [8, Math.random() * 40 + 10, 8],
                                            opacity: [0.3, 1, 0.3]
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                            ease: "easeInOut"
                                        }}
                                        className="w-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isAnalyzing && (
                        <>
                            {/* Scanning Line */}
                            <motion.div
                                initial={{ top: '0%' }}
                                animate={{ top: '100%' }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-20 pointer-events-none"
                            />
                            {/* Clinical Analysis Logs */}
                            <div className="absolute top-4 left-4 p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 z-30 w-48 font-mono text-[8px] space-y-1 pointer-events-none">
                                <div className="text-blue-400 font-bold mb-1">ANALYSIS_LOG: v4.2</div>
                                <motion.div
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.1, repeat: Infinity }}
                                    className="text-white"
                                >
                                    {"> DECODING_EPIDERMIS..."}<br />
                                    {"> SCANNING_PORE_DENSITY..."}<br />
                                    {"> ANALYZING_HYDRATION_IDX..."}<br />
                                    {"> MAPPING_MELANIN_ZONES..."}<br />
                                    {"> CALCULATING_LUMERE_SCORE..."}
                                </motion.div>
                            </div>

                            {/* Biometric Scan Points */}
                            <div className="absolute inset-0 pointer-events-none">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: [0, 0.8, 0],
                                            scale: [0.5, 1, 0.5],
                                            x: [Math.random() * 300, Math.random() * 300],
                                            y: [Math.random() * 300, Math.random() * 300],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.2
                                        }}
                                        className="absolute w-2 h-2 rounded-full border border-blue-400 flex items-center justify-center"
                                    >
                                        <div className="w-0.5 h-0.5 bg-blue-400 rounded-full" />
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </AnimatePresence>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                    <button
                        onClick={onToggleVoice}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl ${isVoiceActive ? 'bg-red-500 scale-110' : 'bg-white text-slate-900 hover:bg-slate-50'}`}
                    >
                        {isVoiceActive ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>

                    <button
                        onClick={handleCapture}
                        disabled={isAnalyzing}
                        className="w-20 h-20 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-300 transition-all active:scale-95 group"
                    >
                        <Camera size={32} className="group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        onClick={() => onCapture?.('https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&q=80')}
                        disabled={isAnalyzing}
                        title="Scan Demo Patient (Privacy Mode)"
                        className="w-14 h-14 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl flex items-center justify-center shadow-xl transition-all active:scale-95"
                    >
                        <User size={24} />
                    </button>
                </div>
                <div className="absolute top-6 left-6 px-4 py-2 glass-card rounded-full flex items-center gap-2 border border-white/20">
                    <div className={cn("w-2 h-2 rounded-full", isVoiceActive ? "bg-red-500 animate-pulse" : "bg-emerald-500")} />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-800">
                        {isVoiceActive ? "Lumière Active" : "Standby Mode"}
                    </span>
                </div>
            </div>

            <div className="px-4 text-center">
                <p className="text-slate-500 text-sm font-light italic tracking-tight">{statusMessage}</p>
            </div>
        </motion.div>
    )
})

export default WebcamScanner
