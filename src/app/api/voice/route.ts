import { NextResponse } from 'next/server'
import { getDeepgramKey, DEEPGRAM_VOICE_AGENT_CONFIG } from '@/lib/deepgram'

export async function GET() {
    try {
        const apiKey = getDeepgramKey()

        // In a real production app, we would use Deepgram's Project Scoped Keys API
        // to generate a short-lived token. For the hackathon, we return the key
        // with the configuration to simplify the frontend setup.

        return NextResponse.json({
            apiKey,
            config: DEEPGRAM_VOICE_AGENT_CONFIG,
        })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get voice configuration' }, { status: 500 })
    }
}
