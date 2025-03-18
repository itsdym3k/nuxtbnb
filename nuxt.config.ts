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
  }
})