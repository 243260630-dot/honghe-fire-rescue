<template>
  <button
    class="group relative block overflow-hidden rounded-md bg-navy text-left shadow-sm"
    @click="$emit('click')"
  >
    <div class="aspect-[16/11] w-full bg-navy-700">
      <img
        :src="img"
        :alt="caption"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/95 to-transparent p-3 pt-8">
      <p class="line-clamp-2 font-serif text-sm font-bold text-white">{{ caption }}</p>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{ img: string; caption: string }>()
defineEmits<{ click: [] }>()
</script>
