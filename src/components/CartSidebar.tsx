'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, CreditCard, ShieldCheck, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    targetIssue: string;
}

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: Product[];
    onRemove: (id: string) => void;
}

export default function CartSidebar({ isOpen, onClose, cartItems, onRemove }: CartSidebarProps) {
    const total = cartItems.reduce((acc, curr) => acc + curr.price, 0)

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[60] flex flex-col"
                    >
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-xl text-white">
                                    <ShoppingBag size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Clinical Cart</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-6 space-y-6 premium-scroll">
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <motion.div
                                        key={item._id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100 group"
                                    >
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white border border-slate-200 relative flex-shrink-0">
                                            <Image
                                                src={item.imageUrl || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80'}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow space-y-1">
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-blue-600 px-2 py-0.5 bg-blue-50 rounded-full">
                                                {item.targetIssue}
                                            </span>
                                            <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h3>
                                            <p className="text-blue-600 font-bold">${item.price}</p>
                                        </div>
                                        <button
                                            onClick={() => onRemove(item._id)}
                                            className="p-2 self-start opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-red-500"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                                    <ShoppingBag size={48} strokeWidth={1} />
                                    <p className="text-sm font-medium">Your prescriptions cart is empty.</p>
                                </div>
                            )}
                        </div>

                        <div className="p-8 border-t border-slate-100 bg-slate-50/80 backdrop-blur-md space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-slate-500">
                                    <span>Prescription Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-500">
                                    <span>Clinical Shipping</span>
                                    <span className="text-emerald-600 font-medium">Complimentary</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-slate-900 pt-2">
                                    <span>Grand Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                disabled={cartItems.length === 0}
                                className="w-full bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 active:scale-95"
                            >
                                <CreditCard size={18} />
                                <span>Biometric Checkout</span>
                            </button>

                            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium tracking-tight">
                                <ShieldCheck size={14} />
                                <span>Secured by Clinical Cloud Infrastructure</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
