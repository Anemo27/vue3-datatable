/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            nunito: ['Nunito', 'sans-serif'],
        },
        extend: {
            colors: {
                primary: '#4361ee',
                black: '#0e1726',
                'blue-light': '#f6f7fa',
            },
        },
    },
    plugins: [],
};
