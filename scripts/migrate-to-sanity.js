const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { createClient } = require('@sanity/client');
const { basename } = require('path');

// Configure this with your token
const token = process.env.SANITY_TOKEN;
const projectId = 'ymm38jhw';
const dataset = 'production';

if (!token) {
    console.error('Error: SANITY_TOKEN environment variable is required.');
    console.error('Run: Set-Item -Path Env:SANITY_TOKEN -Value "your_token"');
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
});

const uploadImage = async (imagePath) => {
    if (!imagePath) return null;

    // Fix path if it starts with /
    let relativePath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;

    // Remove src/ or src\ prefix if present (since we join with ../src)
    relativePath = relativePath.replace(/^src[\\/]/, '');

    const fullPath = path.join(__dirname, '../src', relativePath);

    if (!fs.existsSync(fullPath)) {
        console.warn(`Image not found: ${fullPath}`);
        return null;
    }

    try {
        const stream = fs.createReadStream(fullPath);
        const asset = await client.assets.upload('image', stream, {
            filename: basename(fullPath)
        });
        return {
            _type: 'image',
            asset: {
                _type: "reference",
                _ref: asset._id
            }
        };
    } catch (error) {
        console.error(`Failed to upload image: ${fullPath}`, error.message);
        return null;
    }
};

const migrateProducts = async () => {
    const productsDir = path.join(__dirname, '../src/products');
    if (!fs.existsSync(productsDir)) return;

    const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.md'));

    console.log(`Migrating ${files.length} products...`);

    for (const file of files) {
        const content = fs.readFileSync(path.join(productsDir, file), 'utf8');
        const parsed = matter(content);
        const data = parsed.data;

        const image = await uploadImage(data.image);

        const doc = {
            _type: 'product',
            title: data.title,
            price: parseFloat(data.price),
            category: data.category,
            description: data.description || parsed.content,
            is_new: data.is_new || false,
            is_bestseller: data.is_bestseller || false,
            slug: { current: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }
        };

        if (image) doc.image = image;

        try {
            const res = await client.create(doc);
            console.log(`Created product: ${res.title}`);
        } catch (err) {
            console.error(`Failed to create product: ${data.title}`, err.message);
        }
    }
};

const migrateFAQ = async () => {
    const faqDir = path.join(__dirname, '../src/faq');
    if (!fs.existsSync(faqDir)) return;

    const files = fs.readdirSync(faqDir).filter(f => f.endsWith('.md'));
    console.log(`Migrating ${files.length} FAQs...`);

    for (const file of files) {
        const content = fs.readFileSync(path.join(faqDir, file), 'utf8');
        const parsed = matter(content);
        const data = parsed.data;

        const doc = {
            _type: 'faq',
            pregunta: data.pregunta,
            respuesta: data.respuesta || parsed.content,
            orden: data.orden || 0
        };

        try {
            await client.create(doc);
            console.log(`Created FAQ: ${doc.pregunta}`);
        } catch (err) {
            console.error(`Failed to create FAQ`, err.message);
        }
    }
};

const migrateGallery = async () => {
    const galleryDir = path.join(__dirname, '../src/gallery');
    if (!fs.existsSync(galleryDir)) return;

    const files = fs.readdirSync(galleryDir).filter(f => f.endsWith('.md'));
    console.log(`Migrating ${files.length} gallery items...`);

    for (const file of files) {
        const content = fs.readFileSync(path.join(galleryDir, file), 'utf8');
        const parsed = matter(content);
        const data = parsed.data;

        const image = await uploadImage(data.image);

        const doc = {
            _type: 'gallery',
            title: data.title || 'Untitled',
            category: data.category || 'General',
            image: image
        };

        try {
            await client.create(doc);
            console.log(`Created gallery item: ${doc.title}`);
        } catch (err) {
            console.error(`Failed to create gallery item`, err.message);
        }
    }
};

const migrateSiteSettings = async () => {
    const siteJsonPath = path.join(__dirname, '../src/_data/site.json');
    if (!fs.existsSync(siteJsonPath)) return;

    const siteData = JSON.parse(fs.readFileSync(siteJsonPath, 'utf8'));

    if (siteData.customizeImage) {
        console.log('Migrating site settings...');
        const image = await uploadImage(siteData.customizeImage);

        const doc = {
            _type: 'siteSettings',
            _id: 'siteSettings', // Singleton
            customizeImage: image
        };

        try {
            await client.createOrReplace(doc);
            console.log('Updated site settings');
        } catch (err) {
            console.error('Failed to update site settings', err.message);
        }
    }
};

const run = async () => {
    await migrateProducts();
    await migrateFAQ();
    await migrateGallery();
    await migrateSiteSettings();
    console.log('Migration complete!');
};

run();
