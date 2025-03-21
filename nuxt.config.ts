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
  plugins: ['~/plugins/maps.client.js'],
  runtimeConfig: {
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    }
  }
})