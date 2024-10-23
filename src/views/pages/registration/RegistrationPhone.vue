<template>
  <div class="containerBg"></div>
  <div class="container">
    <div class="title flex-center">
      <img src="/images/en_title.png" alt="" />
    </div>
    <div class="login flex-center">
      <img src="/images/en_login.png" alt="" />
    </div>
    <div class="phone">
      <span>Enter your phone number</span>
      <div class="phone_input inputStyle inputStyle-phone">
        <vue-tel-input
          v-model="phoneNumber"
          :inputOptions="{
            placeholder: 'Phone number',
            showDialCode: false,
          }"
          :validCharactersOnly="true"
          @on-input="onInput"
          @validate="onValidate"
          @country-changed="onCountryChanged"
        ></vue-tel-input>
      </div>
      <div class="errorMessage" v-if="!isValid">
        Enter a valid mobile number
      </div>
      <div
        class="phone_input inputStyle"
        contenteditable="true"
        ref="phoneInputRef"
      ></div>
      <input
        type="number"
        placeholder="手機"
        v-model="phoneNumber"
        @input="onPhoneInput"
        class="hiddenInput"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const phoneNumber = ref("");
const isValid = ref(true);
const currentCountry = ref(null);

const onInput = (number, phoneObject) => {
  // console.log("number:", number);
  // console.log("phoneObject:", phoneObject);
  console.log("手機號碼", phoneObject.number);
};

const onValidate = (phoneObject) => {
  if (phoneObject.valid != undefined) {
    console.log("電話號碼驗證:", phoneObject);
    console.log("電話號碼瑱正是否通過", phoneObject.valid);
    isValid.value = phoneObject.valid;
  }
};

const onCountryChanged = (countryObject) => {
  console.log("國家變更參數:", countryObject);
};
</script>

<style lang="scss" scoped>
.title {
  padding-top: 28px;
  margin-bottom: 24px;
  img {
    width: 100%;
  }
}
.login {
  margin-bottom: 6px;
  img {
    width: 100%;
    max-width: 145px;
  }
}
.phone {
  padding: 0 25px;
  span {
    font-size: 12px;
    color: $main-color;
    display: block;
    margin-bottom: 7px;
  }
}
.inputStyle {
  position: relative;
  width: 100%;
  line-height: 38px;
  height: 48px;
  border: 5px solid transparent;
  font-size: 15px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-image: url(/images/border_04.svg) 16 stretch;
  &-phone {
    padding-left: 0px;
  }

  &:focus {
    outline: 0;
  }
  &::after {
    content: "";
    position: absolute;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    z-index: -1;
    top: 0;
    left: 0;
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
</style>