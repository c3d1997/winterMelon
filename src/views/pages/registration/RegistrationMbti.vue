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
      <div class="mbtiCard_text">
        <div class="mbtiCard_text-card">
          <span>Pick your MBTI Winter Melon below.</span>
          <p>Start the nurturing game.</p>
        </div>
      </div>
      <div class="mbtiCard_carousel">
        <div class="mbtiCard_carousel-card">
          <div class="carousel_index">
            <p>{{ currentIndex }} / 8</p>
          </div>
          <Carousel
            :wrap-around="true"
            :mouseDrag="true"
            :touchDrag="true"
            @slide-start="updateIndex"
          >
            <Slide v-for="(item, index) in mbtiTypes" :key="index">
              <div class="carousel_content">
                <p>{{ item.title }}</p>
                <p>{{ item.type }}</p>
                <div class="carousel_item"></div>
                <span>{{ item.description }}</span>
              </div>
            </Slide>
            <template #addons>
              <Navigation>
                <!-- 自定義上一張箭頭 -->
                <template #prev>
                  <img
                    class="arror arror-left"
                    src="/images/arrorLeft.png"
                    alt="prev"
                  />
                </template>
                <!-- 自定義下一張箭頭 -->
                <template #next>
                  <img
                    class="arror arror-right"
                    src="/images/arrorRight.png"
                    alt="next"
                  />
                </template>
              </Navigation>
              <Pagination />
            </template>
          </Carousel>
        </div>
      </div>
      <div class="mbtiCard_btn">
        <div class="mbtiCard_btn-start"><p>START</p></div>
      </div>
    </div>
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

// 輪播數字控制
const currentIndex = ref(0);
const updateIndex = (slide) => {
  console.log(slide);
  currentIndex.value = slide.slidingToIndex;
};

const mbtiTypes = [
  {
    title: "Extroverted Winter Melon",
    type: "(E type)",
    description:
      "Loves sunlight and requires more external stimuli, such as heavy rain to promote growth.",
  },
  {
    title: "Introverted Winter Melon",
    type: "(I type)",
    description: "Grows slowly and needs more care and a stable environment.",
  },
  {
    title: "Sensing Winter Melon",
    type: "(S type)",
    description:
      "Enjoys routine and particularly needs regular watering and fertilization.",
  },
  {
    title: "Intuitive Winter Melon",
    type: "(M type)",
    description:
      "May develop unexpected traits, such as unique shapes or colors.",
  },
  {
    title: "Thinking Winter Melon",
    type: "(T type)",
    description:
      "Responds sensitively to environmental changes, and over-caring may have negative effects.",
  },
  {
    title: "Feeling Winter Melon",
    type: "(F type)",
    description:
      "Requires more interaction and love from players for healthy growth.",
  },
  {
    title: "Judging Winter Melon",
    type: "(J type)",
    description:
      "Very orderly, grows quickly if players complete care tasks on time.",
  },
  {
    title: "Perceiving Winter Melon",
    type: "(P type)",
    description:
      "Thrives better in a changing environment, and random events serve as growth catalysts.",
  },
];
</script>

<style lang="scss" scoped>
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
  &_text {
    padding: 0 30px;
    margin-bottom: 20px;
    &-card {
      position: relative;
      z-index: 2;
      border: 24px solid;
      border-image: url(/images/border_02.png) stretch;
      border-image-slice: 32 fill;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: $main-color;
      span {
        font-size: 15px;
        margin-bottom: 4px;
        letter-spacing: 0.01em;
      }
      p {
        font-size: 21px;
        font-weight: bold;
      }
      @media (max-width: 355px) {
        span {
          font-size: 12px;
          margin-bottom: 4px;
          letter-spacing: 0.01em;
        }
        p {
          font-size: 17px;
          font-weight: bold;
        }
      }
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
  }
  &_carousel {
    padding: 0 30px;
    &-card {
      position: relative;
      z-index: 2;
      padding-top: 16px;
      padding-bottom: 10px;
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
        background-color: $secondLight-color;
      }
    }
  }
  &_btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -30px;
    &-start {
      border: 25px solid;
      border-image: url(/images/border_03.png) stretch;
      border-image-slice: 32 fill;
      position: relative;
      z-index: 2;
      height: 60px;
      width: 150px;
      margin: auto;
      font-size: 21px;
      color: $main-color;
      p {
        font-weight: 600;
        position: absolute;
        width: 100%;
        text-align: center;
        top: -7px;
      }
      &::after {
        content: "";
        position: absolute;
        width: calc(100% + 12px);
        height: calc(100% + 12px);
        left: -6px;
        top: -6px;
        z-index: -1;
        background-color: #e8cfa6;
      }
    }
  }
}
.carousel {
  &_item {
    height: 180px;
    width: 180px;
    background-color: $support-color;
  }
  &_content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding: 0 20px;
    p {
      font-size: 15px;
      color: $main-color;
      line-height: 20px;
      font-weight: 600;
      &:nth-child(2) {
        padding-bottom: 12px;
      }
    }
    span {
      font-size: 12px;
      color: $main-color;
      text-align: left;
      line-height: 16px;
      font-weight: normal;
      white-space: normal;
      word-break: keep-all; /* 避免單字被切斷 */
      overflow-wrap: break-word; /* 只在必要時換行 */
      display: block;
      padding: 14px 0px;
      padding-bottom: 0;
    }
  }
  &_index {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 82px;
    height: 38px;
    border: 11px solid;
    border-image: url(/images/border_02.png) stretch;
    border-image-slice: 16 fill;
    z-index: 2;
    font-size: 15px;
    color: $main-color;
    font-weight: bold;
    p {
      position: absolute;
      top: -0px;
      left: 1px;
      width: 100%;
      text-align: center;
    }
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      z-index: -1;
      background-color: #e8cfa6;
    }
  }
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
  position: absolute;
  width: 22px;
  &-left {
    left: -58px;
  }
  &-right {
    right: -58px;
  }
}
</style>