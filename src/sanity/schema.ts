import { type SchemaTypeDefinition } from 'sanity'
import { product } from './schemas/product'
import { scanHistory } from './schemas/scanHistory'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [product, scanHistory],
}
