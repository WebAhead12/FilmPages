const genremovie = {
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
const genretv = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
};
let check = 0, //check = 0 (default), check = 1 (top-low rating), check = 2 (upcoming)
  total = 500, //for pagination (end)
  page = 1;
let isPopupOpen = false;
let issearch = 2; // issearch = 1 (moviebyname or tvbyname) , issearch = 2(popularmovie or populartv) , issearch = 0(u cant press on any button except for search)
const pr = document.querySelector(".paginate.left");
const pl = document.querySelector(".paginate.right");
const counter1 = document.querySelector(".counter");
const upcoming1 = document.querySelector("#upcoming");
const toplowrating = document.querySelector("#Top-Low-Rating");
const mvtvtoggle = document.querySelector("#togBtn"); //toggles between tv shows and movies (movie == flase , tv shows == true)
const imgUrl = "https://image.tmdb.org/t/p/w500/";
const videoUrl = "https://www.youtube.com/embed/";
const searchname = document.querySelector("#moviename");
const search1 = document.querySelector("#search");
const movieblock1 = document.querySelector(".movieblock");
const popup1 = document.querySelector(".popup");
const exit = document.querySelector(".close");
const checkList = document.getElementById("list1");
//popup variables
const title = document.querySelector(".popup-title");
const imagecard = document.querySelector(".image");
const rating = document.querySelector(".rating1");
const summary = document.querySelector(".summary1");
const genre = document.querySelector(".genre1");
const director = document.querySelector(".director1");
const cast = document.querySelector(".cast1");
const releaseyear = document.querySelector(".year");
const video1 = document.querySelector(".trailer");

getPopularMovies(); //shows popularMovies when u load the website

// AddEventListeners:
exit.addEventListener("click", () => {
  closeCard();
}); //closes popup card

searchname.addEventListener("click", () => (issearch = 0));

mvtvtoggle.addEventListener("change", () => {
  movieblock1.innerHTML = "";
  if (mvtvtoggle.checked == true && check == 1) {
    ratingTopLowTv();
  } else if (mvtvtoggle.checked == false && check == 1) {
    ratingTopLowMovies();
  }
  if (mvtvtoggle.checked == true && check == 2) {
    airingTv();
  } else if (mvtvtoggle.checked == false && check == 2) {
    upcomingMovie();
  }
  if (mvtvtoggle.checked == true && issearch == 2 && check == 0) {
    getPopularTvs();
  } else if (mvtvtoggle.checked == true && searchname.value != "" && issearch == 1) {
    getTvByName(searchname.value);
  } else if (mvtvtoggle.checked == false && issearch == 2 && check == 0) {
    getPopularMovies();
  } else if (mvtvtoggle.checked == false && searchname.value != "" && issearch == 1) {
    getMovieByName(searchname.value);
  }
});

search1.addEventListener("click", () => {
  movieblock1.innerHTML = "";
  toplowrating.style["background-color"] = "#f1f1f1";
  check = 0;
  page = 1;

  if (mvtvtoggle.checked == true && searchname.value == "") {
    getPopularTvs();
    issearch = 2;
  } else if (mvtvtoggle.checked == false && searchname.value == "") {
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
  counter1.innerHTML = page + " / " + total;
});

toplowrating.addEventListener("click", () => {
  movieblock1.innerHTML = "";
  if (check == 0) {
    check = 1;
    toplowrating.style["background-color"] = "#ddd";
    if (mvtvtoggle.checked == true) {
      ratingTopLowTv();
    } else if (mvtvtoggle.checked == false) {
      ratingTopLowMovies();
    }
    return;
  } else if (check == 1) {
    check = 0;
    toplowrating.style["background-color"] = "#f1f1f1";
    if (mvtvtoggle.checked == true) {
      getPopularTvs();
    } else if (mvtvtoggle.checked == false) {
      getPopularMovies();
    }
    return;
  }
});

upcoming1.addEventListener("click", () => {
  movieblock1.innerHTML = "";
  if (check == 0) {
    check = 2;
    upcoming1.style["background-color"] = "#ddd";
    if (mvtvtoggle.checked == true) {
      airingTv();
    } else if (mvtvtoggle.checked == false) {
      upcomingMovie();
    }
    return;
  } else if (check == 2) {
    check = 0;
    upcoming1.style["background-color"] = "#f1f1f1";
    if (mvtvtoggle.checked == true) {
      getPopularTvs();
    } else if (mvtvtoggle.checked == false) {
      getPopularMovies();
    }
    return;
  }
});

pr.addEventListener("click", () => {
  movieblock1.innerHTML = "";
  if (page <= 1) {
    page = 1;
    if (mvtvtoggle.checked == true && check == 1) {
      ratingTopLowTv();
    } else if (mvtvtoggle.checked == false && check == 1) {
      ratingTopLowMovies();
    }
    if (mvtvtoggle.checked == true && issearch == 2 && check == 0) {
      getPopularTvs();
    } else if (mvtvtoggle.checked == true && searchname.value != "") {
      getTvByName(searchname.value);
    } else if (mvtvtoggle.checked == false && issearch == 2 && check == 0) {
      getPopularMovies();
    } else if (mvtvtoggle.checked == false && searchname.value != "") {
      getMovieByName(searchname.value);
    }
  } else if (page > 1) {
    page--;
    if (mvtvtoggle.checked == true && check == 1) {
      ratingTopLowTv();
    } else if (mvtvtoggle.checked == false && check == 1) {
      ratingTopLowMovies();
    }
    if (mvtvtoggle.checked == true && issearch == 2 && check == 0) {
      getPopularTvs();
    } else if (mvtvtoggle.checked == true && searchname.value != "") {
      getTvByName(searchname.value);
    } else if (mvtvtoggle.checked == false && issearch == 2 && check == 0) {
      getPopularMovies();
    } else if (mvtvtoggle.checked == false && searchname.value != "") {
      getMovieByName(searchname.value);
    }
  }
});

pl.addEventListener("click", () => {
  movieblock1.innerHTML = "";
  if (page >= total) {
    page = total;
    if (mvtvtoggle.checked == true && check == 1) {
      ratingTopLowTv();
    } else if (mvtvtoggle.checked == false && check == 1) {
      ratingTopLowMovies();
    }
    if (mvtvtoggle.checked == true && issearch == 2 && check == 0) {
      getPopularTvs();
    } else if (mvtvtoggle.checked == true && searchname.value != "") {
      getTvByName(searchname.value);
    } else if (mvtvtoggle.checked == false && issearch == 2 && check == 0) {
      getPopularMovies();
    } else if (mvtvtoggle.checked == false && searchname.value != "") {
      getMovieByName(searchname.value);
    }
  } else if (page < total) {
    page++;
    if (mvtvtoggle.checked == true && check == 1) {
      ratingTopLowTv();
    } else if (mvtvtoggle.checked == false && check == 1) {
      ratingTopLowMovies();
    }
    if (mvtvtoggle.checked == true && issearch == 2 && check == 0) {
      getPopularTvs();
    } else if (mvtvtoggle.checked == true && searchname.value != "") {
      getTvByName(searchname.value);
    } else if (mvtvtoggle.checked == false && issearch == 2 && check == 0) {
      getPopularMovies();
    } else if (mvtvtoggle.checked == false && searchname.value != "") {
      getMovieByName(searchname.value);
    }
  }
});
// Functions
//gets top rated movies
function ratingTopLowMovies() {
  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=${page}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      total = json["total_pages"];
      console.log(json["total_pages"]);
      const arrmovie = json.results;
      arrmovie.forEach((movie, index) => {
        if (movie.poster_path != null) {
          const image = document.createElement("img");
          image.src = `${imgUrl}${movie.poster_path}`;
          image.classList.add("exampleimg");

          image.addEventListener("click", () => {
            title.textContent = movie.title;
            imagecard.src = `${imgUrl}${movie.poster_path}`;
            summary.textContent = movie.overview;
            rating.textContent = `Rating ${movie["vote_average"]}`;
            releaseyear.textContent = movie["release_date"].split("-")[0];
            console.log(movie["genre_ids"]);
            genre.textContent = getGenrefromId(movie["genre_ids"]);
            video(movie.id);
            openCard();
          });

          movieblock1.appendChild(image);
          counter1.innerHTML = page + " / " + total;
        }
      });
    });
}
//gets top rated tv shows
function ratingTopLowTv() {
  fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=${page}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      total = json["total_pages"];
      console.log(json["total_pages"]);
      const arrmovie = json.results;
      arrmovie.forEach((tv, index) => {
        if (tv.poster_path != null) {
          const image = document.createElement("img");
          image.src = `${imgUrl}${tv.poster_path}`;
          image.classList.add("exampleimg");

          image.addEventListener("click", () => {
            title.textContent = tv.name;
            imagecard.src = `${imgUrl}${tv.poster_path}`;
            summary.textContent = tv.overview;
            rating.textContent = `Rating ${tv["vote_average"]}`;
            releaseyear.textContent = tv["first_air_date"].split("-")[0];
            genre.textContent = getGenrefromId(tv["genre_ids"]);
            video(tv.id);
            openCard();
          });

          movieblock1.appendChild(image);
          counter1.innerHTML = page + " / " + total;
        }
      });
    });
}
//get movie by name

function getMovieByName(name) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=d5dc762873106644192a916a78a39251&language=en-US&query=${name}&api_key=d5dc762873106644192&page=${page}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      total = json["total_pages"];
      console.log(json["total_pages"]);
      const arrmovie = json.results;
      arrmovie.forEach((movie, index) => {
        if (movie.poster_path != null) {
          const image = document.createElement("img");
          image.src = `${imgUrl}${movie.poster_path}`;
          image.classList.add("exampleimg");

          image.addEventListener("click", () => {
            title.textContent = movie.title;
            imagecard.src = `${imgUrl}${movie.poster_path}`;
            summary.textContent = movie.overview;
            rating.textContent = `Rating ${movie["vote_average"]}`;
            releaseyear.textContent = movie["release_date"].split("-")[0];
            console.log(movie["genre_ids"]);
            genre.textContent = getGenrefromId(movie["genre_ids"]);
            video(movie.id);
            openCard();
          });

          movieblock1.appendChild(image);
          counter1.innerHTML = page + " / " + total;
        }
      });
    });
}
//get tv by name
function getTvByName(name) {
  fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=${page}&query=${name}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      total = json["total_pages"];
      console.log(json["total_pages"]);
      const arrmovie = json.results;
      arrmovie.forEach((tv, index) => {
        if (tv.poster_path != null) {
          const image = document.createElement("img");
          image.src = `${imgUrl}${tv.poster_path}`;
          image.classList.add("exampleimg");

          image.addEventListener("click", () => {
            title.textContent = tv.name;
            imagecard.src = `${imgUrl}${tv.poster_path}`;
            summary.textContent = tv.overview;
            rating.textContent = `Rating ${tv["vote_average"]}`;
            releaseyear.textContent = tv["first_air_date"].split("-")[0];
            genre.textContent = getGenrefromId(tv["genre_ids"]);
            video(tv.id);
            openCard();
          });

          movieblock1.appendChild(image);
          counter1.innerHTML = page + " / " + total;
        }
      });
    });
}
//get all popular movies

function getPopularMovies() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=${page}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      total = json["total_pages"];
      console.log(json["total_pages"]);
      const arrmovie = json.results;
      console.log(json.results);
      arrmovie.forEach((movie, index) => {
        if (movie.poster_path != null) {
          const image = document.createElement("img");
          image.src = `${imgUrl}${movie.poster_path}`;
          image.classList.add("exampleimg");

          image.addEventListener("click", () => {
            title.textContent = movie.title;
            imagecard.src = `${imgUrl}${movie.poster_path}`;
            summary.textContent = movie.overview;
            rating.textContent = `Rating ${movie["vote_average"]}`;
            releaseyear.textContent = movie["release_date"].split("-")[0];
            console.log(movie["genre_ids"]);
            genre.textContent = getGenrefromId(movie["genre_ids"]);
            video(movie.id);
            openCard();
          });

          movieblock1.appendChild(image);
          counter1.innerHTML = page + " / " + total;
        }
      });
    });
  counter1.innerHTML = page + " / " + total;
}

//gets the trailer of the movie
function video(id) {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=d5dc762873106644192a916a78a39251&language=en-US`)
    .then((response) => {
      if (!response.ok) if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      let arr1 = json.results;
      arr1.forEach((element) => {
        if (element.type == "Trailer") {
          video1.src = `${videoUrl}${element.key}`;
        }
      });
    })
    .catch(alert);
}
// transform genre id to genre string
function getGenrefromId(arr) {
  let str = "";
  if (mvtvtoggle == true) {
    for (let i = 0; i < arr.length; i++) {
      if (i == arr.length - 1) {
        str += `${genretv[arr[i]]}`;
      } else {
        str += `${genretv[arr[i]]}/`;
      }
    }
  } else if (mvtvtoggle == false) {
    for (let i = 0; i < arr.length; i++) {
      if (i == arr.length - 1) {
        str += `${genremovie[arr[i]]}`;
      } else {
        str += `${genremovie[arr[i]]}/`;
      }
    }
  }
  return str;
}
//get all popular tv shows
function getPopularTvs() {
  fetch(`https://api.themoviedb.org/3/tv/popular?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=${page}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      total = json["total_pages"];
      console.log(json["total_pages"]);
      const arrmovie = json.results;
      arrmovie.forEach((tv, index) => {
        if (tv.poster_path != null) {
          const image = document.createElement("img");
          image.src = `${imgUrl}${tv.poster_path}`;
          image.classList.add("exampleimg");

          image.addEventListener("click", () => {
            title.textContent = tv.name;
            imagecard.src = `${imgUrl}${tv.poster_path}`;
            summary.textContent = tv.overview;
            rating.textContent = `Rating ${tv["vote_average"]}`;
            releaseyear.textContent = tv["first_air_date"].split("-")[0];
            genre.textContent = getGenrefromId(tv["genre_ids"]);
            video(tv.id);
            openCard();
          });

          movieblock1.appendChild(image);
          counter1.innerHTML = page + " / " + total;
        }
      });
    });
}
//upcoming movies
function upcomingMovie() {
  fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=${page}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      total = json["total_pages"];
      console.log(json["total_pages"]);
      const arrmovie = json.results;
      arrmovie.forEach((movie, index) => {
        if (movie.poster_path != null) {
          const image = document.createElement("img");
          image.src = `${imgUrl}${movie.poster_path}`;
          image.classList.add("exampleimg");

          image.addEventListener("click", () => {
            title.textContent = movie.title;
            imagecard.src = `${imgUrl}${movie.poster_path}`;
            summary.textContent = movie.overview;
            rating.textContent = `Rating ${movie["vote_average"]}`;
            releaseyear.textContent = movie["release_date"].split("-")[0];
            genre.textContent = getGenrefromId(movie["genre_ids"]);
            video(movie.id);
            openCard();
          });

          movieblock1.appendChild(image);
          counter1.innerHTML = page + " / " + total;
        }
      });
    });
}
//upcoming tv shows
function airingTv() {
  //gets all TV shows that has an episode with an air date in the next 7 days.
  fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=d5dc762873106644192a916a78a39251&language=en-US&page=${page}}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((json) => {
      total = json["total_pages"];
      console.log(json["total_pages"]);
      const arrmovie = json.results;
      arrmovie.forEach((movie, index) => {
        if (movie.poster_path != null) {
          const image = document.createElement("img");
          image.src = `${imgUrl}${movie.poster_path}`;
          image.classList.add("exampleimg");

          image.addEventListener("click", () => {
            title.textContent = tv.name;
            imagecard.src = `${imgUrl}${tv.poster_path}`;
            summary.textContent = tv.overview;
            rating.textContent = `Rating ${tv["vote_average"]}`;
            releaseyear.textContent = tv["first_air_date"].split("-")[0];
            genre.textContent = getGenrefromId(tv["genre_ids"]);
            video(tv.id);
            openCard();
          });

          movieblock1.appendChild(image);
          counter1.innerHTML = page + " / " + total;
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

function slide() {
  counter1.innerHTML = page + " / " + total;
  // page = counter1.textContent.split("/")[0];
}
