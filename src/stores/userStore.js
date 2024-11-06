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
    is_gameFirst: "",
  }),
  actions: {
    setOpenSelect(id) {
      this.openSelectId = id;
    },
    closeAll() {
      this.openSelectId = null;
    },
    async getMemberInfo() {
      const router = useRouter();
      const route = useRoute();
      try {
        const member = await get_member_info();
        if (member.status == "success") {
          console.log("member正確");
          this.user = member.payload.data;
        } else if (member.status == "error") {
          console.log("member錯誤");
        }

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
    is_gameFirst: true,
    strategies: [
      {
        key: "my_user_store",
        storage: localStorage,
        paths: ["user"],
      },
    ],
  },
});
