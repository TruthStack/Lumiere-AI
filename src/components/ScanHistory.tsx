'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Activity, Calendar, ChevronRight, TrendingDown, TrendingUp } from 'lucide-react'

interface HistoryItem {
    _id: string;
    date: string;
    scores: {
        spots: number;
        moisture: number;
        wrinkles: number;
    };
}

interface ScanHistoryProps {
    history: HistoryItem[];
}

export default function ScanHistory({ history }: ScanHistoryProps) {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                        <Activity size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Laboratory Logs</h3>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last 5 Scans</span>
            </div>

            <div className="space-y-4">
                {history.length > 0 ? (
                    history.map((record, idx) => {
                        const date = new Date(record.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                        })

                        // Average score for the "Health Index"
                        const healthIndex = Math.round((record.scores.spots + record.scores.moisture + record.scores.wrinkles) / 3)

                        return (
                            <motion.div
                                key={record._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 hover:border-blue-100 hover:bg-white transition-all group cursor-default"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex flex-col items-center justify-center shadow-sm">
                                    <span className="text-xs font-bold text-blue-600">{healthIndex}</span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase">Score</span>
                                </div>

                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                                        <Calendar size={12} className="text-slate-400" />
                                        <span>{date}</span>
                                    </div>
                                    <div className="flex gap-3 mt-1">
                                        <div className="flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            <span className="text-[10px] text-slate-500">M: {record.scores.moisture}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                            <span className="text-[10px] text-slate-500">S: {record.scores.spots}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-1">
                                    {healthIndex > 80 ? (
                                        <TrendingUp size={16} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                                    ) : (
                                        <TrendingDown size={16} className="text-amber-500 group-hover:scale-110 transition-transform" />
                                    )}
                                    <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                </div>
                            </motion.div>
                        )
                    })
                ) : (
                    <div className="py-12 text-center space-y-3 opacity-30">
                        <Activity size={32} className="mx-auto" strokeWidth={1.5} />
                        <p className="text-sm font-medium">No biometric records found.</p>
                    </div>
                )}
            </div>

            <button className="w-full py-3 border border-slate-100 rounded-2xl text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-colors">
                View Full Clinical History
            </button>
        </div>
    )
}
