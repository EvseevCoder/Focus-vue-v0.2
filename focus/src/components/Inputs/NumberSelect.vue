<template>
    <div class="container">
        <input
            type="number"
            v-model="minutes"
            @input="emitValues"
            class="number-input"
        />
        <input
            type="number"
            v-model="seconds"
            @input="emitValues"
            class="number-input"
        />
    </div>
</template>
  
<script setup>
    import { ref } from 'vue';

    let minutes = ref(0);
    let seconds = ref(0);

    const emit = defineEmits(['update:selectTime']);

    const emitValues = () => {
        emit('update:selectTime', { minutes: minutes.value, seconds: seconds.value });
    };
</script>

<style scoped>
    .container {
        width: max-content;
        display: flex;
        gap: 1rem;
        margin: 40px auto;
    }

    .number-input {
        width: 100px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 16px;
        outline: none;
        transition: border-color 0.2s ease;
    }

    .number-input:focus {
        border-color: #007bff;
    }

    .number-input::-webkit-inner-spin-button,
    .number-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .number-input {
        appearance: none;
        -moz-appearance: textfield;
    }
</style>
  