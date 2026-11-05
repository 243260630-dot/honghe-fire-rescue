<template>
  <div class="flex items-end justify-between border-b-2 border-navy/15 pb-2">
    <h3
      class="flex items-center gap-2 font-serif text-lg font-bold tracking-wide"
      :class="accent ? 'text-ember' : 'text-navy'"
    >
      <span class="inline-block h-4 w-1.5 rounded-sm" :class="accent ? 'bg-ember' : 'bg-navy'" />
      {{ title }}
    </h3>
    <button
      v-if="more"
      class="font-num text-xs text-muted-foreground transition-colors hover:text-ember"
      @click="$emit('more')"
    >
      更多 &raquo;
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title: string; accent?: boolean; more?: boolean }>(), {
  accent: false,
  more: false,
})
defineEmits<{ more: [] }>()
</script>
