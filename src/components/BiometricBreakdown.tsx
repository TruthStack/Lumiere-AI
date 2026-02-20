'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Droplets, Shield, Sparkles, Zap, Lightbulb } from 'lucide-react'

interface SkinScores {
    spots: number;
    moisture: number;
    texture: number;
    darkCircles: number;
}

interface BiometricBreakdownProps {
    scores: SkinScores | null;
}

export default function BiometricBreakdown({ scores }: BiometricBreakdownProps) {
    if (!scores) return null

    const metrics = [
        { name: 'Epidermal Hydration', value: scores.moisture, icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50', insight: 'Your moisture levels are below optimal. Focus on hyaluronic acids.' },
        { name: 'Dermal Consistency', value: scores.texture, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', insight: 'Micro-texture is recovering well. Maintain current exfoliation.' },
        { name: 'Melanin Distribution', value: scores.spots, icon: Sparkles, color: 'text-emerald-500', bg: 'bg-emerald-50', insight: 'Excellent control over pigmentation biomarkers.' },
        { name: 'Vascular Tone', value: scores.darkCircles, icon: Shield, color: 'text-indigo-500', bg: 'bg-indigo-50', insight: 'Slight vascular fatigue detected. Prioritize recovery sleep.' }
    ]

    return (
        <div className="flex flex-col w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6 overflow-hidden space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white tracking-tight">Biometric Deep-Dive</h3>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest px-3 py-1 bg-blue-500/10 rounded-full">v4.2 Analysis</span>
            </div>

            <div className="space-y-6">
                {metrics.map((metric, idx) => (
                    <motion.div
                        key={metric.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="space-y-2 group w-full"
                    >
                        <div className="flex justify-between items-end">
                            <div className="flex items-center gap-2">
                                <metric.icon size={16} className={metric.color} />
                                <span className="text-xs font-bold text-slate-300">{metric.name}</span>
                            </div>
                            <span className="text-sm font-black text-white">{metric.value}%</span>
                        </div>

                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${metric.value}%` }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + idx * 0.1 }}
                                className={`h-full ${metric.color.replace('text', 'bg')} shadow-[0_0_10px_currentColor] opacity-80`}
                            />
                        </div>

                        <div className="flex gap-2 items-start mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Lightbulb size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
                            <p className="text-[10px] leading-relaxed text-slate-500 font-medium">
                                {metric.insight}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="pt-4 border-t border-zinc-800">
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-white space-y-2">
                    <div className="flex items-center gap-2">
                        <Zap size={14} className="text-blue-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Actionable Clinical Plan</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                        Based on your profile, we recommend a <span className="text-blue-400">7-day dermal restoration cycle</span> targeting the mid-layers.
                    </p>
                </div>
            </div>
        </div>
    )
}
