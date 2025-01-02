document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.querySelector('.timer');
    const startPauseButton = document.querySelector('.start-pause');
    const resetButton = document.querySelector('.reset');
    const addTimeButton = document.querySelector('.add-time');
    const addOneSecondButton = document.querySelector('.add-one-second');

    let timer;
    let timeRemaining = 5 * 60; // Default to 5 minutes
    let isRunning = false;

    function updateTimerDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startPauseTimer() {
        if (isRunning) {
            clearInterval(timer);
        } else {
            timer = setInterval(() => {
                if (timeRemaining > 0) {
                    timeRemaining--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timer);
                }
            }, 1000);
        }
        isRunning = !isRunning;
    }

    function resetTimer() {
        clearInterval(timer);
        timeRemaining = 5 * 60;
        updateTimerDisplay();
        isRunning = false;
    }

    function addTime(seconds) {
        timeRemaining += seconds;
        updateTimerDisplay();
    }

    function addOneSecond() {
        timeRemaining++;
        updateTimerDisplay();
    }

    startPauseButton.addEventListener('click', startPauseTimer);
    resetButton.addEventListener('click', resetTimer);
    addTimeButton.addEventListener('click', () => addTime(60));
    addOneSecondButton.addEventListener('click', addOneSecond);

    updateTimerDisplay();
});
