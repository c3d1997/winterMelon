<template>
  <div class="game-container">
    <iframe
      ref="gameFrame"
      src="/gameCamera/index.html"
      frameborder="0"
      scrolling="no"
      class="game-frame"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

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
      break;
  }
};

const handleResize = () => {
  if (!gameFrame.value) return;

  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;

  // 調整為更接近手機螢幕的比例 (例如 9:16)
  const targetRatio = 9 / 16; // 或其他適合的比例

  // 或者使用特定的數值比例
  // const targetRatio = 375/667; // iPhone SE/8 比例

  let width, height;

  // 計算實際要使用的寬高
  if (containerWidth / containerHeight > targetRatio) {
    height = containerHeight;
    width = height * targetRatio;
  } else {
    width = containerWidth;
    height = width / targetRatio;
  }

  // 設置 iframe 尺寸
  gameFrame.value.style.width = `${width}px`;
  gameFrame.value.style.height = `${height}px`;
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