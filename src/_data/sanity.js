const { createClient } = require('@sanity/client')
const imageBuilder = require('@sanity/image-url')

const client = createClient({
    projectId: 'ymm38jhw',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false // False para obtener datos frescos en cada build
})

// Handle various export formats (Named vs Default)
const builderFactory = imageBuilder.createImageUrlBuilder || imageBuilder.default || imageBuilder
const builder = builderFactory(client)

function urlFor(source) {
    return builder.image(source)
}

module.exports = {
    client,
    urlFor
}
