import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useRouter, useRoute } from "vue-router";
import { getCookie } from "@/utils/api";

const routes = [
  {
    path: "/registration",
    component: () => import("@/views/pages/registration/RegistrationView.vue"),
    meta: { keep_live: false },
    children: [
      {
        path: "",
        name: "registration",
        component: () =>
          import("@/views/pages/registration/RegistrationPhone.vue"),
      },
      {
        path: "/registration/mbti",
        name: "mbti",
        component: () =>
          import("@/views/pages/registration/RegistrationMbti.vue"),
      },
    ],
  },
  {
    path: "/game",
    component: () => import("@/views/pages/game/GameView.vue"),
    meta: { keep_live: false },
    children: [
      {
        path: "",
        name: "game",
        component: () => import("@/views/pages/game/GamePlay.vue"),
      },
      {
        path: "melonRun",
        name: "melonRun",
        component: () => import("@/views/pages/game/GameRun.vue"),
      },
      {
        path: "melonCamera",
        name: "melonCamera",
        component: () => import("@/views/pages/game/GameCamera.vue"),
      },
    ],
  },
  {
    path: "/qa",
    component: () =>
      import("@/views/pages/dataCollection/DataCollectionView.vue"),
    meta: { keep_live: false },
    children: [
      {
        path: "",
        name: "qa",
        component: () =>
          import("@/views/pages/dataCollection/DataCollectionQA.vue"),
      },
      {
        path: "/introduce",
        name: "introduce",
        component: () =>
          import("@/views/pages/dataCollection/DataCollectionIntroduce.vue"),
      },
      {
        path: "/aboutUs",
        name: "aboutUs",
        component: () =>
          import("@/views/pages/dataCollection/DataCollectionAboutUs.vue"),
      },
      {
        path: "/reward",
        name: "reward",
        component: () =>
          import("@/views/pages/dataCollection/DataCollectionReward.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  base: "/",
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始終滾動到頂部
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const token = getCookie("accessToken");
  const expiration = getCookie("exp");
  const formatDate = (date) => {
    const pad = (num) => String(num).padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const currentTime = formatDate(new Date());

  // 檢查是否未登入或 token 過期
  const isUnauthorized =
    (token == undefined && expiration == undefined) || expiration < currentTime;

  if (to.name === "registration") {
    console.log("進入註冊");
    if (isUnauthorized) {
      return next();
    }
    return next("/registration/mbti");
  }

  if (to.name === "mbti") {
    console.log("進入mbti");
    userStore.getMemberInfo();
    console.log(userStore.user.mbti);
    if (userStore.user.mbti == "") {
      return next();
    } else {
      return next("/game");
    }
  }

  // 處理其他所有路由
  if (isUnauthorized) {
    return next("/registration");
  }
  return next();
});

// router.afterEach(() => {});

export { router, routes };
