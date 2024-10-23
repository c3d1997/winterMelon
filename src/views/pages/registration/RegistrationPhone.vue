<template>
  <div class="containerBg"></div>
  <div class="container">
    <div class="title flex-center">
      <img src="/public/images/en_title.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
</script>

<style lang="scss" scoped>
.title {
  padding-top: 28px;
  margin-bottom: 24px;
  img {
    width: 100%;
  }
}
</style>