import { NextResponse } from 'next/server'
import { createClient } from '@deepgram/sdk'
import { DEEPGRAM_VOICE_AGENT_CONFIG, getDeepgramKey } from '@/lib/deepgram'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const deepgramKey = getDeepgramKey()
        const deepgram = createClient(deepgramKey)

        // Generate a temporary token with a 60s TTL
        // Note: Voice Agents typically require 'usage:write' and 'speak:write' scopes
        const { result, error } = await deepgram.manage.createProjectKey(process.env.DEEPGRAM_PROJECT_ID || '', {
            comment: 'Temporary Voice Agent Access',
            scopes: ['usage:write'], // Add necessary scopes based on Deepgram requirements
            time_to_live_in_seconds: 60,
        })

        if (error) {
            console.error('Deepgram Key Generation Error:', error)
            // Fallback for demo if project ID is missing: use the key but log warning
            // In a real prod environment, we would return a 500
            return NextResponse.json({
                apiKey: deepgramKey,
                config: DEEPGRAM_VOICE_AGENT_CONFIG,
                warning: 'Using master key (Project ID missing)'
            })
        }

        return NextResponse.json({
            apiKey: result.key,
            config: DEEPGRAM_VOICE_AGENT_CONFIG
        })
    } catch (error) {
        console.error('Voice API Error:', error)
        return NextResponse.json({ error: 'Failed to initialize voice session' }, { status: 500 })
    }
}
