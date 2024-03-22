/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit', // activates Just-in-Time mode
    prefix: '', // adds 'tw-' prefix to the classes
    content: [
        './**/*.html',
        './**/*.{vue,js,ts,jsx,tsx}'
    ], // update this path if needed, include *.php
    media: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}