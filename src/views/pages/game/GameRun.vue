<template>
  <div class="game-container">
    <iframe
      ref="gameFrame"
      src="/gameRun/index.html"
      frameborder="0"
      scrolling="no"
      class="game-frame"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const gameFrame = ref(null);
const gameScore = ref(0);
// 處理遊戲消息
const handleGameMessage = (event) => {
  // 確保消息來源安全
  if (event.origin !== window.location.origin) return;
  const { type, data } = event.data;
  switch (type) {
    case "gameOver":
      gameScore.value = data.score;
      // 這裡可以處理遊戲結束後的邏輯
      console.log("遊戲結束，分數：", data.score);
      console.log("最高分：", data.bestScore);
      break;
    case "copyUrl":
      console.log("複製網址");
      break;
  }
};

const handleResize = () => {
  if (!gameFrame.value) return;

  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const scale = Math.min(containerWidth / 320, containerHeight / 416);

  gameFrame.value.style.width = `${320 * scale}px`;
  gameFrame.value.style.height = `${416 * scale}px`;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
  window.addEventListener("message", handleGameMessage);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("message", handleGameMessage);
});
</script>

<style scoped>
.game-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  overflow: hidden;
}

.game-frame {
  border: none;
  max-width: 100%;
  max-height: 100%;
}
</style>