const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const cancelAddMovieButton=addMovieModal.querySelector('.btn--passive')
const confirmAddMoviButton=cancelAddMovieButton.nextElementSibling;
const  userInputs=addMovieModal.querySelectorAll('input')
const entryTextSection=document.getElementById('entry-text');
//movies array and its functions
const movies=[];

const clearMovieInputs=()=>{
      for(const userInput of userInputs){
            userInput.value='';
      }

}


const updateUI=()=>{
      if(movies.length===0){
            entryTextSection.style.display='block';

      }else{
            entryTextSection.style.display='none';
      }

}
// ...................................................
//render movie elements
const deleteMovieHandler=(movieId)=>{
      let identifiedIndex=0;
      for(const movie of movies){
            if(movie.id===movieId){
                  break;

            }
            identifiedIndex++;
      }
      movies.splice(identifiedIndex,1);
      const listRoot=document.getElementById('movie-list');
      listRoot.children[identifiedIndex].remove();
      
}
//add movie function
const renderNewMOvieElement=(id,title,imgUrl,rating)=>{
      const newMovieElement =document.createElement('li');
      newMovieElement.className='movie-element';
      newMovieElement.innerHTML=`
            <div class="movie-element__image"><img src="${imgUrl}" alt="${title}"></div>
            <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
            </div>
      `;
      newMovieElement.addEventListener('click',deleteMovieHandler.bind(null,id))
      const listRoot=document.getElementById('movie-list');
      Root.appendChild(newMovieElement);
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
            id: Math.random().toString(),
            title:titleValue,
            image:imgUrlValue,
            rating:ratingValue
      };
      movies.push(newMovie);
      console.log(movies);
      togglevieModal();
      clearMovieInputs();
      renderNewMOvieElement(newMovie.id,newMovie.title,newMovie.image,newMovie.rating);
      updateUI();


}




//eventslisters 

startAddMovieButton.addEventListener('click',togglevieModal)
backdrop.addEventListener('click',togglevieModal)
cancelAddMovieButton.addEventListener('click',cancleAddMovieHandler)
confirmAddMoviButton.addEventListener('click',addMOvieHandler)