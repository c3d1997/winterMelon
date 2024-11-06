import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { defineStore } from "pinia";
import { get_member_info } from "@/utils/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: "",
    loveType: "",
    openSelectId: null,
    is_example: "",
  }),
  actions: {
    setOpenSelect(id) {
      this.openSelectId = id;
    },
    closeAll() {
      this.openSelectId = null;
    },
    async getMemberInfo() {
      try {
        const member = await get_member_info();
        this.user = member.payload.data;
        return member;
      } catch (error) {
        console.error("獲取使用者資料失敗:", error);
        throw error;
      }
    },
  },
  persist: {
    enabled: true,
    loveType: true,
    is_example: true,
    strategies: [
      {
        key: "my_user_store",
        storage: localStorage,
        paths: ["user"],
      },
    ],
  },
});
