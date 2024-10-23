import "./style.css";
import { createApp } from "vue";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import { createPinia } from "pinia";

import App from "./App.vue";
import { router } from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(router);
app.use(VueTelInput);
app.use(pinia);
app.mount("#app");
