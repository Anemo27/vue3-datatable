<template>
    <div class="antialiased relative text-black text-sm font-normal flex flex-col" :class="props.class">
        <!-- Sticky Header Container -->
        <div v-if="props.stickyHeader" class="sticky top-0 z-10 bg-white border-b border-solid border-blue-200 shadow-sm">
            <table :class="['vue3-datatable w-full max-w-full border-collapse', props.skin]">
                <thead class="bg-blue-50">
                    <column-header
                        :all="props"
                        :currentSortColumn="currentSortColumn"
                        :currentSortDirection="currentSortDirection"
                        :isOpenFilter="isOpenFilter"
                        :checkAll="selectedAll"
                        :columnFilterLang="props.columnFilterLang"
                        @selectAll="selectAll"
                        @sortChange="sortChange"
                        @filterChange="filterChange"
                        @toggleFilterMenu="toggleFilterMenu"
                    />
                </thead>
            </table>
        </div>

        <!-- Scrollable Table Body -->
        <div class="overflow-auto w-full relative rounded flex-1" :class="{ 'min-h-[300px]': currentLoader }" :style="{ height: props.stickyHeader && props.height }">
            <table :class="['vue3-datatable w-full max-w-full border-collapse', props.skin]">
                <!-- Header (hidden when sticky) -->
                <thead v-if="!props.stickyHeader" class="bg-blue-50">
                    <column-header
                        :all="props"
                        :currentSortColumn="currentSortColumn"
                        :currentSortDirection="currentSortDirection"
                        :isOpenFilter="isOpenFilter"
                        :checkAll="selectedAll"
                        :columnFilterLang="props.columnFilterLang"
                        @selectAll="selectAll"
                        @sortChange="sortChange"
                        @filterChange="filterChange"
                        @toggleFilterMenu="toggleFilterMenu"
                    />
                </thead>
                <tbody class="border-b border-solid border-blue-200">
                    <template v-if="filterRowCount">
                        <tr
                            v-for="(item, i) in filterItems"
                            :key="item[uniqueKey] ? item[uniqueKey] : i"
                            :class="[typeof props.rowClass === 'function' ? rowClass(item) : props.rowClass, props.selectRowOnClick ? 'cursor-pointer' : '']"
                            @click.prevent="rowClick(item, i)"
                        >
                            <td
                                v-if="props.hasCheckbox"
                                class="text-left py-3 px-4"
                                :class="{
                                    'sticky left-0 bg-blue-50': props.stickyFirstColumn,
                                }"
                            >
                                <div class="relative">
                                    <input v-model="selected" type="checkbox" :value="item[uniqueKey] ? item[uniqueKey] : i" @click.stop class="opacity-0 absolute h-5 w-5" />
                                    <div class="bg-white border border-solid rounded border-slate-300 w-5 h-5 grid place-content-center">
                                        <icon-check class="check hidden w-3 h-3 text-blue-600 pointer-events-none" />
                                    </div>
                                </div>
                            </td>
                            <template v-for="(col, j) in props.columns">
                                <td
                                    v-if="!col.hide"
                                    :key="col.field"
                                    class="text-left py-3 px-4"
                                    :class="[
                                        typeof props.cellClass === 'function' ? cellClass(item) : props.cellClass,
                                        j === 0 && props.stickyFirstColumn ? 'sticky left-0 bg-blue-50' : '',
                                        props.hasCheckbox && j === 0 && props.stickyFirstColumn ? 'left-[52px]' : '',
                                        col.cellClass ? col.cellClass : '',
                                    ]"
                                >
                                    <template v-if="slots[col.field]">
                                        <slot :name="col.field" :value="item"></slot>
                                    </template>
                                    <div v-else-if="col.cellRenderer" v-html="col.cellRenderer(item)"></div>
                                    <template v-else>
                                        {{ safeCellValue(item, col.field) }}
                                    </template>
                                </td>
                            </template>
                        </tr>
                    </template>
                    <tr v-if="!filterRowCount && !currentLoader">
                        <td :colspan="props.columns.length + 1">
                            {{ props.noDataContent }}
                        </td>
                    </tr>

                    <template v-if="!filterRowCount && currentLoader">
                        <tr v-for="i in props.pageSize" :key="i" class="!bg-white h-11 !border-transparent">
                            <td :colspan="props.columns.length + 1" class="!p-0 !border-transparent">
                                <div class="relative overflow-hidden bg-gray-100 w-full h-8
                                     after:content-[''] after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_2s_infinite]
                                     after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0,rgba(0,0,0,0.025)_20%,rgba(0,0,0,0.05)_50%,rgba(0,0,0,0))]"></div>
                            </td>
                        </tr>
                    </template>
                </tbody>

                <!-- Footer (shown when not sticky) -->
                <tfoot v-if="props.cloneHeaderInFooter && !props.stickyHeader">
                    <column-header
                        :all="props"
                        :currentSortColumn="currentSortColumn"
                        :currentSortDirection="currentSortDirection"
                        :isOpenFilter="isOpenFilter"
                        :isFooter="true"
                        :checkAll="selectedAll"
                        @selectAll="selectAll"
                        @sortChange="sortChange"
                        @filterChange="filterChange"
                        @toggleFilterMenu="toggleFilterMenu"
                    />
                </tfoot>
            </table>

            <!-- Sticky Footer Container -->
            <div v-if="props.cloneHeaderInFooter && props.stickyHeader" class="sticky bottom-0 z-10 bg-white border-t border-solid border-blue-200 shadow-sm mt-2">
                <table :class="['vue3-datatable w-full max-w-full border-collapse', props.skin]">
                    <tfoot>
                        <column-header
                            :all="props"
                            :currentSortColumn="currentSortColumn"
                            :currentSortDirection="currentSortDirection"
                            :isOpenFilter="isOpenFilter"
                            :isFooter="true"
                            :checkAll="selectedAll"
                            @selectAll="selectAll"
                            @sortChange="sortChange"
                            @filterChange="filterChange"
                            @toggleFilterMenu="toggleFilterMenu"
                        />
                    </tfoot>
                </table>
            </div>

            <div v-if="filterRowCount && currentLoader" class="absolute inset-0 bg-blue-50/50 grid place-content-center">
                <icon-loader />
            </div>
        </div>
        <div v-if="props.pagination && filterRowCount" class="py-5 flex-shrink-0" :class="{ 'pointer-events-none': currentLoader }">
            <div class="flex items-center flex-wrap flex-col sm:flex-row gap-4">
                <div class="flex items-center">
                    <span class="mr-2">
                        {{ stringFormat(props.paginationInfo, filterRowCount ? offset : 0, limit, filterRowCount) }}
                    </span>
                    <select v-if="props.showPageSize" v-model="currentPageSize" class="outline-0 bg-white box-border focus:ring-1 focus:ring-slate-300/40 border border-solid border-slate-300 rounded text-black font-normal px-2 py-1.5">
                        <option v-for="option in props.pageSizeOptions" :value="option" :key="option">
                            {{ option }}
                        </option>
                    </select>
                </div>

                <div class="sm:ml-auto inline-flex items-center space-x-1">
                    <button v-if="props.showFirstPage" type="button" class="bg-white cursor-pointer grid place-content-center w-8 h-8 px-2.5 py-1.5 text-gray-600 hover:text-white hover:bg-blue-600 border border-solid border-gray-300 hover:border-blue-600 rounded-full select-none outline-0 transition-colors duration-200 first-page" :class="{ 'pointer-events-none opacity-50': currentPage <= 1 }" @click="currentPage = 1">
                        <span v-if="props.firstArrow" v-html="props.firstArrow"> </span>
                        <svg v-else aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
                            <g fill="currentColor" fill-rule="evenodd">
                                <path d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                <path d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                            </g>
                        </svg>
                    </button>
                    <button type="button" class="bg-white cursor-pointer grid place-content-center w-8 h-8 px-2.5 py-1.5 text-gray-600 hover:text-white hover:bg-blue-600 border border-solid border-gray-300 hover:border-blue-600 rounded-full select-none outline-0 transition-colors duration-200 previous-page" :class="{ 'pointer-events-none opacity-50': currentPage <= 1 }" @click="previousPage">
                        <span v-if="props.previousArrow" v-html="props.previousArrow"> </span>
                        <svg v-else aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
                            <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                            />
                        </svg>
                    </button>

                    <template v-if="props.showNumbers">
                        <button
                            v-for="page in paging"
                            :key="page"
                            type="button"
                            class="bg-white cursor-pointer grid place-content-center w-8 h-8 px-2.5 py-1.5 text-gray-600 hover:text-white hover:bg-blue-600 border border-solid border-gray-300 hover:border-blue-600 rounded-full select-none outline-0 transition-colors duration-200"
                            :class="{
                                disabled: currentPage === page,
                                'bg-blue-600 text-white border-blue-600': page === currentPage,
                            }"
                            @click="movePage(page)"
                        >
                            {{ page }}
                        </button>
                    </template>

                    <button type="button" class="bg-white cursor-pointer grid place-content-center w-8 h-8 px-2.5 py-1.5 text-gray-600 hover:text-white hover:bg-blue-600 border border-solid border-gray-300 hover:border-blue-600 rounded-full select-none outline-0 transition-colors duration-200 next-page" :class="{ 'pointer-events-none opacity-50': currentPage >= maxPage }" @click="nextPage">
                        <span v-if="props.nextArrow" v-html="props.nextArrow"> </span>
                        <svg v-else aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
                            <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"
                            />
                        </svg>
                    </button>

                    <button v-if="props.showLastPage" type="button" class="bg-white cursor-pointer grid place-content-center w-8 h-8 px-2.5 py-1.5 text-gray-600 hover:text-white hover:bg-blue-600 border border-solid border-gray-300 hover:border-blue-600 rounded-full select-none outline-0 transition-colors duration-200 last-page" :class="{ 'pointer-events-none opacity-50': currentPage >= maxPage }" @click="currentPage = maxPage">
                        <span v-if="props.lastArrow" v-html="props.lastArrow"> </span>
                        <svg v-else aria-hidden="true" width="14" height="14" viewBox="0 0 16 16">
                            <g fill="currentColor" fill-rule="evenodd">
                                <path d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8L3.646 2.354a.5.5 0 0 1 0-.708z" />
                                <path d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8L7.646 2.354a.5.5 0 0 1 0-.708z" />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, Ref, ref, useSlots, watch } from 'vue';
import columnHeader from './column-header.vue';
import iconCheck from './icon-check.vue';
import iconLoader from './icon-loader.vue';

const slots = useSlots();

// Type guards and utility functions
const isValidColumnType = (type: string): type is ColumnType => {
    return ['string', 'number', 'date', 'bool'].includes(type);
};

const isValidFilterCondition = (condition: string): condition is FilterCondition => {
    const validConditions: FilterCondition[] = [
        'contain', 'not_contain', 'equal', 'not_equal', 'greater_than', 'greater_than_equal',
        'less_than', 'less_than_equal', 'start_with', 'end_with', 'is_null', 'is_not_null'
    ];
    return validConditions.includes(condition as FilterCondition);
};

const isValidSortDirection = (direction: string): direction is SortDirection => {
    return direction === 'asc' || direction === 'desc';
};

// Safe type conversion utilities
const safeString = (value: any): string => {
    if (value == null) return '';
    return String(value);
};

const safeNumber = (value: any): number | null => {
    if (value == null || value === '') return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
};

const safeBoolean = (value: any): boolean => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.toLowerCase() === 'true';
    return Boolean(value);
};

// Generic constraints and advanced types
type PrimitiveValue = string | number | boolean | Date | null | undefined;

interface BaseDataRow {
    [key: string]: PrimitiveValue | object;
}

type StrictDataRow<T extends BaseDataRow = BaseDataRow> = T;

// Constrained column definition
export interface StrictColDef<T extends BaseDataRow = BaseDataRow> {
    isUnique?: boolean;
    field?: keyof T | string;
    title?: string;
    value?: PrimitiveValue;
    condition?: FilterCondition;
    type?: ColumnType;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    hide?: boolean;
    filter?: boolean;
    search?: boolean;
    sort?: boolean;
    html?: boolean;
    cellRenderer?: (item: T) => string;
    headerClass?: string;
    cellClass?: string;
}

// Simplified Props interface for Vue SFC compatibility
interface Props {
    loading?: boolean;
    isServerMode?: boolean;
    skin?: string;
    totalRows?: number;
    rows?: Array<DataRow>;
    columns?: Array<colDef>;
    hasCheckbox?: boolean;
    search?: string;
    columnChooser?: boolean;
    page?: number;
    pageSize?: number;
    pageSizeOptions?: Array<number>;
    showPageSize?: boolean;
    rowClass?: Array<string> | Function;
    cellClass?: Array<string> | Function;
    sortable?: boolean;
    sortColumn?: string;
    sortDirection?: SortDirection;
    columnFilter?: boolean;
    columnFilterLang?: Record<string, string> | null;
    pagination?: boolean;
    showNumbers?: boolean;
    showNumbersCount?: number;
    showFirstPage?: boolean;
    showLastPage?: boolean;
    firstArrow?: string;
    lastArrow?: string;
    nextArrow?: string;
    previousArrow?: string;
    paginationInfo?: string;
    noDataContent?: string;
    stickyHeader?: boolean;
    height?: string;
    class?: string;
    stickyFirstColumn?: boolean;
    cloneHeaderInFooter?: boolean;
    selectRowOnClick?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    loading: false,
    isServerMode: false,
    skin: 'bg-slate-100/15 hover:bg-gray-50',
    totalRows: 0,
    rows: () => [],
    columns: () => [],
    hasCheckbox: false,
    search: '',
    columnChooser: false,
    page: 1,
    pageSize: 10,
    pageSizeOptions: () => [10, 20, 30, 50, 100],
    showPageSize: true,
    rowClass: <never>[],
    cellClass: <never>[],
    cellRenderer: null,
    sortable: false,
    sortColumn: 'id',
    sortDirection: 'asc',
    columnFilter: false,
    columnFilterLang: null,
    pagination: true,
    showNumbers: true,
    showNumbersCount: 5,
    showFirstPage: true,
    showLastPage: true,
    firstArrow: '',
    lastArrow: '',
    nextArrow: '',
    previousArrow: '',
    paginationInfo: 'Showing {0} to {1} of {2} entries',
    noDataContent: 'No data available',
    stickyHeader: false,
    height: '500px',
    class: '',
    stickyFirstColumn: false,
    cloneHeaderInFooter: false,
    selectRowOnClick: false,
});

// set default columns values
for (const item of props.columns || []) {
    const type = item.type?.toLowerCase() || 'string';
    item.type = type;
    item.isUnique = item.isUnique !== undefined ? item.isUnique : false;
    item.hide = item.hide !== undefined ? item.hide : false;
    item.filter = item.filter !== undefined ? item.filter : true;
    item.search = item.search !== undefined ? item.search : true;
    item.sort = item.sort !== undefined ? item.sort : true;
    item.html = item.html !== undefined ? item.html : false;
    item.condition = !type || type === 'string' ? 'contain' : 'equal';
}

const filterItems: Ref<Array<any>> = ref([]);
const currentPage = ref(props.page);
const currentPageSize = ref(props.pagination ? props.pageSize : props.rows?.length);
const oldPageSize = props.pageSize;
const currentSortColumn = ref(props.sortColumn);
const oldSortColumn = props.sortColumn;
const currentSortDirection = ref(props.sortDirection);
const oldSortDirection = props.sortDirection;
const filterRowCount = ref(props.totalRows);
const selected: Ref<Array<string | number>> = ref([]);
const selectedAll: Ref<boolean | null> = ref(null);
const currentLoader = ref(props.loading);
const currentSearch = ref(props.search);
const oldColumns = JSON.parse(JSON.stringify(props.columns));

const isOpenFilter: Ref<string | null> = ref(null);

// row click
const timer: Ref<NodeJS.Timeout | null> = ref(null);
let clickCount: Ref<number> = ref(0);
const delay: Ref<number> = ref(230);

onMounted(() => {
    filterRows();
});
const emit = defineEmits(['change', 'sortChange', 'searchChange', 'pageChange', 'pageSizeChange', 'rowSelect', 'filterChange', 'rowClick', 'rowDBClick']);
defineExpose({
    reset() {
        reset();
    },
    getSelectedRows() {
        return getSelectedRows();
    },
    getColumnFilters() {
        return getColumnFilters();
    },
    clearSelectedRows() {
        return clearSelectedRows();
    },
    selectRow(index: number) {
        selectRow(index);
    },
    unselectRow(index: number) {
        unselectRow(index);
    },
    isRowSelected(index: number) {
        return isRowSelected(index);
    },
    getFilteredRows() {
        return filteredRows();
    },
    getVisibleRows() {
        return getVisibleRows();
    },
});

const stringFormat = (template: string, ...args: (string | number)[]): string => {
    return template.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != 'undefined' ? String(args[number]) : match;
    });
};

const uniqueKey = computed(() => {
    const col = props.columns.find((d) => d.isUnique);

    return col?.field || null;
});

// Maximum number of pages
const maxPage = computed(() => {
    const totalPages = <number>currentPageSize.value < 1 ? 1 : Math.ceil(<number>filterRowCount.value / <number>currentPageSize.value);
    return Math.max(totalPages || 0, 1);
});

// The starting value of the page number
const offset = computed(() => {
    return (currentPage.value - 1) * <number>currentPageSize.value + 1;
});

// Maximum number of pages
const limit = computed(() => {
    const limit = currentPage.value * <number>currentPageSize.value;
    return <number>filterRowCount.value >= limit ? limit : filterRowCount.value;
});

// Paging array
const paging = computed(() => {
    let startPage: number, endPage: number;
    let isMaxSized = typeof props.showNumbersCount !== 'undefined' && <number>props.showNumbersCount < maxPage.value;
    // recompute if maxSize
    if (isMaxSized) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(currentPage.value - Math.floor(<number>props.showNumbersCount / 2), 1);
        endPage = startPage + <number>props.showNumbersCount - 1;

        // Adjust if limit is exceeded
        if (endPage > maxPage.value) {
            endPage = maxPage.value;
            startPage = endPage - <number>props.showNumbersCount + 1;
        }
    } else {
        startPage = 1;
        endPage = maxPage.value;
    }

    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);

    return pages;
});

const filteredRows = () => {
    let rows = props.rows || [];

    if (!props.isServerMode) {
        // column filters
        if (props.columnFilter) {
            props.columns?.forEach((d) => {
                if (d.filter && ((d.value !== undefined && d.value !== null && d.value !== '') || d.condition === 'is_null' || d.condition == 'is_not_null')) {
                    // string filters
                    if (d.type === 'string') {
                        if (d.value && !d.condition) {
                            d.condition = 'contain';
                        }

                        if (d.condition === 'contain') {
                            rows = rows.filter((item) => {
                                return safeCellValue(item, d.field)?.toString().toLowerCase().includes(d.value.toLowerCase());
                            });
                        } else if (d.condition === 'not_contain') {
                            rows = rows.filter((item) => {
                                return !safeCellValue(item, d.field)?.toString().toLowerCase().includes(d.value.toLowerCase());
                            });
                        } else if (d.condition === 'equal') {
                            rows = rows.filter((item) => {
                                return safeCellValue(item, d.field)?.toString().toLowerCase() === d.value.toLowerCase();
                            });
                        } else if (d.condition === 'not_equal') {
                            rows = rows.filter((item) => {
                                return safeCellValue(item, d.field)?.toString().toLowerCase() !== d.value.toLowerCase();
                            });
                        } else if (d.condition == 'start_with') {
                            rows = rows.filter((item) => {
                                return safeCellValue(item, d.field)?.toString().toLowerCase().indexOf(d.value.toLowerCase()) === 0;
                            });
                        } else if (d.condition == 'end_with') {
                            rows = rows.filter((item) => {
                                return (
                                    safeCellValue(item, d.field)
                                        ?.toString()
                                        .toLowerCase()
                                        .substr(d.value.length * -1) === d.value.toLowerCase()
                                );
                            });
                        }
                    }
                    // number filters
                    else if (d.type === 'number') {
                        if (d.value && !d.condition) {
                            d.condition = 'equal';
                        }

                        if (d.condition === 'equal') {
                            rows = rows.filter((item) => {
                                return safeCellValue(item, d.field) && safeParseFloat(safeCellValue(item, d.field)) === safeParseFloat(d.value);
                            });
                        } else if (d.condition === 'not_equal') {
                            rows = rows.filter((item) => {
                                return safeCellValue(item, d.field) && safeParseFloat(safeCellValue(item, d.field)) !== safeParseFloat(d.value);
                            });
                        } else if (d.condition === 'greater_than') {
                            rows = rows.filter((item) => {
                                return safeCellValue(item, d.field) && safeParseFloat(safeCellValue(item, d.field)) > safeParseFloat(d.value);
                            });
                        } else if (d.condition === 'greater_than_equal') {
                            rows = rows.filter((item) => {
                                return safeCellValue(item, d.field) && safeParseFloat(safeCellValue(item, d.field)) >= safeParseFloat(d.value);
                            });
                        } else if (d.condition === 'less_than') {
                            rows = rows.filter((item) => {
                                return safeCellValue(item, d.field) && safeParseFloat(safeCellValue(item, d.field)) < safeParseFloat(d.value);
                            });
                        } else if (d.condition === 'less_than_equal') {
                            rows = rows.filter((item) => {
                                return safeCellValue(item, d.field) && safeParseFloat(safeCellValue(item, d.field)) <= safeParseFloat(d.value);
                            });
                        }
                    }
                    // date filters
                    else if (d.type === 'date') {
                        if (d.value && !d.condition) {
                            d.condition = 'equal';
                        }

                        if (d.condition === 'equal') {
                            rows = rows.filter((item) => {
                                return safeCellValue(item, d.field) && safeDateFormat(safeCellValue(item, d.field)) === d.value;
                            });
                        } else if (d.condition === 'not_equal') {
                            rows = rows.filter((item) => {
                                return safeCellValue(item, d.field) && safeDateFormat(safeCellValue(item, d.field)) !== d.value;
                            });
                        } else if (d.condition === 'greater_than') {
                            rows = rows.filter((item) => {
                                return safeCellValue(item, d.field) && safeDateFormat(safeCellValue(item, d.field)) > d.value;
                            });
                        } else if (d.condition === 'less_than') {
                            rows = rows.filter((item) => {
                                return safeCellValue(item, d.field) && safeDateFormat(safeCellValue(item, d.field)) < d.value;
                            });
                        }
                    }
                    // boolean filters
                    else if (d.type === 'bool') {
                        rows = rows.filter((item) => {
                            return safeCellValue(item, d.field) === d.value;
                        });
                    }

                    if (d.condition === 'is_null') {
                        rows = rows.filter((item) => {
                            return safeCellValue(item, d.field) == null || safeCellValue(item, d.field) == '';
                        });
                        d.value = '';
                    } else if (d.condition === 'is_not_null') {
                        d.value = '';
                        rows = rows.filter((item) => {
                            return safeCellValue(item, d.field);
                        });
                    }
                }
            });
        }

        // global search
        if (currentSearch.value && rows?.length) {
            let final: Array<any> = [];

            const keys = (props.columns || [])
                .filter((d) => d.search && !d.hide)
                .map((d) => {
                    return d.field;
                });

            for (var j = 0; j < rows?.length; j++) {
                for (var i = 0; i < keys.length; i++) {
                    if (safeCellValue(rows[j], keys[i])?.toString().toLowerCase().includes(currentSearch.value.toLowerCase())) {
                        final.push(rows[j]);
                        break;
                    }
                }
            }

            rows = final;
        }

        // sort rows
        if (props.sortable) {
            var collator = new Intl.Collator(undefined, {
                numeric: props.columns.find((col) => col.field == currentSortColumn.value)?.type === 'number',
                sensitivity: 'base',
            });
            const sortOrder = currentSortDirection.value === 'desc' ? -1 : 1;

            rows.sort((a: DataRow, b: DataRow): number => {
                const valA = currentSortColumn.value?.split('.').reduce((obj: any, key: string) => obj?.[key], a);
                const valB = currentSortColumn.value?.split('.').reduce((obj: any, key: string) => obj?.[key], b);

                return collator.compare(valA, valB) * sortOrder;
            });
        }
    }

    return rows;
};

const filterRows = () => {
    let result = [];
    let rows = filteredRows();

    if (props.isServerMode) {
        filterRowCount.value = props.totalRows || 0;
        result = rows;
    } else {
        filterRowCount.value = rows?.length || 0;
        result = rows.slice(offset.value - 1, <number>limit.value);
    }

    filterItems.value = result || [];
    return result;
};
watch(
    () => props.loading,
    () => {
        currentLoader.value = props.loading;
    }
);

const toggleFilterMenu = (col: colDef) => {
    if (col) {
        if (isOpenFilter.value === col.field) {
            isOpenFilter.value = null;
        } else {
            isOpenFilter.value = col.field;
        }
    } else {
        isOpenFilter.value = null;
    }
};

// previous page
const previousPage = () => {
    if (currentPage.value == 1) {
        return false;
    }
    currentPage.value--;
};

// page change
const movePage = (page: number) => {
    currentPage.value = page;
};

// next page
const nextPage = () => {
    if (currentPage.value >= maxPage.value) {
        return false;
    }
    currentPage.value++;
};

// page changed
const changePage = () => {
    selectAll(false);

    if (props.isServerMode) {
        changeForServer('page');
    } else {
        filterRows();
        emit('pageChange', currentPage.value);
    }
};
watch(() => currentPage.value, changePage);

// watch page prop
watch(
    () => props.page,
    (newPage) => {
        currentPage.value = newPage;
    }
);

// row update
const changeRows = () => {
    // if (!props.isServerMode) {
    //     currentPage.value = 1;
    // }
    selectAll(false);
    filterRows();
};
watch(() => props.rows, changeRows);

// pagesize changed
const changePageSize = () => {
    selectAll(false);

    if (props.isServerMode) {
        // for server side paginations
        if (currentPage.value === 1) {
            changeForServer('pagesize', true);
        } else {
            currentPage.value = 1; // changeForServer method call when currentPage change
        }
    } else {
        currentPage.value = 1;
        filterRows();
        emit('pageSizeChange', currentPageSize.value);
    }
};
watch(() => currentPageSize.value, changePageSize);

// sorting
const sortChange = (field: string) => {
    let direction = 'asc';
    if (field == currentSortColumn.value) {
        if (currentSortDirection.value === 'asc') {
            direction = 'desc';
        }
    }
    let offset = (currentPage.value - 1) * <number>currentPageSize.value;
    let limit = currentPageSize.value;
    currentSortColumn.value = field;
    currentSortDirection.value = direction;

    selectAll(false);
    filterRows();

    if (props.isServerMode) {
        changeForServer('sort');
    } else {
        emit('sortChange', { offset, limit, field, direction });
    }
};

// checkbox
const checkboxChange = (value: Array<string | number>): void => {
    selectedAll.value = value.length && filterItems.value.length && value.length === filterItems.value.length;

    const rows = filterItems.value.filter((d, i) => selected.value.includes(uniqueKey.value ? d[uniqueKey.value as never] : i));

    emit('rowSelect', rows);
};
watch(() => selected.value, checkboxChange);

const selectAll = (checked: boolean): void => {
    if (checked) {
        selected.value = filterItems.value.map((d, i) => (uniqueKey.value ? d[uniqueKey.value as never] : i));
    } else {
        selected.value = [];
    }
};

// columns filter
const filterChange = () => {
    selectAll(false);

    if (props.isServerMode) {
        // for server side paginations
        if (currentPage.value === 1) {
            changeForServer('filter', true);
        } else {
            currentPage.value = 1; // changeForServer method call when currentPage change
        }
    } else {
        currentPage.value = 1;
        filterRows();
        emit('filterChange', props.columns);
    }
};

// search
const changeSearch = () => {
    selectAll(false);

    if (props.isServerMode) {
        // for server side paginations
        if (currentPage.value === 1) {
            changeForServer('search', true);
        } else {
            currentPage.value = 1; // changeForServer method call when currentPage change
        }
    } else {
        currentPage.value = 1;
        filterRows();
        emit('searchChange', currentSearch.value);
    }
};

watch(
    () => props.search,
    () => {
        currentSearch.value = props.search;
        changeSearch();
    }
);

// Enhanced error handling for critical functions
const safeCellValue = (item: DataRow | null | undefined, field: string | undefined): any => {
    if (!item || !field) return null;

    try {
        return field.split('.').reduce((obj, key) => {
            if (obj == null) return null;
            return obj[key];
        }, item);
    } catch (error) {
        console.warn(`Error accessing field '${field}':`, error);
        return null;
    }
};

const safeDateFormat = (date: Date | string | number | null | undefined): string => {
    if (!date) return '';

    try {
        const dt = new Date(date);
        if (isNaN(dt.getTime())) {
            console.warn('Invalid date provided to dateFormat:', date);
            return '';
        }

        const day = dt.getDate();
        const month = dt.getMonth() + 1;
        const year = dt.getFullYear();

        return `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`;
    } catch (error) {
        console.warn('Error formatting date:', error);
        return '';
    }
};

const safeParseFloat = (value: any): number | null => {
    if (value == null || value === '') return null;

    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
};

// Type-safe utility functions
const createTypeSafeColumn = <T extends BaseDataRow>(
    config: StrictColDef<T>
): StrictColDef<T> => {
    return {
        type: 'string' as ColumnType,
        filter: true,
        search: true,
        sort: true,
        html: false,
        hide: false,
        isUnique: false,
        ...config,
    };
};

const validateColumnType = (type: string): ColumnType => {
    if (isValidColumnType(type)) {
        return type;
    }
    console.warn(`Invalid column type '${type}', defaulting to 'string'`);
    return 'string';
};

const validateFilterCondition = (condition: string): FilterCondition => {
    if (isValidFilterCondition(condition)) {
        return condition;
    }
    console.warn(`Invalid filter condition '${condition}', defaulting to 'contain'`);
    return 'contain';
};

const validateSortDirection = (direction: string): SortDirection => {
    if (isValidSortDirection(direction)) {
        return direction;
    }
    console.warn(`Invalid sort direction '${direction}', defaulting to 'asc'`);
    return 'asc';
};

// Type-safe column value extractor
const extractColumnValue = <T extends BaseDataRow>(
    item: T,
    field: keyof T | string
): PrimitiveValue => {
    try {
        if (typeof field === 'string') {
            return safeCellValue(item, field) as PrimitiveValue;
        } else {
            return item[field] as PrimitiveValue;
        }
    } catch {
        return null;
    }
};

//row click
const rowClick = (item: DataRow, index: number): void => {
    clickCount.value++;

    if (clickCount.value === 1) {
        timer.value = setTimeout(() => {
            clickCount.value = 0;

            if (props.selectRowOnClick) {
                if (isRowSelected(index)) {
                    unselectRow(index);
                } else {
                    selectRow(index);
                }

                checkboxChange(selected.value);
            }
            emit('rowClick', item);
        }, delay.value);
    } else if (clickCount.value === 2) {
        clearTimeout(timer.value);
        clickCount.value = 0;
        emit('rowDBClick', item);
    }
};

// emit change event for server side pagination
const changeForServer = (changeType: string, isResetPage = false) => {
    if (props.isServerMode) {
        setDefaultCondition();

        const res = {
            current_page: isResetPage ? 1 : currentPage.value,
            pagesize: currentPageSize.value,
            offset: (currentPage.value - 1) * <number>currentPageSize.value,
            sort_column: currentSortColumn.value,
            sort_direction: currentSortDirection.value,
            search: currentSearch.value,
            column_filters: props.columns,
            change_type: changeType,
        };
        emit('change', res);
    }
};

// set default conditions when values exists and condition empty
const setDefaultCondition = () => {
    for (let i = 0; i < props.columns.length; i++) {
        let d = props.columns[i];

        if (d.filter && ((d.value !== undefined && d.value !== null && d.value !== '') || d.condition === 'is_null' || d.condition === 'is_not_null')) {
            if (d.type === 'string' && d.value && !d.condition) {
                d.condition = 'contain';
            }
            if (d.type === 'number' && d.value && !d.condition) {
                d.condition = 'equal';
            }
            if (d.type === 'date' && d.value && !d.condition) {
                d.condition = 'equal';
            }
        }
    }
};

// methods
const reset = () => {
    selectAll(false);
    for (let i = 0; i < props.columns.length; i++) {
        props.columns[i] = oldColumns[i];
    }
    currentSearch.value = '';
    currentPageSize.value = oldPageSize;
    currentSortColumn.value = oldSortColumn;
    currentSortDirection.value = oldSortDirection;

    if (props.isServerMode) {
        // for server side paginations
        if (currentPage.value === 1) {
            changeForServer('reset', true);
        } else {
            currentPage.value = 1; // changeForServer method call when currentPage change
        }
    } else {
        currentPage.value = 1;
        filterRows();
    }
};
const getSelectedRows = () => {
    const rows = filterItems.value.filter((d, i) => selected.value.includes(uniqueKey.value ? d[uniqueKey.value as never] : i));
    return rows;
};
const getColumnFilters = () => {
    return props.columns;
};
const clearSelectedRows = () => {
    selected.value = [];
};
const selectRow = (index: number) => {
    if (!isRowSelected(index)) {
        const rows = filterItems.value.find((d, i) => i === index);
        selected.value.push(uniqueKey.value ? rows[uniqueKey.value as never] : index);
    }
};
const unselectRow = (index: number) => {
    if (isRowSelected(index)) {
        const rows = filterItems.value.find((d, i) => i === index);
        selected.value = selected.value.filter((d) => d !== (uniqueKey.value ? rows[uniqueKey.value as never] : index));
    }
};
const isRowSelected = (index: number) => {
    const rows = filterItems.value.find((d, i) => i === index);

    if (rows) {
        return selected.value.includes(uniqueKey.value ? rows[uniqueKey.value as never] : index);
    }
    return false;
};
const getVisibleRows = () => {
    const rows = filterRows();
    return rows;
};
</script>
