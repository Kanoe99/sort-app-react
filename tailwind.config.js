import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],

  theme: {
  	extend: {
		// keyframes: {
		// 	slideInOut: {
		// 	  '0%': { transform: 'translateY(100%)', opacity: 0 }, // Start off-screen
		// 	  '10%': { transform: 'translateY(-150px)', opacity: 1 },  // Slide into view
		// 	  '90%': { transform: 'translateY(-150px)', opacity: 1 },  // Stay in view
		// 	  '100%': { transform: 'translateY(100%)', opacity: 0 }, // Slide out of view
		// 	},
		//   },
		//   animation: {
		// 	slideInOut: 'slideInOut 3s ease-in-out', // 3-second animation
		//   },
  		fontFamily: {
  			sans: [
  				'Figtree',
                    ...defaultTheme.fontFamily.sans
                ],
  			'hanken-grotesk': [
  				'Hanken Grotesk',
  				'sans-serif'
  			]
  		},
  		colors: {
  			black: '#181818',
  			accent: {
  				main: '#3b82f6',
  				light: '#bfdbfe',
  				dark: '#2563eb',
  				underline: '#d97706'
  			},
  			neutral: {
  				muted: '#303030',
  				soft: '#454545',
  				light: '#6b7280',
  				bright: '#9CA3AF',
  				transparent: {
  					button: 'rgba(255, 255, 255, 0.05)',
  					sheet: 'rgba(0,0,0, .75)'
  				}
  			},
  			bg: {
  				main: '#252525',
  				modal: '#353535',
				ip: '#292929',
  				input: {
  					black: '#1c1c1c',
  				}
  			},
			border: {
				input: "#374151"
			},
  			button: {
  				main: '#e2e2e2'
  			}
  		},
  		fontSize: {
  			'2xs': '.625rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },

  plugins: [
    forms,
    function ({ addBase }) {
      addBase({
        'input[type="number"]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        'input[type="number"]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        'input[type="number"]': {
          '-moz-appearance': 'textfield',  // For Firefox
          'appearance': 'textfield',       // For other browsers
        },
      });
    },
      require("tailwindcss-animate")
],
};
