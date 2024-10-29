<template>
  <div class="containerBg containerBg-filter"></div>
  <div class="container">
    <div class="title flex-center">
      <img src="/images/en_title.png" alt="" />
    </div>
    <div class="login flex-center">
      <img src="/images/en_login.png" alt="" />
    </div>
    <div class="phone">
      <div class="phone_input">
        <span>Enter your phone number</span>
        <div class="phoneinputStyle">
          <vue-tel-input
            v-model="phoneNumber"
            :inputOptions="{
              placeholder: 'Phone number',
              showDialCode: false,
              autocomplete: 'off',
            }"
            :validCharactersOnly="true"
            @on-input="onInput"
            @validate="onValidate"
            @country-changed="onCountryChanged"
          ></vue-tel-input>
        </div>
        <div class="errorMessage">
          <p v-if="!error.phone">Enter a valid mobile number</p>
        </div>
        <btnNormal
          content="Send Verification Code"
          @click="submitPhone"
        ></btnNormal>
      </div>
      <!-- <div class="inputStyle" contenteditable="true" ref="phoneInputRef"></div> -->

      <span>Enter verification code</span>
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
      <btnNormal content="LOGIN" @click="submitVerify"></btnNormal>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import btnNormal from "@/views/components/btnNormal.vue";
import { api_send_verify_code, verify_account, setCookies } from "@/utils/api";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const error = ref({
  phone: true,
  code: true,
});
// 手機驗證
const phoneNumber = ref("");
const phoneValue = ref("");
const onInput = (number, phoneObject) => {
  // console.log("number:", number);
  // console.log("phoneObject:", phoneObject);
  console.log("手機號碼", phoneObject.number);
  phoneValue.value = phoneObject.number;
};

const onValidate = (phoneObject) => {
  if (phoneObject.valid != undefined) {
    console.log("電話號碼驗證:", phoneObject);
    console.log("電話號碼瑱正是否通過", phoneObject.valid);
    error.value.phone = phoneObject.valid;
  }
};

const onCountryChanged = (countryObject) => {
  console.log("國家變更參數:", countryObject);
};

// 驗證碼驗證
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

// 收取驗證碼
const isSubmitting = ref(false); //防抖動
const submitPhone = async () => {
  if (isSubmitting.value) return;
  try {
    isSubmitting.value = true;
    console.log(phoneValue.value);
    const data = {
      phone: phoneValue.value,
    };
    const verify_result = await api_send_verify_code(data);
    if (verify_result.status == "success") {
      console.log("收取驗證碼成功");
    } else if (verify_result.status == "error") {
      console.log("收取驗證碼失敗");
    }
  } finally {
    isSubmitting.value = false;
  }
};

// 驗證驗證碼是否正確
// 驗證是否有填寫
const validateForm = () => {
  if (phoneValue.value == undefined || phoneValue.value == "") {
    error.value.phone = false;
  }
  if (codeNumber.value == "") {
    error.value.code = false;
  }
  return error.value.phone && error.value.code;
};
const submitVerify = async () => {
  console.log(phoneValue.value);
  if (!validateForm()) {
    return;
  }
  const data = {
    code: codeNumber.value,
    phone: phoneValue.value,
  };
  console.log(data);
  const verifyAccount_result = await verify_account(data);
  if (verifyAccount_result.status == "success") {
    console.log("驗證成功");
    await setCookies(
      verifyAccount_result.payload.token,
      verifyAccount_result.payload.exp
    );
    router.push("/registration/mbti");
  } else if (verifyAccount_result.status == "error") {
    console.log("驗證失敗");
  }
};
</script>

<style lang="scss" scoped>
.login {
  margin-bottom: 6px;
  img {
    width: 100%;
    max-width: 145px;
  }
}
.phone {
  padding: 0 25px;
  &_input {
    margin-bottom: 25px;
  }
  span {
    font-size: 12px;
    color: $main-color;
    display: block;
    margin-bottom: 7px;
  }
}

.phoneinputStyle {
  position: relative;
  width: 100%;
  line-height: 38px;
  height: 48px;
  border: 8px solid transparent;
  font-size: 15px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-image: url(/images/border_04.png) 32 stretch;
  padding-left: 0px;

  &:focus {
    outline: 0;
  }
  &::after {
    content: "";
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    z-index: -1;
    top: -2px;
    left: -2px;
    padding: 4px;
    background-color: #fff;
  }
}

:deep(.vue-tel-input) {
  border: none;
  height: 48px;
}
:deep(.vti__input) {
  background-color: none;
  background: transparent;
}
:deep(.vue-tel-input:focus-within) {
  box-shadow: none;
}
:deep(.vti__dropdown.open) {
  background: transparent;
}
:deep(.vti__dropdown:hover) {
  background: transparent;
}
:deep(.vti__dropdown) {
  position: unset;
}
:deep(.vti__dropdown-list) {
  width: calc(100% + 8px);
  border-radius: 6px;
}
:deep(.vti__dropdown-list.below) {
  top: 42px;
  left: -4px;
}

:deep(input:is(:-webkit-autofill, :autofill)) {
  height: 40px;
  line-height: 48px;
  margin-top: 4px;
  width: 100%;
}
</style>