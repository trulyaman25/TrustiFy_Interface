/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				'gilroyEB': ['"gilroyEB"', 'extraBold'],
				'albulaExtraLight': ['"albulaExtraLight"', 'extraLight'],
				'albulaLight': ['"albulaLight"', 'light'],
				'albulaRegular': ['"albulaRegular"', 'regular'],
				'albulaMedium': ['"albulaMedium"', 'medium'],
				'albulaBold': ['"albulaBold"', 'bold'],
				'albulaHeavy': ['"albulaHeavy"', 'heavy'],
				'albulaExtraBold': ['"albulaExtraBold"', 'extraBold'],
				'noirProLight': ['"noirProLight"', 'light'],
				'noirProRedular': ['"noirProRegular"', 'regular'],
				'noirProBold': ['"noirProBold"', 'bold'],
				'noirProHeavy': ['"noirProHeavy"', 'heavy'],

				'googleSansThin': ['GoogleSans-Thin', 'sans-serif'],
				'googleSansLight': ['GoogleSans-Light', 'sans-serif'],
				'googleSansRegular': ['GoogleSans-Regular', 'sans-serif'],
				'googleSansMedium': ['GoogleSans-Medium', 'sans-serif'],
				'googleSansBold': ['GoogleSans-Bold', 'sans-serif'],
				'googleSansBlack': ['GoogleSans-Black', 'sans-serif'],

				'googleSansThinItalic': ['GoogleSans-ThinItalic', 'sans-serif'],
				'googleSansLightItalic': ['GoogleSans-LightItalic', 'sans-serif'],
				'googleSansRegularItalic': ['GoogleSans-RegularItalic', 'sans-serif'],
				'googleSansMediumItalic': ['GoogleSans-MediumItalic', 'sans-serif'],
				'googleSansBoldItalic': ['GoogleSans-BoldItalic', 'sans-serif'],
				'googleSansBlackItalic': ['GoogleSans-BlackItalic', 'sans-serif'],
		  	},
			keyframes: {
				marquee: {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				scaleUpCenter: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.5)' }
				}
			},
			animation: {
				'marquee': 'marquee 40s linear infinite',
				'scale-up-center': 'scaleUpCenter 0.3s ease-out'
			},
			backdropBlur: {
				md: '12px',
			},
		},
	},
	variants: {
		extend: {
			backdropBlur: ['responsive'],
			animation: ['hover', 'group-hover'],
			scale: ['hover', 'group-hover'],
		},
	},
	plugins: [],
}