import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetUno()],
  shortcuts: {
    's-transition': 'transition-all duration-300 ease-in-out'
  },
  theme: {
    colors: {
      dark: '#18181c',
      darkInfo: '#d5d5d6'
    }
  }
});
