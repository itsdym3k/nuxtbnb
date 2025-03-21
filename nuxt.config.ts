// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-18',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Nuxt BnB',
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
    },
  },
  plugins: ['~/plugins/maps.client.js', '~/plugins/dataApi.js'],
  runtimeConfig: {
    public: {
      ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
      ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    }
  }
})