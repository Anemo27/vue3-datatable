<!-- Dark Theme Usage Examples -->

## Cara Menggunakan Dark Theme

### 1. Menggunakan Class-based Dark Mode (Direkomendasikan)

Tambahkan class `dark` pada elemen root aplikasi Anda:

```html
<!-- index.html atau main container -->
<html class="dark">
  <!-- atau -->
  <body class="dark">
    <div id="app"></div>
  </body>
</html>
```

### 2. Toggle Dark Mode dengan JavaScript

```javascript
// Toggle dark mode
const html = document.documentElement;
html.classList.toggle('dark');

// Check current mode
const isDark = html.classList.contains('dark');
```

### 3. Menggunakan System Preference

```javascript
// Detect system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('dark', prefersDark);

// Listen for changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  document.documentElement.classList.toggle('dark', e.matches);
});
```

### 4. Menggunakan Vue 3 Dark Mode

```vue
<template>
  <div :class="{ dark: isDark }">
    <Vue3Datatable
      :rows="data"
      :columns="columns"
      :stickyHeader="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
}
</script>
```

### 5. Menggunakan darkMode Prop (Opsional)

```vue
<template>
  <Vue3Datatable
    :rows="data"
    :columns="columns"
    :darkMode="true"
    :stickyHeader="true"
  />
</template>
```

### Fitur Dark Theme yang Tersedia:

✅ **Header & Footer**: Background gelap dengan text terang
✅ **Table Body**: Background gelap untuk rows
✅ **Checkbox**: Styling khusus untuk dark mode
✅ **Pagination**: Button dengan dark theme
✅ **Filter Dropdown**: Background dan text yang sesuai
✅ **Loading States**: Shimmer effect yang visible di dark mode
✅ **Sticky Elements**: Header/footer sticky dengan dark styling
✅ **Input Fields**: Form controls dengan dark theme

### CSS Classes yang Digunakan:

```css
/* Light mode (default) */
.bg-white, .text-black, .border-gray-300

/* Dark mode variants */
.dark:bg-gray-800, .dark:text-white, .dark:border-gray-600
```

Dark theme sekarang sepenuhnya didukung dan akan bekerja secara otomatis ketika class `dark` ditambahkan pada elemen root aplikasi! 🌙