'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plus, Check } from 'lucide-react'

interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    targetIssue: string;
    inStock: boolean;
}

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    isInCart: boolean;
    index: number;
}

export default function ProductCard({ product, onAddToCart, isInCart, index }: ProductCardProps) {
    return (
        <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
                delay: 0.1 + (index * 0.1),
                type: "spring",
                damping: 20
            }}
            className="glass-card p-4 rounded-[2rem] flex flex-col gap-4 glow-border hover:shadow-xl transition-all h-full bg-white/40"
        >
            <div className="w-full aspect-square bg-slate-50 rounded-[1.5rem] overflow-hidden relative border border-slate-100">
                <Image
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                />
            </div>

            <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                        {product.targetIssue}
                    </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2">{product.name}</h4>

                <div className="mt-auto flex items-center justify-between">
                    <p className="text-base font-bold text-slate-900">${product.price}</p>
                    <button
                        onClick={() => onAddToCart(product)}
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${isInCart
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-900 text-white hover:bg-blue-600 active:scale-90"
                            }`}
                    >
                        {isInCart ? <Check size={18} /> : <Plus size={18} />}
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
