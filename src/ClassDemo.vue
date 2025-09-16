<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold mb-4">Vue3 Datatable - Class Examples</h1>

    <!-- Example 1: Fixed height -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Fixed Height (h-64)</h2>
      <vue3-datatable
        :rows="rows"
        :columns="cols"
        :pagination="true"
        class="h-64"
      />
    </div>

    <!-- Example 2: Medium height -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Medium Height (h-96)</h2>
      <vue3-datatable
        :rows="rows"
        :columns="cols"
        :pagination="true"
        class="h-96"
      />
    </div>

    <!-- Example 3: Full height -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Full Height (h-screen)</h2>
      <vue3-datatable
        :rows="rows"
        :columns="cols"
        :pagination="true"
        class="h-screen"
      />
    </div>

    <!-- Example 4: Max height with scroll -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Max Height with Scroll (max-h-96)</h2>
      <vue3-datatable
        :rows="rows"
        :columns="cols"
        :pagination="true"
        class="max-h-96"
      />
    </div>

    <!-- Example 5: Styled with border and shadow -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Styled (border, shadow, rounded)</h2>
      <vue3-datatable
        :rows="rows"
        :columns="cols"
        :pagination="true"
        class="h-80 border border-gray-200 rounded-lg shadow-md bg-white"
      />
    </div>

    <!-- Example 6: Custom background -->
    <div>
      <h2 class="text-lg font-semibold mb-2">Custom Background (bg-blue-50)</h2>
      <vue3-datatable
        :rows="rows"
        :columns="cols"
        :pagination="true"
        class="h-80 bg-blue-50 border border-blue-200 rounded-lg"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Vue3Datatable from '../components/custom-table.vue';

const cols = ref([
  { field: 'id', title: 'ID', width: '90px', filter: false },
  { field: 'name', title: 'Name' },
  { field: 'username', title: 'Username' },
  { field: 'email', title: 'Email' },
  { field: 'phone', title: 'Phone' },
  { field: 'date', title: 'Date', type: 'date' },
  { field: 'active', title: 'Active', type: 'bool' },
  { field: 'age', title: 'Age', type: 'number' },
  { field: 'address.city', title: 'Address' },
  { field: 'company.name', title: 'Company' },
]);

const rows = ref([
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
    date: "Tue Sep 27 2022 22:19:57",
    age: 10,
    active: true,
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
    date: "Wed Sep 28 2022 15:30:22",
    age: 25,
    active: false,
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
      geo: {
        lat: "-68.6102",
        lng: "-47.0653",
      },
    },
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
    },
    date: "Thu Sep 29 2022 08:45:15",
    age: 32,
    active: true,
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    address: {
      street: "Hoeger Mall",
      suite: "Apt. 692",
      city: "South Elvis",
      zipcode: "53919-4257",
      geo: {
        lat: "29.4572",
        lng: "-164.2990",
      },
    },
    phone: "493-170-9623 x156",
    website: "kale.biz",
    company: {
      name: "Robel-Corkery",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      bs: "transition cutting-edge web services",
    },
    date: "Fri Sep 30 2022 12:20:45",
    age: 28,
    active: true,
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    address: {
      street: "Skiles Walks",
      suite: "Suite 351",
      city: "Roscoeview",
      zipcode: "33263",
      geo: {
        lat: "-31.8129",
        lng: "62.5342",
      },
    },
    phone: "(254)954-1289",
    website: "demarco.info",
    company: {
      name: "Keebler LLC",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
    },
    date: "Sat Oct 01 2022 09:15:30",
    age: 35,
    active: false,
  },
]);
</script>

<style scoped>
/* Additional styles if needed */
</style>