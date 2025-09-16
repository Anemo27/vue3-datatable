<template>
    <div class="p-10">
        <div class="mb-2">
            <input
                type="text"
                v-model="params.search"
                placeholder="Search..."
                class="border border-solid bg-white p-2 outline-0 border-gray-200 focus:border-gray-200 rounded"
            />
            <button type="button" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4" @click="datatable.reset()">Reset</button> <br />
        </div>

        <vue3-datatable
            ref="datatable"
            :loading="loading"
            :rows="rows"
            :columns="cols"
            :totalRows="total_rows"
            :isServerMode="true"
            :page="params.current_page"
            :pageSize="params.pagesize"
            :pageSizeOptions="[3, 5, 10]"
            :sortable="true"
            :sortColumn="params.sort_column"
            :sortDirection="params.sort_direction"
            :hasCheckbox="true"
            :columnFilter="false"
            :class="'h-96'"
            :stickyHeader="true"
            @change="changeServer"
        >
        </vue3-datatable>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Vue3Datatable from './components/custom-table.vue';
import type { colDef, SortDirection } from './components/types';
import './assets/css/tailwind.css';

onMounted(() => {
    getUsers();
});

const datatable: any = ref(null);
const loading: any = ref(true);
const total_rows = ref(0);
const rows: any = ref(null);
const cols: colDef[] = [
    { field: 'id', title: 'ID', type: 'number' },
    { field: 'firstName', title: 'First Name', type: 'string' },
    { field: 'lastName', title: 'Last Name', type: 'string' },
    { field: 'email', title: 'Email', type: 'string' },
    { field: 'age', title: 'Age', type: 'number' },
    { field: 'dob', title: 'Birthdate', type: 'date' },
    { field: 'address.city', title: 'City', type: 'string' },
    { field: 'isActive', title: 'Active', type: 'bool' },
];

const changeServer = (data: any) => {
    params.current_page = data.current_page;
    params.pagesize = data.pagesize;
    params.sort_column = data.sort_column;
    params.sort_direction = data.sort_direction;
    params.column_filters = data.column_filters;
    params.search = data.search;

    filterUsers();
};

const params = reactive({
    current_page: 1,
    pagesize: 5,
    sort_column: 'id',
    sort_direction: 'desc' as SortDirection,
    column_filters: [],
    search: '',
});

let controller: any;
let timer: any;
const filterUsers = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        getUsers();
    }, 300);
};
const getUsers = async () => {
    // cancel request if previous request still pending before next request fire
    if (controller) {
        controller.abort();
    }
    controller = new AbortController();
    const signal = controller.signal;

    try {
        loading.value = true;

        const response = await fetch('https://vue3-datatable-document.vercel.app/api/user', {
            method: 'POST',
            body: JSON.stringify(params),
            signal: signal, // Assign the signal to the fetch request
        });

        const data = await response.json();

        rows.value = data?.data;
        total_rows.value = data?.meta?.total;
    } catch {}

    loading.value = false;
};
</script>
