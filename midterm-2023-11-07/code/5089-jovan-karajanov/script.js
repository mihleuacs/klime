"use strict";
document.addEventListener("DOMContentLoaded", siteCode);
let movies = [];
async function siteCode() {
    const data = await loadData();
    movies = data;
    displayMovies(movies);
    const idSort = document.getElementById("sort-id");
    idSort.addEventListener("click", sortById);
    const titleSort = document.getElementById("sort-title");
    titleSort.addEventListener("click", sortByTitle);
}
async function loadData() {
    const dataUri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json";
    const response = await fetch(dataUri);
    if (!response.ok) {
        throw new Error("The data is not available.");
    }
    const data = await response.json();
    return data;
}
const idSort = (first, second) => first.id - second.id;
const titleSort = (first, second) => first.title.localeCompare(second.title);
const sortById = () => {
    const sortedMovies = movies.toSorted(idSort);
    displayMovies(sortedMovies);
};
const sortByTitle = () => {
    const sortedMovies = movies.toSorted(titleSort);
};
function displayMovies(movies) {
    const container = document.getElementById("movie-container");
    container.innerHTML = "";
    for (const movie of movies) {
        const movieTable = generateMovieTable(movie);
        container.appendChild(movieTable);
    }
}
/// Filters
`const titleFilterInput = document.getElementById("title-filter") as HTMLInputElement;


const directorFilterInput = document.getElementById("director-filter") as HTMLInputElement;


const yearFilterInput = document.getElementById("year-filter") as HTMLSelectElement;

const genreFilterInput = document.getElementById("genre-filter") as HTMLSelectElement;

titleFilterInput.addEventListener("input", );
yearFilterInput.addEventListener("input", filterMovies);
genreFilterInput.addEventListener("input", filterMovies)
  `;
function generateMovieTable(movie) {
    const table = document.createElement("div");
    table.classList.add("movie-table");
    const movieData = [
        movie.id,
        movie.title,
        movie.director,
        movie.year,
        movie.genre,
        movie.plot,
        generateCastList(movie.cast),
        movie.oscars
    ];
    for (const data of movieData) {
        const movieDataElement = document.createElement("div");
        movieDataElement.classList.add("movie-data");
        movieDataElement.innerHTML = data.toString();
        table.appendChild(movieDataElement);
    }
    return table;
}
function generateCastList(cast) {
    const ul = document.createElement("ul");
    for (const actor of cast) {
        const li = document.createElement("li");
        li.innerHTML = actor;
        ul.appendChild(li);
    }
    return ul;
}
//# sourceMappingURL=script.js.map