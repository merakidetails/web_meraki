import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'product',
    title: 'Productos',
    type: 'document',
    fields: [
        defineField({
            name: 'code',
            title: 'Código de Producto',
            type: 'string',
            description: 'Identificador único (ej. CAM-001)',
            validation: Rule => Rule.custom(async (code, context) => {
                if (!code) return true
                const { document, getClient } = context
                if (!document) return true

                const client = getClient({ apiVersion: '2021-03-25' })
                const id = document._id.replace(/^drafts\./, '')
                const params = {
                    draft: `drafts.${id}`,
                    published: id,
                    code
                }
                const query = `!defined(*[
                    _type == "product" &&
                    !(_id in [$draft, $published]) &&
                    code == $code
                ][0]._id)`

                const isUnique = await client.fetch(query, params)
                return isUnique ? true : 'Este código ya está en uso por otro producto'
            })
        }),
        defineField({
            name: 'title',
            title: 'Nombre del Producto',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'price',
            title: 'Precio',
            type: 'number',
            validation: Rule => Rule.required().min(0)
        }),
        defineField({
            name: 'image',
            title: 'Imagen',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'category',
            title: 'Categoría',
            type: 'string',
            options: {
                list: [
                    { title: 'Camisas', value: 'Camisas' },
                    { title: 'Tazas', value: 'Tazas' },
                    { title: 'Botellas', value: 'Botellas' },
                    { title: 'Llaveros', value: 'Llaveros' },
                    { title: 'Cuadros', value: 'Cuadros' },
                    { title: 'Otros', value: 'Otros' }
                ],
            },
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
        }),
        defineField({
            name: 'is_new',
            title: '¿Es Nuevo?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'is_bestseller',
            title: '¿Es Más Vendido?',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
            subtitle: 'category',
        },
    },
})
