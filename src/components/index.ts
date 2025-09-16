// Main entry point for Vue3 Datatable
import Vue3Datatable from './custom-table.vue';
export default Vue3Datatable;

// Export all types
export type {
    ColumnType,
    FilterCondition,
    SortDirection,
    DataRow,
    PrimitiveValue,
    BaseDataRow,
    colDef,
    StrictColDef,
    Props
} from './types';
