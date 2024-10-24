<template>
  <div class="buttonType_normal">
    <div class="buttonType_normal-inner">{{ props.content }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
</style>