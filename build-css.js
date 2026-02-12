const fs = require('fs');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const tailwindConfig = require('./tailwind.config.js');

const inputFile = 'src/assets/css/styles.css';
const outputFile = 'src/assets/css/main.css';

console.log('Current directory:', process.cwd());
console.log('Building CSS from', inputFile, 'to', outputFile);

try {
    if (!fs.existsSync(inputFile)) {
        console.error('Input file does not exist!');
        process.exit(1);
    }

    const css = fs.readFileSync(inputFile, 'utf8');
    console.log('Read CSS length:', css.length);

    postcss([
        tailwindcss(tailwindConfig),
        autoprefixer,
    ])
        .process(css, { from: inputFile, to: outputFile })
        .then(result => {
            fs.writeFileSync(outputFile, result.css);
            console.log('CSS built successfully to', outputFile);
        })
        .catch(error => {
            console.error('PostCSS Error:', error);
            process.exit(1);
        });
} catch (e) {
    console.error('Script Error:', e);
    process.exit(1);
}
