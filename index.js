const imgURl = "https://image.tmdb.org/t/p/w500/";

const genreObj = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  25: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
let issearch = 2; // issearch = 1 (moviebyname or tvbyname) , issearch = 2(popularmovie or populartv)
const mvtvtoggle = document.querySelector("#togBtn"); //toggles between tv shows and movies (movie == flase , tv shows == true)
const imgUrl = "https://image.tmdb.org/t/p/w500/";
const searchname = document.querySelector("#moviename");
const search1 = document.querySelector("#search");
const movieblock1 = document.querySelector(".movieblock");
getPopularMovies();
searchname.addEventListener("click", () => (issearch = 0));
mvtvtoggle.addEventListener("change", (event) => {
  if (
    (mvtvtoggle.checked == true && searchname.value == "" && issearch == 1) ||
    (mvtvtoggle.checked == true && issearch == 2)
  ) {
    movieblock1.innerHTML = "";
    getPopularTvs();
  } else if (
    mvtvtoggle.checked == true &&
    searchname.value != "" &&
    issearch == 1
  ) {
    movieblock1.innerHTML = "";
    getTvByName(searchname.value);
  } else if (
    (mvtvtoggle.checked == false && searchname.value == "" && issearch == 1) ||
    (mvtvtoggle.checked == false && issearch == 2)
  ) {
    movieblock1.innerHTML = "";
    getPopularMovies();
  } else if (
    mvtvtoggle.checked == false &&
    searchname.value != "" &&
    issearch == 1
  ) {
    movieblock1.innerHTML = "";
    getMovieByName(searchname.value);
  }
});
search1.addEventListener("click", (event) => {
  movieblock1.innerHTML = "";
  if (mvtvtoggle.checked == true && searchname.value == "") {
    movieblock1.innerHTML = "";
    getPopularTvs();
    issearch = 2;
  } else if (mvtvtoggle.checked == false && searchname.value == "") {
    movieblock1.innerHTML = "";
    getPopularMovies();
    issearch = 2;
  }
  if (mvtvtoggle.checked == true && searchname.value != "") {
    getTvByName(searchname.value);
    issearch = 1;
  } else if (mvtvtoggle.checked == false && searchname.value != "") {
    getMovieByName(searchname.value);
    issearch = 1;
  }
});

//get movie by name
function getMovieByName(name) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=d5dc762873106644192a916a78a39251&language=en-US&query=${name}&api_key=d5dc762873106644192page=1&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      const arrmovie = json.results;
      arrmovie.forEach((movie, index) => {
        if (movie.poster_path != null) {
          const image = document.createElement("img");
          image.src = `${imgUrl}${movie.poster_path}`;
          image.classList.add("exampleimg");

          image.addEventListener("click", () => {});

          movieblock1.appendChild(image);
        }
      });
    });
}
//get tv by name
function getTvByName(name) {
  fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=1&query=${name}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      const arrmovie = json.results;
      arrmovie.forEach((tv, index) => {
        if (tv.poster_path != null) {
          const image = document.createElement("img");
          image.src = `${imgUrl}${tv.poster_path}`;
          image.classList.add("exampleimg");

          image.addEventListener("click", () => {});

          movieblock1.appendChild(image);
        }
      });
    });
}
//get all popular movies
function getPopularMovies() {
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      const arrmovie = json.results;
      arrmovie.forEach((movie, index) => {
        if (movie.poster_path != null) {
          const image = document.createElement("img");
          image.src = `${imgUrl}${movie.poster_path}`;
          image.classList.add("exampleimg");

          image.addEventListener("click", () => {});

          movieblock1.appendChild(image);
        }
      });
    });
}
//get all popular tv shows
function getPopularTvs() {
  fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=1`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      const arrmovie = json.results;
      arrmovie.forEach((movie, index) => {
        if (movie.poster_path != null) {
          const image = document.createElement("img");
          image.src = `${imgUrl}${movie.poster_path}`;
          image.classList.add("exampleimg");

          image.addEventListener("click", () => {});

          movieblock1.appendChild(image);
        }
      });
    });
}
const checkList = document.getElementById("list1");
//check line below - what is evt? Check checklist webpage - w3
checkList.getElementsByClassName("anchor")[0].onclick = function (evt) {
  if (checkList.classList.contains("visible"))
    checkList.classList.remove("visible");
  else checkList.classList.add("visible");
};

function uncheck() {
  let uncheck = document.querySelectorAll(".genre");
  for (let i = 0; i < uncheck.length; i++) {
    uncheck[i].checked = false;
  }
}
