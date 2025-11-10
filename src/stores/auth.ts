import { defineStore } from "pinia";
import { UserInfo } from "@/models/authModel";

const USER_KEY = "user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as UserInfo | null,
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
  },
  actions: {
    /** 存取 user 資訊 */
    async setUser(user: UserInfo) {
      this.user = user;
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
    /** 獲取 user 資訊 */
    async getUser() {
      const user = localStorage.getItem(USER_KEY);
      if (user) {
        this.user = JSON.parse(user);
      }
      return this.user;
    },
    /** 清除 user 資訊 */
    async clearUser() {
      this.user = null;
      localStorage.removeItem(USER_KEY);
    },
  },
});
