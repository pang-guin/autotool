document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.querySelector('.header-date');
    const randomQuoteElement = document.querySelector('.random-quote');
    const textarea = document.querySelector('textarea');
    const randomQuoteButton = document.querySelector('.random-quote-button');
    const fontSizeIncreaseButton = document.querySelector('.font-size-increase');
    const fontSizeDecreaseButton = document.querySelector('.font-size-decrease');
    const timerDisplay = document.querySelector('.timer');
    const startPauseButton = document.querySelector('.start-pause');
    const resetButton = document.querySelector('.reset');
    const addTimeButton = document.querySelector('.add-time');
    const addOneSecondButton = document.querySelector('.add-one-second');
    const copyButton = document.querySelector('.copy');

    // Update date dynamically
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const year = now.getFullYear();
    const date = now.toLocaleDateString('ko-KR', options);
    dateElement.innerHTML = `${date}<span class="year">(${year})</span>`;

    // Fetch random content from CSV
    function fetchRandomQuote() {
        fetch('daily.csv') 
            .then(response => response.text())
            .then(csvText => {
                const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
                const randomQuote = lines[Math.floor(Math.random() * lines.length)];
                randomQuoteElement.textContent = randomQuote.replace(/"/g, '');
            })
            .catch(error => {
                console.error('Error fetching CSV:', error);
                randomQuoteElement.textContent = '데이터를 불러오는 중 오류가 발생했습니다.';
            });
    }

    randomQuoteButton.addEventListener('click', fetchRandomQuote);

    // Memo saving
    textarea.value = localStorage.getItem('memo') || '';
    textarea.addEventListener('input', () => {
        localStorage.setItem('memo', textarea.value);
    });

    // Font size adjustment
    fontSizeIncreaseButton.addEventListener('click', () => {
        const currentSize = parseInt(window.getComputedStyle(textarea).fontSize);
        textarea.style.fontSize = (currentSize + 2) + 'px';
    });

    fontSizeDecreaseButton.addEventListener('click', () => {
        const currentSize = parseInt(window.getComputedStyle(textarea).fontSize);
        textarea.style.fontSize = (currentSize - 2) + 'px';
    });

    // Timer functions
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

    // Copy content functionality
    copyButton.addEventListener('click', () => {
        const text = document.querySelector('.notepad textarea').value;
        navigator.clipboard.writeText(text).then(() => {
            alert('내용이 복사되었습니다.');
        });
    });

    // Fetch initial random quote
    fetchRandomQuote();

    // Navigation buttons
    document.querySelector('.header-button').addEventListener('click', () => {
        window.location.href = 'notice.html';
    });
});
