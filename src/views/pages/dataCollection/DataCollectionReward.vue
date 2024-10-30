<template>
  <div class="popupBG" v-if="is_reward || is_confirm || is_re"></div>
  <div class="popup" v-if="is_reward">
    <div class="popup_card">
      <div class="popup_card-X" @click="closePop">
        <img src="/images/X.png" alt="" />
      </div>
      <div class="popup_card-content">
        <p>Get Reward Place Here:</p>
        <span>放地址</span>
      </div>
    </div>
  </div>
  <div class="popup" v-if="is_confirm">
    <div class="popup_card redeemCard">
      <div class="popup_card-X" @click="closePop">
        <img src="/images/X.png" alt="" />
      </div>
      <div class="popup_card-content redeemConfirm">
        <p>
          Please leave this action to the clerk. Once the button is pressed, it
          cannot be redeemed again.
        </p>
        <div class="redeemConfirm_img" @click="handleRedeem">
          <img src="/images/confirm.png" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div class="popup" v-if="is_re">
    <div class="popup_card redeemCard">
      <div class="popup_card-X" @click="closePop">
        <img src="/images/X.png" alt="" />
      </div>
      <div class="popup_card-content redeemConfirm">
        <p>提醒確認重新開始</p>
        <div
          class="redeemConfirm_img"
          @click="router.push('/registration/mbti')"
        >
          <img src="/images/confirm.png" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div class="containerBg"></div>
  <div class="container">
    <div class="title flex-center">
      <img src="/images/en_title2.png" alt="" />
    </div>
  </div>
  <div class="fenceCard">
    <div class="fenceCard_top"></div>
    <div class="fenceCard_card">
      <div class="reward">
        <h3>Congratulations! Your Reward:</h3>
        <div class="reward_card">
          <img
            :class="{ reward_filter: is_reGame }"
            src="/images/cup.png"
            alt=""
          />
        </div>
      </div>
      <div class="getReward">
        <div class="rewardRedeem">
          <div class="rewardRedeem_btn" @click="rewardPop">
            <img src="/images/getReward.png" alt="" />
          </div>
          <div v-if="!is_reGame" class="rewardRedeem_remind dataCardType1">
            <p>
              ※Please go to the following stores to redeem Reward, open this
              page and ask the on-site brand staff to press the following button
            </p>
          </div>
          <div v-if="!is_reGame" class="rewardRedeem_code">
            <p>Write-off Code</p>
            <div class="inputStyle">
              <input
                type="number"
                placeholder="Verification Code"
                v-model="codeNumber"
                @input="onCodeInput"
                class="inputStyle_Input"
              />
              <div class="inputStyle_icon">
                <img src="/images/vCode.png" alt="" />
              </div>
            </div>
            <div class="errorMessage">
              <p v-if="!error.code">Enter a valid verification code</p>
            </div>
            <selectModel
              v-model="selectedValue1"
              :options="options1"
              placeholder="Select Operating Store"
            ></selectModel>
          </div>
          <div v-if="is_reGame" class="reGame">
            <div class="submitBtnRE">
              <img src="/images/unRedoomed.png" alt="" />
            </div>
            <p>You Have Already Redeemed Your Reward</p>
            <p>Thank You for Playing!</p>
            <div class="submitBtnRE" @click="rePop">
              <img src="/images/RE.png" alt="" />
            </div>
            <p>Play the Game Again</p>
          </div>
        </div>
      </div>
      <div v-if="!is_reGame" class="submitBtn" @click="confirmPop">
        <img src="/images/redeem.png" alt="" />
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
const is_reGame = ref(false);
const is_re = ref(false);
const handleRedeem = () => {
  is_reGame.value = true;
  is_confirm.value = false;
};
const rePop = () => {
  is_re.value = true;
};
// 驗證碼驗證
const error = ref({
  code: true,
});
const codeNumber = ref("");
const onCodeInput = () => {
  // 先驗證必填
  if (!codeNumber.value) {
    console.log("沒填寫");
    error.value.code = false;
  } else if (isNaN(codeNumber.value)) {
    console.log("格式不對");
    error.value.code = false;
  } else if (String(codeNumber.value).length !== 6) {
    console.log("長度不對");
    error.value.code = false;
  } else {
    // 通過驗證
    console.log("通過");
    error.value.code = true;
  }
};
const selectedValue1 = ref("");
const options1 = [
  { value: "1", label: "選項一" },
  { value: "2", label: "選項二" },
  { value: "3", label: "選項三" },
];

// 哪裡有店面
const is_reward = ref(false);
const is_confirm = ref(false);
const rewardPop = () => {
  is_reward.value = true;
};
const confirmPop = () => {
  is_confirm.value = true;
};
const closePop = () => {
  is_reward.value = false;
  is_confirm.value = false;
  is_re.value = false;
};
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
.reward {
  h3 {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: $main-color;
    padding: 20px 0;
  }
  &_card {
    max-width: 294px;
    width: 100%;
    margin: auto;
    img {
      width: 100%;
    }
  }
  &_filter {
    opacity: 0.5;
  }
}
.getReward {
  background-color: #dcb98a;
  border-top: 3px solid $main-color;
  margin-top: 35px;
  padding-top: 35px;
  padding-bottom: 60px;
  position: relative;
  .rewardRedeem {
    max-width: 475px;
    margin: auto;
    padding: 0 30px;
    &_remind {
      font-size: 15px;
      font-weight: bold;
      line-height: 24px;
      text-align: center;
    }
    &_code {
      font-size: 12px;
      margin-top: 20px;
      margin-bottom: 8px;
      color: $main-color;
      p {
        margin-bottom: 8px;
        font-weight: 600;
      }
    }
    &_btn {
      width: 215px;
      position: absolute;
      top: -20px;
      left: calc(50% - 215px / 2);
      z-index: 3;
      img {
        width: 100%;
      }
    }
  }
}
.submitBtn {
  width: 180px;
  position: absolute;
  left: calc(50% - 180px / 2);
  bottom: -34px;
  margin: auto;
  margin-top: 30px;
  img {
    width: 100%;
  }
}
.reGame {
  p {
    font-size: 12px;
    text-align: center;
    color: $main-color;
    margin-top: 6px;
    font-weight: 600;
  }
}
.submitBtnRE {
  width: 200px;
  margin: auto;
  margin-top: 25px;
  img {
    width: 100%;
  }
}
.fenceCard_card {
  padding: 0;
}
.inputStyle {
  position: relative;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    z-index: -1;
    top: 4px;
    left: 4px;
    background-color: white;
  }
}
.rewardRedeem_code :deep(.selectHeader) {
  font-size: 15px;
}
.redeemCard {
  height: auto;
  min-height: unset;
}
.redeemConfirm {
  padding-bottom: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  line-height: 24px;
  position: relative;
  &_img {
    position: absolute;
    bottom: -50px;
    width: 120px;
    img {
      width: 100%;
    }
  }
}
</style>