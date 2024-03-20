<template>
  <button v-if="runMin == null" @click="startTimer">start</button>

  <p>Начало Выполнения: {{ whenStart.time }}</p>
  <p>
    Всего времени затрачено:
    <span v-if="whenStart.razn.hour != 0">{{ whenStart.razn.hour }} : </span
    >{{ whenStart.razn.min }} : {{ whenStart.razn.sec }}
  </p>

  <div class="timer">
    <p v-if="isfreeTime">Идет перерыв</p>
    <p v-else>Рабочее время</p>

    <p>
      Минуты <span class="min"> {{ runMin }} : </span> Секунды
      <span class="sec">{{ runSec }}</span>
    </p>
  </div>
  <button @click="pause">Пауза</button>
  <button @click="sbros">Сброс</button>

  <div :class="isfreeTime ? 'free' : 'work'" class="block"></div>

  <h2>Потрачено времени: {{ allMin }} : {{ allSec }}</h2>
</template>

<script setup props="props">
import { ref, reactive } from "vue";
import { setInterval, clearInterval } from "worker-timers";

let { workTime, freeTime, times } = defineProps({
  workTime: Object,
  freeTime: Object,
  times: Object,
});
const whenStart = reactive({
  obj: null,
  time: null,
  razn: { obj: null, min: null, sec: null, hour: 0 },
});
const runMin = ref(null);
const runSec = ref(null);
const isPause = ref(false);
const nowTime = ref(null);
const isfreeTime = ref(false);
const isSbros = ref(false);
const allMin = ref(0);
const allSec = ref(0);

const startTimer = () => {
  function beep(freq) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    let osc = ctx.createOscillator();
    osc.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = "sine";
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }

  beep(800);
  console.log("Старт таймера");

  if (nowTime.value == null) {
    nowTime.value = times.value * 2 - 1;
  }

  // переменная для сброса
  let clear = false;
  if (runMin.value !== null) {
    clear = true;
  }

  isPause.value = false;

  if (!isfreeTime.value) {
    runMin.value = workTime.minutes.value;
    runSec.value = workTime.seconds.value;
  } else {
    runMin.value = freeTime.minutes.value;
    runSec.value = freeTime.seconds.value;
  }

  if (runMin.value > 0 || runSec.value > 0) {
    let timer = setInterval(() => {
      if (clear) {
        runMin.value = null;
        // сброс интервала, если таймер уже идет
        clearInterval(timer);
        // Костыль для фикса бага
        runSec.value += 1;
        clear = false;

        console.log(runMin.value);
        console.log("Сброс таймера в случае бага");
      }

      // Функция для сброса
      if (isSbros.value) {
        console.log(1);
        clearInterval(timer);
        nowTime.value = null;
        runMin.value = null;
        runSec.value = null;
        isfreeTime.value = false;

        isSbros.value = false;
      } else {
        if (isPause.value == false) {
          // Учет времени
          if (whenStart.obj == null) {
            whenStart.obj = new Date();
            whenStart.time = `${whenStart.obj.getHours()} : ${whenStart.obj.getMinutes()}`;
          } else {
            let now = Date.now();
            whenStart.razn.obj = new Date(now - whenStart.obj.getTime());
            whenStart.razn.sec = whenStart.razn.obj.getSeconds();
            whenStart.razn.min = whenStart.razn.obj.getMinutes();
            whenStart.razn.hour = whenStart.razn.obj.getHours() - 3;
          }

          if (runSec.value != 0) {
            runSec.value -= 1;

            if (!isfreeTime.value) {
              updateTime();
            }
          } else if (runSec.value == 0 && runMin.value > 0) {
            runMin.value -= 1;
            runSec.value = 59;
            if (!isfreeTime.value) {
              updateTime();
            }
          } else if (runSec.value == 0 && runMin.value == 0) {
            if (nowTime.value != 0) {
              nowTime.value -= 1;
              runMin.value = null;
              isfreeTime.value = !isfreeTime.value;
              console.log("Старт следующего цикла", nowTime.value);
              beep(800);
              clearInterval(timer);
              startTimer();
            } else if (nowTime.value == 0) {
              beep(800);
              nowTime.value = null;
              runMin.value = null;
              runSec.value = null;
              isfreeTime.value = !isfreeTime.value;
              clearInterval(timer);
            }
          }
        }
      }
    }, 1000);
  }
  beep(800);
};

const pause = () => {
  isPause.value = !isPause.value;
};

const sbros = () => {
  isSbros.value = !isSbros.value;
};

const updateTime = () => {
  if (allSec.value != 59) {
    allSec.value += 1;
  } else {
    allSec.value = 0;
    allMin.value += 1;
  }
};
</script>

<style scoped lang="sass">
.timer
  font-size: 22px

.block
  width: 500px
  height: 300px

.work
  background-color: blue

.free
  background-color: green
</style>
