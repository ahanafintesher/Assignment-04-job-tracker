let interviewList = [];
let rejectedList = [];
let total = document.getElementById('total');
let jobCount = document.getElementById('job-count');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

let currentFilter = 'all-filter-btn';

let allCardSection = document.getElementById('allCards');
let mainContainer = document.querySelector('main');
const interviewSection = document.getElementById('interview-section');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

function updateJobCount() {
    if (currentFilter === 'all-filter-btn') {
        jobCount.innerText = allCardSection.children.length;
    } else if (currentFilter === 'interview-filter-btn') {
        jobCount.innerText = interviewList.length;
    } else if (currentFilter === 'rejected-filter-btn') {
        jobCount.innerText = rejectedList.length;
    }
}

function calculateCount() {
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    updateJobCount();
}

calculateCount();

// ─── Filter‑tab toggling ────────────────────────────────────
function toogleStyle(id) {
    [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach(btn => {
        btn.classList.remove('bg-[#3B82F6]', 'text-white');
        btn.classList.add('bg-white', 'text-[#64748B]');
    });

    const selected = document.getElementById(id);
    currentFilter = id;

    selected.classList.remove('bg-white', 'text-[#64748B]');
    selected.classList.add('bg-[#3B82F6]', 'text-white');

    if (id === 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        interviewSection.classList.remove('hidden');
        renderInterview();
    } else if (id === 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        interviewSection.classList.add('hidden');
    } else if (id === 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        interviewSection.classList.remove('hidden');
        renderRejected();
    }

    updateJobCount();
}

function findOriginalCard(jobName) {
    const cards = allCardSection.querySelectorAll('.card');
    for (let card of cards) {
        if (card.querySelector('.job-name').innerText === jobName) {
            return card;
        }
    }
    return null;
}

function getCardData(cardEl) {
    return {
        jobName: cardEl.querySelector('.job-name').innerText,
        jobPostName: cardEl.querySelector('.job-post-name').innerText,
        jobRequirements: cardEl.querySelector('.job-requirements').innerText,
        notes: cardEl.querySelector('.notes').innerText,
    };
}

function refreshFilteredView() {
    if (currentFilter === 'interview-filter-btn') renderInterview();
    else if (currentFilter === 'rejected-filter-btn') renderRejected();
}

function handleInterview(card) {
    const data = getCardData(card);

    const original = findOriginalCard(data.jobName);
    if (original) original.querySelector('.status').innerText = 'Interview';

    
    if (!interviewList.find(i => i.jobName === data.jobName)) {
        interviewList.push({ ...data, status: 'Interview' });
    }

   
    rejectedList = rejectedList.filter(i => i.jobName !== data.jobName);

    calculateCount();
    refreshFilteredView();
}


function handleRejected(card) {
    const data = getCardData(card);

    const original = findOriginalCard(data.jobName);
    if (original) original.querySelector('.status').innerText = 'Rejected';

    if (!rejectedList.find(i => i.jobName === data.jobName)) {
        rejectedList.push({ ...data, status: 'Rejected' });
    }

    interviewList = interviewList.filter(i => i.jobName !== data.jobName);

    calculateCount();
    refreshFilteredView();
}


function handleDelete(card) {
    const jobName = card.querySelector('.job-name').innerText;

    interviewList = interviewList.filter(i => i.jobName !== jobName);
    rejectedList  = rejectedList.filter(i => i.jobName !== jobName);

    const original = findOriginalCard(jobName);
    if (original) original.remove();

    calculateCount();
    refreshFilteredView();
}


mainContainer.addEventListener('click', function (e) {
    const card = e.target.closest('.card');
    if (!card) return;                        // ignore clicks outside cards

    if (e.target.classList.contains('interview-btn')) {
        handleInterview(card);
    } else if (e.target.classList.contains('rejected-btn')) {
        handleRejected(card);
    } else if (e.target.closest('.delete-btn')) {
        handleDelete(card);
    }
});

// ─── Render helpers ──────────────────────────────────────────
function createCardHTML(item) {
    return `
        <div class="space-y-6">
            <div>
                <p class="job-name font-semibold text-[22px]">${item.jobName}</p>
                <p class="job-post-name text-[#64748B]">${item.jobPostName}</p>
            </div>
            <div>
                <p class="job-requirements text-[#64748B]">${item.jobRequirements}</p>
            </div>
            <div>
                <p class="status bg-[#EEF4FF] inline px-3 py-2 font-medium">${item.status}</p>
            </div>
            <div>
                <p class="notes">${item.notes}</p>
            </div>
            <div class="flex gap-2">
                <button class="interview-btn font-semibold border-2 px-3 py-2 text-[#10B981] rounded-sm">INTERVIEW</button>
                <button class="rejected-btn font-semibold border-2 px-3 py-2 text-[#EF4444] rounded-sm">REJECTED</button>
            </div>
        </div>
        <div>
            <button class="delete-btn text-[#64748B] p-2 border border-[#F1F2F4] rounded-full">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>`;
}

function renderInterview() {
    interviewSection.innerHTML = '';
    for (let item of interviewList) {
        let div = document.createElement('div');
        div.className = 'card flex justify-between p-6 shadow mb-4';
        div.innerHTML = createCardHTML(item);
        interviewSection.appendChild(div);
    }
}

function renderRejected() {
    interviewSection.innerHTML = '';
    for (let item of rejectedList) {
        let div = document.createElement('div');
        div.className = 'card flex justify-between p-6 shadow mb-4';
        div.innerHTML = createCardHTML(item);
        interviewSection.appendChild(div);
    }
}