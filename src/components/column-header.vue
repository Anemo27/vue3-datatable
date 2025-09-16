<template>
    <tr key="hdrrow" :class="{ 'bg-blue-50 dark:bg-gray-800': !props.isFooter, 'bg-white dark:bg-gray-900': props.isFooter }">
        <th
            v-if="props.all.hasCheckbox"
            :key="'chkall'"
            scope="col"
            class="w-px font-bold align-top whitespace-nowrap text-left py-3 px-4"
            :class="{
                'bg-blue-50 dark:bg-gray-800': props.all.stickyFirstColumn && !props.isFooter,
                'bg-white dark:bg-gray-900': props.all.stickyFirstColumn && props.isFooter,
                'left-0': props.all.stickyFirstColumn,
            }"
        >
            <div class="relative">
                <input ref="selectedAll" type="checkbox" @click.stop="emit('selectAll', ($event.target as HTMLInputElement)?.checked)" class="opacity-0 absolute h-5 w-5" />
                <div class="bg-white dark:bg-gray-900 border border-solid rounded border-slate-300 dark:border-gray-600 w-5 h-5 grid place-content-center">
                    <icon-check class="check hidden w-3 h-3 text-blue-600 pointer-events-none" />
                    <icon-dash class="intermediate hidden w-3 h-3 text-blue-600 pointer-events-none" />
                </div>
            </div>
        </th>
        <template v-for="(col, j) in props.all.columns">
            <th
                v-if="!col.hide"
                :key="col.field"
                scope="col"
                class="select-none z-[1] font-bold align-top whitespace-nowrap text-left py-3 px-4"
                :class="[
                    props.all.sortable && col.sort ? 'cursor-pointer' : '',
                    j === 0 && props.all.stickyFirstColumn ? 'sticky left-0 bg-blue-50 dark:bg-gray-800' : '',
                    props.all.hasCheckbox && j === 0 && props.all.stickyFirstColumn ? 'left-[52px]' : '',
                ]"
                :style="{
                    width: col.width,
                    'min-width': col.minWidth,
                    'max-width': col.maxWidth,
                }"
            >
                <div class="flex items-center" :class="[col.headerClass ? col.headerClass : '']" @click="props.all.sortable && col.sort && emit('sortChange', col.field)">
                    {{ col.title }}
                    <span v-if="props.all.sortable && col.sort" class="ml-3 flex items-center" :class="[props.currentSortColumn, props.currentSortDirection]">
                        <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                            <polygon
                                points="3.11,6.25 10.89,6.25 7,1.75 "
                                fill="currentColor"
                                class="text-black/20"
                                :class="[currentSortColumn === col.field && currentSortDirection === 'asc' ? '!text-blue-600' : '']"
                            ></polygon>
                            <polygon
                                points="7,12.25 10.89,7.75 3.11,7.75 "
                                fill="currentColor"
                                class="text-black/20"
                                :class="[currentSortColumn === col.field && currentSortDirection === 'desc' ? '!text-blue-600' : '']"
                            ></polygon>
                        </svg>
                    </span>
                </div>

                <template v-if="props.all.columnFilter && !props.isFooter">
                    <div v-if="col.filter" class="relative">
                        <input v-if="col.type === 'string'" v-model.trim="col.value" type="text" class="w-full box-border bg-white dark:bg-gray-800 h-full min-w-[60px] outline-0 focus:ring-1 focus:ring-slate-300/40 border border-solid border-slate-300 dark:border-gray-600 text-black dark:text-white font-normal rounded-l px-3 py-1 text-sm" @keyup="emit('filterChange')" />
                        <input v-if="col.type === 'number'" v-model.number.trim="col.value" type="number" class="w-full box-border bg-white dark:bg-gray-800 h-full min-w-[60px] outline-0 focus:ring-1 focus:ring-slate-300/40 border border-solid border-slate-300 dark:border-gray-600 text-black dark:text-white font-normal rounded-l px-3 py-1 text-sm" @keyup="emit('filterChange')" />
                        <input v-else-if="col.type === 'date'" v-model="col.value" type="date" class="w-full box-border bg-white dark:bg-gray-800 h-full min-w-[60px] outline-0 focus:ring-1 focus:ring-slate-300/40 border border-solid border-slate-300 dark:border-gray-600 text-black dark:text-white font-normal rounded-l px-3 py-1 text-sm" @change="emit('filterChange')" />
                        <select v-else-if="col.type === 'bool'" v-model="col.value" class="w-full box-border bg-white dark:bg-gray-800 h-full min-w-[60px] outline-0 focus:ring-1 focus:ring-slate-300/40 border border-solid border-slate-300 dark:border-gray-600 text-black dark:text-white font-normal rounded-l px-3 py-1 text-sm" @change="emit('filterChange')">
                            <option :value="undefined">All</option>
                            <option :value="true">True</option>
                            <option :value="false">False</option>
                        </select>

                        <button v-if="col.type !== 'bool'" type="button" @click.stop="emit('toggleFilterMenu', col)">
                            <icon-filter class="w-4" />
                        </button>

                        <column-filter
                            v-show="props.isOpenFilter === col.field"
                            :column="col"
                            :type="col.type"
                            :columnFilterLang="props.columnFilterLang"
                            @close="emit('toggleFilterMenu', null)"
                            @filterChange="emit('filterChange')"
                        />
                    </div>
                </template>
            </th>
        </template>
    </tr>
</template>
<script setup lang="ts">
import { watch, ref } from 'vue';
import columnFilter from './column-filter.vue';
import iconCheck from './icon-check.vue';
import iconDash from './icon-dash.vue';
import iconFilter from './icon-filter.vue';

const selectedAll: any = ref(null);

const props = defineProps(['all', 'currentSortColumn', 'currentSortDirection', 'isOpenFilter', 'isFooter', 'checkAll', 'columnFilterLang']);

const emit = defineEmits(['selectAll', 'sortChange', 'filterChange', 'toggleFilterMenu']);
const checkboxChange = () => {
    if (selectedAll.value) {
        selectedAll.value.indeterminate = props.checkAll !== 0 ? !props.checkAll : false;
        selectedAll.value.checked = props.checkAll;
    }
};
watch(() => props.checkAll, checkboxChange);
</script>
