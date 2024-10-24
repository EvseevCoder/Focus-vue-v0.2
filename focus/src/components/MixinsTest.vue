<template>
    <div>
        <h2>{{ statusWork }}</h2>
        <p>{{ activeTime.minutes }} {{ activeTime.seconds }}</p>

        <button
            v-show="statusTimer == 'active'"
            @click="setTimer('pause')"
        >
            pause
        </button>
        <button
            v-show="statusTimer == 'pause'"
            @click="setTimer('active')"
        >
            play
        </button>
    </div>
</template>
  
  <script setup>
    import { reactive } from 'vue';
    import { timer } from '../assets/mixins/time';

    let workTime = reactive({ minutes: 0, seconds: 10 });
    let freeTime = reactive({ minutes: 2, seconds: 2 });

    const { activeTime, setTimer, statusTimer, statusWork } = timer(workTime);
</script>