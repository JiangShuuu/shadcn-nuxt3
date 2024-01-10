<script setup lang="ts">
import { ToastViewport, type ToastViewportProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ToastViewportProps & { class?: string }>()
</script>

<template>
  <ToastViewport v-bind="props" :class="cn('fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4', props.class)" />
</template>
