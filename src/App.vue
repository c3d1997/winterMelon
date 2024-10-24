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
  background-image: url(/images/bg.png);
  height: 100dvh;
  width: 100%;
  z-index: 1; // 設定濾鏡層級
  &-filter {
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
}
.container {
  position: relative;
  z-index: 2;
  margin: auto;
  max-width: 475px;
  height: 100%;
  padding: 0 30px;
}
.title {
  padding-top: 28px;
  margin-bottom: 24px;
  img {
    width: 100%;
  }
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.inputStyle {
  position: relative;
  &_Input {
    width: 100%;
    line-height: 38px;
    height: 48px;
    border: 5px solid transparent;
    font-size: 15px;
    padding-left: 45px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-image: url(/images/border_04.svg) 16 stretch;
    background-color: transparent;
    &:focus {
      outline: 0;
    }
  }
  &:after {
    content: "";
    position: absolute;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    z-index: -1;
    top: 3px;
    left: 3px;
    background-color: white;
  }
  &_icon {
    position: absolute;
    width: 16px;
    top: 0;
    left: 18px;
    top: calc(50% - 9px);
    img {
      width: 100%;
      object-fit: contain;
    }
  }
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

.errorMessage {
  min-height: 18px;
  font-size: 12px;
  color: rgb(255, 11, 11);
  padding: 6px 0;
}

.buttonType {
  &_normal {
    border: 4px solid;
    border-image: url(/images/border_04.svg) stretch;
    border-image-slice: 16 fill;
    line-height: 40px;
    &-inner {
      background-color: $main-color;
      color: white;
      text-align: center;
    }
  }
}
</style>
