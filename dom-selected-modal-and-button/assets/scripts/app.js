const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const cancelAddMovieButton=addMovieModal.querySelector('.btn--passive')
const confirmAddMoviButton=cancelAddMovieButton.nextElementSibling;
const  userInputs=addMovieModal.querySelectorAll('input')
const entryTextSection=document.getElementById('entry-text');
//movies array 
const movies=[];

const updateUI=()=>{
      if(movies.length===0){
            entryTextSection.style.display='block';

      }else{
            entryTextSection.style.display='none';
      }

}







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
//cancle button
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
            alert('please enter valid value () rating between 1 - 5');
            return;
      }
      const newMovie={
            title:titleValue,
            image:imgUrlValue,
            rating:ratingValue
      };
      movies.push(newMovie);
      console.log(movies);
      togglevieModal();
}

startAddMovieButton.addEventListener('click',togglevieModal)
backdrop.addEventListener('click',togglevieModal)
cancelAddMovieButton.addEventListener('click',cancleAddMovieHandler)
confirmAddMoviButton.addEventListener('click',addMOvieHandler)