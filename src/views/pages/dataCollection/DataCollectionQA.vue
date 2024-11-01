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
          <div class="qa_selects-group">
            <selectModel
              v-model="selectedValue1"
              :options="options1"
              placeholder="What is your gender?"
              id="select1"
            ></selectModel>
            <div class="errorMessage" v-if="formErrors.gender">請選擇性別</div>
          </div>
          <div class="qa_selects-group">
            <selectModel
              v-model="selectedValue2"
              :options="options2"
              placeholder="What is your age?"
              id="select2"
            ></selectModel>
            <div class="errorMessage" v-if="formErrors.age">請選擇年齡</div>
          </div>
          <div class="qa_selects-group">
            <selectModel
              v-model="selectedValue3"
              :options="options3"
              placeholder="How often you buy?"
              id="select3"
            ></selectModel>
            <div class="errorMessage" v-if="formErrors.frequency">
              請選擇購買頻率
            </div>
          </div>
          <div class="qa_selects-group">
            <selectModel
              v-model="region"
              :options="regionOption"
              placeholder="Where is your Region?"
              id="select6"
            ></selectModel>
            <div class="errorMessage" v-if="formErrors.from">
              請選擇所處地區
            </div>
          </div>
          <div class="qa_selects-group" v-if="region">
            <selectModel
              v-model="state"
              :options="stateOption"
              placeholder="Where is your State?"
              id="select4"
            ></selectModel>
            <div class="errorMessage" v-if="formErrors.location">
              請選擇所處州
            </div>
          </div>

          <div
            class="qa_selects-group"
            v-if="
              state &&
              region == 'West Malaysia' &&
              state != 'westFederalTerritory' &&
              state != 'Perlis'
            "
          >
            <selectModel
              v-model="district"
              :options="districtOptions"
              placeholder="Where is your district?"
              id="select5"
            ></selectModel>
            <div class="errorMessage" v-if="formErrors.locationDetial">
              請選擇所處區域
            </div>
          </div>
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
      <div class="submitBtn" @click="submitIntroduce">
        <img src="/images/submit.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import selectModel from "@/views/components/select.vue";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

// 下拉
const selectedValue1 = ref("");
const options1 = [
  { value: "1", label: "Male" },
  { value: "2", label: "Female" },
];
const selectedValue2 = ref("");
const options2 = [
  { value: "1", label: "under 15" },
  { value: "2", label: "16-20" },
  { value: "3", label: "21-25" },
  { value: "4", label: "26-30" },
  { value: "5", label: "31-35" },
  { value: "6", label: "36-40" },
  { value: "7", label: "41-45" },
  { value: "8", label: "46-50" },
  { value: "9", label: "50 above" },
];
const selectedValue3 = ref("");
const options3 = [
  { value: "1", label: "First time" },
  { value: "2", label: "1-3 times a month" },
  { value: "3", label: "3-10 times a month" },
  { value: "4", label: "More than 10 times a month" },
];
const region = ref("");
const regionOption = [
  { value: "West Malaysia", label: "West Malaysia" },
  { value: "East Malaysia", label: "East Malaysia" },
];

const state = ref("");
const alllocationOptions = {
  "West Malaysia": [
    { value: "westFederalTerritory", label: "Federal Territory (Malaysia)" },
    { value: "Johor", label: "Johor" },
    { value: "Kedah", label: "Kedah" },
    { value: "Kelantan", label: "Kelantan" },
    { value: "Malacca", label: "Malacca" },
    { value: "Negeri Sembilan", label: "Negeri Sembilan" },
    { value: "Pahang", label: "Pahang" },
    { value: "Penang", label: "Penang" },
    { value: "Perak", label: "Perak" },
    { value: "Perlis", label: "Perlis" },
    { value: "Selangor", label: "Selangor" },
    { value: "Terengganu", label: "Terengganu" },
  ],
  "East Malaysia": [
    { value: "eastFederalTerritory", label: "Federal Territory (Malaysia)" },
    { value: "Sabah", label: "Sabah" },
    { value: "Sarawak", label: "Sarawak" },
  ],
};
const stateOption = computed(() => {
  if (!region.value) {
    return [];
  }
  return alllocationOptions[region.value] || [];
});
const district = ref("");
const allTownOptions = {
  westFederalTerritory: [],
  Johor: [
    { value: "Batu Pahat District", label: "Batu Pahat District" },
    { value: "Johor Bahru District", label: "Johor Bahru District" },
    { value: "Kluang District", label: "Kluang District" },
    { value: "Kota Tinggi District", label: "Kota Tinggi District" },
    { value: "Kulai District", label: "Kulai District" },
    { value: "Mersing District", label: "Mersing District" },
    { value: "Muar District", label: "Muar District" },
    { value: "Pontian District", label: "Pontian District" },
    { value: "Segamat District", label: "Segamat District" },
    { value: "Tangkak District", label: "Tangkak District" },
  ],
  Kedah: [
    { value: "Baling District", label: "Baling District" },
    { value: "Bandar Baharu District", label: "Bandar Baharu District" },
    { value: "Kota Setar District", label: "Kota Setar District" },
    { value: "Kuala Muda District", label: "Kuala Muda District" },
    { value: "Kubang Pasu District", label: "Kubang Pasu District" },
    { value: "Kulim District", label: "Kulim District" },
    { value: "Langkawi District", label: "Langkawi District" },
    { value: "Padang Terap District", label: "Padang Terap District" },
    { value: "Pendang District", label: "Pendang District" },
    { value: "Pokok Sena District", label: "Pokok Sena District" },
    { value: "Sik District", label: "Sik District" },
    { value: "Yan District", label: "Yan District" },
  ],
  Kelantan: [
    { value: "Bachok District", label: "Bachok District" },
    { value: "Gua Musang District", label: "Gua Musang District" },
    { value: "Jeli District", label: "Jeli District" },
    { value: "Kota Bharu District", label: "Kota Bharu District" },
    { value: "Kuala Krai District", label: "Kuala Krai District" },
    { value: "Machang District", label: "Machang District" },
    { value: "Pasir Mas District", label: "Pasir Mas District" },
    { value: "Pasir Puteh District", label: "Pasir Puteh District" },
    { value: "Tanah Merah District", label: "Tanah Merah District" },
    { value: "Tumpat District", label: "Tumpat District" },
  ],
  Malacca: [
    { value: "Alor Gajah District", label: "Alor Gajah District" },
    { value: "Jasin District", label: "Jasin District" },
    { value: "Melaka Tengah District", label: "Melaka Tengah District" },
  ],
  "Negeri Sembilan": [
    { value: "Jelebu District", label: "Jelebu District" },
    { value: "Jempol District", label: "Jempol District" },
    { value: "Kuala Pilah District", label: "Kuala Pilah District" },
    { value: "Port Dickson District", label: "Port Dickson District" },
    { value: "Rembau District", label: "Rembau District" },
    { value: "Seremban District", label: "Seremban District" },
    { value: "Tampin District", label: "Tampin District" },
  ],
  Pahang: [
    { value: "Bentong District", label: "Bentong District" },
    { value: "Bera District", label: "Bera District" },
    {
      value: "Cameron Highlands District",
      label: "Cameron Highlands District",
    },
    { value: "Jerantut District", label: "Jerantut District" },
    { value: "Kuantan District", label: "Kuantan District" },
    { value: "Lipis District", label: "Lipis District" },
    { value: "Maran District", label: "Maran District" },
    { value: "Pekan District", label: "Pekan District" },
    { value: "Raub District", label: "Raub District" },
    { value: "Rompin District", label: "Rompin District" },
    { value: "Temerloh District", label: "Temerloh District" },
  ],
  Penang: [
    {
      value: "Central Seberang Perai District",
      label: "Central Seberang Perai District",
    },
    {
      value: "North Seberang Perai District",
      label: "North Seberang Perai District",
    },
    {
      value: "Northeast Penang Island District",
      label: "Northeast Penang Island District",
    },
    {
      value: "South Seberang Perai District",
      label: "South Seberang Perai District",
    },
    {
      value: "Southwest Penang Island District",
      label: "Southwest Penang Island District",
    },
  ],
  Perak: [
    { value: "Bagan Datuk District", label: "Bagan Datuk District" },
    { value: "Batang Padang District", label: "Batang Padang District" },
    { value: "Hilir Perak District", label: "Hilir Perak District" },
    { value: "Hulu Perak District", label: "Hulu Perak District" },
    { value: "Kampar District", label: "Kampar District" },
    { value: "Kerian District", label: "Kerian District" },
    { value: "Kinta District", label: "Kinta District" },
    { value: "Kuala Kangsar District", label: "Kuala Kangsar District" },
    {
      value: "Larut, Matang and Selama District",
      label: "Larut, Matang and Selama District",
    },
    { value: "Manjung District", label: "Manjung District" },
    { value: "Muallim District", label: "Muallim District" },
    { value: "Perak Tengah District", label: "Perak Tengah District" },
  ],
  Perlis: [{ value: "Kangar", label: "Kangar" }],
  Selangor: [
    { value: "Gombak District", label: "Gombak District" },
    { value: "Hulu Langat District", label: "Hulu Langat District" },
    { value: "Hulu Selangor District", label: "Hulu Selangor District" },
    { value: "Klang District", label: "Klang District" },
    { value: "Kuala Langat District", label: "Kuala Langat District" },
    { value: "Kuala Selangor District", label: "Kuala Selangor District" },
    { value: "Petaling District", label: "Petaling District" },
    { value: "Sabak Bernam District", label: "Sabak Bernam District" },
    { value: "Sepang District", label: "Sepang District" },
  ],
  Terengganu: [
    { value: "Besut District", label: "Besut District" },
    { value: "Dungun District", label: "Dungun District" },
    { value: "Hulu Terengganu District", label: "Hulu Terengganu District" },
    { value: "Kemaman District", label: "Kemaman District" },
    { value: "Kuala Nerus District", label: "Kuala Nerus District" },
    { value: "Kuala Terengganu District", label: "Kuala Terengganu District" },
    { value: "Marang District", label: "Marang District" },
    { value: "Setiu District", label: "Setiu District" },
  ],
};
const districtOptions = computed(() => {
  if (!state.value) {
    return [];
  }
  return allTownOptions[state.value] || [];
});
watch(state, (newValue) => {
  district.value = "";
});

// 單選
const selected = ref("1");

const radioList = [
  { value: "1", label: "Coffee" },
  { value: "2", label: "grass jelly" },
  { value: "3", label: "Cendol" },
  { value: "4", label: "lemon" },
  { value: "5", label: "pineapple " },
  { value: "6", label: "Dragon Fruit" },
  { value: "7", label: "guava" },
  { value: "8", label: "milk" },
  { value: "9", label: "roselle" },
  { value: "10", label: "herbal" },
  { value: "11", label: "soymilk" },
];
// 新增錯誤狀態
const formErrors = ref({
  gender: false,
  age: false,
  frequency: false,
  from: false,
  location: false,
  fruit: false,
});

// 驗證函數
const validateForm = () => {
  let isValid = true;
  // 重置錯誤狀態
  formErrors.value = {
    gender: selectedValue1.value ? false : true,
    age: selectedValue2.value ? false : true,
    frequency: selectedValue3.value ? false : true,
    location: state.value ? false : true,
    locationDetial: state.value && district.value ? false : true,
  };

  return !Object.values(formErrors.value).some((error) => error);
};

// 監聽每個 select 值的變化
watch(selectedValue1, (newValue) => {
  if (newValue) {
    formErrors.value.gender = false;
  }
});

watch(selectedValue2, (newValue) => {
  if (newValue) {
    formErrors.value.age = false;
  }
});

watch(selectedValue3, (newValue) => {
  if (newValue) {
    formErrors.value.frequency = false;
  }
});

watch(state, (newValue) => {
  if (newValue) {
    formErrors.value.location = false;
  }
  // 區域改變時重置鄉鎮並清除其錯誤
  district.value = "";
  formErrors.value.locationDetial = false;
});

watch(district, (newValue) => {
  if (newValue) {
    formErrors.value.locationDetial = false;
  }
});
watch(region, (newValue) => {
  if (newValue) {
    formErrors.value.from = false;
  }
});

// 送出資料
const submitIntroduce = async () => {
  if (!validateForm()) {
    console.log("請選取所有項目");
    return;
  }
  // 給地址的時候 區域跟啥都用/
  console.log(selectedValue1.value);
  console.log(selectedValue2.value);
  console.log(selectedValue3.value);
  console.log(region.value);
  console.log(state.value);
  console.log(district.value);
  console.log(selected.value);
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
    margin-bottom: 25px;
    &-group {
      margin-bottom: 22px;
      position: relative;
      .errorMessage {
        position: absolute;
      }
    }
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
.fenceCard_card {
  padding-bottom: 40px;
}
</style>