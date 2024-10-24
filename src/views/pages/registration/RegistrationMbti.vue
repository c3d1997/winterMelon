<template>
  <div class="containerBg"></div>
  <div class="container">
    <div class="title flex-center">
      <img src="/images/en_title.png" alt="" />
    </div>
  </div>
  <div class="mbtiCard">
    <div class="mbtiCard_top"></div>
    <div class="mbtiCard_card">
      <Carousel :wrap-around="true" :mouseDrag="true" :touchDrag="true">
        <Slide v-for="slide in 8" :key="slide">
          <div class="carousel__item">{{ slide }}</div>
        </Slide>
        <template #addons>
          <Navigation>
            <!-- 自定義上一張箭頭 -->
            <template #prev>
              <img class="arror" src="/images/arrorLeft.png" alt="prev" />
            </template>
            <!-- 自定義下一張箭頭 -->
            <template #next>
              <img class="arror" src="/images/arrorRight.png" alt="next" />
            </template>
          </Navigation>
          <Pagination />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 0;
}
.mbtiCard {
  position: relative;
  z-index: 2;
  &_top {
    background: url(/images/fenceBG_top.png) repeat-x;
    height: 43px;
    width: 100%;
    background-size: auto 43px;
  }
  &_card {
    background-color: $second-color;
    padding: 20px 0;
    outline: 3px solid $main-color;
    border-bottom: 6px solid $support-color;
  }
}
.carousel__item {
  height: 180px;
  width: 180px;
  background-color: $support-color;
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel__pagination {
  display: none;
}
.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
.arror {
  width: 22px;
}
</style>