import { defineField, defineType } from 'sanity'

export const skincareProduct = defineType({
    name: 'skincareProduct',
    title: 'Skincare Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'targetSkinIssue',
            title: 'Target Skin Issue',
            type: 'string',
            options: {
                list: [
                    { title: 'Spots', value: 'spots' },
                    { title: 'Wrinkles', value: 'wrinkles' },
                    { title: 'Moisture', value: 'moisture' },
                    { title: 'Hydration', value: 'hydration' },
                    { title: 'Acne', value: 'acne' },
                ],
            },
        }),
        defineField({
            name: 'imageUrl',
            title: 'Image URL',
            type: 'url',
        }),
    ],
})
