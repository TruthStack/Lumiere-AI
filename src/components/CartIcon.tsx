'use client'

import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CartIconProps {
    count: number;
    onClick?: () => void;
}

export default function CartIcon({ count, onClick }: CartIconProps) {
    return (
        <div
            onClick={onClick}
            className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer group"
        >
            <ShoppingCart size={24} />
            <AnimatePresence>
                {count > 0 && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-blue-200 border-2 border-white"
                    >
                        {count}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tooltip for fun */}
            <span className="absolute -bottom-10 right-0 scale-0 group-hover:scale-100 transition-all duration-300 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                Clinical Regimen
            </span>
        </div>
    )
}
