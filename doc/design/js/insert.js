(() => {
    // textarea 높이 자동 조절
    const textArea = document.getElementById('content');

    const resize = () => {
        textArea.style.height = '1px';
        textArea.style.height = textArea.scrollHeight + 'px';
    };

    textArea.addEventListener('input', resize);


    // 이미지 미리보기
    const maxFiles = 5;
    const fileInput = document.getElementById('fileInput');
    const imgGrid = document.getElementById('imgGrid');
    const previews = [];
    const boardImg = [];

    const setFile = (e) => {
        const arrayFiles = Array.from(e.target.files);
        const emptyFilesSpace = maxFiles - boardImg.length - arrayFiles.length;

        if (!arrayFiles.every(file => file.size <= 5 * 1024 * 1024)) {
            alert('파일 크기 5MB 이하만 추가할 수 있습니다.');
        } else if (emptyFilesSpace < 0) {
            alert(`최대 ${maxFiles}개까지만 추가할 수 있습니다.`);
        } else {
            boardImg.push(...arrayFiles);

            arrayFiles.forEach(file => {
            const previewUrl = URL.createObjectURL(file);
            previews.push(previewUrl);

            // 미리보기
            const imgPreview = document.createElement('div');
            imgPreview.classList.add('img-preview');

            const imgElement = document.createElement('img');
            imgElement.src = previewUrl;
            imgPreview.appendChild(imgElement);

            const clearButton = document.createElement('button');
            clearButton.classList.add('btn', 'bg-clear');
            clearButton.textContent = 'X';
            clearButton.onclick = () => clearFile(previews.length - 1);
            imgPreview.appendChild(clearButton);

            imgGrid.appendChild(imgPreview);
            });
        }

        e.target.value = '';
    };

    const clearFile = (index) => {
        // 미리보기 URL 메모리 해제
        URL.revokeObjectURL(previews[index]);

        // 파일 및 미리보기 제거
        boardImg.splice(index, 1);
        previews.splice(index, 1);

        // 이미지를 다시 렌더링
        imgGrid.innerHTML = '';
        previews.forEach((preview) => {
            const imgPreview = document.createElement('div');
            imgPreview.classList.add('img-preview');
            
            const imgElement = document.createElement('img');
            imgElement.src = preview;
            imgPreview.appendChild(imgElement);

            const clearButton = document.createElement('button');
            clearButton.classList.add('btn', 'bg-clear');
            clearButton.textContent = 'X';
            clearButton.onclick = () => clearFile(previews.indexOf(preview));
            imgPreview.appendChild(clearButton);

            imgGrid.appendChild(imgPreview);
        });
    };

    fileInput.addEventListener('change', setFile);
})();