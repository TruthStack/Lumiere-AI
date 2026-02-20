'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LOG_LINES = [
    "> INITIATING SECURE BIOMETRIC CAPTURE...",
    "> HANDSHAKE ESTABLISHED WITH PERFECT CORP VISION ENGINE.",
    "> DECODING EPIDERMAL TOPOLOGY & PORE DENSITY...",
    "> QUANTIFYING MELANIN DISTRIBUTION AND VASCULAR TONE...",
    "> WARNING: CRITICAL HYDRATION DEFICIENCY DETECTED.",
    "> QUERYING SANITY STRUCTURED DATABASE FOR MATCHING THERAPEUTICS...",
    "> REGIMEN SYNTHESIZED. RENDERING CLINICAL DASHBOARD."
]

interface DiagnosticTerminalProps {
    onComplete?: () => void;
}

export default function DiagnosticTerminal({ onComplete }: DiagnosticTerminalProps) {
    const [visibleLines, setVisibleLines] = useState<string[]>([])

    useEffect(() => {
        let index = 0
        const interval = setInterval(() => {
            if (index < LOG_LINES.length) {
                setVisibleLines(prev => [...prev, LOG_LINES[index]])
                index++
            } else {
                clearInterval(interval)
                // Wait 800ms after final string then signal completion
                setTimeout(() => {
                    onComplete?.()
                }, 800)
            }
        }, 600)

        return () => clearInterval(interval)
    }, [onComplete])

    return (
        <div className="w-full aspect-[4/3] bg-zinc-950 rounded-[2rem] border border-blue-500/30 p-8 font-mono relative overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.2)]">
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10" />

            <div className="space-y-3 relative z-20">
                <AnimatePresence mode="popLayout">
                    {visibleLines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-cyan-400 text-sm md:text-base tracking-tighter glow-text flex items-center gap-1"
                            style={{ textShadow: '0 0 8px rgba(34,211,238,0.5)' }}
                        >
                            <span>{line}</span>
                            {i === visibleLines.length - 1 && visibleLines.length < LOG_LINES.length && (
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="text-cyan-400 inline-block font-bold"
                                >
                                    _
                                </motion.span>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Background Medical Mesh Decoration */}
            <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
                <svg width="120" height="120" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
                    <path d="M50 5 L50 95 M5 50 L95 50" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
                </svg>
            </div>

            <div className="absolute top-4 right-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Live_Dermal_Feed</span>
            </div>
        </div>
    )
}
