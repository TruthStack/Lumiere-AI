'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Circle, Globe, Cpu, Database, FileText, Mic } from 'lucide-react'

const SYNERGY_NODES = [
    { name: 'Deepgram', icon: Mic, status: 'Active', latency: '42ms', role: 'Voice Intelligence' },
    { name: 'Perfect Corp', icon: Cpu, status: 'Active', latency: '128ms', role: 'Computer Vision' },
    { name: 'Sanity', icon: Database, status: 'Active', latency: '15ms', role: 'Dermal Database' },
    { name: 'Foxit PDF', icon: FileText, status: 'Active', latency: '240ms', role: 'Clinical Reporting' }
]

export default function SponsorSynergy() {
    return (
        <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl space-y-6 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Globe size={120} className="animate-spin-slow" />
            </div>

            <div className="space-y-1 relative">
                <div className="flex items-center gap-2 text-blue-400">
                    <Circle size={8} fill="currentColor" className="animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Clinical Cloud Synergy</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Sponsor Node Status</h3>
            </div>

            <div className="grid grid-cols-1 gap-3 relative">
                {SYNERGY_NODES.map((node, idx) => (
                    <motion.div
                        key={node.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                                <node.icon size={18} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white">{node.name}</h4>
                                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-medium">{node.role}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">
                                {node.status}
                            </div>
                            <div className="text-[9px] text-slate-500 font-mono">
                                {node.latency}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] text-slate-500 text-center italic">
                    All clinical nodes are operating within legendary parameters.
                </p>
            </div>
        </div>
    )
}
