<script setup>
import { ref } from "vue";

const menu = ref(null);

const items = ref([
  { label: "Add New", icon: "pi pi-fw pi-plus" },
  { label: "Remove", icon: "pi pi-fw pi-trash" },
]);
</script>

<template>
  <div class="card">
    <div class="mb-6 flex items-center justify-between">
      <div class="text-xl font-semibold">Best Selling Products</div>
      <div>
        <Button
          icon="pi pi-ellipsis-v"
          class="p-button-text p-button-plain p-button-rounded"
          @click="$refs.menu.toggle($event)"
        ></Button>
        <Menu ref="menu" popup :model="items" class="!min-w-40"></Menu>
      </div>
    </div>
    <ul class="m-0 list-none p-0">
      <li
        class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <span
            class="mb-1 mr-2 font-medium text-surface-900 md:mb-0 dark:text-surface-0"
            >Space T-Shirt</span
          >
          <div class="mt-1 text-muted-color">Clothing</div>
        </div>
        <div class="mt-2 flex items-center md:mt-0">
          <div
            class="w-40 overflow-hidden bg-surface-300 rounded-border lg:w-24 dark:bg-surface-500"
            style="height: 8px"
          >
            <div class="h-full bg-orange-500" style="width: 50%"></div>
          </div>
          <span class="ml-4 font-medium text-orange-500">%50</span>
        </div>
      </li>
      <li
        class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <span
            class="mb-1 mr-2 font-medium text-surface-900 md:mb-0 dark:text-surface-0"
            >Portal Sticker</span
          >
          <div class="mt-1 text-muted-color">Accessories</div>
        </div>
        <div class="ml-0 mt-2 flex items-center md:ml-20 md:mt-0">
          <div
            class="w-40 overflow-hidden bg-surface-300 rounded-border lg:w-24 dark:bg-surface-500"
            style="height: 8px"
          >
            <div class="h-full bg-cyan-500" style="width: 16%"></div>
          </div>
          <span class="ml-4 font-medium text-cyan-500">%16</span>
        </div>
      </li>
      <li
        class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <span
            class="mb-1 mr-2 font-medium text-surface-900 md:mb-0 dark:text-surface-0"
            >Supernova Sticker</span
          >
          <div class="mt-1 text-muted-color">Accessories</div>
        </div>
        <div class="ml-0 mt-2 flex items-center md:ml-20 md:mt-0">
          <div
            class="w-40 overflow-hidden bg-surface-300 rounded-border lg:w-24 dark:bg-surface-500"
            style="height: 8px"
          >
            <div class="h-full bg-pink-500" style="width: 67%"></div>
          </div>
          <span class="ml-4 font-medium text-pink-500">%67</span>
        </div>
      </li>
      <li
        class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <span
            class="mb-1 mr-2 font-medium text-surface-900 md:mb-0 dark:text-surface-0"
            >Wonders Notebook</span
          >
          <div class="mt-1 text-muted-color">Office</div>
        </div>
        <div class="ml-0 mt-2 flex items-center md:ml-20 md:mt-0">
          <div
            class="w-40 overflow-hidden bg-surface-300 rounded-border lg:w-24 dark:bg-surface-500"
            style="height: 8px"
          >
            <div class="h-full bg-green-500" style="width: 35%"></div>
          </div>
          <span class="ml-4 font-medium text-primary">%35</span>
        </div>
      </li>
      <li
        class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <span
            class="mb-1 mr-2 font-medium text-surface-900 md:mb-0 dark:text-surface-0"
            >Mat Black Case</span
          >
          <div class="mt-1 text-muted-color">Accessories</div>
        </div>
        <div class="ml-0 mt-2 flex items-center md:ml-20 md:mt-0">
          <div
            class="w-40 overflow-hidden bg-surface-300 rounded-border lg:w-24 dark:bg-surface-500"
            style="height: 8px"
          >
            <div class="h-full bg-purple-500" style="width: 75%"></div>
          </div>
          <span class="ml-4 font-medium text-purple-500">%75</span>
        </div>
      </li>
      <li
        class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <span
            class="mb-1 mr-2 font-medium text-surface-900 md:mb-0 dark:text-surface-0"
            >Robots T-Shirt</span
          >
          <div class="mt-1 text-muted-color">Clothing</div>
        </div>
        <div class="ml-0 mt-2 flex items-center md:ml-20 md:mt-0">
          <div
            class="w-40 overflow-hidden bg-surface-300 rounded-border lg:w-24 dark:bg-surface-500"
            style="height: 8px"
          >
            <div class="h-full bg-teal-500" style="width: 40%"></div>
          </div>
          <span class="ml-4 font-medium text-teal-500">%40</span>
        </div>
      </li>
    </ul>
  </div>
</template>
