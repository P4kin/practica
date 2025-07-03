<script setup>
import { ref, defineProps, watch } from 'vue';

const props = defineProps({
  message: String,
  isVisible: Boolean,
});

const isVisible = ref(props.isVisible);

watch(() => props.isVisible, (newVal) => {
  isVisible.value = newVal;
  if (newVal) {
    setTimeout(() => {
      isVisible.value = false;
      emit('update:isVisible', false);
    }, 3000);
  }
});

const emit = defineEmits(['update:isVisible']);
</script>

<template>
  <div v-if="isVisible" class="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-md">
    {{ message }}
  </div>
</template>