<script setup>
import homes from "~/data/homes.json";

const currentHome = ref({});
const route = useRoute();

currentHome.value = homes.find((home) => home.objectID === route.params.id);

useHead({
  title: currentHome.value.title,
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
    <img src="/static/images/marker.svg" width="20" height="20" />{{
      currentHome.location.address
    }}
    {{ currentHome.location.city }} {{ currentHome.location.state }}
    {{ currentHome.location.country }} <br />
    <img src="/static/images/star.svg" width="20" height="20" />
    currentHome.reviewValue }} {{ currentHome.guests }} guests
    {{ currentHome.bedrooms }} bedrooms {{ currentHome.beds }} beds
    {{ currentHome.baths }} baths
  </div>
</template>
