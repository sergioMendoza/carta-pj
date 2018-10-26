/* eslint linebreak-style: ["error", "windows"] */
/** **********************************DOM******************************************** */

// Variables DOM
const containerBigPizza = document.querySelector('.container-bigpizza');
const containerFamilyPizza = document.querySelector('.container-familypizza');
const containerSuperFamily = document.querySelector('.container-superfamilypizza');
const radioBtnSize = document.querySelector('#radiotipo');


// Functions of hide/show views
const hideSection = (element) => {
  element.classList.add('pizza--hide');
};

const showSection = (element) => {
  element.classList.remove('pizza--hide');
};

// get Value of Radio Button
const getValueRadio = (name) => {
  const size = document.querySelector(`input[name="${name}"]:checked`).value;
  return size;
};

// function that hides according to the type of value Big or family
const viewSizeContainerPizzas = () => {
  const valueSelection = getValueRadio('tipo');
  if (valueSelection === 'Grande') {
    hideSection(containerFamilyPizza);
    hideSection(containerSuperFamily);
    showSection(containerBigPizza);
  }
  if (valueSelection === 'Familiar') {
    hideSection(containerBigPizza);
    hideSection(containerSuperFamily);
    showSection(containerFamilyPizza);
  }
  if (valueSelection === 'Super Familiar') {
    hideSection(containerBigPizza);
    hideSection(containerFamilyPizza);
    showSection(containerSuperFamily);
  }
};

const incrementTotal = (idNumberBox) => {
  let number = document.querySelector(`#${idNumberBox}`).textContent;
  number = parseInt(number, 10) + 1; // valor del número central
  document.querySelector(`#${idNumberBox}`).innerText = number;
};

const decrementTotal = (idNumberBox) => {
  let numberCountPizza = document.querySelector(`#${idNumberBox}`).textContent;
  numberCountPizza = parseInt(numberCountPizza, 10) - 1;
  if (numberCountPizza >= 0) {
    document.querySelector(`#${idNumberBox}`).innerText = numberCountPizza;
  }
};
const activeButtonIncrement = (element, idNumber) => {
  const number = element.parentElement.previousElementSibling;
  const btnDecrement = number.previousElementSibling.children[0].id;
  const btnIncrement = element.id;
  if (document.querySelector(`#${idNumber}`).textContent > 0) {
    document.querySelector(`#${btnDecrement}`).classList.add('btn-active');
    document.querySelector(`#${btnIncrement}`).classList.add('btn-active');
  }
};

const desactiveButtonIncrement = (element, idNumber) => {
  const number = element.parentElement.nextElementSibling;
  const btnIncrement = number.nextElementSibling.children[0].id;
  const btnDecrement = element.id;
  if (document.querySelector(`#${idNumber}`).textContent === '0') {
    document.querySelector(`#${btnIncrement}`).classList.remove('btn-active');
    document.querySelector(`#${btnDecrement}`).classList.remove('btn-active');
  }
};

// function initialize
const init = () => {
  hideSection(containerFamilyPizza);
  hideSection(containerSuperFamily);
};
// Execute
// Function that initializes when loading
init();
// Events
radioBtnSize.addEventListener('change', viewSizeContainerPizzas);
document.addEventListener('click', (event) => {
  const arrayELements = event.path;
  for (let i = 0; i < arrayELements.length; i += 1) {
    if (arrayELements[i].localName === 'button') {
      if (arrayELements[i].classList[0] === 'increment') {
        const idNumber = arrayELements[i].parentElement.previousElementSibling.id;
        incrementTotal(idNumber);
        activeButtonIncrement(arrayELements[i], idNumber);
      }
      if (arrayELements[i].classList[0] === 'decrement') {
        const idNumber = arrayELements[i].parentElement.nextElementSibling.id;
        decrementTotal(idNumber);
        desactiveButtonIncrement(arrayELements[i], idNumber);
      }
    }
  }
});
