<template>
  <div class="arrow" style="display: flex; justify-content: center">
    <img src="../assets/icons/arrow.png" alt="Arrow" />
  </div>
  <div class="block">
    <div class="container" ref="containerRef" @wheel="onWheel">
      <div class="time-item" v-for="time in times" :key="time">{{ time }}</div>
    </div>
    <div class="item">{{ selectedTime }}</div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'TimeSelector',
  props: {
    initialTime: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:time'],
  setup(props, { emit }) {
    const containerRef = ref(null);
    const data = ref(0);
    const times = ref([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
    const selectedTime = ref(props.initialTime);

    const onWheel = (e) => {
      e.preventDefault();
      const delta = -e.deltaY;
      data.value += (delta / 100) * 6;

      if (data.value % 360 === 0) {
        data.value = 0;
      }

      containerRef.value.style.transform = `rotate(${data.value}deg)`;

      if (data.value > 0) {
        selectedTime.value = 60 - data.value / 6;
      } else if (data.value < 0) {
        selectedTime.value = data.value / -6;
      } else if (data.value % 360 === 0) {
        selectedTime.value = 0;
      }

      emit('update:time', selectedTime.value);
    };

    onMounted(() => {
      if (containerRef.value) {
        containerRef.value.addEventListener('wheel', onWheel, { passive: false });
      }
    });

    onUnmounted(() => {
      if (containerRef.value) {
        containerRef.value.removeEventListener('wheel', onWheel);
      }
    });

    return {
      containerRef,
      times,
      selectedTime
    };
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, sans-serif;
  background-color: aliceblue;
}

.arrow img {
  margin-top: 25vh;
  width: 24px;
  margin-bottom: 30px;
}

.block {
  position: relative;
  border-radius: 50%;
  box-shadow: 5px 5px 5px #b9bbc4, -5px -5px 5px #fff;
  background: linear-gradient(
    -45deg,
    rgba(197, 197, 197, 1) 0%,
    rgba(218, 218, 218, 1) 11%,
    rgba(255, 255, 255, 1) 100%
  );
  margin: 0 auto;
  width: 300px;
  border-radius: 50%;
  transition: all 0.5s;
}

.container {
  position: relative;
  width: 300px;
  height: 300px;
  transition: all 0.5s;
}

.item {
  padding: 20px;
  width: 100px;
  height: 100px;
  text-align: center;
  border-radius: 50%;
  background-color: rgb(244, 247, 250);
  font-size: 41px;
  color: #00000054;
  font-weight: 600;
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  transition: all 0.5s;
  pointer-events: none;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
}

.block:hover {
  box-shadow: 15px 15px 15px #b9bbc4;
  transform: scale(1.1);
}

.time-item {
  position: absolute;
  margin-left: calc(50% - 15px);
  width: 30px;
  height: 130px;
  text-align: center;
  transform: translateY(20px);
  transform-origin: 15px 130px;
  transition: all 0.5s;
  color: black;
  font-size: 15px;
  opacity: 0;
}

.time-item::after {
  content: "";
  position: absolute;
  width: 3px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  left: 13px;
  top: 30px;
  opacity: 1;
  border-radius: 3px;
}

.time-item:nth-child(1) {
  color: rgba(0, 0, 0, 0);
  opacity: 1;
}

.block:hover .time-item {
  opacity: 1;
  color: black;
  pointer-events: none;
}

.block:hover .item {
  box-shadow: rgb(204, 219, 232) 6px 6px 12px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
}

.block:hover .time-item:nth-child(2) {
  transform: translateY(20px) rotate(30deg);
}

.block:hover .time-item:nth-child(3) {
  transform: translateY(20px) rotate(60deg);
}

.block:hover .time-item:nth-child(4) {
  transform: translateY(20px) rotate(90deg);
}

.block:hover .time-item:nth-child(5) {
  transform: translateY(20px) rotate(120deg);
}

.block:hover .time-item:nth-child(6) {
  transform: translateY(20px) rotate(150deg);
}

.block:hover .time-item:nth-child(7) {
  transform: translateY(20px) rotate(180deg);
}

.block:hover .time-item:nth-child(8) {
  transform: translateY(20px) rotate(210deg);
}

.block:hover .time-item:nth-child(9) {
  transform: translateY(20px) rotate(240deg);
}

.block:hover .time-item:nth-child(10) {
  transform: translateY(20px) rotate(270deg);
}

.block:hover .time-item:nth-child(11) {
  transform: translateY(20px) rotate(300deg);
}

.block:hover .time-item:nth-child(12) {
  transform: translateY(20px) rotate(330deg);
}
</style>
