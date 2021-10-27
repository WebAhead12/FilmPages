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

const imgUrl = "https://image.tmdb.org/t/p/w500/";
const moviename1 = document.querySelector("#moviename");
const search1 = document.querySelector("#search");
const movieblock1 = document.querySelector(".movieblock");
search1.addEventListener("click", (event) => {
  movieblock1.innerHTML = "";
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=d5dc762873106644192a916a78a39251&language=en-US&query=${moviename1.value}&api_key=d5dc762873106644192page=1&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      const arrmovie = json.results;
      arrmovie.forEach((movie, index) => {
        const image = document.createElement("img");
        image.src = `${imgUrl}${movie.poster_path}`;
        image.alt = movie.title;
        image.classList.add("exampleimg");

        image.addEventListener("click", () => { });

        movieblock1.appendChild(image);
      });
    });
});

var checkList = document.getElementById("list1");
//check line below - what is evt? Check checklist webpage - w3
checkList.getElementsByClassName("anchor")[0].onclick = function (evt) {
  if (checkList.classList.contains("visible"))
    checkList.classList.remove("visible");
  else checkList.classList.add("visible");
};



//No need for this
// function check() {
//   let inputs = document.getElementsById('checkId');
//   inputs.checked = true;
// }

// create uncheck function 
// function uncheck() {
//   let inputs = document.getElementById('checkId');
//   inputs.checked = false;
// }
// window.onload = function () {
//   window.addEventListener('load', check, false);
// }


function uncheck() {
  var uncheck = document.getElementsByTagName('input');
  for (var i = 0; i < uncheck.length; i++) {
    if (uncheck[i].type == 'checkbox') {
      uncheck[i].checked = false;
    }
  }
}