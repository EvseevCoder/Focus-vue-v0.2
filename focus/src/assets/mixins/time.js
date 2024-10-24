import { ref, reactive, watch } from 'vue';
import { setInterval, clearInterval } from 'worker-timers';

export function timer(workTime, freeTime) {
    const inTimes = 2

    // Главный таймер
    let timer = ref()

    // Количество повторений
    let times = ref(inTimes * 2)

    // Дефолтное объявление
    const activeTime = reactive({
        minutes: workTime.minutes || 0,
        seconds: workTime.seconds || 0
    })

    let statusTimer = ref('pause')
    let statusWork = ref('work')

    // Methods

    // Установка таймера и взаимодействие с ним
    function setTimer(status) {
        if (status == 'pause' && statusTimer.value != 'pause') {
            timer ? clearInterval(timer) : null;
            timer = null
            statusTimer.value = status
        }

        if (status == 'active' && statusTimer.value != 'active') {
            timer = setInterval(Minus, 1000)
            statusTimer.value = status
        }
    }

    // Переключение режимов и возобновление
    function endTimer() {
        clearInterval(timer)
        timer = null

        if (times.value > 1) {
            times.value--;

            if (statusWork.value == 'work') {
                statusWork.value = 'free'                

                activeTime.minutes = freeTime.minutes;
                activeTime.seconds = freeTime.seconds;

            } else if (statusWork.value == 'free') {
                statusWork.value = 'work'

                activeTime.minutes = workTime.minutes;
                activeTime.seconds = workTime.seconds;
            }

            timer = setInterval(Minus, 1000)
            
        } else {
            Reset()
        }
    }

    // Работа самого таймера
    function Minus() {        
        if (activeTime.seconds != 0) {
            activeTime.seconds--
        } else if (activeTime.minutes != 0) {
            activeTime.minutes--
            activeTime.seconds = 59
        } else {
            setTimer('pause')
        }
        
        if (activeTime.minutes == 0 && activeTime.seconds == 0) {
            endTimer()
        }
    }

    // Функция сброса
    function Reset() {
        timer ? clearInterval(timer) : null;
        timer = null

        activeTime.minutes = workTime.minutes || 0;
        activeTime.seconds = workTime.seconds || 0;

        times.value = inTimes * 2
        
        setTimer('pause')
    }

    // Watchers
    watch(workTime, (newTime) => {
            activeTime.minutes = newTime.minutes;
            activeTime.seconds = newTime.seconds;
      });

    return { activeTime, statusTimer, statusWork, setTimer, Reset };
}

// Работа с секудомером
export function stopwatch(start) {

    // Переменные
    let stopwatch = ref(null)
    let statusStopwatch = ref('pause')

    const activeTime = reactive({
        minutes: start.minutes || 0,
        seconds: start.seconds || 0
    })

    // Methods

    // Добавление единиц
    function Plus() {
        activeTime.seconds++

        if (activeTime.seconds == 60) {
            activeTime.minutes++
            activeTime.seconds = 0
        }
    }

    // Изменение статуса секундомера
    function setStopwatch(status) {
        if (status == 'play') {
            statusStopwatch.value = 'play'
            
            if (!stopwatch.value) {
                stopwatch.value = setInterval(Plus, 1000)
            }

        } else if (status == 'pause') {
            statusStopwatch.value = 'pause'
            stopwatch.value ? clearInterval(stopwatch.value) : null;
            stopwatch.value = null
        }
    }

    return { activeTime, statusStopwatch, setStopwatch }
}