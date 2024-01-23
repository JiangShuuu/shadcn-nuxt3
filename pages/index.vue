<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="flex flex-col items-center justify-center space-y-3">
      <UPagination
        :first-button="{
          icon: 'i-heroicons-arrow-small-left-20-solid',
          label: 'First',
          color: 'gray',
        }"
        :last-button="{
          icon: 'i-heroicons-arrow-small-right-20-solid',
          trailing: true,
          label: 'Last',
          color: 'gray',
        }"
        :model-value="page"
        :total="items.length"
        :page-count="5"
        show-first
        show-last
      />
      <div class="space-x-3">
        <UButton label="Toast" @click="showToast" />
        <UButton label="Table" @click="$router.push('/table')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Toast
const toast = useToast();
const showToast = () => {
  toast.add({ title: "Hello" });
};
// Pagination
const page = ref(1);
const items = ref(Array(100));
</script>
