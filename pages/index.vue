<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="flex flex-col items-center justify-center space-y-3">
      <UPagination
        v-model="page"
        :total="items.length"
        :ui="{
          rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md',
        }"
      >
        <template #first="{ onClick }">
          <UTooltip text="First page">
            <UButton
              icon="i-heroicons-arrow-uturn-left"
              color="primary"
              :ui="{ rounded: 'rounded-full' }"
              class="rtl:[&_span:first-child]:rotate-180 me-2"
              @click="onClick"
            />
          </UTooltip>
        </template>

        <template #last="{ onClick }">
          <UTooltip text="Last page">
            <UButton
              icon="i-heroicons-arrow-uturn-right-20-solid"
              color="primary"
              :ui="{ rounded: 'rounded-full' }"
              class="rtl:[&_span:last-child]:rotate-180 ms-2"
              @click="onClick"
            />
          </UTooltip>
        </template>
      </UPagination>
      <div class="space-x-3">
        <UButton label="Toast" @click="showToast" />
        <UButton label="Table" @click="$router.push('/table')" />
        <UButton label="Dialog" @click="isOpen = true" />
      </div>
    </div>
    <!-- Dialog -->
    <div>
      <UModal v-model="isOpen" prevent-close>
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Modal
              </h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="isOpen = false"
              />
            </div>
          </template>
          <div>
            <UForm
              :schema="schema"
              :state="state"
              class="space-y-10"
              @submit="onSubmit"
            >
              <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" />
              </UFormGroup>

              <UFormGroup label="Password" name="password">
                <UInput v-model="state.password" type="password" />
              </UFormGroup>

              <UButton type="submit" :disabled="isLoading"><span v-if="!isLoading">Submit</span><span v-else>Loading...</span></UButton>
            </UForm>
          </div>
          <Placeholder class="h-32" />
        </UCard>
      </UModal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

// Toast
const toast = useToast();
const showToast = () => {
  toast.add({ title: "Hello" });
};

// Pagination
const page = ref(1);
const items = ref(Array(100));

// Dialog
const isOpen = ref(false);
const isLoading = ref(false);
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});
type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  isLoading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.add({ title: `Submit Success ${event.data.email}` });
  } finally {
    isLoading.value = false
    isOpen.value = false
  }
}
</script>
