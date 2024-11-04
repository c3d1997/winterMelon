<template>
  <div class="popupBG" v-if="is_reward || is_confirm || is_re"></div>
  <div class="popup" v-if="is_reward">
    <div class="popup_card">
      <div class="popup_card-X" @click="closePop">
        <img src="/images/X.png" alt="" />
      </div>
      <div class="popup_card-content">
        <p>Get Reward Place Here:</p>
        <span class="address">新山店</span>
        <a href="https://maps.app.goo.gl/VW1m6SWCQpveMo798" class="address"
          >59, Jln Anggerik Emas 1, Taman Perusahaan Ringan Pulai, 81300 Skudai,
          Johor, 馬來西亞</a
        >
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
        <div class="redeemConfirm_img" @click="reStart">
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
        <h3 v-if="!is_reGame">Congratulations! Your Reward:</h3>
        <h3 v-else>Your Reward!</h3>
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
                type="text"
                :value="codeNumber"
                readonly
                class="inputStyle_Input"
              />
              <div class="inputStyle_icon">
                <img src="/images/vCode.png" alt="" />
              </div>
            </div>
            <selectModel
              v-model="selectedValue1"
              :options="options1"
              placeholder="Select Operating Store"
            ></selectModel>
            <div class="errorMessage" v-if="formErrors.location">
              請選擇所處區域
            </div>
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
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import selectModel from "@/views/components/select.vue";
import {
  write_off,
  get_member_info,
  restart_game,
  get_gift,
} from "@/utils/api";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const is_reGame = ref(false);
const is_re = ref(false);

const isSubmit = ref(false);
const handleRedeem = async () => {
  if (isSubmit.value == true) {
    return;
  }
  isSubmit.value = true;
  try {
    const data = {
      branch: selectedValue1.value,
    };
    console.log(data);
    const writeOffResult = await write_off(data);
    if (writeOffResult.status == "success") {
      console.log("核銷獎品成功");
      is_reGame.value = true;
      is_confirm.value = false;
      await userStore.getMemberInfo();
    } else if (writeOffResult.status == "error") {
      console.log("核銷獎品失敗");
    }
  } catch (error) {
    console.log("核銷獎品錯誤", error);
  } finally {
    isSubmit.value = false;
  }
};
watch(
  () => userStore.user.setting_info.is_wirte_off,
  (newStatus) => {
    if (newStatus === true) {
      is_reGame.value = true;
    } else {
      is_reGame.value = false;
    }
  }
);
// 重新開始
const reStart = async () => {
  if (isSubmit.value == true) {
    return;
  }
  isSubmit.value = true;
  try {
    const restartGameResult = await restart_game();
    if (restartGameResult.status == "success") {
      console.log("重新開始成功");
      router.push("/registration/mbti");
    } else if (restartGameResult.status == "error") {
      console.log("重新開始失敗");
    }
  } catch (error) {
    console.log("重新開始錯誤", error);
  } finally {
    isSubmit.value = false;
  }
};
const rePop = () => {
  is_re.value = true;
};
const codeNumber = ref("");
const generateRandomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  codeNumber.value = result;
};
const selectedValue1 = ref("");
const options1 = [{ value: "新山店", label: "新山店" }];

// 哪裡有店面
const is_reward = ref(false);
const is_confirm = ref(false);
const rewardPop = () => {
  is_reward.value = true;
};
const confirmPop = () => {
  if (!validateForm()) {
    return;
  }
  is_confirm.value = true;
};
const closePop = () => {
  is_reward.value = false;
  is_confirm.value = false;
  is_re.value = false;
};

// 下拉選單驗證
const formErrors = ref({
  location: false,
});
const validateForm = () => {
  formErrors.value.location = !selectedValue1.value;
  return !Object.values(formErrors.value).some((error) => error);
};
watch(selectedValue1, (newValue) => {
  if (newValue) {
    formErrors.value.location = false;
  }
});

onMounted(async () => {
  generateRandomCode();
  await userStore.getMemberInfo();
  is_reGame.value = userStore.user.setting_info.is_wirte_off;
});
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
.popup_card-content {
  span {
    margin-top: 12px;
  }
  a {
    font-size: 14px;
    color: $main-color;
  }
}
.inputStyle {
  margin-bottom: 20px;
}
</style>