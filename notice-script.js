document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('textarea');
    const fontSizeIncreaseButton = document.querySelector('.font-size-increase');
    const fontSizeDecreaseButton = document.querySelector('.font-size-decrease');
    const copyButton = document.querySelector('.copy');

    // Memo saving for 알림장
    textarea.value = localStorage.getItem('notice') || '';
    textarea.addEventListener('input', () => {
        localStorage.setItem('notice', textarea.value);
    });

    // Font size adjustment for 알림장
    fontSizeIncreaseButton.addEventListener('click', () => {
        const currentSize = parseInt(window.getComputedStyle(textarea).fontSize);
        textarea.style.fontSize = (currentSize + 2) + 'px';
    });

    fontSizeDecreaseButton.addEventListener('click', () => {
        const currentSize = parseInt(window.getComputedStyle(textarea).fontSize);
        textarea.style.fontSize = (currentSize - 2) + 'px';
    });

    // Copy content functionality
    copyButton.addEventListener('click', () => {
        const text = textarea.value;
        navigator.clipboard.writeText(text).then(() => {
            alert('내용이 복사되었습니다.');
        });
    });
});
