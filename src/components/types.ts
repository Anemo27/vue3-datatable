// Type definitions for Vue3 Datatable
export type ColumnType = 'string' | 'number' | 'date' | 'bool';
export type FilterCondition = 'contain' | 'not_contain' | 'equal' | 'not_equal' | 'greater_than' | 'greater_than_equal' | 'less_than' | 'less_than_equal' | 'start_with' | 'end_with' | 'is_null' | 'is_not_null';
export type SortDirection = 'asc' | 'desc';
export type DataRow = Record<string, any>;
export type PrimitiveValue = string | number | boolean | Date | null | undefined;

export interface BaseDataRow {
    [key: string]: PrimitiveValue | object;
}

export interface colDef<T = DataRow> {
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

export interface Props {
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