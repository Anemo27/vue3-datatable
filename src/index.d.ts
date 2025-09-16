// Type definitions for @anemo27/vue3-datatable
export * from './custom-table.vue';

// Re-export main component
import Vue3Datatable from './custom-table.vue';
export default Vue3Datatable;

// Export all types
export type {
    colDef,
    StrictColDef,
    Props,
    ColumnType,
    FilterCondition,
    SortDirection,
    DataRow,
    PrimitiveValue,
    BaseDataRow
} from './custom-table.vue';