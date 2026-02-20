import { defineField, defineType } from 'sanity'

export const product = defineType({
    name: 'product',
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
            name: 'targetIssue',
            title: 'Target Issue',
            type: 'string',
        }),
        defineField({
            name: 'imageUrl',
            title: 'Image URL',
            type: 'url',
        }),
        defineField({
            name: 'inStock',
            title: 'In Stock',
            type: 'boolean',
        }),
    ],
})
