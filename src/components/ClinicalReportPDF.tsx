'use client'

import React from 'react'
import { Sparkles, Activity, ShieldCheck, ClipboardCheck } from 'lucide-react'

interface ClinicalReportPDFProps {
    scores: {
        spots: number;
        moisture: number;
        texture: number;
        darkCircles: number;
    } | null;
    products: any[];
}

export default function ClinicalReportPDF({ scores, products }: ClinicalReportPDFProps) {
    if (!scores) return null;

    const scanId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;

    return (
        <div
            id="pdf-report-template"
            className="w-[210mm] min-h-[297mm] bg-white text-slate-900 p-[20mm] font-sans relative"
            style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
        >
            {/* Medical Header */}
            <div className="bg-[#1e3a8a] text-white p-10 rounded-2xl flex justify-between items-center mb-10 shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                        <Activity className="text-white" size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Lumière Clinical</h1>
                        <p className="text-xs font-bold text-blue-200 tracking-[0.3em] uppercase opacity-80">Diagnostics Laboratory Report</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-light opacity-50">+</div>
                    <p className="text-[10px] font-bold tracking-widest uppercase opacity-70">Secured Biometric Scan</p>
                </div>
            </div>

            {/* Patient Metadata Grid */}
            <div className="grid grid-cols-2 gap-8 mb-12 border-b border-slate-100 pb-10">
                <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Diagnostic Context</p>
                    <p className="text-lg font-bold text-slate-800">Vision Terminal v4.2 Analysis</p>
                    <p className="text-xs text-slate-400 mt-1">Machine Learning Model: Dermal-Net v2.1</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Report Parameters</p>
                    <p className="text-lg font-bold text-slate-800">Scan ID: {scanId}</p>
                    <p className="text-xs text-slate-400 mt-1">Generated: {new Date().toLocaleString()}</p>
                </div>
            </div>

            {/* Biometric Visualization */}
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <ShieldCheck size={14} className="text-blue-500" />
                Validated Biometric Markers
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-12">
                {[
                    { label: 'Epidermal Hydration', value: scores.moisture, color: 'bg-blue-500' },
                    { label: 'Melanin Concentration', value: scores.spots, color: 'bg-emerald-500' },
                    { label: 'Dermal Texture Index', value: scores.texture, color: 'bg-amber-500' },
                    { label: 'Vascular Tone', value: scores.darkCircles, color: 'bg-rose-500' }
                ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-end mb-3">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
                            <span className="text-2xl font-black text-slate-900">{item.value}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${item.color} rounded-full`}
                                style={{ width: `${item.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Prescribed Regimen */}
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <ClipboardCheck size={14} className="text-blue-500" />
                Prescribed Clinical Regimen
            </h2>

            <div className="space-y-4 mb-16">
                {products.map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center p-5 border border-slate-100 rounded-xl bg-slate-50/50">
                        <div>
                            <h3 className="font-bold text-slate-800">{p.name}</h3>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Therapeutic Target: {p.targetIssue}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-black text-blue-600">$ {p.price}.00</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer / Watermark */}
            <div className="absolute bottom-10 left-[20mm] right-[20mm] border-t-2 border-slate-100 pt-8 text-center">
                <div className="flex justify-center items-center gap-8 mb-4">
                    <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Authorized Clinician Required</p>
                    <p className="text-[9px] font-bold tracking-widest text-blue-600 uppercase">Lumière AI Biotech</p>
                    <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Protocol: 88-X</p>
                </div>
                <div className="opacity-10 text-[60px] font-black text-slate-900 uppercase tracking-[0.5em] select-none pointer-events-none mt-4 rotate-[-10deg]">
                    Confidential
                </div>
                <div className="mt-8 text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">
                    Secured by Foxit PDF Services
                </div>
            </div>
        </div>
    )
}
