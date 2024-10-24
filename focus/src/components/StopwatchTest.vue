<template>
    <div>
        <Stopwhatch />

        <div class="time">
            {{ activeTime.minutes }} : {{ activeTime.seconds }}
        </div>

        <button @click="setStopwatch('pause')">
            stop
        </button>

        <button @click="setStopwatch('play')">
            play
        </button>
    </div>
</template>

<script setup>
    import { ref, reactive, watch, onMounted } from 'vue';
    import { stopwatch } from '../assets/mixins/time';
    import Stopwhatch from './pages/task/timeStat/timeTrack/Stopwatch/Stopwhatch.vue';

    let time = reactive({
        minutes: 0,
        seconds: 55,
    });

    const { activeTime, statusStopwatch, setStopwatch } = stopwatch(time);

    onMounted(() => {});
</script>

<style lang="scss" scoped>
</style>