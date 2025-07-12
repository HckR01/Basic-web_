const addMovieBtn =document.getElementById("add-movie-btn");
const searchBtn =document.getElementById("search-btn");


const movies=[];
//functions......................................................
const renderMovies=()=>{
      const movieList = document.getElementById("movie-list")

      if(movies.length===0){
            movieList.classList.remove('visible');
      }else{
            movieList.classList.add('visible');
      }

      movieList.innerHTML='';
      movies.forEach((movie)=>{
            const movieEl=document.createElement('li');
            movieEl.textContent=movie.info.title;
            movieList.appendChild(movieEl)
      })
}
const addMovieHandler=()=>{
      const title=document.getElementById('title').value;
      const extraName=document.getElementById('extra-name').value;
      const extraValue=document.getElementById('extra-value').value;
      if(title.trim()===''||extraName.trim()===''||extraValue.trim()===''){
            return;
      }
      const newMovie={
            info:{
            title,
            [extraName]:extraValue
            },
            id:Math.random()
      };
      movies.push(newMovie);
      console.log(newMovie);
      //call the crete element function
      renderMovies();

}
//...............................................................




//events listners
addMovieBtn.addEventListener('click', addMovieHandler);
