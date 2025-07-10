const dropdownBtn = document.querySelector('.customGridSelect') 
const dropdownList = document.querySelector('.dropDownList');
const dropdownOptions = document.querySelectorAll('.dimensions');
const threeGrids = document.querySelectorAll('#grid');
const playBtn = document.querySelector('.playButton');
const errorMsg = document.querySelector('.errorMessage');
let rowsNumber = 3;
let dropDownFlag = false;

const navigate = (location) => {
  window.location.href = location;
};

const storeGridDimensions = (index, num) => {
    rowsNumber = index + num;
    localStorage.setItem('rowsNum', rowsNumber);
};

const toggleDropDownList = () => {
  dropdownList.classList.toggle('dropDownList--isActive');
  dropdownBtn.classList.toggle('customGridSelect--isActive');
};

const dropDownListGrids = (opt, index) => {
  if(index > 0) {
    storeGridDimensions(index, 5);
    dropDownFlag = true;
    errorMsg.classList.remove('errorMessage--isActive');
  } 
  else {
    dropDownFlag = false;
  }
  dropdownBtn.innerText = opt.innerText;
  toggleDropDownList();
}

threeGrids.forEach((grid, index) => {
  grid.addEventListener('click', () => {
    storeGridDimensions(index, 3);
    navigate('../game/index.html');
  });
})

dropdownBtn.addEventListener('click', toggleDropDownList);

dropdownOptions.forEach((opt, index) => opt.addEventListener('click', () => dropDownListGrids(opt, index)));

playBtn.addEventListener('click', () => {
  dropDownFlag && navigate('../game/index.html');
  if(dropDownFlag) {
    navigate('../game/index.html');
  }
  else {
    errorMsg.classList.add('errorMessage--isActive');
  }
})