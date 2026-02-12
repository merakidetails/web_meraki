import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'faq',
    title: 'Preguntas Frecuentes',
    type: 'document',
    fields: [
        defineField({
            name: 'pregunta',
            title: 'Pregunta',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'respuesta',
            title: 'Respuesta',
            type: 'text',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'orden',
            title: 'Orden',
            type: 'number',
            initialValue: 0
        }),
    ],
    preview: {
        select: {
            title: 'pregunta',
            subtitle: 'orden',
        },
    },
})
