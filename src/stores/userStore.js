import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: "",
  }),
  actions: {},
  persist: {
    enabled: true,
    strategies: [
      {
        key: "my_user_store",
        storage: localStorage,
        paths: ["user"],
      },
    ],
  },
});
