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
    ],
  },
  {
    path: "/QA",
    component: () =>
      import("@/views/pages/dataCollection/DataCollectionView.vue"),
    meta: { keep_live: false },
    children: [
      {
        path: "",
        name: "QA",
        component: () =>
          import("@/views/pages/dataCollection/DataCollectionQA.vue"),
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
  next();
});

// router.afterEach(() => {});

export { router, routes };
