let interviewList = [];
let rejectedList = [];
let total = document.getElementById('total');
let jobCount = document.getElementById('job-count')
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

let allCardSection = document.getElementById('allCards');

let mainContainer = document.querySelector('main');

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

  
}

mainContainer.addEventListener('click', function(event){
    const parentNode = event.target.parentNode.parentNode;
    const jobName = parentNode.querySelector('.job-name').innerText;
    const jobPostName = parentNode.querySelector('.job-post-name').innerText;
    const jobRequirements = parentNode.querySelector('.job-requirements').innerText;
    const status = parentNode.querySelector('.status').innerText;
    const notes = parentNode.querySelector('.notes').innerText;

    


   
})
