import "../src/styles/globals.css"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'default',
    values: [
      {
        name: 'white',
        value: '#ffffff',
      },
      {
        name: 'default',
        value: '#E5E5E5',
      },
    ],
  }
}