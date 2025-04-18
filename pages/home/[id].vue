<script setup>
const { $maps, $dataApi } = useNuxtApp();
const route = useRoute();
const googleMap = useTemplateRef("map");

const formatDate= (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const { data, error } = await useAsyncData(
  `home-${route.params.id}`,
  async () => {
    const responses = await Promise.all([
      $dataApi.getHome(route.params.id),
      $dataApi.getReviewsByHomeId(route.params.id),
      $dataApi.getUserByHomeId(route.params.id),
    ]);
    const badResponse = responses.find((response) => !response.ok);
    if (badResponse) {
      throw createError({
        statusCode: badResponse.status,
        message: badResponse.statusText,
      });
    }
    return { home: responses[0].json, reviews: responses[1].json, users: responses[2].json };
  }
);

const currentHome = ref(data.value?.home);
const reviews = ref(data.value?.reviews.hits);
const user = ref(data.value?.users.hits[0]);

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
      {{ formatDate(review.date) }} <br/>
      <short-text :text="review.comment" target="150" /> <br/>
    </div>
    <img :src="user.image"/><br/>
    {{ user.name }} <br/>
    {{ formatDate(user.joined) }} <br/>
    {{ user.reviewCount }} <br/>
    {{ user.description }} <br/>
  </div>
</template>
