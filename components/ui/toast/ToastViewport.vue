<script setup lang="ts">
import { ToastViewport, type ToastViewportProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ToastViewportProps & { class?: string }>()
</script>

<template>
  <ToastViewport v-bind="props" :class="cn('fixed top-3 right-1/2 translate-x-1/2 md:max-w-[420px]', props.class)" />
</template>
