const ul = document.getElementById('authors');
let form = document.querySelector('form');
const movieContainer = document.querySelector('.container'); 
const actorsContainer = document.querySelector('.actors');

form.addEventListener('keyup', function(e){
    e.preventDefault();
    let searchTitle = document.querySelector('input').value;
    getMovies(searchTitle);
});

function getMovies(searchTitle) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=4c9b7ef43867b0dcb758e994dab0660c&query=${searchTitle}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let movies = data.results;
            displayMovies(movies);
        })
        .catch((err) => {
            console.log(err); 
    });
     
}

function displayMovies(movies) {
    const html = movies.map( movie => {
        return `      <div class="col-sm-6 col-md-4 mobile--padding">
                        <div class='thumbnail movie__container'>
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class='movie__poster'>
                            <h2>${movie.title}</h2>
                            <a onclick="selectedMovie('${movie.id}')" href='#' class='btn btn-default' role='button'>View details</a>
                        </div>
                      </div>
                   `;
    }).join('');
    ul.innerHTML = html;
}

function selectedMovie(id) {
//    console.log(id);
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    console.log(movieId);
    
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=4c9b7ef43867b0dcb758e994dab0660c&append_to_response=credits`)
        .then((response) => {
            return response.json(); 
        })
        .then((data) => {
            console.log(data);
            movieInfo(data);
    })
}

//function getMovieCast() {
//    let movieId = sessionStorage.getItem('movieId');
//    
//    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=4c9b7ef43867b0dcb758e994dab0660c`)
//        .then((response) => {
//            return response.json(); 
//        })
//        .then((data) => {
//            movieCastInfo(data);
//            
//    })
//}
              


function movieInfo(movie) {
    
   let output = `   <div class='col-sm-6 col-md-4'>
                        <div class='thumbnail'>
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                        </div>
                        <a class='btn btn-default' href='index.html' role='button'>Go back To Search</a>
                    </div>
                    <div class='col-sm-6 col-md-4'>
                        <div class='caption panel panel-default'>
                            <div class='panel-heading'>
                                <h2>${movie.title}</h2>
                            </div>
                            <div class='panel-body'>
                                <h3>Plot</h3>
                                <p>${movie.overview}</p>
                                <ul class='movie__listInfo list-group'>
                                    <li class='list-group-item'>Genres: ${movie.genres.map(ele => `${ele.name}`)}</li>
                                    <li class='list-group-item'>Release date: ${movie.release_date}</li>
                                    <li class='list-group-item'>Average vote: ${movie.vote_average}</li>
                                    <li class='list-group-item'>Popularity: ${movie.popularity}</li>
                                    <li class='list-group-item'>Budget: ${movie.budget}$</li>
                                    <li class='list-group-item'>Revenue: ${movie.revenue}$</li>
                                </ul>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Actors <span class="caret"></span>
                                    </button>
                                    <ul class='actors  dropdown-menu'>
                                    ${movie.credits.cast.map(ele => `<li>${ele.name} - ${ele.character}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                 `;
    movieContainer.innerHTML = output;
}

//function movieCastInfo(person) {
//        let actorNames = person.cast.map(el => {
//            let name = el.name;
//            let character = el.character;
//            return `<li>${name} - ${character} </li>`;
//        }).join('');
//        actorsContainer.innerHTML = actorNames;
//     }


$('.dropdown-toggle').dropdown();

