const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');



const togglevieModal =()=>{
      addMovieModal.classList.toggle('visible');

}


startAddMovieButton.addEventListener('click',togglevieModal)