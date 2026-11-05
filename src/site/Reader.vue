<template>
  <div
    class="fixed inset-0 z-[55] flex items-start justify-center overflow-y-auto bg-navy/60 p-4 backdrop-blur-sm"
    @click="$emit('close')"
  >
    <div
      class="my-8 w-full max-w-2xl rounded-md border border-border bg-card p-8 shadow-2xl"
      @click.stop
    >
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="rounded-sm bg-ember/10 px-2 py-1 text-xs font-medium text-ember">
            {{ article.category }}
          </span>
          <span
            v-if="article.module"
            class="rounded-sm bg-navy/10 px-2 py-1 text-xs font-medium text-navy"
          >
            {{ article.module }}{{ article.grassrootsTab ? ` · ${article.grassrootsTab}` : '' }}
          </span>
        </div>
        <button class="text-muted-foreground hover:text-ember" aria-label="关闭" @click="$emit('close')">
          ✕
        </button>
      </div>
      <h2 class="font-serif text-2xl font-bold leading-snug text-navy">{{ article.title }}</h2>
      <div
        class="mt-3 flex flex-wrap items-center gap-4 border-b border-border pb-4 font-num text-sm text-muted-foreground"
      >
        <span>发布日期：{{ article.date }}</span>
        <span v-if="article.unit">报送单位：{{ article.unit }}</span>
        <span v-if="article.author">作者：{{ article.author }}</span>
        <span v-if="article.docNo">发文字号：{{ article.docNo }}</span>
        <span>来源：红河消防救援</span>
      </div>
      <div
        v-if="article.images && article.images.length > 0"
        class="mt-5 grid gap-3"
        :class="article.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'"
      >
        <div
          v-for="(imgUrl, idx) in article.images"
          :key="`${idx}-${imgUrl.slice(0, 20)}`"
          class="overflow-hidden rounded-sm border border-border bg-muted/30"
        >
          <img
            :src="imgUrl"
            :alt="`${article.title} - 配图 ${idx + 1}`"
            class="max-h-80 w-full object-cover"
          />
        </div>
      </div>
      <div class="mt-5 space-y-4 text-[15px] leading-8 text-foreground/85">
        <template v-if="article.content">
          <p v-for="(para, idx) in article.content.split('\n')" :key="idx">{{ para }}</p>
        </template>
        <template v-else>
          <p>
            近日，{{ article.unit ?? '红河州消防救援支队' }}围绕队伍正规化建设与灭火救援实战能力提升，扎实开展{{
              article.category
            }}相关工作， 以对党忠诚、纪律严明、赴汤蹈火、竭诚为民的过硬作风，全面推进各项任务落地见效。
          </p>
          <p>
            下一步，支队将持续深化{{ article.category }}工作机制，压实各级责任，强化过程管控，确保各项举措在基层一线开花结果，
            为守护辖区人民群众生命财产安全和社会稳定作出新的更大贡献。
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SiteArticle } from './siteData'

defineProps<{ article: SiteArticle }>()
defineEmits<{ close: [] }>()
</script>
