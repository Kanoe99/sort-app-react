import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                "hanken-grotesk": ["Hanken Grotesk", "sans-serif"],
            },
            colors: {
                black: "#181818",
                accent: {
                    main: '#3b82f6',
                    light: '#bfdbfe',
                    dark: '#2563eb',
                    underline: '#d97706',
                },
                neutral: {
                    muted: '#303030',
                    soft: '#454545',
                    light: '#6b7280',
                    bright: '#9CA3AF',
                    transparent:{
                        button: 'rgba(255, 255, 255, 0.05)',
                        sheet: 'rgba(0,0,0, .75)',
                    }
                },
                bg:{
                    main: '#252525',
                    modal: '#353535',
                },
                button: {
                    main: '#e2e2e2',
                }
            },
            fontSize: {
                "2xs": ".625rem", // 10px
            },
        },
    },
    plugins: [forms],
};
