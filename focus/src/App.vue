<script setup>
    import { ref, computed } from 'vue';
    import Timer from './components/newTimer.vue';
    import Round from './components/Round.vue';
    import MixinsTest from './components/MixinsTest.vue';
    import StopwatchTest from './components/StopwatchTest.vue';
</script>

<template>
    <div>
        <Timer />

        <StopwatchTest />
    </div>
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
