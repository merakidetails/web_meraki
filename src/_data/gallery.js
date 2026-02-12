const { client } = require('./sanity');

module.exports = async function () {
    return await client.fetch(`*[_type == "gallery"] | order(_createdAt desc)`);
};
