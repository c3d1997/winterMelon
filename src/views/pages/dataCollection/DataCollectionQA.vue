<template>
  <div class="popupBG" v-if="is_pop"></div>
  <div class="popup" v-if="is_pop">
    <div class="popup_card">
      <div class="popup_card-X">
        <img src="/images/X.png" alt="" />
      </div>
      <div class="popup_card-content">
        <p>Game Rules</p>
        <span
          >The entrance to this Winter Melon nurturing game will first test the
          player’s MBTI personality traits to select the type of Winter Melon
          they want to nurture.</span
        >
      </div>
    </div>
  </div>
  <div class="containerBg"></div>
  <div class="container">
    <div class="title flex-center">
      <img src="/images/en_title2.png" alt="" />
    </div>
  </div>
  <div class="mbtiCard">
    <div class="mbtiCard_top"></div>
    <div class="mbtiCard_card"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
</script>

<style lang="scss" scoped>
.container {
  padding: 0 15px;
}
.title {
  margin-bottom: 0;
  img {
    width: 100%;
  }
}

.mbtiCard {
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
    padding: 20px 0;
    padding-bottom: 52px;
    outline: 3px solid $main-color;
    border-bottom: 6px solid $support-color;
  }
}
</style>