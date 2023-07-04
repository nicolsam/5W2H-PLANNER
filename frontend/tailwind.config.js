module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'auto': 'auto 1fr',
      },
      colors: {
        'main-color': '#585858',
        'secondary-color': '#444344',
        'hover-color': '#646364',
        'white': '#F4F4F4',
        'shadow': 'rgba(0, 0, 0,.7)',
        'btn-hover': '#404040',
        'danger': '#FF4D4D',
        'danger-hover': '#C93C3C',
        'yellow': '#f3e416e1',
      },
    },
  },
};
