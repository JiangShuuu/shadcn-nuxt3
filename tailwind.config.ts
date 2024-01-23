import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['docs/content/**/*.md'],
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  theme: {
    extend: {
      colors: {
        // primary: '#004ea6',
        mainblue: {
          900: '#003153'
        },
        secondary: '#90a7d1'
      }
    }
  },
  plugins: []
}
