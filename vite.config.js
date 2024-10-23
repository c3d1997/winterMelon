import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [vue()],
    define: {
      __ENV__: JSON.stringify(env.VITE_ENV),
    },
    resolve: {
      alias: {
        "@": "/src",
        vue: "vue/dist/vue.esm-bundler.js",
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/_variables.scss";`,
        },
      },
    },
  };
});
