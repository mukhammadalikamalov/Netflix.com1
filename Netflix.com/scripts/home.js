document.addEventListener("DOMContentLoaded", function () {
  const favElements = document.querySelectorAll('.fav');

  // Add click event listener to each .fav element to toggle animation
  favElements.forEach(function (favElement) {
    favElement.addEventListener('click', function () {
      // Toggle the 'animate' class for this specific favElement
      favElement.classList.toggle('animate');
    });
  });
});

import createBanner from "./module/banner.js";
import { pushMovie } from "./module/swiper.js";
import { getMovies, getTrending, getUpcoming } from "./module/utils.js";

const titles = {
  0: "Top Rated Movies",
  1: "popular movies",
  2: "Top Rated Tv Shows",
  3: "Popular Tv Shows",
  4: "Upcoming",
  5: "Trending Now"
};

getTrending("all").then(({ results }) => pushMovie(results, 5, null, titles[5]));

getMovies().then((res) => {
  const [movies, tv] = res;
  const all = [...movies, ...tv];

  createBanner({ ...movies[0].results[5], type: "movie" });

  all.forEach(({ results }, i) => {
    const type = i < 2 ? types[0] : types[1];
    pushMovie(results, i, type, titles[i]);
  });
});

getUpcoming().then(({ results }) => pushMovie(results, 4, "movie", titles[4]));

