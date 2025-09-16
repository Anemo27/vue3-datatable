# @anemo27/vue3-datatable

## Example

[Document & Demos](https://vue3-datatable-document.vercel.app)

## Install

#### NPM

```bash
npm install @anemo27/vue3-datatable --save
```

#### Yarn

```bash
yarn add @anemo27/vue3-datatable
```

#### Bower

```bash
bower install @anemo27/vue3-datatable --save
```

## Usage

```html
<template>
    <vue3-datatable :rows="rows" :columns="cols"> </vue3-datatable>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import Vue3Datatable from "@anemo27/vue3-datatable";
    import "@anemo27/vue3-datatable/dist/style.css";

    const cols = ref([
      { field: "id", title: "ID", width: "90px", filter: false },
      { field: "name", title: "Name" },
      { field: "username", title: "Username" },
      { field: "email", title: "Email" },
      { field: "phone", title: "Phone" },
      { field: "date", title: "Date", type: "date" },
      { field: "active", title: "Active", type: "bool" },
      { field: "age", title: "Age", type: "number" },
      { field: "address.city", title: "Address" },
      { field: "company.name", title: "Company" },
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
      .......
    ]);
</script>
```

## Class Usage

You can use any CSS classes (including Tailwind CSS) to customize the datatable component using the `class` prop:

```html
<template>
    <!-- Height control -->
    <vue3-datatable :rows="rows" :columns="cols" class="h-96"> </vue3-datatable>
    
    <!-- Styling -->
    <vue3-datatable :rows="rows" :columns="cols" class="border shadow-lg rounded-lg"> </vue3-datatable>
    
    <!-- Multiple classes -->
    <vue3-datatable :rows="rows" :columns="cols" class="h-80 bg-white border border-gray-200 rounded-lg shadow-md"> </vue3-datatable>
    
    <!-- Responsive design -->
    <vue3-datatable :rows="rows" :columns="cols" class="h-64 md:h-96 lg:h-screen"> </vue3-datatable>
</template>
```

**Layout Structure:**
The component uses a flexbox layout (`flex flex-col`) to ensure proper containment:
- **Table container**: Uses `flex-1` to take available space
- **Pagination**: Uses `flex-shrink-0` to maintain its size
- This prevents pagination from overflowing the parent container when height is constrained

**Common Tailwind CSS classes:**
- **Height**: `h-64`, `h-80`, `h-96`, `h-screen`, `max-h-screen`
- **Background**: `bg-white`, `bg-gray-50`, `bg-blue-50`, `bg-gradient-to-br from-white to-gray-50`
- **Border**: `border`, `border-gray-200`, `border-2`, `rounded-lg`, `rounded-xl`
- **Shadow**: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`
- **Spacing**: `p-4`, `m-2`, `space-y-4`
- **Colors**: `text-white`, `bg-gray-900`, `border-blue-200`
- **Responsive**: `md:h-96`, `lg:h-screen`, `sm:shadow-md`

## Props

| Props                   | Type                    | Default                             | Description                                                                                                                                                                                           |
| ----------------------- | :---------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **columns** (required)  | array<colDef>           | []                                  | table columns                                                                                                                                                                                         |
| **rows** (required)     | array<any>              | []                                  | table rows                                                                                                                                                                                            |
| **isServerMode**        | boolean                 | false                               | set **_true_** if you need server side pagination.                                                                                                                                                    |
| **totalRows**           | number                  | 0                                   | total number of rows. **_totalRows_** required when **_isServerMode_** is true                                                                                                                        |
| **skin**                | string                  | "bh-table-striped bh-table-hover"   | custom class for skin ('**_bh-table-striped_**' - for stripe row, '**_bh-table-hover_**' - for hover row, '**_bh-table-bordered_**' - for bordered row, '**_bh-table-compact_**' - for compact table) |
| **loading**             | boolean                 | false                               | enable loader                                                                                                                                                                                         |
| **hasCheckbox**         | boolean                 | false                               | enable checkbox                                                                                                                                                                                       |
| **search**              | string                  | ""                                  | enable global search                                                                                                                                                                                  |
| **page**                | number                  | 1                                   | current page                                                                                                                                                                                          |
| **pageSize**            | number                  | 10                                  | number of rows per page                                                                                                                                                                               |
| **pageSizeOptions**     | array<number>           | [10, 20, 30, 50, 100]               | pagesize options                                                                                                                                                                                      |
| **showPageSize**        | boolean                 | true                                | enable pagesize options                                                                                                                                                                               |
| **rowClass**            | array<string>, function | ""                                  | custom row class                                                                                                                                                                                      |
| **cellClass**           | array<string>, function | ""                                  | custom cell class                                                                                                                                                                                     |
| **sortable**            | boolean                 | true                                | enable sorting                                                                                                                                                                                        |
| **sortColumn**          | string                  | "id"                                | name of sort column                                                                                                                                                                                   |
| **sortDirection**       | string                  | "asc"                               | sort direction (asc or desc)                                                                                                                                                                          |
| **columnFilter**        | boolean                 | false                               | enable individual column filter                                                                                                                                                                       |
| **columnFilterLang**    | records<string,string>  | null                                | columns filters translation (**ex**: {no_filter: 'Aucun', contain: 'Contiens', not_contain: 'Ne contiens pas', equal: 'Egale', not_equal: 'Différent', start_with: 'Commence par', end_with: 'Termine par', greater_than: 'Supérieur à', greater_than_equal: 'Sup. ou égale à', less_than: 'Inférieur à', less_than_equal: 'Inf. ou égale à', is_null: 'Est null', is_not_null: 'Non null'} )      |
| **pagination**          | boolean                 | true                                | enable pagination                                                                                                                                                                                     |
| **showNumbers**         | boolean                 | true                                | enable numbers pagination                                                                                                                                                                             |
| **showNumbersCount**    | number                  | 5                                   | show numbers of count in pagination                                                                                                                                                                   |
| **showFirstPage**       | boolean                 | true                                | enable first page in pagination                                                                                                                                                                       |
| **showLastPage**        | boolean                 | true                                | enable last page in pagination                                                                                                                                                                        |
| **firstArrow**          | string                  | default arrow                       | custom first page arrow                                                                                                                                                                               |
| **lastArrow**           | string                  | default arrow                       | custom last page arrow                                                                                                                                                                                |
| **previousArrow**       | string                  | default arrow                       | custom previous page arrow                                                                                                                                                                            |
| **nextArrow**           | string                  | default arrow                       | custom next page arrow                                                                                                                                                                                |
| **paginationInfo**      | string                  | "Showing {0} to {1} of {2} entries" | custom pagination info                                                                                                                                                                                |
| **noDataContent**       | string                  | No data available                   | custom no data message                                                                                                                                                                                |
| **stickyHeader**        | boolean                 | false                               | enable fixed header                                                                                                                                                                                   |
| **height**              | string                  | 450px                               | only will be used when stickyHeader enabled                                                                                                                                                           |
| **class**               | string                  | ""                                  | Custom CSS classes for the datatable wrapper. Supports Tailwind CSS classes like "h-96", "border", "shadow-lg", etc. The component uses flexbox layout to ensure proper containment of table and pagination.                                         |
| **stickyFirstColumn**   | boolean                 | false                               | enable fixed first column                                                                                                                                                                             |
| **cloneHeaderInFooter** | boolean                 | false                               | enable clone header in footer                                                                                                                                                                         |
| **selectRowOnClick**    | boolean                 | false                               | enable to select row(checkbox) on row click                                                                                                                                                           |

## Columns options

| Props            | Type             | Default   | Description                                           |
| ---------------- | :--------------- | --------- | ----------------------------------------------------- |
| **isUnique**     | boolean          | false     | db column is primary key or not                       |
| **field**        | string           | ""        | db column name                                        |
| **title**        | string           | ""        | display column name                                   |
| **value**        | string           | ""        | filter value if filter enabled                        |
| **condition**    | string           | "contain" | default condition for column filter if filter enabled |
| **type**         | string           | ""        | column type (string, date, number, bool)              |
| **width**        | string           | ""        | custom width of column                                |
| **minWidth**     | string           | ""        | custom minimum width of column                        |
| **maxWidth**     | string           | ""        | custom maximum width of column                        |
| **hide**         | boolean          | false     | show/hide column                                      |
| **filter**       | boolean          | true      | enable column filter                                  |
| **search**       | boolean          | true      | enabled global search                                 |
| **sort**         | boolean          | true      | enable sorting                                        |
| **cellRenderer** | function, string | true      | custom cell rendering                                 |
| **headerClass**  | string           | ""        | custom header cell class                              |
| **cellClass**    | string           | ""        | custom cell class                                     |

## Events

| Name               | Description                                   |
| ------------------ | --------------------------------------------- |
| **sortChange**     | will trigger when sorting changed             |
| **searchChange**   | will trigger when search changed              |
| **pageChange**     | will trigger when page changed                |
| **pageSizeChange** | will trigger when pagesize changed            |
| **rowSelect**      | will trigger when row selected using checkbox |
| **filterChange**   | will trigger when column filter changed       |
| **rowClick**       | will trigger when row clicked                 |
| **rowDBClick**     | will trigger when row double clicked          |

## Methods

| Name                     | Description                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| **reset**                | will reset all options like selected rows, filter, search, currennt page etc |
| **getFilteredRows**      | will returns all filtered rows                                               |
| **getVisibleRows**       | will returns all visible rows                                                |
| **getColumnFilters**     | will return all column filters                                               |
| **getSelectedRows**      | will returns all selected rows                                               |
| **clearSelectedRows**    | will unselect all selected rows                                              |
| **selectRow(index)**     | will select row with the given index (non-existent row will be ignored)      |
| **unselectRow(index)**   | will unselect row with the given index (non-existent row will be ignored)    |
| **isRowSelected(index)** | will return true if the row with given index is selected                     |

<br/>

## Changelogs

[Changelogs](https://vue3-datatable-document.vercel.app/changelog)

<br/>

## License

**_@anemo27/vue3-datatable_** is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

<br/>

## **Our other plugins**

<br/>

### Angular Datatable - [**@anemo27/ng-datatable**](https://www.npmjs.com/package/@anemo27/ng-datatable)

<br/>

## Support

<a target="_blank" href="https://www.buymeacoffee.com/anemo27">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="60">
</a>
