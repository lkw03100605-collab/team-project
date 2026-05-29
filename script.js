document.addEventListener('DOMContentLoaded', () => {
    // 섹션 요소 엘리먼트 정의
    const scanSection = document.getElementById('scan-section');
    const loadingSection = document.getElementById('loading-section');
    const resultSection = document.getElementById('result-section');
    const successSection = document.getElementById('success-section');

    // 버튼 엘리먼트
    const btnScan = document.getElementById('btn-scan');
    const btnComplete = document.getElementById('btn-complete');
    const btnRestart = document.getElementById('btn-restart');

    // 탭 및 체크리스트 엘리먼트
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const checkboxes = document.querySelectorAll('.guide-check');
    const ecoCountSpan = document.getElementById('eco-count');

    // 상태 관리 변수 (로컬스토리지 활용하여 이탈 후 재방문성 검증)
    let ecoCounter = localStorage.getItem('ecoCounter') ? parseInt(localStorage.getItem('ecoCounter')) : 0;
    ecoCountSpan.textContent = ecoCounter;

    /**
     * 1. 스캔 버튼 클릭 시 비전 엔진 시뮬레이션 작동
     */
    btnScan.addEventListener('click', () => {
        scanSection.classList.add('hidden');
        loadingSection.classList.remove('hidden');

        // AI 비전 엔진 분석 시간 1.5초 타이머 작동 후 결과 화면 도출
        setTimeout(() => {
            loadingSection.classList.add('hidden');
            resultSection.classList.remove('hidden');
        }, 1500);
    });

    /**
     * 2. 가이드라인 체크리스트 모두 완료 시 배출 완료 버튼 활성화
     */
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // 모든 체크박스가 체크되었는지 확인
            const allChecked = Array.from(checkboxes).every(chk => chk.checked);
            btnComplete.disabled = !allChecked;
        });
    });

    /**
     * 3. 탭 전환 기능 (단계별 액션 가이드 <-> 지자체 규정 비교)
     */
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // 버튼 액티브 변경
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 콘텐츠 액티브 변경
            tabContents.forEach(content => {
                if (content.id === targetTab) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    /**
     * 4. 배출 완료 및 에코 카운터 상승 로직
     */
    btnComplete.addEventListener('click', () => {
        // 카운터 상승 및 저장
        ecoCounter += 1;
        localStorage.setItem('ecoCounter', ecoCounter);
        ecoCountSpan.textContent = ecoCounter;

        // 결과 화면 숨김 및 성공 화면 노출
        resultSection.classList.add('hidden');
        successSection.classList.remove('hidden');
    });

    /**
     * 5. 처음으로 돌아가기 (다시 배출하기 초기화)
     */
    btnRestart.addEventListener('click', () => {
        // 체크박스 초기화 및 완료 버튼 비활성화
        checkboxes.forEach(chk => chk.checked = false);
        btnComplete.disabled = true;

        // 첫 번째 탭으로 초기화
        tabButtons[0].click();

        // 섹션 전환
        successSection.classList.add('hidden');
        scanSection.classList.remove('hidden');
    });
});