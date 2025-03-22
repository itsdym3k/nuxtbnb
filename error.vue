<script setup>
const props = defineProps({
  error: { type: Object, required: true },
});
useHead({
  title: 'Big Problem!',
});
</script>
<template>
    <div>
      <h1>Error!</h1>
        {{error.message}} {{error.statusCode}}
    </div>
</template>