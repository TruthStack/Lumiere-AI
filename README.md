# ✧ Lumière AI ✧

[![Repository](https://img.shields.io/badge/Repository-TruthStack/Lumiere--AI-000000?style=for-the-badge&logo=github)](https://github.com/TruthStack/Lumiere-AI)
[![Version](https://img.shields.io/badge/Version-0.1.0-blue?style=for-the-badge)](https://github.com/TruthStack/Lumiere-AI)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Deepgram](https://img.shields.io/badge/Voice_AI-Deepgram-ff69b4?style=for-the-badge&logo=deepgram)](https://deepgram.com/)
[![Sanity](https://img.shields.io/badge/CMS-Sanity-f03e2f?style=for-the-badge&logo=sanity)](https://www.sanity.io/)

> **Autonomous Dermal Intelligence: A Clinical Convergence of Voice, Vision, and Content.**

Lumière AI is a sophisticated skincare diagnostic platform engineered for the DeveloperWeek 2026 Hackathon. It integrates high-fidelity voice interactivity with precision biometric computer vision to deliver a "Clinical Luxury" consultation experience.

---

## ✦ Core Architecture

Lumière AI operates at the intersection of three fundamental technological pillars:

### 1. Acoustic Intelligence (Deepgram)
Utilizing the **Deepgram Voice Agent**, Lumière provides a hands-free, sub-second latency interface. The system processes natural language queries to pilot the diagnostic workflow through advanced function calling.

### 2. Optical Biomarkers (Perfect Corp)
The diagnostic engine leverages the **Perfect Corp AI Skin Analysis API**. This integration enables real-time extraction of high-dimensional dermal data points, including hydration levels, pore density, wrinkle depth, and texture indices.

### 3. Structured Content Management (Sanity)
All clinical regimens and product taxonomies are modeled within **Sanity.io**. This provides a scalable, queryable backbone that maps real-time biometric outputs to personalized skincare solutions.

---

## 🛠️ Technical Specification

| Component | Standard | Implementation |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 | App Router / React Server Components |
| **Voice Interface** | Deepgram SDK | Real-time WebSocket streaming |
| **CV Engine** | Perfect Corp | Dermal point-cloud analysis |
| **Data Layer** | Sanity CMS | Structured GROQ-powered content |
| **Design System** | Tailwind CSS | Clinical Luxury Glassmorphism |
| **Animation** | Framer Motion | Fluid state transitions |
| **Reporting** | jsPDF / html2canvas | Professional PDF generation |

---

## 🚀 Deployment & Configuration

### Prerequisites
- Node.js 20.x
- Sanity Project ID
- API access for Deepgram and Perfect Corp

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
Configure `.env.local` with the following variables:
```env
NEXT_PUBLIC_PERFECT_CORP_APP_ID=...
NEXT_PUBLIC_PERFECT_CORP_API_KEY=...
NEXT_PUBLIC_SANITY_PROJECT_ID=3nbw8r1c
SANITY_API_TOKEN=...
DEEPGRAM_API_KEY=...
```

---

## 🏛️ Project Topography

```text
/src
  /app
    /api           # Biometric & Voice Endpoints
    page.tsx       # Primary Clinical Interface
  /components
    ClinicUI       # High-Fidelity Interface Components
    WebcamScanner  # Vision Logic
    CyberTerminal  # Real-time Parsing Visualization
  /sanity          # Content Schema & GROQ Client
  /lib             # Synchronous SDK Wrappers
```

---

## ⚖️ License & Development

This project is released under the **MIT License**. Developed as a showcase of sponsor synergy for DeveloperWeek 2026.

*Deterministic precision. Aesthetic excellence. Lumière AI.*

---
