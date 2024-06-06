import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            keyframes: {
                'roll-in-left': {
                    '0%': { transform: 'translateX(-100%) rotate(-360deg)', opacity: '0' },
                    '100%': { transform: 'translateX(0) rotate(0)', opacity: '1' },
                },
                'roll-in-right': {
                    '0%': { transform: 'translateX(100%) rotate(360deg)', opacity: '0' },
                    '100%': { transform: 'translateX(0) rotate(0)', opacity: '1' },
                },
            },
            animation: {
                'roll-in-left': 'roll-in-left 1s ease-in-out',
                'roll-in-right': 'roll-in-right 1s ease-in-out',
            },
        },
    },

    plugins: [forms],

    darkMode: 'class'
};
