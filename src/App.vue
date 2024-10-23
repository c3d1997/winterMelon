<template><router-view></router-view></template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
</script>

<style lang="scss">
.containerBg {
  position: absolute;
  background-image: url(/public/images/bg.png);
  height: 100dvh;
  width: 100%;
  z-index: 1; // 設定濾鏡層級
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(255, 255, 255, 0.7);
  }
}
.container {
  position: relative;
  z-index: 2;
  margin: auto;
  max-width: 475px;
  height: 100%;
  padding: 0 30px;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.borderType {
  &_1 {
    width: 100%;
    border: 15px solid;
    margin: auto;
    border-image: url(/images/border_01.svg) stretch;
    border-image-slice: 17 fill;
    &-inner {
      background-color: #f3e5c2;
      width: 100%;
      padding: 7px;
      height: 100%;
    }
  }
  &_2 {
    width: 100%;
    border: 13px solid;
    margin: auto;
    border-image: url(/images/border_02.svg) stretch;
    border-image-slice: 16 fill;
    &-inner {
      background-color: #e8cfa6;
      width: 100%;
      padding: 7px;
      height: 100%;
    }
  }
  &_3 {
    width: 100%;
    border: 13px solid;
    margin: auto;
    border-image: url(/images/border_03.svg) stretch;
    border-image-slice: 16 fill;
    &-inner {
      background-color: #e8cfa6;
      width: 100%;
      padding: 7px;
      height: 100%;
    }
  }
}
</style>
