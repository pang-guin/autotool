document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('textarea');
    const fontSizeInput = document.querySelector('#font-size-input');
    const fontSizeIncreaseButton = document.querySelector('.font-size-increase');
    const fontSizeDecreaseButton = document.querySelector('.font-size-decrease');
    const copyButton = document.querySelector('.copy');

    // Memo saving for 알림장
    textarea.value = localStorage.getItem('notice') || '';
    textarea.addEventListener('input', () => {
        localStorage.setItem('notice', textarea.value);
    });

    // 글자 크기 조정
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        textarea.style.fontSize = savedFontSize + 'px';
        fontSizeInput.value = savedFontSize; // 숫자 입력 필드에 저장된 값 표시
    } else {
        textarea.style.fontSize = '80px'; // 기본값 80px 설정
        fontSizeInput.value = 80; // 기본값 80
    }

    // 글자 크기 숫자 입력
    fontSizeInput.addEventListener('input', () => {
        let newFontSize = fontSizeInput.value;
        textarea.style.fontSize = newFontSize + 'px';
        localStorage.setItem('fontSize', newFontSize); // 글자 크기 저장
    });

    // 글자 크기 증가
    fontSizeIncreaseButton.addEventListener('click', () => {
        let currentSize = parseInt(window.getComputedStyle(textarea).fontSize);
        let newSize = currentSize + 2;
        textarea.style.fontSize = `${newSize}px`;
        fontSizeInput.value = newSize;
        localStorage.setItem('fontSize', newSize);
    });

    // 글자 크기 감소
    fontSizeDecreaseButton.addEventListener('click', () => {
        let currentSize = parseInt(window.getComputedStyle(textarea).fontSize);
        let newSize = currentSize - 2;
        textarea.style.fontSize = `${newSize}px`;
        fontSizeInput.value = newSize;
        localStorage.setItem('fontSize', newSize);
    });

    // 전체 복사 기능
    copyButton.addEventListener('click', () => {
        const text = textarea.value;
        navigator.clipboard.writeText(text).then(() => {
            alert('내용이 복사되었습니다.');
        });
    });

    // 글자 일부 선택하여 빨간색으로 강조하기
    textarea.addEventListener('mouseup', () => {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
            const highlightedText = `<span style="color: red">${selectedText}</span>`;
            textarea.value = textarea.value.replace(selectedText, highlightedText);
        }
    });
});
