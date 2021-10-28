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
var check = 0;
const toplowrating = document.querySelector("#Top-Low-Rating");
let issearch = 2; // issearch = 1 (moviebyname or tvbyname) , issearch = 2(popularmovie or populartv)
const mvtvtoggle = document.querySelector("#togBtn"); //toggles between tv shows and movies (movie == flase , tv shows == true)
const imgUrl = "https://image.tmdb.org/t/p/w500/";
const searchname = document.querySelector("#moviename");
const search1 = document.querySelector("#search");
const movieblock1 = document.querySelector(".movieblock");
const popup1 = document.querySelector(".popup")
const exit = document.querySelector(".close")
let isPopupOpen = false;
const checkList = document.getElementById("list1");




getPopularMovies();

exit.addEventListener("click", closeCard)
searchname.addEventListener("click", () => (issearch = 0));
mvtvtoggle.addEventListener("change", (event) => {
  if ((mvtvtoggle.checked == true && searchname.value == "" && issearch == 1) || (mvtvtoggle.checked == true && issearch == 2)) {
    movieblock1.innerHTML = "";
    getPopularTvs();
  } else if (mvtvtoggle.checked == true && searchname.value != "" && issearch == 1) {
    movieblock1.innerHTML = "";
    getTvByName(searchname.value);
  } else if ((mvtvtoggle.checked == false && searchname.value == "" && issearch == 1) || (mvtvtoggle.checked == false && issearch == 2)) {
    movieblock1.innerHTML = "";
    getPopularMovies();
  } else if (mvtvtoggle.checked == false && searchname.value != "" && issearch == 1) {
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
toplowrating.addEventListener("click", (event) => {
  movieblock1.innerHTML = "";
  if (mvtvtoggle.checked == true) {
    console.log("1");
    ratingTopLowTv();
  } else if (mvtvtoggle.checked == false) {
    console.log("2");
    ratingTopLowMovies();
  }
});
// Functions
//gets top rated movies
function ratingTopLowMovies() {
  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=1`)
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

          image.addEventListener("click", () => {
            openCard();
          });

          movieblock1.appendChild(image);
        }
      });
    });
}
//gets top rated tv shows
function ratingTopLowTv() {
  fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=1`)
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

          image.addEventListener("click", () => { });

          movieblock1.appendChild(image);
        }
      });
    });
}
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

          image.addEventListener("click", () => {
            openCard();
          });

          movieblock1.appendChild(image);
        }
      });
    });
}
//get tv by name
function getTvByName(name) {
  fetch(`https://api.themoviedb.org/3/search/tv?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=1&query=${name}&include_adult=false`)
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

          image.addEventListener("click", () => { });

          movieblock1.appendChild(image);
        }
      });
    });
}
//get all popular movies
function getPopularMovies() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=1`)
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

          image.addEventListener("click", () => {
            openCard();
          });

          movieblock1.appendChild(image);
        }
      });
    });
}
//get all popular tv shows
function getPopularTvs() {
  fetch(`https://api.themoviedb.org/3/tv/popular?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=1`)
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

          image.addEventListener("click", () => { });

          movieblock1.appendChild(image);
        }
      });
    });
}
//open popup card
function openCard() {
  if (isPopupOpen) return;
  isPopupOpen = true;
  popup1.style["z-index"] = "2";
  popup1.style.opacity = "1";
}
//close popup card
function closeCard() {
  popup1.style.opacity = "0";
  popup1.style["z-index"] = "-1";
  isPopupOpen = false;
}

// basic paging logic to demo the buttons
var pr = document.querySelector(".paginate.left");
var pl = document.querySelector(".paginate.right");

pr.onclick = slide.bind(this, -1);
pl.onclick = slide.bind(this, 1);

var index = 0,
  total = 5;

function slide(offset) {
  index = Math.min(Math.max(index + offset, 0), total - 1);

  document.querySelector(".counter").innerHTML = index + 1 + " / " + total;

  pr.setAttribute("data-state", index === 0 ? "disabled" : "");
  pl.setAttribute("data-state", index === total - 1 ? "disabled" : "");
}

slide(0);
