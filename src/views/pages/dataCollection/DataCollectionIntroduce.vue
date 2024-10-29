<template>
  <div class="containerBg"></div>
  <div class="container">
    <div class="title flex-center">
      <img src="/images/en_title2.png" alt="" />
    </div>
  </div>
  <div class="fenceCard">
    <div class="fenceCard_top"></div>
    <div class="fenceCard_card">
      <div class="introduce">
        <div class="introduce_remind dataCardType1">
          <p>
            When drinking coffee, I like to drink grass jelly or the following
            fruits
          </p>
        </div>
        <div class="introduce_choice dataCardType2">
          <p>My Choice :</p>
          <span>Lemon</span>
        </div>
        <div class="introduce_content dataCardType2">
          <div class="introduce_content-img">
            <img src="/images/ex.png" alt="" />
          </div>
          <p>
            Loves sunlight and requires more external stimuli, such as heavy
            rain to promote growth. Ready to Gat Your Reward. LTK Dong Gua Tea
            Brick. Ready to Gat Your Reward. LTK Dong Gua Tea Brick. Ready to
            Gat Your Reward. LTK Dong Gua Tea Brick.
          </p>
        </div>
      </div>
      <div class="submitBtn" @click="router.push('/aboutUs')">
        <img src="/images/reward.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
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
.introduce {
  padding-top: 20px;
  max-width: 475px;
  margin: auto;
  &_remind {
    font-size: 15px;
    text-align: center;
    line-height: 24px;
  }
  &_choice {
    text-align: center;
    color: $main-color;
    margin-top: -30px;
    padding-bottom: 10px;
    padding-top: 24px;
    margin-bottom: 15px;
    p {
      font-size: 15px;
      margin-bottom: 12px;
    }
    span {
      display: block;
      font-size: 27px;
      font-weight: bold;
    }
  }
  &_content {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 15px 10px;
    p {
      font-size: 12px;
      color: $main-color;
      line-height: 16px;
      word-break: keep-all;
      overflow-wrap: break-word;
      padding-top: 10px;
    }
  }
}
.submitBtn {
  width: 204px;
  position: absolute;
  left: calc(50% - 204px / 2);
  bottom: -34px;
  margin: auto;
  margin-top: 30px;
  img {
    width: 100%;
  }
}
.fenceCard_card {
  padding-bottom: 65px;
}
</style>