let interviewList = [];
let rejectedList = [];
let total = document.getElementById('total');
let jobCount = document.getElementById('job-count')
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

let allCardSection = document.getElementById('allCards');

let mainContainer = document.querySelector('main');

const interviewSection = document.getElementById('interview-section');

function calculateCount(){
    total.innerText = allCardSection.children.length;
    jobCount.innerText =  allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

}

calculateCount();

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

function toogleStyle(id){
   allFilterBtn.classList.remove('bg-[#3B82F6]' , 'text-white')
   interviewFilterBtn.classList.remove('bg-[#3B82F6]' , 'text-white')
   rejectedFilterBtn.classList.remove('bg-[#3B82F6]' , 'text-white')

   allFilterBtn.classList.add('bg-white' , 'text-[#64748B]')
   interviewFilterBtn.classList.add('bg-white' , 'text-[#64748B]')
   rejectedFilterBtn.classList.add('bg-white' , 'text-[#64748B]')

   const selected = document.getElementById(id);

   selected.classList.remove('bg-white' , 'text-[#64748B]')
   selected.classList.add('bg-[#3B82F6]' , 'text-white')

   if(id == 'interview-filter-btn'){
    allCardSection.classList.add('hidden')
    interviewSection.classList.remove('hidden')
   }
   else if(id == 'all-filter-btn'){
    allCardSection.classList.remove('hidden')
    interviewSection.classList.add('hidden')
   }

  
}

mainContainer.addEventListener('click', function(event){
    console.log(event.target.classList.contains('interview-btn'))
    if(event.target.classList.contains('interview-btn')){
        const parentNode = event.target.parentNode.parentNode;
        const jobName = parentNode.querySelector('.job-name').innerText;
        const jobPostName = parentNode.querySelector('.job-post-name').innerText;
        const jobRequirements = parentNode.querySelector('.job-requirements').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const notes = parentNode.querySelector('.notes').innerText;
         parentNode.querySelector('.status').innerText = 'Interview'

        const cardInfo = {
            jobName,
            jobPostName,
            jobRequirements,
            status:'interview',
            notes
        }

        const jobExist = interviewList.find(item => item.jobName == cardInfo.jobName)

       

        if(!jobExist){
            interviewList.push(cardInfo)
        }

    calculateCount();
    renderInterview()
    }
   

})

function renderInterview(){
    interviewSection.innerHTML = '';

    for(let interview of interviewList){
        let div = document.createElement('div')
        div.className = 'card flex justify-between p-6 shadow mb-4 '
        div.innerHTML = `
         <div class="space-y-6">
                    <div>
                        <p class="job-name font-semibold text-[22px]">${interview.jobName}</p>
                        <p class="job-post-name  text-[#64748B]">React Native Developer</p>
                    </div>
                    <div>
                        <p class="job-requirements text-[#64748B]"> Remote • Full-time • $130,000 – $175,000</p>
                    </div>
                    <div>
                        <p class="status bg-[#EEF4FF] inline px-3 py-2 font-medium">${interview.status}</p>
                    </div>
                    <div>
                        <p class="notes">Build cross-platform mobile applications using React Native. Work on products used by
                            millions of users worldwide.</p>
                    </div>
                    <div class="flex gap-2">
                        <button class="interview-btn font-semibold border-2 px-3 py-2 text-[#10B981] rounded-sm">INTERVIEW</button>
                        <button class="rejected-btn font-semibold border-2 px-3 py-2 text-[#EF4444] rounded-sm">REJECTED</button>
                    </div>
         </div>      
        `
        interviewSection.appendChild(div)
    }
}
