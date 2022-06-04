const apiKey = "dc391fe72fd309462cca178fcde63e85";

const apiurl =
  "https://api.themoviedb.org/3/discover/movie?api_key=dc391fe72fd309462cca178fcde63e85&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&with_watch_monetization_types=flatrate";

const searchAPI =
  "https://api.themoviedb.org/3/search/movie?api_key=dc391fe72fd309462cca178fcde63e85&query=";

const imagePath = "https://image.tmdb.org/t/p/w500";

const form = document.querySelector("form");
const search = document.querySelector("#search");
const main = document.getElementById("main");
const home = document.getElementById("homeBtn");

async function getMovies(url) {
  const resp = await fetch(url);
  // console.log(resp);
  const respData = await resp.json();
  console.log(respData);
  showMovies(respData.results);
}

getMovies(apiurl);

function showMovies(resp) {
  main.innerHTML = ``;
  resp.forEach((movie) => {

    if(movie.poster_path === null)
      return;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
			
				<img src= ${imagePath + movie.poster_path} alt="${movie.title}">
				<div class="movie-info">
					<h3>${movie.title}</h3>
					<span class = "${getMovieByRating(movie.vote_average)}" >${movie.vote_average}</span>
				</div>	
				<div class = "overview"> 
          <h4>Overview</h4>
          ${movie.overview}
        </div>

		`;
    document.getElementById("main").appendChild(movieEl);
  });

  function getMovieByRating(rating) {
    if (rating >= 8) {
      return "green";
    } else if (rating >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }
}

search.autocomplete = "off";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const serachInput = search.value;
  if (serachInput) {
    getMovies(searchAPI + serachInput);
    search.value = "";
  }
});


home.addEventListener("onclick", (e)=>{
  e.preventDefault();
  getMovies(apiurl);
})