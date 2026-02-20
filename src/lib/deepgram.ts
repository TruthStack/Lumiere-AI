export const DEEPGRAM_VOICE_AGENT_CONFIG = {
    model: 'aura-asteria-en', // High-quality female voice
    system_prompt: "You are Lumière, an AI Dermatologist. When a user asks for a skin analysis, you must verbally reply: 'Of course, let me run a dermal diagnostic now.' and then immediately trigger the `trigger_camera_scan` tool. After the scan, you recommend products. You must ask if they want the products added to their cart, and trigger the `add_to_cart` function if they say yes. Be professional, clinical, and helpful.",
    tools: [
        {
            name: 'trigger_camera_scan',
            description: 'Instructs the frontend to snap a photo and call /api/analyze.',
            parameters: {
                type: 'object',
                properties: {},
            },
        },
        {
            name: 'add_to_cart',
            description: "Accepts a productId and triggers a frontend state update to drop the item into the user's cart.",
            parameters: {
                type: 'object',
                properties: {
                    productId: {
                        type: 'string',
                        description: 'The ID of the product to add to cart',
                    },
                },
                required: ['productId'],
            },
        },
    ],
}

export const getDeepgramKey = () => {
    const key = process.env.DEEPGRAM_API_KEY
    if (!key) {
        throw new Error('DEEPGRAM_API_KEY is not defined')
    }
    return key
}
