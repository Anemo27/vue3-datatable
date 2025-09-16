<template>
  <div class="min-h-screen p-8" :class="{ dark: isDark }">
    <div class="max-w-6xl mx-auto">
      <div class="mb-6 flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Vue 3 Datatable - Dark Theme Demo
        </h1>
        <button
          @click="toggleDarkMode"
          class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
        >
          {{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}
        </button>
      </div>

      <Vue3Datatable
        :rows="sampleData"
        :columns="columns"
        :stickyHeader="true"
        :height="'600px'"
        :pagination="true"
        :columnFilter="true"
        :sortable="true"
        :hasCheckbox="true"
        :showPageSize="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Vue3Datatable from './components/custom-table.vue'

const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

// Sample data
const sampleData = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, status: 'Active', role: 'Developer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, status: 'Inactive', role: 'Designer' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, status: 'Active', role: 'Manager' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 28, status: 'Active', role: 'Developer' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 42, status: 'Inactive', role: 'Analyst' },
  // Add more sample data...
])

// Column definitions
const columns = ref([
  { field: 'id', title: 'ID', type: 'number' as const, width: '80px' },
  { field: 'name', title: 'Name', type: 'string' as const, filter: true, sort: true },
  { field: 'email', title: 'Email', type: 'string' as const, filter: true, sort: true },
  { field: 'age', title: 'Age', type: 'number' as const, filter: true, sort: true, width: '100px' },
  { field: 'status', title: 'Status', type: 'string' as const, filter: true, sort: true },
  { field: 'role', title: 'Role', type: 'string' as const, filter: true, sort: true }
])
</script>