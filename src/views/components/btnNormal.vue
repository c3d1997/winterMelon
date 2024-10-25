<template>
  <div class="buttonType_normal">
    <div class="buttonType_normal-inner">{{ props.content }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.buttonType {
  &_normal {
    border: 8px solid;
    border-image: url(/images/border_04.png) stretch;
    border-image-slice: 32 fill;
    line-height: 40px;
    &-inner {
      color: white;
      text-align: center;
      position: relative;
      &::after {
        content: "";
        width: calc(100% + 8px);
        height: calc(100% + 8px);
        position: absolute;
        left: -5px;
        top: -6px;
        z-index: -1;
        background-color: $main-color;
      }
    }
  }
}
</style>