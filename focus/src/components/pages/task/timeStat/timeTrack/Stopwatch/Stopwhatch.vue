<template>
    <div class="Stopwhatch">
        <div class="timeStat">
            <div class="hours"></div>
            <div class="minutes">43</div>
            <span>:</span>
            <div class="seconds">12</div>

            <img
                class="icon"
                src="/icons/play.svg"
                alt=""
            >
        </div>
    </div>
</template>

<script setup>
    defineProps({
        startTime: {
            Type: Number,
            default: null,
        },
    });
</script>

<style lang="scss" scoped>
    .Stopwhatch {
        width: 400px;
        height: 400px;
        background-color: #f4f4f4;
        margin: 50px auto 0;
        border-radius: 50%;
        box-shadow: 0px 29px 54px -12px rgba(79, 79, 79, 0.44);
        display: flex;
        flex-direction: column;
    }

    .timeStat {
        width: max-content;
        display: flex;
        font-size: 50px;
        margin: 145px auto 0;

        span {
            margin: 0 4px;
        }
    }

    .icon {
        fill: red;
        color: red;
        width: 50px;
    }
</style>