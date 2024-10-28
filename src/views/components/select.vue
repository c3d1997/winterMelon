<!-- CustomSelect.vue -->
<template>
  <div class="customSelect" ref="selectRef">
    <div class="selectHeader" @click.stop="toggleDropdown">
      <span>{{ selectedOption ? selectedOption.label : placeholder }}</span>
      <span class="arrow" :class="{ 'arrow-up': isOpen }"
        ><img src="/images/selectArrow.png" alt=""
      /></span>
    </div>

    <div class="optionsContainer" v-if="isOpen">
      <div
        v-for="option in options"
        :key="option.value"
        class="option"
        :class="{ selected: option.value === modelValue }"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "請選擇",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectRef = ref(null);

const selectedOption = computed(() => {
  return props.options.find((option) => option.value === props.modelValue);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  emit("update:modelValue", option.value);
  isOpen.value = false;
  console.log(isOpen.value);
  console.log(option.value);
};

// 點擊外部關閉下拉選單
const clickOutside = (event) => {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};
onMounted(() => {
  document.addEventListener("click", clickOutside);
});
</script>

<style scoped lang="scss">
.customSelect {
  position: relative;
  width: 200px;
  user-select: none;
  width: 100%;
}

.selectHeader {
  border: 6px solid;
  position: relative;
  z-index: 1;
  border-image: url(/images/border_04.png) stretch;
  border-image-slice: 32 fill;
  line-height: 35px;
  font-size: 13px;
  padding-left: 40px;
  color: #848484;
  &::after {
    content: "";
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    position: absolute;
    left: -2px;
    top: -2px;
    z-index: -1;
    background-color: white;
  }
}

.arrow {
  position: absolute;
  left: 15px;
  width: 12px;
  top: -2px;
  img {
    width: 100%;
  }
}

.optionsContainer {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.option {
  padding: 8px 12px;
  cursor: pointer;
}

.option:hover {
  background-color: #f5f5f5;
}

.option.selected {
  background-color: #e6f7ff;
}
</style>