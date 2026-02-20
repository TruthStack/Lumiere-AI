'use client'

import React from 'react'
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts'
import { motion } from 'framer-motion'

interface SkinRadarChartProps {
    data: {
        spots: number;
        moisture: number;
        texture: number;
        darkCircles: number;
    } | null;
}

export default function SkinRadarChart({ data }: SkinRadarChartProps) {
    if (!data) return null

    const chartData = [
        { subject: 'Spots', A: data.spots, fullMark: 100 },
        { subject: 'Moisture', A: data.moisture, fullMark: 100 },
        { subject: 'Texture', A: data.texture, fullMark: 100 },
        { subject: 'Dark Circles', A: data.darkCircles, fullMark: 100 },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 rounded-3xl glow-border aspect-square w-full"
        >
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Skin Concern Analysis</h3>
            <ResponsiveContainer width="100%" height="90%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={false}
                        axisLine={false}
                    />
                    <Radar
                        name="Skin Score"
                        dataKey="A"
                        stroke="#2563eb"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </motion.div>
    )
}
