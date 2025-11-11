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
      <div class="text-xl font-semibold">Notifications</div>
      <div>
        <Button
          icon="pi pi-ellipsis-v"
          class="p-button-text p-button-plain p-button-rounded"
          @click="$refs.menu.toggle($event)"
        ></Button>
        <Menu ref="menu" popup :model="items" class="!min-w-40"></Menu>
      </div>
    </div>

    <span class="mb-4 block font-medium text-muted-color">TODAY</span>
    <ul class="mx-0 mb-6 mt-0 list-none p-0">
      <li class="flex items-center border-b py-2 border-surface">
        <div
          class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-400/10"
        >
          <i class="pi pi-dollar !text-xl text-blue-500"></i>
        </div>
        <span class="leading-normal text-surface-900 dark:text-surface-0"
          >Richard Jones
          <span class="text-surface-700 dark:text-surface-100"
            >has purchased a blue t-shirt for
            <span class="font-bold text-primary">$79.00</span></span
          >
        </span>
      </li>
      <li class="flex items-center py-2">
        <div
          class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-400/10"
        >
          <i class="pi pi-download !text-xl text-orange-500"></i>
        </div>
        <span class="leading-normal text-surface-700 dark:text-surface-100"
          >Your request for withdrawal of
          <span class="font-bold text-primary">$2500.00</span> has been
          initiated.</span
        >
      </li>
    </ul>

    <span class="mb-4 block font-medium text-muted-color">YESTERDAY</span>
    <ul class="m-0 mb-6 list-none p-0">
      <li class="flex items-center border-b py-2 border-surface">
        <div
          class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-400/10"
        >
          <i class="pi pi-dollar !text-xl text-blue-500"></i>
        </div>
        <span class="leading-normal text-surface-900 dark:text-surface-0"
          >Keyser Wick
          <span class="text-surface-700 dark:text-surface-100"
            >has purchased a black jacket for
            <span class="font-bold text-primary">$59.00</span></span
          >
        </span>
      </li>
      <li class="flex items-center border-b py-2 border-surface">
        <div
          class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-400/10"
        >
          <i class="pi pi-question !text-xl text-pink-500"></i>
        </div>
        <span class="leading-normal text-surface-900 dark:text-surface-0"
          >Jane Davis
          <span class="text-surface-700 dark:text-surface-100"
            >has posted a new questions about your product.</span
          >
        </span>
      </li>
    </ul>
    <span class="mb-4 block font-medium text-muted-color">LAST WEEK</span>
    <ul class="m-0 list-none p-0">
      <li class="flex items-center border-b py-2 border-surface">
        <div
          class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-400/10"
        >
          <i class="pi pi-arrow-up !text-xl text-green-500"></i>
        </div>
        <span class="leading-normal text-surface-900 dark:text-surface-0"
          >Your revenue has increased by
          <span class="font-bold text-primary">%25</span>.</span
        >
      </li>
      <li class="flex items-center border-b py-2 border-surface">
        <div
          class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-400/10"
        >
          <i class="pi pi-heart !text-xl text-purple-500"></i>
        </div>
        <span class="leading-normal text-surface-900 dark:text-surface-0"
          ><span class="font-bold text-primary">12</span> users have added your
          products to their wishlist.</span
        >
      </li>
    </ul>
  </div>
</template>
