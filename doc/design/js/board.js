(() => {
    document.addEventListener('DOMContentLoaded', function() {
        // Show Detail 버튼을 누르면 모달을 여는 부분
        const showDetailButtons = document.querySelectorAll('.my-btn-detail');
        const modalContainer = document.getElementById('modal');
        const modalHeaderTitle = modalContainer.querySelector('.modal-header h1');
        const modalBodyImage = modalContainer.querySelector('.modal-body img');
        const modalBodyText = modalContainer.querySelector('.modal-body p');
        const closeModalButton = modalContainer.querySelector('.modal-header button');
    
        showDetailButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 여기에서 각 카드의 내용을 모달에 넣을 수 있습니다.
                // 예시로는 카드 내용에 "title"과 "detail"을 넣습니다.
                const cardContent = button.closest('.card-content');
                const title = cardContent.querySelector('p').textContent;
                const imageSrc = cardContent.querySelector('img').src;
                const detailText = "상세 내용은 여기에 표시됩니다."; // 상세 내용은 실제로 해당 카드의 상세 내용으로 교체할 수 있습니다.
    
                modalHeaderTitle.textContent = title;
                modalBodyImage.src = imageSrc;
                modalBodyText.textContent = detailText;
    
                // 모달을 보이도록 설정
                modalContainer.style.display = 'block';
            });
        });
    
        // "X" 버튼을 누르면 모달이 닫히도록 설정
        closeModalButton.addEventListener('click', function() {
            modalContainer.style.display = 'none';
        });
    
        // 모달 외부를 클릭하면 모달이 닫히도록 추가
        modalContainer.addEventListener('click', function(event) {
            if (event.target === modalContainer) {
                modalContainer.style.display = 'none';
            }
        });
    })
})();