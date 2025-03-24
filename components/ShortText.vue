<script setup>
const isExpanded = ref(false);
const chunks = ref([]);

const props = defineProps({
  text: { type: String, required: true },
  target: { type: String, required: true },
});

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};
const getChunks = () => {
  const position = props.text.indexOf(" ", props.target);
  if (props.text.length <= props.target || position === -1) {
    return [props.text];
  }
  return [props.text.substring(0, position), props.text.substring(position)];
};

chunks.value = getChunks();

const isTooLong = computed(() => chunks.value.length > 1);
const displayText = computed(() => {
  if (!isTooLong.value || isExpanded.value) {
    return chunks.value.join(" ");
  }
  return chunks.value[0] + "...";
});
</script>

<template>
  <span
    >{{ displayText }}
    <button
      v-if="isTooLong && !isExpanded"
      @click="toggleExpanded"
      type="button"
      class="link"
    >
      read more
    </button>
    <button
      v-if="isTooLong && isExpanded"
      @click="toggleExpanded"
      type="button"
      class="link"
    >
      read less
    </button>
  </span>
</template>

<style scoped>
.link {
  color: blue;
  background-color: white;
  border: none;
  text-decoration: underline;
  cursor: pointer;
}
.link:focus {
  outline: none;
  border: none;
}
</style>
