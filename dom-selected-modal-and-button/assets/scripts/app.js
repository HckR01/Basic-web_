const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const cancelAddMovieButton=addMovieModal.querySelector('.btn--passive')
const confirmAddMoviButton=cancelAddMovieButton.nextElementSibling;
const  userInputs=addMovieModal.querySelectorAll('input')
const toggleBackdrop=()=>{
      backdrop.classList.toggle('visible')
      
}

const togglevieModal =()=>{
      addMovieModal.classList.toggle('visible');
      toggleBackdrop();
}

const backdropClickHandler=()=>{
      togglevieModal();
}

const cancleAddMovieHandler=()=>{
      togglevieModal();
}

// add movie function
const addMOvieHandler=()=>{
      const titleValue=userInputs[0].value;
      const imgUrlValue=userInputs[1].value;
      const ratingValue=userInputs[2].value;

      if(titleValue.trim()==='' ||imgUrlValue.trim()===''||ratingValue.trim()===''||+ratingValue<1||
      +ratingValue>5){
            alert('please enter valid value () rating between 1 - 5')
      }
}

startAddMovieButton.addEventListener('click',togglevieModal)
backdrop.addEventListener('click',togglevieModal)
cancelAddMovieButton.addEventListener('click',cancleAddMovieHandler)
confirmAddMoviButton.addEventListener('click',addMOvieHandler)