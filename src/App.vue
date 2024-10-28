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
  position: fixed;
  background-image: url(/images/bg.png);
  background-repeat: repeat;
  height: 100%;
  width: 100%;
  z-index: 1;
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
  margin-bottom: 20px;
  padding-top: 30px;

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
    border: 8px solid transparent;
    font-size: 15px;
    padding-left: 45px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-image: url(/images/border_04.png) 32 stretch;
    background-color: transparent;

    &:focus {
      outline: 0;
    }
  }

  &:after {
    content: "";
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    z-index: -1;
    top: 4px;
    left: 4px;
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

.errorMessage {
  min-height: 18px;
  font-size: 12px;
  color: rgb(255, 11, 11);
  padding: 6px 0;
}

.popup {
  position: fixed;
  top: 50%;
  width: 100%;
  padding: 30px;
  z-index: 10;
  max-width: 475px;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  &_card {
    width: 100%;
    border: 18px solid;
    border-image: url(/images/border_02.png) stretch;
    border-image-slice: 32 fill;
    position: relative;
    padding: 10px 0;
    min-height: 270px;
    &::after {
      content: "";
      position: absolute;
      width: calc(100% + 18px);
      height: calc(100% + 18px);
      left: -9px;
      top: -9px;
      z-index: -1;
      background-color: #e8cfa6;
    }
    &-X {
      position: absolute;
      right: -32px;
      top: -32px;
      width: 42px;
      img {
        width: 100%;
      }
    }
    &-content {
      color: $main-color;
      p {
        font-size: 18px;
        font-weight: 600;
      }
      span {
        font-size: 15px;
        line-height: 20px;
        margin-top: 10px;
        display: block;
      }
    }
  }
}
.popupBG {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9;
}
.fenceCard {
  position: relative;
  z-index: 2;
  margin: auto;
  margin-bottom: 95px;
  &_top {
    background: url(/images/fenceBG_top.png) repeat-x;
    height: 43px;
    width: 100%;
    background-size: auto 43px;
  }
  &_card {
    position: relative;
    background-color: $second-color;
    padding: 0px 30px;
    padding-bottom: 40px;
    outline: 3px solid $main-color;
    border-bottom: 6px solid $support-color;
    @media (max-width: 335px) {
      padding: 0px 20px;
    }
  }
}
.dataCardType1 {
  color: $main-color;
  position: relative;
  z-index: 2;
  border: 24px solid;
  border-image: url(/images/border_02.png) stretch;
  border-image-slice: 32 fill;
  &::after {
    content: "";
    position: absolute;
    width: calc(100% + 14px);
    height: calc(100% + 14px);
    left: -7px;
    top: -7px;
    z-index: -1;
    background-color: #e8cfa6;
  }
}
.dataCardType2 {
  position: relative;
  z-index: 1;
  border: 24px solid;
  border-image: url(/images/border_01.png) stretch;
  border-image-slice: 34 fill;
  background: transparent;
  &::after {
    content: "";
    position: absolute;
    width: calc(100% + 13px);
    height: calc(100% + 12px);
    left: -6.5px;
    top: -6px;
    z-index: -1;
    background-color: #f3e5c2;
  }
}
</style>
