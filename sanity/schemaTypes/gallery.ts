import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'gallery',
    title: 'Galería',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
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
                ]
            }
        }),
        defineField({
            name: 'image',
            title: 'Imagen',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.required()
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
