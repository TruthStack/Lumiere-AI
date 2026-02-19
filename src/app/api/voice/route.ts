import { NextResponse } from 'next/server'

export async function GET() {
    // This route provides the configuration for the Deepgram Voice Agent
    // including the dynamic tool definitions.

    const config = {
        model: 'aura-asteria-en', // Use a premium sounding voice
        instructions: `You are Lumière, a high-end AI skincare consultant. 
    Your tone is clinical, professional, but luxurious and welcoming. 
    When the user asks you to look at their skin, analyze their pores, or check for issues, 
    you MUST call the 'trigger_skin_analysis' tool. 
    Wait for the analysis results before giving specific advice.`,
        tools: [
            {
                name: 'trigger_skin_analysis',
                description: 'Initiates a high-resolution skin scan using the device camera to analyze pores, hydration, and skin health.',
                parameters: {
                    type: 'object',
                    properties: {}, // No parameters needed for the trigger itself
                    required: [],
                },
                // In Deepgram, client_side tools allow the frontend to catch the event
                client_side: true
            },
        ],
    }

    return NextResponse.json(config)
}

// In some cases, we might want to handle the session initialization here
// or proxy the Deepgram request. For a hackathon, returning the config
// for the client-side SDK is often the cleanest path.
