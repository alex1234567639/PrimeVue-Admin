import AppLayout from "@/layout/AppLayout.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export const HomeRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    meta: {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
    },
    component: () => import("@/views/Dashboard.vue"),
  },
];

export const UiComponentsRoutes: Array<RouteRecordRaw> = [
  {
    path: "/uikit/formlayout",
    name: "formlayout",
    meta: {
      label: "Form Layout",
      icon: "pi pi-fw pi-id-card",
      permission: "formlayout",
    },
    component: () => import("@/views/uikit/FormLayout.vue"),
  },
  {
    path: "/uikit/input",
    name: "input",
    meta: {
      label: "Input",
      icon: "pi pi-fw pi-check-square",
      permission: "input",
    },
    component: () => import("@/views/uikit/InputDoc.vue"),
  },
  {
    path: "/uikit/button",
    name: "button",
    meta: {
      label: "Button",
      icon: "pi pi-fw pi-mobile",
      class: "rotated-icon",
    },
    component: () => import("@/views/uikit/ButtonDoc.vue"),
  },
  {
    path: "/uikit/table",
    name: "table",
    meta: {
      label: "Table",
      icon: "pi pi-fw pi-table",
    },
    component: () => import("@/views/uikit/TableDoc.vue"),
  },
  {
    path: "/uikit/list",
    name: "list",
    meta: {
      label: "List",
      icon: "pi pi-fw pi-list",
    },
    component: () => import("@/views/uikit/ListDoc.vue"),
  },
  {
    path: "/uikit/tree",
    name: "tree",
    meta: {
      label: "Tree",
      icon: "pi pi-fw pi-share-alt",
    },
    component: () => import("@/views/uikit/TreeDoc.vue"),
  },
  {
    path: "/uikit/panel",
    name: "panel",
    meta: {
      label: "Panel",
      icon: "pi pi-fw pi-tablet",
    },
    component: () => import("@/views/uikit/PanelsDoc.vue"),
  },

  {
    path: "/uikit/overlay",
    name: "overlay",
    meta: {
      label: "Overlay",
      icon: "pi pi-fw pi-clone",
    },
    component: () => import("@/views/uikit/OverlayDoc.vue"),
  },
  {
    path: "/uikit/media",
    name: "media",
    meta: {
      label: "Media",
      icon: "pi pi-fw pi-image",
    },
    component: () => import("@/views/uikit/MediaDoc.vue"),
  },
  {
    path: "/uikit/message",
    name: "message",
    meta: {
      label: "Message",
      icon: "pi pi-fw pi-comment",
    },
    component: () => import("@/views/uikit/MessagesDoc.vue"),
  },
  {
    path: "/uikit/file",
    name: "file",
    meta: {
      label: "File",
      icon: "pi pi-fw pi-file",
    },
    component: () => import("@/views/uikit/FileDoc.vue"),
  },
  {
    path: "/uikit/menu",
    name: "menu",
    meta: {
      label: "Menu",
      icon: "pi pi-fw pi-bars",
    },
    component: () => import("@/views/uikit/MenuDoc.vue"),
  },
  {
    path: "/uikit/charts",
    name: "charts",
    meta: {
      label: "Charts",
      icon: "pi pi-fw pi-chart-bar",
    },
    component: () => import("@/views/uikit/ChartDoc.vue"),
  },
  {
    path: "/uikit/misc",
    name: "misc",
    meta: {
      label: "Misc",
      icon: "pi pi-fw pi-circle",
    },
    component: () => import("@/views/uikit/MiscDoc.vue"),
  },
  {
    path: "/uikit/timeline",
    name: "timeline",
    meta: {
      label: "Timeline",
      icon: "pi pi-fw pi-calendar",
    },
    component: () => import("@/views/uikit/TimelineDoc.vue"),
  },
];

export const OtherPagesRoutes: Array<RouteRecordRaw> = [
  {
    path: "/auth",
    name: "auth",
    meta: {
      label: "Auth",
      icon: "pi pi-fw pi-user",
    },
    children: [
      {
        path: "/auth/error",
        name: "error",
        meta: {
          label: "Error",
          icon: "pi pi-fw pi-times-circle",
        },
        component: () => import("@/views/pages/auth/Error.vue"),
      },
      {
        path: "/auth/access",
        name: "accessDenied",
        meta: {
          label: "Access Denied",
          icon: "pi pi-fw pi-lock",
        },
        component: () => import("@/views/pages/auth/Access.vue"),
      },
    ],
  },
  {
    path: "/pages/notfound",
    name: "notfound",
    meta: {
      label: "Not Found",
      icon: "pi pi-fw pi-exclamation-circle",
    },
    component: () => import("@/views/pages/NotFound.vue"),
  },
];

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: AppLayout,
    children: [...HomeRoutes, ...UiComponentsRoutes],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/pages/auth/Login.vue"),
  },
  ...OtherPagesRoutes,
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/pages/NotFound.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

// 路由守衛
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const permission = to.meta.permissions as string;
  const user = await authStore.getUser();

  // 檢查是否登入
  if (!authStore.isLoggedIn && to.name !== "login") {
    next({ name: "login" });
    return;
  }

  // 若已登入且前往login頁面，則跳轉到首頁
  if (authStore.isLoggedIn && to.name === "login") {
    next({ name: "dashboard" });
    return;
  }

  // 如果路由有權限限制，且使用者沒有對應權限，則跳轉到accessDenied頁面
  if (to.meta.permissions && user && !user?.permissions.includes(permission)) {
    next({ name: "accessDenied" });
  } else {
    next();
  }
});

export default router;
