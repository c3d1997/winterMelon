<template>
  <div class="gameBG"></div>
  <div
    class="popupBG"
    v-if="
      is_pop ||
      is_collect ||
      is_finish ||
      (melonStatus == 0 && userStore.user?.play_times == 1)
    "
  ></div>
  <!-- 遊戲教學1 -->
  <div
    class="popup gamePop"
    v-if="!is_pop && melonStatus == 0 && userStore.user?.play_times == 1"
  >
    <div class="gameTeach gameTeach1">
      <p>
        Click here for your <br />
        first collection
      </p>
    </div>
    <div class="gameBottom_btn" @click="collectPop">
      <img
        :class="{ filterSet: melonStatus != 0 }"
        src="/images/collect.png"
        alt=""
      />
      <p v-if="melonStatus != 0">
        {{ timerStore.formatTime() }}
      </p>
    </div>
  </div>
  <!-- 遊戲教學2 -->
  <div
    class="popup gamePop"
    v-if="!is_pop && melonStatus == 1 && userStore.user?.play_times == 1"
  >
    <div class="gameTeach gameTeach2">
      <p>
        Collect to <br />
        unlock the game
      </p>
    </div>
    <div class="gameBottom_gameStyle">
      <div class="gameBottom_game">
        <div class="gameBottom_game-set">
          <img
            @click="router.push('game/melonRun')"
            :class="{
              filterSet: melonStatus == 0,
            }"
            src="/images/game1.png"
            alt=""
          />
        </div>
        <div class="gameBottom_game-set">
          <img
            @click="router.push('game/melonCamera')"
            :class="{
              filterSet: melonStatus == 0,
            }"
            src="/images/game2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
  <!-- 第一次進入 -->
  <div class="popup" v-if="is_pop">
    <div class="popup_card">
      <div class="popup_card-X" @click="closePop">
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
  <!-- 獲得蒐集物 -->
  <div class="popup" v-if="is_collect">
    <div class="collect">
      <p>You Got the Item</p>
      <div class="collect_object">
        <img src="/images/collectEX.png" alt="" />
      </div>
      <span>watering machine</span>
      <div class="collect_btn" @click="submitCollect">
        <img src="/images/ok.png" alt="" />
      </div>
    </div>
  </div>
  <div class="popup" v-if="is_collect_animation">
    <div class="collect">
      <div class="collect_object collect_object-ani">
        <img ref="collectItem" src="/images/collectEX.png" alt="" />
      </div>
    </div>
  </div>
  <!-- 完成蒐集 -->
  <div class="popup" v-if="is_finish">
    <div class="popup_card">
      <div class="popup_card-content finish">
        <p>Congratulations !</p>
        <span
          >Congratulations on completing the game. Now, please go to the reward
          claiming page. Thank you for playing.</span
        >
        <div class="finish_btn" @click="collectPop">
          <img src="/images/winning.png" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div class="game">
    <div class="gameTop">
      <div>
        <div class="gameTop_profile">
          <img src="/images/profileHead.png" alt="" />
        </div>
        <div class="gameTop_name">Seed State</div>
      </div>
      <div class="gameTop_mission">
        <div class="gameTop_mission-left">
          <p>MISSION</p>
          <span>{{ userStore.user.melon_info.melon_status }} / 4</span>
        </div>
        <div class="gameTop_mission-right">
          <img @click="is_pop = true" src="/images/qa.png" alt="" />
        </div>
      </div>
    </div>
    <div class="gameMid">
      <img :src="`/images/melonStatus/${melonStatus}.png`" alt="" />
      <div class="gameMid_collect" :style="randomPosition">
        <img src="/images/collectEX.png" alt="" />
      </div>
    </div>
    <div class="gameBottom">
      <div class="gameBottom_BG"></div>
      <div class="gameBottom_box">
        <div class="gameBottom_box-package">
          <img src="/images/collect_1.png" alt="" />
          <div class="gameBottom_box-index">1</div>
        </div>
        <div class="gameBottom_box-package">
          <img src="/images/collect_2.png" alt="" />
          <div class="gameBottom_box-index">1</div>
        </div>
        <div class="gameBottom_box-package">
          <img src="/images/collect_3.png" alt="" />
          <div class="gameBottom_box-index">1</div>
        </div>
      </div>
      <div class="gameBottom_item">item</div>
      <div class="gameBottom_btn" @click="collectPop">
        <img
          :class="{ filterSet: !is_collection }"
          src="/images/collect.png"
          alt=""
        />
        <p v-if="!is_collection && userStore.is_example">
          {{ timerStore.formatTime() }}
        </p>
      </div>

      <div class="gameBottom_gameStyle">
        <div class="gameBottom_game">
          <div class="gameBottom_game-set">
            <img
              @click="router.push('game/melonRun')"
              :class="{
                filterSet: !is_game_one || is_finish,
              }"
              src="/images/game1.png"
              alt=""
            />
            <p v-if="!is_game_one && userStore.is_example">
              {{ timerStore.formatTime() }}
            </p>
          </div>
          <div class="gameBottom_game-set">
            <img
              @click="router.push('game/melonCamera')"
              :class="{
                filterSet: !is_game_two || is_finish,
              }"
              src="/images/game2.png"
              alt=""
            />
            <p v-if="!is_game_two && userStore.is_example">
              {{ timerStore.formatTime() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useTimerStore } from "@/stores/timeStore";
import {
  get_member_info,
  get_collection,
  completed_first_task,
  get_gift,
} from "@/utils/api";
import gsap from "gsap";

const timerStore = useTimerStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const is_collection = ref(true);
const is_game_one = ref(true);
const is_game_two = ref(true);
const is_pop = ref(false);
const is_collect = ref(false);
// 防抖狀態
const isSubmitting = ref(false);
const closePop = () => {
  is_pop.value = false;
};
// 計算隨機位置
const randomPosition = ref({
  top: "0px",
  left: "0px",
});

// 生成隨機位置
const generateRandomPosition = () => {
  const isNegativeTop = Math.random() < 0.5;
  const isNegativeLeft = Math.random() < 0.5;
  let randomTop, randomLeft;
  if (isNegativeTop) {
    randomTop = Math.floor(Math.random() * 100) * -1;
  } else {
    randomTop = Math.floor(Math.random() * 50) + 50;
  }
  if (isNegativeLeft) {
    randomLeft = Math.floor(Math.random() * 50) * -1;
  } else {
    randomLeft = Math.floor(Math.random() * 30) + 50;
  }
  randomPosition.value = {
    top: `${randomTop}%`,
    left: `${randomLeft}%`,
  };
};

const is_finish = ref(false);
const melonStatus = ref();
onMounted(async () => {
  timerStore.startTimer();
  generateRandomPosition();
  await userStore.getMemberInfo();
  melonStatus.value = userStore.user.melon_info.melon_status;

  if (userStore.user.melon_info.melon_status == 0) {
    is_pop.value = true;
    userStore.is_example = 0;
  } else {
    console.log("不是第一次");
    is_collection.value = userStore.user.setting_info.is_collection;
    is_game_one.value = userStore.user.setting_info.is_game_one;
    is_game_two.value = userStore.user.setting_info.is_game_two;
  }
  if (userStore.user.melon_info.melon_status == 3) {
    is_finish.value = true;
  }
});

watch(
  () => userStore.user.setting_info,
  (newSettings) => {
    if (newSettings) {
      console.log(newSettings, "setting_info改變");
      is_collection.value = newSettings.is_collection;
      is_game_one.value = newSettings.is_game_one;
      is_game_two.value = newSettings.is_game_two;
    }
  },
  { deep: true }
);

// 監聽冬瓜狀態變化
watch(
  () => userStore.user.melon_info.melon_status,
  (newStatus) => {
    melonStatus.value = newStatus;
    console.log(melonStatus.value, "melonStatus");
    if (newStatus === 0) {
      is_pop.value = true;
      userStore.is_example = 0;
    } else if (newStatus === 3) {
      is_finish.value = true;
    }
  }
);
const is_clickCollect = ref();
const collectPop = async () => {
  if (isSubmitting.value) return;
  try {
    is_clickCollect.value = true;
    isSubmitting.value = true;
    if (!is_finish.value) {
      console.log("尚未結束");
      is_collect.value = true;
      is_collect_animation.value = true;
      if (userStore.user.melon_info.melon_status == 0) {
        console.log("進入第一次回報");
        const firstCollectionResult = await completed_first_task();
        if (firstCollectionResult.status == "success") {
          console.log("第一次回報成功");
          await userStore.getMemberInfo();
          is_collect.value = false;
        } else if (firstCollectionResult.status == "error") {
          console.log("第一次回報失敗");
        }
      } else if (
        userStore.user.melon_info.melon_status == 1 ||
        userStore.user.melon_info.melon_status == 2
      ) {
        console.log("使用者收集物品");
        const normalCollectionResult = await get_collection();
        if (normalCollectionResult.status == "success") {
          console.log("收集物品成功");
          const memberInfo = await get_member_info();
          userStore.user = memberInfo.payload.data;
          is_collect.value = false;
        } else if (normalCollectionResult.status == "error") {
          console.log("收集物品失敗");
        }
      }
    } else {
      console.log("蒐集完畢");
      if (userStore.user.play_times != 1) {
        const getGiftsResult = await get_gift();
        if (getGiftsResult.status == "success") {
          console.log("重複取得禮物成功");
          router.push("/reward");
        } else if (getGiftsResult.status == "error") {
          console.log("重複取得禮物失敗");
        }
      } else {
        router.push("/qa");
      }
    }
  } catch (error) {
    console.log("collect失敗", error);
  } finally {
    isSubmitting.value = false;
  }
};
// 蒐集
const collectItem = ref(null);
const is_collect_animation = ref(false);
const submitCollect = async () => {
  console.log("按下蒐集", isSubmitting.value);
  if (isSubmitting.value) return;
  try {
    isSubmitting.value = true;
    animationCollect(1);
  } catch (error) {
    console.log("蒐集失敗", error);
  } finally {
    isSubmitting.value = false;
  }
};

const animationCollect = async (e) => {
  if (!is_collect_animation.value) {
    return;
  }
  // 獲取目標位置和來源位置
  const targetBox = document.querySelector(
    `.gameBottom_box-package:nth-child(${e}) .gameBottom_box-index`
  );
  const targetBounds = targetBox.getBoundingClientRect();
  const itemBounds = collectItem.value.getBoundingClientRect();

  // 計算中心點位置差異
  const centerX =
    targetBounds.left +
    targetBounds.width / 2 -
    (itemBounds.left + itemBounds.width / 2 + 50);
  const centerY =
    targetBounds.top +
    targetBounds.height / 2 -
    (itemBounds.top + itemBounds.height / 2 - 50);

  // 創建動畫時間軸
  const tl = gsap.timeline({
    onComplete: () => {
      is_collect_animation.value = false;
    },
  });

  // 先向上彈起
  tl.to(collectItem.value, {
    duration: 0.5,
    y: -150, // 向上彈起的高度
    ease: "power2.out",
  })
    // 然後掉落到目標位置
    .to(collectItem.value, {
      duration: 1,
      scale: 0.5,
      x: centerX,
      y: centerY,
      ease: "power2.in", // 使用彈跳效果
    });

  // 目標位置的視覺反饋
  gsap.to(targetBox, {
    duration: 0.3,
    scale: 1.2,
    delay: 1.5, // 調整延遲時間配合新的動畫
    yoyo: true,
    repeat: 1,
  });
};
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
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.game {
  position: relative;
}
.gameTop {
  position: fixed;
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  max-width: 475px;
  left: 50%;
  transform: translateX(-50%);
  gap: 8px;
  &_profile {
    position: relative;
    max-width: 120px;
    max-height: 120px;
    border: 25px solid;
    border-image: url(/images/border_01.png) stretch;
    border-image-slice: 34 fill;
    display: flex;
    align-items: center;
    img {
      height: 100%;
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
  &_name {
    position: relative;
    width: 120px;
    height: 25px;
    border: 7px solid;
    border-image: url(/images/border_05.png) stretch;
    border-image-slice: 26 fill;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    color: $main-color;
    margin-top: -2px;
    &::after {
      content: "";
      position: absolute;
      width: calc(100% + 7px);
      height: calc(100% + 7px);
      left: -3.5px;
      top: -3.5px;
      z-index: -1;
      background-color: #dce0d2;
    }
  }
  &_mission {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 225px;
    width: 100%;
    height: 72px;
    border: 8px solid;
    border-image: url(/images/border_04.png) stretch;
    border-image-slice: 28 fill;
    position: relative;
    margin-top: 14px;
    &-left {
      color: $main-color;
      font-weight: 600;
      padding-left: 8px;
      p {
        font-size: 15px;
      }
      span {
        display: block;
        margin-top: 6px;
        font-size: 20px;
      }
    }
    &-right {
      margin-right: 8px;
      margin-top: 4px;
      width: 45px;
      img {
        width: 100%;
      }
    }

    &::after {
      content: "";
      position: absolute;
      width: calc(100% + 6px);
      height: calc(100% + 6px);
      left: -3px;
      top: -3px;
      z-index: -1;
      background-color: #e8cfa6;
    }
  }
}

.gameMid {
  position: fixed;
  top: calc(50dvh - 75px);
  left: calc(50% - 75px);
  width: 150px;
  position: relative;
  z-index: 0;
  img {
    width: 100%;
  }
  &_collect {
    position: absolute;
    z-index: -3;
    width: 80px;
    img {
      width: 100%;
    }
  }
}
.gameBottom {
  max-width: 475px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  bottom: 4px;
  width: 100%;
  &_box {
    width: 100%;
    height: 140px;
    border: 18px solid;
    border-image: url(/images/border_01.png) stretch;
    border-image-slice: 32 fill;
    position: relative;
    display: flex;
    gap: 14px;
    padding: 6px 6px;
    &::after {
      content: "";
      position: absolute;
      width: calc(100% + 18px);
      height: calc(100% + 18px);
      left: -9px;
      top: -9px;
      z-index: -1;
      background-color: #dcb98a;
    }
    &-package {
      position: relative;
      width: 100%;
      border: 8px solid;
      border-image: url(/images/border_04.png) stretch;
      border-image-slice: 32 fill;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 100%;
      }
      &::after {
        content: "";
        position: absolute;
        z-index: -1;
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        left: -2px;
        top: -2px;
        background-color: #e8cfa6;
      }
    }
    &-index {
      width: 26px;
      height: 26px;
      background-image: url(/images/number.png);
      background-size: cover;
      position: absolute;
      right: -16px;
      top: -14px;
      text-align: center;
      line-height: 26px;
      font-size: 12px;
      color: $main-color;
    }
  }
  &_item {
    position: absolute;
    z-index: 1;
    top: -3px;
    left: 25px;
    font-size: 12px;
    color: $main-color;
    border: 2px solid $main-color;
    border-bottom: none;
    border-top: none;
    padding: 3px 8px;
    font-weight: bold;
    background-color: #dcb98a;
    &::before {
      content: "";
      width: calc(100%);
      height: 2px;
      position: absolute;
      top: -2px;
      background-color: $main-color;
      left: 0px;
    }
  }
  &_btn {
    position: absolute;
    z-index: 2;
    top: -70px;
    left: calc(50% - 75px);
    width: 150px;
    img {
      width: 100%;
    }
    p {
      position: absolute;
      top: 20px;
      text-align: center;
      width: 100%;
      font-weight: 600;
      color: white;
    }
  }
  .btn-content {
    position: absolute;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: $main-color;
    width: 100%;
    top: -55px;
    z-index: 2;
    &.content_white {
      font-size: 18px;
      color: white;
    }
    &-winner {
      top: -125px;
    }
  }
  &_game {
    position: absolute;
    right: 10px;
    top: -200px;
    z-index: 2;
    &-set {
      position: relative;
      width: 68px;
      margin-bottom: 5px;
      img {
        width: 100%;
      }

      p {
        position: absolute;
        top: 25px;
        width: 100%;
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        color: white;
      }
    }
  }
}
.filterSet {
  pointer-events: none;
  filter: brightness(0.8) contrast(0.7);
}
.collect {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    font-size: 18px;
    margin-bottom: 14px;
  }
  span {
    display: block;
    font-size: 25px;
    margin-top: 12px;
  }
  &_object {
    width: 120px;
    img {
      width: 100%;
    }
    &-ani {
      display: flex;
      align-items: center;
      transform: translateY(-50px);
    }
  }
  &_btn {
    width: 150px;
    margin-top: 30px;
    img {
      width: 100%;
    }
  }
}
.finish {
  position: relative;
  &_btn {
    position: absolute;
    bottom: -230px;
    left: calc(50% - 75px);
    width: 150px;
    img {
      width: 100%;
    }
  }
}
.gamePop {
  height: 100%;
  .gameBottom_game {
    top: unset;
    bottom: 159px;
  }
  .gameBottom_btn {
    top: unset;
    bottom: 151px;
  }
  .filterSet {
    filter: brightness(0.4) contrast(0.7);
  }
}
.gameTeach {
  position: absolute;
  &.gameTeach1 {
    bottom: 241px;
    left: 50%;
    transform: translateX(-50%);
    &::after {
      content: "";
      position: absolute;
      width: 0px;
      height: 0px;
      border-left: 5px solid transparent;
      border-top: 5px solid transparent;
      border-right: 5px solid #ffffff;
      border-bottom: 5px solid #ffffff;
      bottom: -15px;
      right: calc(50% - 5px);
      transform: rotate(45deg);
    }
  }
  &.gameTeach2 {
    bottom: 361px;
    right: 90px;
    &::after {
      content: "";
      position: absolute;
      width: 0px;
      height: 0px;
      border-left: 5px solid transparent;
      border-top: 5px solid transparent;
      border-right: 5px solid #ffffff; // 箭頭顏色
      border-bottom: 5px solid #ffffff; // 箭頭顏色
      transform: rotate(45deg); // 旋轉 45 度指向右下
      bottom: -9px; // 調整箭頭位置
      right: -15px; // 調整箭頭位置
      transform: rotate(-0deg);
    }
  }
  p {
    text-align: center;
    color: white;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
  }
}
</style>