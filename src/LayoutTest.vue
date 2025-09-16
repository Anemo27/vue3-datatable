<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold mb-4">Layout Containment Test</h1>
    <p class="text-gray-600 mb-6">Testing that pagination stays within parent bounds when height is constrained</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Test 1: Constrained height -->
      <div class="bg-red-50 p-4 rounded-lg border-2 border-red-200">
        <h3 class="text-sm font-medium mb-2 text-red-800">Height: h-64 (256px)</h3>
        <vue3-datatable
          :rows="rows"
          :columns="cols"
          :pagination="true"
          :pageSize="3"
          class="h-64"
        />
      </div>

      <!-- Test 2: Very small height -->
      <div class="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
        <h3 class="text-sm font-medium mb-2 text-orange-800">Height: h-32 (128px)</h3>
        <vue3-datatable
          :rows="rows"
          :columns="cols"
          :pagination="true"
          :pageSize="2"
          class="h-32"
        />
      </div>
    </div>

    <div class="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
      <h3 class="text-sm font-medium mb-2 text-blue-800">Height: h-48 (192px) with many pages</h3>
      <vue3-datatable
        :rows="rows"
        :columns="cols"
        :pagination="true"
        :pageSize="2"
        class="h-48"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Vue3Datatable from '../components/custom-table.vue';

const cols = ref([
  { field: 'id', title: 'ID', width: '60px' },
  { field: 'name', title: 'Name' },
  { field: 'email', title: 'Email' },
  { field: 'age', title: 'Age', type: 'number' },
]);

const rows = ref([
  { id: 1, name: "Leanne Graham", email: "Sincere@april.biz", age: 25 },
  { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv", age: 30 },
  { id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net", age: 28 },
  { id: 4, name: "Patricia Lebsack", email: "Julianne.OConner@kory.org", age: 35 },
  { id: 5, name: "Chelsey Dietrich", email: "Lucio_Hettinger@annie.ca", age: 42 },
  { id: 6, name: "Mrs. Dennis Schulist", email: "Karley_Dach@jasper.info", age: 31 },
  { id: 7, name: "Kurtis Weissnat", email: "Telly.Hoeger@billy.biz", age: 29 },
  { id: 8, name: "Nicholas Runolfsdottir", email: "Sherwood@rosamond.me", age: 38 },
  { id: 9, name: "Glenna Reichert", email: "Chaim_McDermott@dana.io", age: 26 },
  { id: 10, name: "Clementina DuBuque", email: "Rey.Padberg@karina.biz", age: 33 },
]);
</script>