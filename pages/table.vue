<script lang="ts" setup>
const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "title",
    label: "Title",
    sortable: true,
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
    direction: "desc",
  },
  {
    key: "role",
    label: "Role",
  },
];

const selectedColumns = ref([...columns]);

const people = [
  {
    id: 1,
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    id: 2,
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
  },
  {
    id: 3,
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
  },
  {
    id: 4,
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
  },
  {
    id: 5,
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
  },
  {
    id: 6,
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
  },
  {
    id: 7,
    name: "123 Francis",
    title: "Copywriter",
    email: "321.francis@example.com",
    role: "Admin",
  },
  {
    id: 8,
    name: "qwe Krasner",
    title: "Senior Designer",
    email: "ewq.krasner@example.com",
    role: "Owner",
  },
  {
    id: 9,
    name: "zxc Miles",
    title: "Principal Designer",
    email: "ewq.miles@example.com",
    role: "Member",
  },
];

const q = ref("");

const filteredRows = computed(() => {
  if (!q.value) {
    return people.slice((page.value - 1) * pageCount, page.value * pageCount);
  }

  return people.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

const page = ref(1);
const pageCount = 5;
const selected = ref([people[1]])
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div>
      <div
        class="flex px-3 space-x-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
      >
        <UInput v-model="q" placeholder="Filter people..." />

        <ClientOnly>
          <USelectMenu
            v-model="selectedColumns"
            :options="columns"
            multiple
            placeholder="Columns"
          />
        </ClientOnly>
      </div>
      <UTable v-model="selected" :columns="selectedColumns" :rows="filteredRows" />
      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="people.length"
        />
      </div>
    </div>
  </div>
</template>
