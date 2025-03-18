<script setup>
const props = defineProps({
  home: { type: Object, required: true },
});
</script>

<template>
  <div>
    <img :src="home.images[0]" alt="home.title" style="width: 200px" />
    {{ home.title }} <br />
    {{ home.location }} {{ home.location.city }} {{ home.location.state }}
    <br />
    {{ home.guests }} guests <br />
    {{ home.pricePerNight }} / night <br />
  </div>
</template>
