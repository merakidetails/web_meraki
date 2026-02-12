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
                    { title: 'General', value: 'General' },
                    { title: 'Personalizados', value: 'Personalizados' },
                    { title: 'Eventos', value: 'Eventos' }
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
