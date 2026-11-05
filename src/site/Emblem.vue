<template>
  <svg :width="size" :height="size" viewBox="0 0 100 100" aria-label="消防救援徽章" role="img">
    <defs>
      <linearGradient id="em-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffd66b" />
        <stop offset="1" stop-color="#e0a020" />
      </linearGradient>
    </defs>
    <!-- 盾牌 -->
    <path d="M50 4 L88 16 V50 C88 74 71 90 50 96 C29 90 12 74 12 50 V16 Z" fill="url(#em-g)" stroke="#b9861a" stroke-width="2" />
    <path d="M50 12 L80 21 V50 C80 69 67 82 50 88 C33 82 20 69 20 50 V21 Z" fill="#0a2a55" />
    <!-- 火焰 -->
    <path d="M50 30 C56 40 64 44 60 56 C58 62 52 66 50 72 C48 66 42 62 40 56 C36 44 44 40 50 30 Z" fill="#e8541e" />
    <path d="M50 42 C53 48 57 50 55 57 C54 61 51 63 50 66 C49 63 46 61 45 57 C43 50 47 48 50 42 Z" fill="#ffd66b" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 56 })
</script>
