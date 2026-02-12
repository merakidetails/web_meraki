const { client } = require('./sanity');

module.exports = async function () {
    return await client.fetch(`*[_type == "product"] | order(_createdAt desc)`);
};
