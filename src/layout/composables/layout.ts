import { computed, reactive, type ComputedRef } from "vue";

type MenuMode = "static" | "overlay";

type ThemePreset = "Aura" | "Lara" | "Nora" | (string & Record<never, never>);

interface LayoutConfig {
  preset: ThemePreset;
  primary: string;
  surface: string | null;
  darkTheme: boolean;
  menuMode: MenuMode;
}

interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
  activeMenuItem: string | null;
}

type MenuItem = { value?: string | null } | string | null;

// 設定預設主題顏色
const layoutConfig = reactive<LayoutConfig>({
  preset: "Aura",
  primary: "blue",
  surface: "gray",
  darkTheme: false,
  menuMode: "static",
});

const layoutState = reactive<LayoutState>({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: null,
});

export function useLayout() {
  const executeDarkModeToggle = () => {
    layoutConfig.darkTheme = !layoutConfig.darkTheme;
    document.documentElement.classList.toggle("app-dark");
  };

  const setActiveMenuItem = (item: MenuItem) => {
    if (typeof item === "object" && item !== null && "value" in item) {
      layoutState.activeMenuItem = item.value ?? null;
    } else if (typeof item === "string") {
      layoutState.activeMenuItem = item;
    } else {
      layoutState.activeMenuItem = null;
    }
  };

  const toggleDarkMode = () => {
    if (!document.startViewTransition) {
      executeDarkModeToggle();

      return;
    }

    document.startViewTransition(() => executeDarkModeToggle());
  };

  const toggleMenu = () => {
    if (layoutConfig.menuMode === "overlay") {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive =
        !layoutState.staticMenuDesktopInactive;
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
    }
  };

  const isSidebarActive: ComputedRef<boolean> = computed(
    () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive
  );

  const isDarkTheme: ComputedRef<boolean> = computed(
    () => layoutConfig.darkTheme
  );

  const getPrimary: ComputedRef<string> = computed(() => layoutConfig.primary);

  const getSurface: ComputedRef<string | null> = computed(
    () => layoutConfig.surface
  );

  return {
    layoutConfig,
    layoutState,
    toggleMenu,
    isSidebarActive,
    isDarkTheme,
    getPrimary,
    getSurface,
    setActiveMenuItem,
    toggleDarkMode,
  } as const;
}
