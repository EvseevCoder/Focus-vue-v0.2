<template>
    <div>
        <NumberSelect @update:selectTime="setTime" />

        {{ time.minutes }} : {{ time.seconds }}

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

        <button @click="Reset">
            reset
        </button>

        {{ activeTime.minutes }} : {{ activeTime.seconds }}
    </div>
</template>

<script setup>
    import { reactive, watch } from 'vue';
    import NumberSelect from './Inputs/NumberSelect.vue';
    import { timer } from '../assets/mixins/time';

    let time = reactive({
        minutes: 0,
        seconds: 0,
    });

    const { activeTime, statusTimer, statusWork, setTimer, Reset } = timer(time, time);

    // Methods
    function setTime(selectTime) {
        time.minutes = selectTime.minutes;
        time.seconds = selectTime.seconds;
    }
</script>

<style scoped>
</style>