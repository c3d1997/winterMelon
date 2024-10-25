<template>
  <div class="gameBG"></div>
  <div class="game">
    <div class="gameTop">
      <div class="gameTop_profile">
        <img src="/images/profile.png" alt="" />
      </div>
    </div>
    <div class="gameMid"></div>
    <div class="gameBottom"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
</script>

<style lang="scss" scoped>
.gameBG {
  position: fixed;
  left: calc(50% - 0px);
  transform: translateX(-50%);
  padding: 0 12px;
  padding-top: 10px;
  max-width: 475px;
  margin: auto;
  height: 100dvh;
  width: 101%;
  background-image: url(/images/gameBG.png);
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
}
.game {
  position: relative;
}
.gameTop {
  position: fixed;
  top: 10px;
  left: 10px;
  &_profile {
    position: relative;
    width: 120px;
    height: 120px;
    border: 25px solid;
    border-image: url(/images/border_01.png) stretch;
    border-image-slice: 34 fill;
    img {
      width: 100%;
    }
    &::after {
      content: "";
      position: absolute;
      width: calc(100% + 25px);
      height: calc(100% + 25px);
      left: -15px;
      top: -15px;
      z-index: -1;
      background-color: #e8cfa6;
    }
  }
}
</style>