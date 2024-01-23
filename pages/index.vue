<template>
    <div class="w-full h-screen flex items-center justify-center">
        <div class="space-x-3">
            <UButton label="Toast" @click="showToast"  />
            <UButton label="Table" @click="$router.push('/table')"  />
        </div>
    </div>
</template>

<script lang="ts" setup>
const toast = useToast()
const showToast = () => {
    toast.add({title:'Hello'})
}
</script>