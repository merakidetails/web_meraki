import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Configuración del Sitio',
    type: 'document',
    fields: [
        defineField({
            name: 'customizeImage',
            title: 'Imagen para "Cómo Comprar - Personalizado"',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
    preview: {
        select: {
            title: 'customizeImage.asset.originalFilename',
            media: 'customizeImage',
        },
        prepare({ media }) {
            return {
                title: 'Configuración del Sitio',
                media,
            }
        },
    },
})
