<script setup lang="ts">
import Flicking, { type FlickingOptions } from '@egjs/vue3-flicking'
import { Arrow, AutoPlay, Pagination } from '@egjs/flicking-plugins'
import '@egjs/vue3-flicking/dist/flicking.css'
// import '@egjs/flicking-plugins/dist/arrow.css'
import "@egjs/flicking-plugins/dist/pagination.css";


const list = ref([1, 2, 3, 4, 5, 6])

const flicking = ref<Flicking>()

const options: Partial<FlickingOptions> = {
  align: 'prev',
  circular: true,
}

const circular = () => {
  if (flicking.value) {
    // flicking.value.next()
    flicking.value.circular = !flicking.value.circular
  }
}

const plugins = [
  new Arrow({
    moveByViewportSize: true,
  }),
  new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false }),
  new Pagination({ type: 'scroll' })
]
</script>

<template>
  <div>
    <Flicking ref="flicking" :options="options" :plugins="plugins">
      <div v-for="idx in list" :key="idx" class="pointer-events-none">
        <img :src="`https://fakeimg.pl/400x300/?text=${idx}`" />
      </div>
      <template #viewport>
        <UIcon name="i-mingcute-left-fill" class="flicking-arrow-prev h-10 w-10" />
        <UIcon name="i-mingcute-right-fill" class="flicking-arrow-next h-10 w-10" />
        <div class="flicking-pagination"></div>
      </template>
    </Flicking>
    <!-- <button class="btn" @click="circular">circular</button> -->
  </div>
</template>
