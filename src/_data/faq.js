const { client } = require('./sanity');

module.exports = async function () {
    return await client.fetch(`*[_type == "faq"] | order(orden asc)`);
};
