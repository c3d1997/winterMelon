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
          <span>{{ userStore.loveType }}</span>
        </div>
        <div class="introduce_content dataCardType2">
          <span>{{ introduceData.title }}</span>
          <p>
            {{ introduceData.content }}
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
// import { get_member_info } from "@/utils/api";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const introduceData = ref({
  title: "",
  content: "",
});
onMounted(async () => {
  if (userStore.loveType == "Coffee") {
    introduceData.value = {
      title: "Winter Melon Tea Mix Kopi Tea",
      content:
        "A harmonious blend of earthy winter melon and rich, aromatic coffee. Perfect for those who crave a caffeine boost with a tropical twist.",
    };
  } else if (userStore.loveType == "grass jelly") {
    introduceData.value = {
      title: "Winter Melon Mix Cing Cau Tea",
      content:
        "A delightful fusion of winter melon and the sweet, herbal notes of Cing Cau. A soothing and comforting drink, ideal for relaxation.",
    };
  } else if (userStore.loveType == "Cendol") {
    introduceData.value = {
      title: "Winter Melon Mix Cendol Tea",
      content:
        "Paradise in a cup! This mix combines the creamy sweetness of cendol with the refreshing taste of winter melon.",
    };
  } else if (userStore.loveType == "lemon") {
    introduceData.value = {
      title: "Winter Melon Mix Lemon Tea",
      content:
        "A zesty and invigorating blend of winter melon and tangy lemon. A perfect pick-me-up for any time of day.",
    };
  } else if (userStore.loveType == "pineapple") {
    introduceData.value = {
      title: "Winter Melon Mix Nanas Tea",
      content:
        "A tropical dream! This mix combines the sweet and juicy flavors of winter melon and pineapple.",
    };
  } else if (userStore.loveType == "Dragon Fruit") {
    introduceData.value = {
      title: "Winter Melon Mix Dragon Fruit Tea",
      content:
        "A vibrant and exotic blend of winter melon and dragon fruit. A colorful and delicious drink that's packed with antioxidants.",
    };
  } else if (userStore.loveType == "guava") {
    introduceData.value = {
      title: "Winter Melon Mix Guava Tea",
      content:
        "A refreshing and fruity blend of winter melon and guava. A perfect thirst quencher for hot summer days.",
    };
  } else if (userStore.loveType == "milk") {
    introduceData.value = {
      title: "Winter Melon Mix Milk Tea",
      content:
        "A creamy and indulgent treat. This mix combines the rich, milky flavor of milk tea with the refreshing taste of winter melon.",
    };
  } else if (userStore.loveType == "roselle") {
    introduceData.value = {
      title: "Winter Melon Mix Roselle Tea",
      content:
        "A tart and tangy blend of winter melon and roselle. A healthy and delicious drink that's packed with vitamin C.",
    };
  } else if (userStore.loveType == "herbal") {
    introduceData.value = {
      title: "Winter Melon Mix Herbal Tea",
      content:
        "A soothing and calming blend of winter melon and a variety of herbs. A perfect bedtime drink to help you relax and unwind.",
    };
  } else if (userStore.loveType == "soymilk") {
    introduceData.value = {
      title: "Winter Melon Tea Mix Soya",
      content:
        "A creamy and plant-based alternative to dairy milk tea. This mix combines the rich, nutty flavor of soy milk with the refreshing taste of winter melon.",
    };
  }
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
    span {
      font-weight: 600;
      color: $main-color;
    }
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