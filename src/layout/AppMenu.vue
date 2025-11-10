<script setup lang="ts">
import AppMenuItem from "./AppMenuItem.vue";
import { ref } from "vue";
import { HomeRoutes, UiComponentsRoutes, OtherPagesRoutes } from "@/router";
import { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

type MenuItem = {
  label?: string;
  icon?: string;
  to?: string;
  class?: string;
  separator?: boolean;
  items?: MenuItem[];
};

// 將路由轉換為選單項目
const routesToMenu = (routes: RouteRecordRaw[]): MenuItem[] => {
  const userPermissions = authStore.user?.permissions as string[] | undefined;

  return routes
    .filter((route) => {
      const routePermission = route.meta?.permission as string | undefined;

      if (!routePermission) {
        return true;
      }

      if (!userPermissions || userPermissions.length === 0) {
        return false;
      }

      return userPermissions.includes(routePermission);
    })
    .map((route) => ({
      label: route.meta?.label as string | undefined,
      icon: route.meta?.icon as string | undefined,
      to: route.path,
      class: route.meta?.class as string | undefined,
      items: route.children ? routesToMenu(route.children) : undefined,
    }));
};

const model = ref<MenuItem[]>([
  {
    label: "首頁",
    items: [...routesToMenu(HomeRoutes)],
  },
  {
    label: "UI 組件範例",
    items: [...routesToMenu(UiComponentsRoutes)],
  },
  {
    label: "其他頁面",
    icon: "pi pi-fw pi-briefcase",
    to: "/pages",
    items: [...routesToMenu(OtherPagesRoutes)],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
