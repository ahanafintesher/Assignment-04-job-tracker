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
const emptyState = document.getElementById('empty-state');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

function checkEmpty() {
    let isEmpty = false;
    let message = '';

    if (currentFilter === 'all-filter-btn') {
        isEmpty = allCardSection.children.length === 0;
        message = 'No Jobs Found';
    } else if (currentFilter === 'interview-filter-btn') {
        isEmpty = interviewList.length === 0;
        message = 'No Interviews Yet';
    } else if (currentFilter === 'rejected-filter-btn') {
        isEmpty = rejectedList.length === 0;
        message = 'No Rejections Yet';
    }

    if (isEmpty) {
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
        emptyState.querySelector('#empty-title').innerText = message;
    } else {
        emptyState.classList.remove('flex');
        emptyState.classList.add('hidden');
    }
}

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
    checkEmpty();
}

calculateCount();

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
    checkEmpty();
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
    rejectedList = rejectedList.filter(i => i.jobName !== jobName);

    const original = findOriginalCard(jobName);
    if (original) original.remove();

    calculateCount();
    refreshFilteredView();
}

mainContainer.addEventListener('click', function (e) {
    const card = e.target.closest('.card');
    if (!card) return;

    if (e.target.classList.contains('interview-btn')) {
        handleInterview(card);
    } else if (e.target.classList.contains('rejected-btn')) {
        handleRejected(card);
    } else if (e.target.closest('.delete-btn')) {
        handleDelete(card);
    }
});

function createCardHTML(item) {
    return `
        <div class="space-y-4 sm:space-y-6 flex-1">
            <div>
                <p class="job-name font-semibold text-lg sm:text-[22px]">${item.jobName}</p>
                <p class="job-post-name text-[#64748B] text-sm sm:text-base">${item.jobPostName}</p>
            </div>
            <div>
                <p class="job-requirements text-[#64748B] text-xs sm:text-base">${item.jobRequirements}</p>
            </div>
            <div>
                <p class="status bg-[#EEF4FF] inline px-2 sm:px-3 py-1 sm:py-2 font-medium text-xs sm:text-base">
                    ${item.status}
                </p>
            </div>
            <div>
                <p class="notes text-sm sm:text-base">${item.notes}</p>
            </div>
            <div class="flex gap-2">
                <button class="interview-btn font-semibold border-2 px-2 sm:px-3 py-1 sm:py-2 text-[#10B981] rounded-sm text-xs sm:text-base">
                    INTERVIEW
                </button>
                <button class="rejected-btn font-semibold border-2 px-2 sm:px-3 py-1 sm:py-2 text-[#EF4444] rounded-sm text-xs sm:text-base">
                    REJECTED
                </button>
            </div>
        </div>
        <div class="mt-3 sm:mt-0 sm:ml-4 self-start">
            <button class="delete-btn text-[#64748B] p-2 border border-[#F1F2F4] rounded-full">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>`;
}

function renderInterview() {
    interviewSection.innerHTML = '';
    for (let item of interviewList) {
        let div = document.createElement('div');
        div.className = 'card flex flex-col sm:flex-row justify-between p-4 sm:p-6 shadow mb-4 rounded-lg';
        div.innerHTML = createCardHTML(item);
        interviewSection.appendChild(div);
    }
    checkEmpty();
}

function renderRejected() {
    interviewSection.innerHTML = '';
    for (let item of rejectedList) {
        let div = document.createElement('div');
        div.className = 'card flex flex-col sm:flex-row justify-between p-4 sm:p-6 shadow mb-4 rounded-lg';
        div.innerHTML = createCardHTML(item);
        interviewSection.appendChild(div);
    }
    checkEmpty();
}