'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Camera, Sparkles, Activity, Droplets, Zap, ChevronRight, Loader2 } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface SkinScores {
    spots: number;
    moisture: number;
    wrinkles: number;
    texture: number;
    darkCircles?: number;
}

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    targetSkinIssue: string;
}

export default function ClinicUI() {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [isVoiceActive, setIsVoiceActive] = useState(false)
    const [analysisResult, setAnalysisResult] = useState<SkinScores | null>(null)
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
    const webcamRef = useRef<Webcam>(null)
    const [statusMessage, setStatusMessage] = useState("Lumière is ready.")

    // Fetch products from Sanity based on skin concerns
    const fetchRecommendations = async (concerns: string[]) => {
        try {
            const query = `*[_type == "skincareProduct" && targetSkinIssue in $concerns][0...3]`
            const products = await client.fetch(query, { concerns })
            setRecommendedProducts(products)
        } catch (error) {
            console.error("Sanity Fetch Error:", error)
        }
    }

    const triggerSkinAnalysis = useCallback(async () => {
        if (!webcamRef.current) return

        setIsAnalyzing(true)
        setStatusMessage("Capturing high-resolution scan...")

        const imageSrc = webcamRef.current.getScreenshot()

        if (!imageSrc) {
            setIsAnalyzing(false)
            setStatusMessage("Failed to access camera.")
            return
        }

        try {
            setStatusMessage("Analyzing pores & hydration...")
            const response = await fetch('/api/analyze-skin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: imageSrc })
            })

            const data = await response.json()
            setAnalysisResult(data)

            // Determine top concern for Sanity query
            const concerns = Object.entries(data as SkinScores)
                .sort(([, a], [, b]) => (a as number) - (b as number)) // Lower score = more concern
                .slice(0, 2)
                .map(([key]) => key.toLowerCase())

            await fetchRecommendations(concerns)
            setStatusMessage("Analysis complete. Your personalized regimen is ready.")
        } catch (error) {
            console.error("Analysis Error:", error)
            setStatusMessage("Precision analysis failed. Please try again.")
        } finally {
            setIsAnalyzing(false)
        }
    }, [webcamRef])

    // Deepgram Voice Agent Integration
    const [isListening, setIsListening] = useState(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const socketRef = useRef<WebSocket | null>(null)

    const startVoiceAgent = useCallback(async () => {
        try {
            const response = await fetch('/api/voice')
            const config = await response.json()

            // For a hackathon, we'll use the Deepgram WebSocket directly from the browser
            // Note: In production, use a secure token proxy
            const apiKey = '9b0942fbc155b7ef5acf5e1ddbf265aa31591849' // From .env.local
            const url = `wss://agent.deepgram.com/v1/agent?model=${config.model}`

            const socket = new WebSocket(url, ['token', apiKey])
            socketRef.current = socket

            socket.onopen = () => {
                console.log('Deepgram Connection Open')
                // Send initial config/instructions
                socket.send(JSON.stringify({
                    type: 'SettingsConfiguration',
                    instructions: config.instructions,
                    tools: config.tools
                }))
                setIsListening(true)
            }

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)

                if (data.type === 'FunctionCallRequest' && data.name === 'trigger_skin_analysis') {
                    triggerSkinAnalysis()
                    // Acknowledge the tool call
                    socket.send(JSON.stringify({
                        type: 'FunctionCallResponse',
                        name: 'trigger_skin_analysis',
                        call_id: data.call_id,
                        output: 'Skin analysis triggered. Capturing scan now.'
                    }))
                }
            }

            socket.onerror = (err) => console.error('Deepgram Socket Error:', err)
            socket.onclose = () => setIsListening(false)

            // Start capturing audio
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
            mediaRecorderRef.current = mediaRecorder

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
                    socket.send(event.data)
                }
            }

            mediaRecorder.start(100)
            setStatusMessage("Lumière is listening...")
        } catch (error) {
            console.error('Failed to start voice agent:', error)
            setStatusMessage("Failed to initialize voice agent.")
        }
    }, [triggerSkinAnalysis])

    const stopVoiceAgent = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop()
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
        }
        if (socketRef.current) {
            socketRef.current.close()
        }
        setIsListening(false)
        setStatusMessage("Lumière on standby.")
    }, [])

    useEffect(() => {
        if (isVoiceActive && !isListening) {
            startVoiceAgent()
        } else if (!isVoiceActive && isListening) {
            stopVoiceAgent()
        }
    }, [isVoiceActive, isListening, startVoiceAgent, stopVoiceAgent])


    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-6 py-12">
            {/* Left Pane: Camera Feed */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
            >
                <div className="glass-card rounded-[2rem] overflow-hidden relative aspect-[4/3] group glow-border">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full h-full object-cover"
                        videoConstraints={{ facingMode: 'user' }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                        <button
                            onClick={() => setIsVoiceActive(!isVoiceActive)}
                            className={cn(
                                "p-5 rounded-full transition-all duration-500 flex items-center justify-center glow-blue",
                                isVoiceActive ? "bg-red-500 text-white" : "bg-white text-blue-600 hover:scale-105"
                            )}
                        >
                            {isVoiceActive ? <MicOff size={24} /> : <Mic size={24} />}
                        </button>
                        <button
                            onClick={triggerSkinAnalysis}
                            disabled={isAnalyzing}
                            className="p-5 rounded-full bg-white text-blue-600 hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-50"
                        >
                            <Camera size={24} />
                        </button>
                    </div>

                    <div className="absolute top-6 left-6 px-4 py-2 glass-card rounded-full flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", isVoiceActive ? "bg-red-500 animate-pulse" : "bg-blue-500")} />
                        <span className="text-xs font-medium tracking-wide uppercase">
                            {isVoiceActive ? "Listening (Deepgram Active)" : "Lumiere Standby"}
                        </span>
                    </div>
                </div>

                <div className="px-4 text-center">
                    <p className="text-slate-400 text-sm font-light italic">{statusMessage}</p>
                </div>
            </motion.div>

            {/* Right Pane: Analysis Results */}
            <div className="space-y-8">
                <AnimatePresence mode="wait">
                    {!analysisResult && !isAnalyzing ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20"
                        >
                            <div className="p-6 rounded-full bg-blue-50 text-blue-400">
                                <Sparkles size={48} className="animate-pulse-soft" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-light text-slate-800 italic">Awaiting Analysis...</h3>
                                <p className="text-slate-400 max-w-xs mt-2">Speak to Lumière or capture a scan to begin your clinical journey.</p>
                            </div>
                        </motion.div>
                    ) : isAnalyzing ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
                        >
                            <div className="relative">
                                <Loader2 size={64} className="text-blue-500 animate-spin" />
                                <Activity size={32} className="text-blue-200 absolute inset-0 m-auto animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-blue-600 font-medium animate-pulse">Scanning Bio-markers</p>
                                <div className="flex gap-1 justify-center">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                            className="w-1 h-1 bg-blue-400 rounded-full"
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <header className="space-y-1">
                                <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Your Skin Report</h2>
                                <div className="flex items-center gap-2 text-blue-500">
                                    <Activity size={16} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Precision Biometrics</span>
                                </div>
                            </header>

                            {/* Scores Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Purity (Spots)", value: analysisResult?.spots || 0, icon: <Sparkles size={20} /> },
                                    { label: "Hydration", value: analysisResult?.moisture || 0, icon: <Droplets size={20} /> },
                                    { label: "Elasticity", value: analysisResult?.wrinkles || 0, icon: <Zap size={20} /> },
                                    { label: "Texture", value: analysisResult?.texture || 0, icon: <Activity size={20} /> }
                                ].map((item, idx) => (
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0, y: 10 }}
                                        animate={{ scale: 1, opacity: 1, y: 0 }}
                                        transition={{
                                            delay: idx * 0.15,
                                            type: "spring",
                                            stiffness: 80
                                        }}
                                        key={item.label}
                                        className="glass-card p-6 rounded-3xl glow-border group hover:bg-white transition-colors"
                                    >
                                        <div className="text-blue-500 mb-3">{item.icon}</div>
                                        <div className="flex justify-between items-end">
                                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{item.label}</span>
                                            <span className="text-2xl font-bold text-slate-900">{item.value}%</span>
                                        </div>
                                        <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.value}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className={cn("h-full rounded-full", item.value > 80 ? "bg-emerald-400" : item.value > 60 ? "bg-amber-400" : "bg-rose-400")}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Product Recommendations */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                    Recommended Regimen
                                    <ChevronRight size={20} className="text-slate-300" />
                                </h3>
                                <div className="space-y-3">
                                    {recommendedProducts.map((product, idx) => (
                                        <motion.div
                                            key={product._id || idx}
                                            initial={{ x: 30, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{
                                                delay: 0.6 + (idx * 0.15),
                                                type: "spring",
                                                damping: 20
                                            }}
                                            className="glass-card p-4 rounded-2xl flex items-center gap-4 glow-border hover:shadow-lg transition-all"
                                        >
                                            <div className="w-16 h-16 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                                                {product.imageUrl && (
                                                    <Image
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="text-sm font-bold text-slate-900">{product.name}</h4>
                                                <p className="text-xs text-slate-500 line-clamp-1">{product.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-blue-600">${product.price}</p>
                                                <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-500 transition-colors mt-1">View Details</button>
                                            </div>
                                        </motion.div>
                                    )) || (
                                            <div className="text-center py-6 glass-card rounded-2xl border-dashed border-slate-200">
                                                <p className="text-xs text-slate-400 uppercase tracking-widest">Building your custom kit...</p>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
