document.addEventListener('DOMContentLoaded', () => {
    const modalKeyMap ={
        'pro-info': 'proinfo',
        'scop-wo' : 'scopwo', 
        'net-arc' : 'netarc',
        'net-dev' : 'netdev',
        'con-sum' : 'consum',
        'cir-ser' : 'cirser',
        'moni-to' : 'monito',
        'op-pro'  : 'oppro',
        'know-risk': 'knowrisk',
        'acc-acc' : 'accacc',
        'acc-off' : 'accoff',
        'att-lis' : 'attlis',
    };

    const titles = {
        'pro-info' : 'PROJECT INFORMATION',
        'scop-wo' : 'SCOPE OF WORK',
        'net-arc' : 'NETWORK ARCHITECTURE',
        'net-dev' : 'NETWORK DEVICE INVENTORY',
        'con-sum' : 'CONFIGURATION SUMMARY',
        'cir-ser' : 'CIRCUIT SERVICE DETAILS',
        'moni-to' : 'MONITORING TOOLS',
        'op-pro' : 'OPERATION PROCEDURE',
        'know-risk' : 'KNOWN ISSUES',
        'acc-acc' : 'ACCESS &amp; ACCOUNT',
        'acc-off' : 'ACCEPTANCE &amp; SIGN-OFF',
        'att-lis' : 'ATTACHMENT LIS',

    };


    function getModalParts(suffix){
        return{
            overlay :document.getElementById(`modalOverlay-${suffix}`),
            titleEl :document.getElementById(`modalTitle-${suffix}`),
            closeBtn :document.getElementById(`modalClose-${suffix}`),
            cancelBtn :document.getElementById(`modalCancel-${suffix}`),
            form :document.getElementById(`modalForm-${suffix}`)
        }
    }

    function openModal(key){
        const suffix = modalKeyMap[key];

        if(!suffix){
            console.warn(`ยังไม่มี modal สำหรับ "$[key]" ใน HTML - ให้เพิ่ม modal-overlay block และ mapping ก่อน`);
            return;
        }

        const {overlay, titleEl} = getModalParts(suffix);

        if(!overlay){
            console.warn(`หา element id="modalOverlay-${suffix}" ไม่เจอ`);
            return;
        }

        if(titleEl) titleEl.textContent = titles[key] || key;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

    }

    function closeModal(overlay){
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.getElementById('buttonGrid').addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-item');
        if(!btn) return;
        openModal(btn.dataset.modal);
    });

    Object.values(modalKeyMap).forEach(suffix => {
        const{overlay, form, closeBtn, cancelBtn} = getModalParts(suffix);
        if(!overlay) return;

        closeBtn?.addEventListener('click', () => closeModal(overlay));
        cancelBtn?.addEventListener('click', () => closeModal(overlay));

        overlay.addEventListener('click', (e) => {
            if(e.target === overlay) closeModal();
         });

         form?.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(`Saved:[${suffix}]`, Object.fromEntries(new FormData(form)));
            closeModal(overlay);
        });
    });
    document.addEventListener('keydown', (e) => {
        if(e.key !== 'Escape') return;
        const activeOverlay = document.querySelector('.modal-overlay.active');
        if(activeOverlay) closeModal(activeOverlay);
    }); 
});
