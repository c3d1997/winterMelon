// stores/timerStore.js
import { defineStore } from "pinia";

export const useTimerStore = defineStore("timer", {
  state: () => ({
    remainingTime: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    intervalId: null,
  }),

  actions: {
    // 計算下一個目標時間
    getNextTargetTime() {
      const now = new Date();
      const hours = now.getHours();

      // 計算下一個 4 小時區間
      let nextHour;
      if (hours < 4) nextHour = 4;
      else if (hours < 8) nextHour = 8;
      else if (hours < 12) nextHour = 12;
      else if (hours < 16) nextHour = 16;
      else if (hours < 20) nextHour = 20;
      else nextHour = 24;

      const nextTime = new Date(now);
      nextTime.setHours(nextHour, 0, 0, 0);

      return nextTime;
    },

    // 更新倒數時間
    updateRemainingTime() {
      const now = new Date();
      const targetTime = this.getNextTargetTime();

      // 計算剩餘毫秒數
      this.remainingTime = targetTime - now;

      // 轉換成時分秒
      this.hours = Math.floor(this.remainingTime / (1000 * 60 * 60));
      this.minutes = Math.floor(
        (this.remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      this.seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);

      // 如果時間到了，重新計算下一個時間點
      if (this.remainingTime <= 0) {
        this.stopTimer();
      }
    },

    // 開始計時器
    startTimer() {
      // 清除既有的計時器
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

      // 立即更新一次
      this.updateRemainingTime();

      // 設置每秒更新
      this.intervalId = setInterval(() => {
        this.updateRemainingTime();
      }, 1000);
    },

    // 停止計時器
    stopTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },

    // 格式化時間顯示
    formatTime() {
      return `${String(this.hours).padStart(2, "0")}:${String(
        this.minutes
      ).padStart(2, "0")}:${String(this.seconds).padStart(2, "0")}`;
    },
  },
  persist: {
    remainingTime: true,
    hours: true,
    minutes: true,
    seconds: true,
    intervalId: true,
    strategies: [
      {
        key: "my_user_store",
        storage: localStorage,
        paths: ["timer"],
      },
    ],
  },
});
