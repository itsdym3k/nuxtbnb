export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const { public: { ALGOLIA_APP_ID, ALGOLIA_API_KEY } } = config

  nuxtApp.provide('dataApi', { getHome })

  async function getHome(homeId) {
    const response = await fetch(`https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
      headers: {
        "X-Algolia-API-Key": ALGOLIA_API_KEY,
        "X-Algolia-Application-Id": ALGOLIA_APP_ID
      }
    })
    const data = await response.json()
    return data
  }
});