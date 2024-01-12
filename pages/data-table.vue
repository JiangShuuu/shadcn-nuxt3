<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from "@/components/ui/data-table/columns"
import type { Payment } from '@/components/ui/data-table/columns';

const data = ref<Payment[]>([])

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
  {
  "id": "vc3vme",
  "amount": 238,
  "status": "pending",
  "email": "user0@example.com"
},
{
  "id": "ronoz",
  "amount": 610,
  "status": "pending",
  "email": "user1@example.com"
},
{
  "id": "bps6mr",
  "amount": 822,
  "status": "pending",
  "email": "user2@example.com"
},
{
  "id": "mvx8d",
  "amount": 5,
  "status": "pending",
  "email": "user3@example.com"
},
{
  "id": "qei1ee",
  "amount": 615,
  "status": "pending",
  "email": "user4@example.com"
},
{
  "id": "10u0g7",
  "amount": 68,
  "status": "pending",
  "email": "user5@example.com"
},
{
  "id": "0tppur",
  "amount": 157,
  "status": "pending",
  "email": "user6@example.com"
},
{
  "id": "g2zglj",
  "amount": 214,
  "status": "pending",
  "email": "user7@example.com"
},
{
  "id": "yvk0j",
  "amount": 343,
  "status": "pending",
  "email": "user8@example.com"
},
{
  "id": "d91htg",
  "amount": 584,
  "status": "pending",
  "email": "user9@example.com"
},
{
  "id": "pow6kc",
  "amount": 386,
  "status": "pending",
  "email": "user10@example.com"
},
{
  "id": "k1krff",
  "amount": 679,
  "status": "pending",
  "email": "user11@example.com"
},
{
  "id": "2158sk",
  "amount": 796,
  "status": "pending",
  "email": "user12@example.com"
},
{
  "id": "lsk359",
  "amount": 12,
  "status": "pending",
  "email": "user13@example.com"
},
{
  "id": "ne3dcq",
  "amount": 569,
  "status": "pending",
  "email": "user14@example.com"
},
{
  "id": "jj035r",
  "amount": 978,
  "status": "pending",
  "email": "user15@example.com"
},
{
  "id": "xoztta",
  "amount": 18,
  "status": "pending",
  "email": "user16@example.com"
}
  ]
}

onMounted(async () => {
  data.value = await getData();
});
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>