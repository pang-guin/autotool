document.addEventListener('DOMContentLoaded', () => {
    const dateElement = document.querySelector('.header-date');
    const randomQuoteElement = document.querySelector('.random-quote');
    const notepad = document.querySelector('#notepad');
    const fontSizeInput = document.querySelector('#font-size-input');
    const fontSizeIncreaseButton = document.querySelector('.font-size-increase');
    const fontSizeDecreaseButton = document.querySelector('.font-size-decrease');

    // 날짜 업데이트
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const year = now.getFullYear();
    const date = now.toLocaleDateString('ko-KR', options);
    dateElement.innerHTML = `${date}<span class="year">(${year})</span>`;

    // 메모 내용 불러오기 및 글자 크기 불러오기
    if(localStorage.getItem('notepadContent')) {
        notepad.value = localStorage.getItem('notepadContent');
    }
    const savedFontSize = localStorage.getItem('fontSize');
    if(savedFontSize) {
        notepad.style.fontSize = savedFontSize + 'px';
        fontSizeInput.value = savedFontSize;  // 숫자 입력 필드에 저장된 값 표시
    } else {
        notepad.style.fontSize = '80px';  // 기본 글자 크기 80px 설정
        fontSizeInput.value = 80;  // 기본값 80
    }

    // 메모 내용 저장하기
    notepad.addEventListener('input', () => {
        localStorage.setItem('notepadContent', notepad.value);
    });

    // 글자 크기 조절 숫자 입력
    fontSizeInput.addEventListener('input', () => {
        let newFontSize = fontSizeInput.value;
        notepad.style.fontSize = newFontSize + 'px';
        localStorage.setItem('fontSize', newFontSize);  // 글자 크기 저장
    });

    // 글자 크기 증가
    fontSizeIncreaseButton.addEventListener('click', () => {
        let currentSize = parseInt(window.getComputedStyle(notepad).fontSize);
        let newSize = currentSize + 2;
        notepad.style.fontSize = `${newSize}px`;
        fontSizeInput.value = newSize;
        localStorage.setItem('fontSize', newSize);
    });

    // 글자 크기 감소
    fontSizeDecreaseButton.addEventListener('click', () => {
        let currentSize = parseInt(window.getComputedStyle(notepad).fontSize);
        let newSize = currentSize - 2;
        notepad.style.fontSize = `${newSize}px`;
        fontSizeInput.value = newSize;
        localStorage.setItem('fontSize', newSize);
    });

    // 랜덤 문구 불러오기
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

    // 페이지 로딩 시 첫 문구 표시
    fetchRandomQuote();

    // 새로운 문구로 변경하는 버튼
    document.querySelector('.random-quote-button').addEventListener('click', fetchRandomQuote);

    // 글자 일부 선택하여 빨간색으로 강조하기
    notepad.addEventListener('mouseup', () => {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
            const highlightedText = `<span style="color: red">${selectedText}</span>`;
            notepad.value = notepad.value.replace(selectedText, highlightedText);
        }
    });
});
