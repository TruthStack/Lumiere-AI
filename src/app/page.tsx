import ClinicUI from '@/components/ClinicUI'
import { Sparkles, ShieldCheck, Heart } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen clinical-gradient selection:bg-blue-100 selection:text-blue-900">
      {/* Premium Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white glow-blue">
            <Sparkles size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">Lumière AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500 tracking-wider uppercase">
          <a href="#" className="hover:text-blue-600 transition-colors">Our Science</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Regimen</a>
          <a href="#" className="hover:text-blue-600 transition-colors">The Clinic</a>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-xl hover:shadow-blue-200">
            Book Consultation
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest animate-fade-in">
          <Sparkles size={14} />
          <span>Next-Gen Skincare Analysis</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
          Clinical Precision.<br />
          <span className="italic font-light text-slate-400">Personalized Luxury.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-500 font-light leading-relaxed">
          Experience the world&apos;s most advanced autonomous skincare clinic.
          Powered by vision AI and voice-guided diagnostics to unlock your natural radiance.
        </p>
      </section>

      {/* Core UI Component */}
      <ClinicUI />

      {/* Trust Markers */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-slate-100 text-blue-500">
              <ShieldCheck size={24} />
            </div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Medical Grade</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Advanced vision engines detecting over 14 unique skin biomarkers.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-slate-100 text-blue-500">
              <Heart size={24} />
            </div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Skin Harmony</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Tailored formulations from Sanity Content Cloud for your unique profile.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-slate-100 text-blue-500">
              <Sparkles size={24} />
            </div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Voice First</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Integrated Deepgram Voice Agent for seamless, hands-free diagnostics.</p>
          </div>
        </div>
      </section>

      {/* Decorative Glows */}
      <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-100/30 blur-[120px] rounded-full" />
      <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-zinc-100/50 blur-[100px] rounded-full" />

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-100 text-center">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">Designed for DeveloperWeek 2026</p>
      </footer>
    </main>
  )
}
