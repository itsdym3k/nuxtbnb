export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const { public: { ALGOLIA_APP_ID, ALGOLIA_API_KEY } } = config
  const headers = {
    "X-Algolia-API-Key": ALGOLIA_API_KEY,
    "X-Algolia-Application-Id": ALGOLIA_APP_ID
  }

  nuxtApp.provide('dataApi', { getHome, getReviewsByHomeId })

  async function getHome(homeId) {
    try {
      return unWrap(await fetch(`https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getReviewsByHomeId(homeId) {
    try {
      return unWrap(await fetch(`https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/reviews/query`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          filters: `homeId:${homeId}`,
          hitsPerPage: 6,
        })
      }))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function unWrap(response) {
    const json = await response.json()
    const { ok, status, statusText } = response
    return {
      json,
      ok,
      status,
      statusText
    }
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {}
    }
  }
});