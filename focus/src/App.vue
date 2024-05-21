<script setup>
import { ref, computed } from "vue";
import Timer from "./components/Timer.vue";
import Round from './components/Round.vue'

const workmin = ref(0);
const worksec = ref(0);
const freemin = ref(0);
const freesec = ref(0);
const repeat = ref(1);

const workTime = computed(() => {
  return { minutes: workmin, seconds: worksec };
});
const freeTime = computed(() => {
  return { minutes: freemin, seconds: freesec };
});

const repeatValue = computed(() => {
  return repeat;
});
</script>

<template>
  <div class="input-container">
    <div class="time-item">
      <p>Время работы</p>
      <div class="time-input">
        <input v-model.number="workmin" type="number" />
        :
        <input v-model.number="worksec" type="number" />
      </div>
    </div>
    <div class="time-item">
      <p>Время отдыха</p>
      <div class="time-input">
        <input v-model.number="freemin" type="number" />
        :
        <input v-model.number="freesec" type="number" />
      </div>
    </div>
    <input v-model.number="repeat" type="number" />
  </div>
  <!-- <Timer :workTime="workTime" :freeTime="freeTime" :times="repeatValue" /> -->
  <Round/>
  <Round class="Round"/>
</template>

<style scoped lang="sass">

h3
  color: brown
  margin-bottom: 50px

.input-container
  display: flex
  gap: 30px
  align-items: flex-end
  justify-content: center
  margin: 50px

input
  width: 50px
  font-size: 20px

.Round:nth-child(1)
  margin-bottom: 50px
  
</style>
