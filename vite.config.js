import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [vue()],
    define: {
      __ENV__: JSON.stringify(env.VITE_ENV),
      __API_URL__: JSON.stringify(env.VITE_API_URL),
    },
    resolve: {
      alias: {
        "@": "/src",
        vue: "vue/dist/vue.esm-bundler.js",
      },
    },
    // server: {
    //   proxy: {
    //     "/api": {
    //       target: "https://api-melon-stage.ginjack.shop",
    //       changeOrigin: true,
    //     },
    //   },
    // },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/_variables.scss" as *;`,
        },
      },
    },
  };
});
