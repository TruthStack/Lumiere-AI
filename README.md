# ✧ Lumière AI ✧

[![Repository](https://img.shields.io/badge/Repository-TruthStack/Lumiere--AI-000000?style=for-the-badge&logo=github)](https://github.com/TruthStack/Lumiere-AI)
[![Version](https://img.shields.io/badge/Version-0.1.0-blue?style=for-the-badge)](https://github.com/TruthStack/Lumiere-AI)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Animations-Framer_Motion-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Deepgram](https://img.shields.io/badge/Voice_AI-Deepgram-ff69b4?style=for-the-badge&logo=deepgram)](https://deepgram.com/)
[![Sanity](https://img.shields.io/badge/CMS-Sanity-f03e2f?style=for-the-badge&logo=sanity)](https://www.sanity.io/)

> **Autonomous Dermal Intelligence: A Clinical Convergence of Voice, Vision, and Content.**

Lumière AI is a high-fidelity skincare diagnostic platform engineered for the DeveloperWeek 2026 Hackathon. It integrates real-time biometric computer vision with sub-second latency voice intelligence to deliver a "Clinical Luxury" consultation experience.

---

## ✦ Core Architecture

Lumière AI operates at the intersection of three fundamental technological pillars:

### 1. Acoustic Intelligence (Deepgram)
Utilizing the **Deepgram Voice Agent**, Lumière provides a hands-free, sub-second latency interface. The system processes natural language queries to pilot the diagnostic workflow through advanced function calling, allowing users to initiate scans, query product details, and generate reports entirely via voice.

### 2. Optical Biomarkers (Perfect Corp)
The diagnostic engine leverages the **Perfect Corp AI Skin Analysis API**. This integration enables real-time extraction of high-dimensional dermal data points. The system analyzes live frames to identify:
- **Texture Indices**: Smoothness and roughness mapping.
- **Hydration Levels**: Sub-dermal moisture variance.
- **Structural Biomarkers**: Wrinkle depth, pore density, and redness distribution.

### 3. Structured Content Management (Sanity)
All clinical regimens and product taxonomies are modeled within **Sanity.io**. Using **GROQ queries**, the system dynamically maps live biometric outputs to personalized skincare solutions, ensuring that every recommendation is backed by a deterministic data-to-product relationship.

---

## 🎨 Design Philosophy: Clinical Luxury

The Lumière interface is built on a custom design system that prioritizes aesthetic excellence and deterministic trust:
- **Glassmorphism**: Layered interfaces with optimized backdrop blurs for depth.
- **HSL Color Tokens**: A curated palette of "Clinical Teals" and "Onyx Shadows" defined via CSS variables.
- **Cyber Terminal**: A real-time data parsing visualization that provides transparency into the AI's diagnostic reasoning.
- **Fluid Motion**: Transitions orchestrated via **Framer Motion** to ensure every state change feels premium and intentional.

---

## 🛠️ Technical Specification

| Layer | Standard | Implementation |
| :--- | :--- | :--- |
| **Frontend** | Next.js 14.2 | App Router / React Server Components |
| **Logic** | TypeScript 5 | Strict typing / Schema validation |
| **Voice AI** | Deepgram SDK | Real-time WebSocket event bus |
| **CV Engine** | Perfect Corp | Dermal point-cloud analysis |
| **Data Layer** | Sanity CMS | Structured content / GROQ query engine |
| **Styling** | Tailwind CSS | Utility-first "Clinical Luxury" tokens |
| **Reporting** | jsPDF / Foxit | Professional diagnostic PDF generation |

---

## 🚀 Deployment & Configuration

### Prerequisites
- **Node.js**: 20.x or higher
- **Package Manager**: npm (with `--legacy-peer-deps` for Vercel/Sanity compatibility)

### Installation
```bash
# Clone the clinical repository
git clone https://github.com/TruthStack/Lumiere-AI.git

# Enter the project context
cd Lumiere-AI

# Synchronize dependencies
npm install --legacy-peer-deps
```

### Environment Synchronization
Configure `.env.local` with the following clinical identifiers:
```env
NEXT_PUBLIC_PERFECT_CORP_APP_ID=...
PERFECT_CORP_API_KEY=...
NEXT_PUBLIC_SANITY_PROJECT_ID=3nbw8r1c
SANITY_API_TOKEN=...
DEEPGRAM_API_KEY=...
```

---

## 🏛️ Project Topography

```text
/src
  /app
    /api           # Biometric, Voice, and PDF Generation Endpoints
    page.tsx       # Primary Clinical Consultation Hub
  /components
    ClinicUI       # Core Glassmorphic Design System
    WebcamScanner  # Computer Vision & Frame Interception Logic
    CyberTerminal  # Live Biometric Parsing Visualization
    BiometricBreakdown # Detailed Data Visualization Layer
  /sanity          # Product Schemas, History Vault, and GROQ Clients
  /lib             # Synchronous SDK Wrappers & Utility Providers
```

---

## ⚖️ License & Development

This project is released under the **MIT License**. Developed as a showcase of high-performance sponsor synergy for DeveloperWeek 2026.

*Deterministic precision. Aesthetic excellence. Lumière AI.*

---
*Maintained by TruthStack*
