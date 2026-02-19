import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { skincareProduct } from './src/sanity/schema'

export default defineConfig({
    name: 'default',
    title: 'Lumiere AI Clinic',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    plugins: [deskTool()],

    schema: {
        types: [skincareProduct],
    },
})
