document.addEventListener('DOMContentLoaded', () => {
    const notepad = document.querySelector('#notepad');
    const fontSizeInput = document.querySelector('#font-size-input');
    const fontSizeIncreaseButton = document.querySelector('.font-size-increase');
    const fontSizeDecreaseButton = document.querySelector('.font-size-decrease');
    const copyButton = document.querySelector('.copy');

    // Memo saving for 알림장
    notepad.innerHTML = localStorage.getItem('notice') || '';
    notepad.addEventListener('input', () => {
        localStorage.setItem('notice', notepad.innerHTML);
    });

    // 글자 크기 조정
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        notepad.style.fontSize = savedFontSize + 'px';
        fontSizeInput.value = savedFontSize; // 숫자 입력 필드에 저장된 값 표시
    } else {
        notepad.style.fontSize = '80px'; // 기본값 80px 설정
        fontSizeInput.value = 80; // 기본값 80
    }

    // 글자 크기 숫자 입력
    fontSizeInput.addEventListener('input', () => {
        let newFontSize = fontSizeInput.value;
        notepad.style.fontSize = newFontSize + 'px';
        localStorage.setItem('fontSize', newFontSize); // 글자 크기 저장
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

    // 전체 복사 기능
    copyButton.addEventListener('click', () => {
        const text = notepad.innerText;
        navigator.clipboard.writeText(text).then(() => {
            alert('내용이 복사되었습니다.');
        });
    });

    // 글자 일부 선택하여 빨간색으로 강조하기
    notepad.addEventListener('mouseup', () => {
        const selectedText = window.getSelection().toString();
        if (selectedText) {
            document.execCommand('insertHTML', false, `<span style="color: red">${selectedText}</span>`);
        }
    });
});
