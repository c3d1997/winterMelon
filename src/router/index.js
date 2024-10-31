import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useRouter, useRoute } from "vue-router";

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
  history: createWebHashHistory(),
  base: "/",
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始終滾動到頂部
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  next();
});

// router.afterEach(() => {});

export { router, routes };
