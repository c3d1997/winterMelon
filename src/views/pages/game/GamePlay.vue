<template>
  <div class="gameBG"></div>
  <div class="popupBG" v-if="is_pop"></div>
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
  <div class="game">
    <div class="gameTop">
      <div>
        <div class="gameTop_profile">
          <img src="/images/profile.png" alt="" />
        </div>
        <div class="gameTop_name">Seed State</div>
      </div>
      <div class="gameTop_mission">
        <div class="gameTop_mission-left">
          <p>MISSION</p>
          <span>2 / 15</span>
        </div>
        <div class="gameTop_mission-right">
          <img @click="openPop" src="/images/qa.png" alt="" />
        </div>
      </div>
    </div>
    <div class="gameMid">
      <img src="/images/profile.png" alt="" />
    </div>
    <div class="gameBottom">
      <div class="gameBottom_box">
        <div class="gameBottom_box-package">
          <div class="gameBottom_box-index">1</div>
        </div>
        <div class="gameBottom_box-package">
          <div class="gameBottom_box-index">1</div>
        </div>
        <div class="gameBottom_box-package">
          <div class="gameBottom_box-index">1</div>
        </div>
      </div>
      <div class="gameBottom_item">item</div>
      <div class="gameBottom_btn" @click="router.push('/qa')">
        <img class="filterSet" src="/images/collect.png" alt="" />
        <p>00:00:00</p>
      </div>

      <div class="gameBottom_gameStyle">
        <div class="gameBottom_game">
          <div class="gameBottom_game-set">
            <img class="filterSet" src="/images/game1.png" alt="" />
            <p>00:00:00</p>
          </div>
          <div class="gameBottom_game-set">
            <img class="filterSet" src="/images/game2.png" alt="" />
            <p>00:00:00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const is_pop = ref(false);

const openPop = () => {
  is_pop.value = true;
};
const closePop = () => {
  is_pop.value = false;
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
  img {
    width: 100%;
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
  filter: brightness(0.8) contrast(0.7);
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
</style>