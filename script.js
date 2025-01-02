function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('ko-KR', options);
}

function saveContent() {
    localStorage.setItem('editorContent', document.getElementById('editor').innerHTML);
}

function loadContent() {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
        document.getElementById('editor').innerHTML = savedContent;
    }
}

document.getElementById('fontSize').addEventListener('input', function() {
    document.getElementById('editor').style.fontSize = this.value + 'px';
    saveContent();
});

document.getElementById('fontColor').addEventListener('input', function() {
    document.getElementById('editor').style.color = this.value;
    saveContent();
});

document.getElementById('editor').addEventListener('input', saveContent);

updateDate();
setInterval(updateDate, 1000 * 60); // 1분마다 날짜 업데이트
loadContent();
