<script setup>
const { $maps, $dataApi } = useNuxtApp();
const route = useRoute();
const googleMap = useTemplateRef("map");

const { data, error } = await useAsyncData(
  `home-${route.params.id}`,
  async () => {
    const homeResponse = await $dataApi.getHome(route.params.id);
    if (!homeResponse.ok) {
      throw createError({
        statusCode: homeResponse.status,
        message: homeResponse.statusText,
      });
    }
    const reviewResponse = await $dataApi.getReviewsByHomeId(route.params.id);
    if (!reviewResponse.ok) {
      throw createError({
        statusCode: reviewResponse.status,
        message: reviewResponse.statusText,
      });
    }
    return { home: homeResponse.json, reviews: reviewResponse.json };
  }
);

const currentHome = ref(data.value?.home);
const reviews = ref(data.value?.reviews.hits);

onMounted(() => {
  return $maps.showMap(
    googleMap.value,
    currentHome.value._geoloc.lat,
    currentHome.value._geoloc.lng
  );
});
useHead({
  title: currentHome.title,
});
</script>
<template>
  <div>
    <div style="display: flex">
      <img
        v-for="image in currentHome.images"
        :key="image"
        :src="image"
        width="200"
        height="200"
      />
    </div>
    {{ currentHome.title }}
    ${{ currentHome.pricePerNight }} / night <br />
    <img src="/static/images/marker.svg" width="20" height="20" />
    {{ currentHome.location.address }}
    {{ currentHome.location.city }} {{ currentHome.location.state }}
    {{ currentHome.location.country }} <br />
    <img src="/static/images/star.svg" width="20" height="20" />
    {{ currentHome.reviewValue }} {{ currentHome.guests }} guests
    {{ currentHome.bedrooms }} bedrooms {{ currentHome.beds }} beds
    {{ currentHome.baths }} baths <br />
    {{ currentHome.description }}
    <div style="height: 800px; width: 800px" ref="map"></div>
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image"/> <br/>
      {{ review.reviewer.name }} <br/>
      {{ review.date }} <br/>
      {{ review.comment }} <br/>
    </div>
  </div>
</template>
