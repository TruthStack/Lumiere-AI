import { defineField, defineType } from 'sanity'

export const scanHistory = defineType({
    name: 'scanHistory',
    title: 'Scan History',
    type: 'document',
    fields: [
        defineField({
            name: 'userId',
            title: 'User ID',
            type: 'string',
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'datetime',
        }),
        defineField({
            name: 'scores',
            title: 'Skin Scores',
            type: 'object',
            fields: [
                { name: 'spots', type: 'number', title: 'Spots' },
                { name: 'moisture', type: 'number', title: 'Moisture' },
                { name: 'wrinkles', type: 'number', title: 'Wrinkles' },
            ],
        }),
        defineField({
            name: 'recommendedProducts',
            title: 'Recommended Products',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }],
        }),
    ],
})
