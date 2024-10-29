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
      <div class="qa">
        <div class="qa_remind">
          <p>
            Congratulations on completing the game. Finally, just answer some
            simple survey questions to get your rewards.
          </p>
        </div>
        <div class="qa_selects">
          <selectModel
            v-model="selectedValue1"
            :options="options1"
            placeholder="What is your age?"
          ></selectModel>
          <selectModel
            v-model="selectedValue2"
            :options="options2"
            placeholder="What is your age?"
          ></selectModel>
          <selectModel
            v-model="selectedValue3"
            :options="options3"
            placeholder="What is your age?"
          ></selectModel>
        </div>
        <div class="qa_radioRemind dataCardType1">
          <p>
            When drinking coffee, I like to drink grass jelly or the following
            fruits
          </p>
        </div>
        <div class="qa_radios dataCardType2">
          <label v-for="item in radioList" :key="item.value" class="radioLabel">
            <input
              type="radio"
              :value="item.value"
              v-model="selected"
              name="radio-group"
            />
            <span class="radioCustom"> </span>
            <span class="labelText">{{ item.label }}</span>
          </label>
        </div>
      </div>
      <div class="submitBtn" @click="router.push('/introduce')">
        <img src="/images/submit.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import selectModel from "@/views/components/select.vue";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
// 下拉
const selectedValue1 = ref("");
const options1 = [
  { value: "1", label: "選項一" },
  { value: "2", label: "選項二" },
  { value: "3", label: "選項三" },
];
const selectedValue2 = ref("");
const options2 = [
  { value: "1", label: "選項一" },
  { value: "2", label: "選項二" },
  { value: "3", label: "選項三" },
];
const selectedValue3 = ref("");
const options3 = [
  { value: "1", label: "選項一" },
  { value: "2", label: "選項二" },
  { value: "3", label: "選項三" },
];

// 單選
const selected = ref("1");

const radioList = [
  { value: "1", label: "Cendol" },
  { value: "2", label: "Pineapple" },
  { value: "3", label: "Lemon" },
  { value: "4", label: "Dragon Fruit" },
];
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
.qa {
  max-width: 475px;
  margin: auto;
  &_remind {
    font-size: 15px;
    text-align: center;
    line-height: 24px;
    color: $main-color;
    font-weight: 400;
    padding: 30px 0 20px 0;
  }
  &_selects {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 25px;
  }
  &_radioRemind {
    line-height: 24px;
    color: $main-color;
    font-weight: 400;
    font-size: 15px;
  }
  &_radios {
    margin-top: -30px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    padding: 0 15px;
    padding-top: 25px;
    padding-bottom: 15px;

    .radioLabel {
      position: relative;
      padding-left: 22px;
      cursor: pointer;
      display: flex;
      align-items: center;
      input[type="radio"] {
        position: absolute;
        opacity: 0;
      }
      .radioCustom {
        position: absolute;
        left: 0;
        width: 16px;
        height: 16px;
        background-image: url("/images/noSelect.png");
        background-size: contain;
        background-repeat: no-repeat;
        transition: background-image 0.2s;
      }
      input:checked + .radioCustom {
        background-image: url("/images/isSelect.png");
      }
      .labelText {
        color: $main-color;
        font-size: 15px;
        white-space: nowrap;
      }
    }
  }
}
.submitBtn {
  width: 120px;
  margin: auto;
  margin-top: 30px;
  img {
    width: 100%;
  }
}
</style>