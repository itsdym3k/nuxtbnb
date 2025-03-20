<script setup>
import homesData from "~/data/homes.json";

const homes = ref(homesData.slice(0, 3));

useHead({
  title: "Home Page",
  meta: [{ name: "description", content: "Home Page", hid: "description" }],
});
</script>

<template>
    <div>
      <div
        v-for="home in homes"
        :key="home.objectID"
        style="float: left; margin: 10px"
      >
        <nuxt-link :to="`/home/${home.objectID}`" no-prefetch>
          <HomeCard :home="home" />
        </nuxt-link>
      </div>
    </div>
</template>
