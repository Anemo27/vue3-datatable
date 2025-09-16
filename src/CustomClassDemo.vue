<template>
  <div class="p-6 space-y-8">
    <h1 class="text-3xl font-bold mb-6">Vue3 Datatable - Custom Class Examples</h1>
    <p class="text-gray-600 mb-8">Demonstrating the flexible `class` prop for customizing the datatable component with Tailwind CSS. The component now uses flexbox layout to prevent pagination overflow.</p>

    <!-- Example 1: Basic height control -->
    <div class="bg-white p-4 rounded-lg shadow-sm border">
      <h2 class="text-xl font-semibold mb-3 text-gray-800">1. Height Control</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-sm font-medium mb-2 text-gray-600">Small Height (h-64)</h3>
          <vue3-datatable
            :rows="rows"
            :columns="cols"
            :pagination="true"
            class="h-64 border border-gray-200 rounded"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2 text-gray-600">Medium Height (h-96)</h3>
          <vue3-datatable
            :rows="rows"
            :columns="cols"
            :pagination="true"
            class="h-96 border border-gray-200 rounded"
          />
        </div>
      </div>
    </div>

    <!-- Example 2: Styling variations -->
    <div class="bg-white p-4 rounded-lg shadow-sm border">
      <h2 class="text-xl font-semibold mb-3 text-gray-800">2. Styling Variations</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 class="text-sm font-medium mb-2 text-gray-600">Clean & Minimal</h3>
          <vue3-datatable
            :rows="rows"
            :columns="cols"
            :pagination="true"
            class="h-80"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2 text-gray-600">Bordered</h3>
          <vue3-datatable
            :rows="rows"
            :columns="cols"
            :pagination="true"
            class="h-80 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2 text-gray-600">Shadow Effect</h3>
          <vue3-datatable
            :rows="rows"
            :columns="cols"
            :pagination="true"
            class="h-80 border border-gray-200 rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>

    <!-- Example 3: Color themes -->
    <div class="bg-white p-4 rounded-lg shadow-sm border">
      <h2 class="text-xl font-semibold mb-3 text-gray-800">3. Color Themes</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-sm font-medium mb-2 text-gray-600">Light Blue Theme</h3>
          <vue3-datatable
            :rows="rows"
            :columns="cols"
            :pagination="true"
            class="h-80 bg-blue-50 border border-blue-200 rounded-lg"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2 text-gray-600">Dark Theme</h3>
          <vue3-datatable
            :rows="rows"
            :columns="cols"
            :pagination="true"
            class="h-80 bg-gray-900 border border-gray-700 rounded-lg text-white"
          />
        </div>
      </div>
    </div>

    <!-- Example 4: Advanced combinations -->
    <div class="bg-white p-4 rounded-lg shadow-sm border">
      <h2 class="text-xl font-semibold mb-3 text-gray-800">4. Advanced Combinations</h2>
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-medium mb-2 text-gray-600">Full Featured</h3>
          <vue3-datatable
            :rows="rows"
            :columns="cols"
            :pagination="true"
            :sortable="true"
            :hasCheckbox="true"
            class="h-96 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl shadow-lg"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2 text-gray-600">Compact Design</h3>
          <vue3-datatable
            :rows="rows"
            :columns="cols"
            :pagination="true"
            class="max-h-64 overflow-hidden border border-gray-300 rounded-lg bg-white"
          />
        </div>
      </div>
    <!-- Example 7: Layout containment test -->
    <div class="bg-white p-4 rounded-lg shadow-sm border">
      <h2 class="text-xl font-semibold mb-3 text-gray-800">5. Layout Containment Test</h2>
      <div class="space-y-4">
        <div>
          <h3 class="text-sm font-medium mb-2 text-gray-600">Constrained Height (h-64) - Pagination should stay within bounds</h3>
          <vue3-datatable
            :rows="rows"
            :columns="cols"
            :pagination="true"
            :pageSize="3"
            class="h-64 border border-red-200 rounded-lg bg-red-50"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2 text-gray-600">Very Small Height (h-32) - Test extreme constraints</h3>
          <vue3-datatable
            :rows="rows"
            :columns="cols"
            :pagination="true"
            :pageSize="2"
            class="h-32 border border-orange-200 rounded-lg bg-orange-50 overflow-hidden"
          />
        </div>
      </div>
    </div>
    <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
      <h2 class="text-xl font-semibold mb-3 text-blue-800">Usage Guide</h2>
      <div class="text-sm text-blue-700 space-y-2">
        <p><strong>Basic height control:</strong> <code class="bg-blue-100 px-2 py-1 rounded">class="h-96"</code></p>
        <p><strong>With styling:</strong> <code class="bg-blue-100 px-2 py-1 rounded">class="h-80 border rounded-lg shadow-md"</code></p>
        <p><strong>Custom background:</strong> <code class="bg-blue-100 px-2 py-1 rounded">class="bg-blue-50 border border-blue-200"</code></p>
        <p><strong>Responsive:</strong> <code class="bg-blue-100 px-2 py-1 rounded">class="h-64 md:h-96 lg:h-screen"</code></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Vue3Datatable from '../components/custom-table.vue';

const cols = ref([
  { field: 'id', title: 'ID', width: '60px', filter: false },
  { field: 'name', title: 'Name' },
  { field: 'username', title: 'Username' },
  { field: 'email', title: 'Email' },
  { field: 'age', title: 'Age', type: 'number' },
  { field: 'active', title: 'Active', type: 'bool' },
]);

const rows = ref([
  { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", age: 25, active: true },
  { id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv", age: 30, active: false },
  { id: 3, name: "Clementine Bauch", username: "Samantha", email: "Nathan@yesenia.net", age: 28, active: true },
  { id: 4, name: "Patricia Lebsack", username: "Karianne", email: "Julianne.OConner@kory.org", age: 35, active: true },
  { id: 5, name: "Chelsey Dietrich", username: "Kamren", email: "Lucio_Hettinger@annie.ca", age: 42, active: false },
  { id: 6, name: "Mrs. Dennis Schulist", username: "Leopoldo_Corkery", email: "Karley_Dach@jasper.info", age: 31, active: true },
  { id: 7, name: "Kurtis Weissnat", username: "Elwyn.Skiles", email: "Telly.Hoeger@billy.biz", age: 29, active: false },
  { id: 8, name: "Nicholas Runolfsdottir", username: "Maxime_Nienow", email: "Sherwood@rosamond.me", age: 38, active: true },
]);
</script>

<style scoped>
/* Additional custom styles if needed */
</style>