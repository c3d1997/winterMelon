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
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const emit = defineEmits(["update:modelValue"]);
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
  // 新增 id prop
  id: {
    type: String,
    required: true,
  },
});

const selectRef = ref(null);

// 改用 computed 來控制是否開啟
const isOpen = computed(() => {
  return userStore.openSelectId === props.id;
});
const selectedOption = computed(() => {
  return props.options.find((option) => option.value === props.modelValue);
});

const toggleDropdown = () => {
  if (isOpen.value) {
    userStore.closeAll();
  } else {
    userStore.setOpenSelect(props.id);
  }
};

const selectOption = (option) => {
  emit("update:modelValue", option.value);
  userStore.closeAll();
};

// 點擊外部關閉下拉選單
const clickOutside = (event) => {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    userStore.closeAll();
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
  border: 2px solid $main-color;
  border-radius: 4px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.option {
  padding: 8px 12px;
  cursor: pointer;
  color: $main-color;
  padding: 16px;
  padding-left: 20px;
  &:last-child {
    border-bottom: none;
  }
}

.option:hover {
  background-color: #f5f5f5;
}

.option.selected {
  background-color: #e6f7ff;
}
</style>