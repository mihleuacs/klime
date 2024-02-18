"use strict";
document.addEventListener("DOMContentLoaded", siteCode);
let bands = [];
const albumsSorter_asc = (first, second) => second.albums.length - first.albums.length;
const albumsSorter_desc = (first, second) => first.albums.length - second.albums.length;
const idSorter_asc = (first, second) => first.id - second.id;
const idSorter_desc = (first, second) => second.id - first.id;
const nameSorter_asc = (first, second) => first.name.localeCompare(second.name);
const nameSorter_desc = (first, second) => second.name.localeCompare(first.name);
const formedSorter_asc = (first, second) => first.formed - second.formed;
const formedSorter_desc = (first, second) => second.formed - first.formed;
const genreSorter_asc = (first, second) => first.genre.localeCompare(second.genre);
const genreSorter_desc = (first, second) => second.genre.localeCompare(first.genre);
const locationSorter_asc = (first, second) => first.location.localeCompare(second.location);
const locationSorter_desc = (first, second) => second.location.localeCompare(first.location);
const countrySorter_asc = (first, second) => findCountry(first).localeCompare(findCountry(second));
const countrySorter_desc = (first, second) => findCountry(second).localeCompare(findCountry(first));
async function siteCode() {
    const data = await loadData();
    bands = data.metalBands;
    displayBands(bands);
    fillBands(bands);
    fillGenre(bands);
    const sortIdButton = document.getElementById("sort-id");
    sortIdButton.addEventListener("click", sortID);
    const sortNameButton = document.getElementById("sort-name");
    sortNameButton.addEventListener("click", sortName);
    const sortFormedButton = document.getElementById("sort-formed");
    sortFormedButton.addEventListener("click", sortFormed);
    const sortGenreButton = document.getElementById("sort-genre");
    sortGenreButton.addEventListener("click", sortGenre);
    const sortLocationButton = document.getElementById("sort-location");
    sortLocationButton.addEventListener("click", sortLocation);
    const sortCountryButton = document.getElementById("sort-country");
    sortCountryButton?.addEventListener("click", sortCountry);
    const sortAlbumsButton = document.getElementById("sort-albums");
    sortAlbumsButton.addEventListener("click", sortAlbums);
    const applyFilterButton = document.getElementById("apply-filter");
    applyFilterButton.addEventListener("click", applyFilter);
    const nameFilterInput = document.getElementById("name-filter");
    nameFilterInput.addEventListener("input", applyNameFilter);
}
const fillBands = (bands) => {
    const filter = document.getElementById("country-filter");
    const countries = new Set();
    for (const band of bands) {
        countries.add(findCountry(band));
    }
    for (const country of countries) {
        const option = document.createElement("option");
        option.value = country;
        option.innerHTML = country;
        filter.appendChild(option);
    }
};
const applyNameFilter = () => {
    const nameFilterInput = document.getElementById("name-filter");
    const nameFilter = nameFilterInput.value.trim().toLowerCase();
    let filteredBands = bands;
    if (nameFilter !== "") {
        filteredBands = bands.filter(band => band.name.toLowerCase().includes(nameFilter));
    }
    displayBands(filteredBands);
};
const applyFilter = () => {
    const countryElement = document.getElementById("country-filter");
    const country = countryElement.value;
    const genreElemnet = document.getElementById("genre-filter");
    const genre = genreElemnet.value;
    let filteredBands = bands;
    if (country !== "all") {
        filteredBands = filteredBands.filter(bands => findCountry(bands) === country);
    }
    if (genre !== "all") {
        filteredBands = filteredBands.filter(bands => bands.genre === genre);
    }
    displayBands(filteredBands);
};
const fillGenre = (bands) => {
    const filter = document.getElementById("genre-filter");
    const genres = new Set();
    for (const band of bands) {
        genres.add(band.genre);
    }
    for (const genre of genres) {
        const option = document.createElement("option");
        option.value = genre;
        option.innerHTML = genre;
        filter.appendChild(option);
    }
};
let sortIdswitch = false;
let sortNameSwitch = false;
let sortFormedSwitch = false;
let sortAlbumsSwitch = false;
let sortGenreSwitch = false;
let sortLocationSwitch = false;
let sortCountrySwitch = false;
const sortID = () => {
    if (sortIdswitch === false) {
        const sortedBands = bands.toSorted(idSorter_asc);
        displayBands(sortedBands);
        sortIdswitch = true;
    }
    else if (sortIdswitch === true) {
        const sortedBands = bands.toSorted(idSorter_desc);
        displayBands(sortedBands);
        sortIdswitch = false;
    }
};
const sortLocation = () => {
    if (sortLocationSwitch === false) {
        const sortedBands = bands.toSorted(locationSorter_asc);
        displayBands(sortedBands);
        sortLocationSwitch = true;
    }
    else if (sortLocationSwitch === true) {
        const sortedBands = bands.toSorted(locationSorter_desc);
        displayBands(sortedBands);
        sortLocationSwitch = false;
    }
};
const sortGenre = () => {
    if (sortGenreSwitch === false) {
        const sortedBands = bands.toSorted(genreSorter_asc);
        displayBands(sortedBands);
        sortGenreSwitch = true;
    }
    else if (sortGenreSwitch === true) {
        const sortedBands = bands.toSorted(genreSorter_asc);
        displayBands(sortedBands);
        sortGenreSwitch = false;
    }
};
const sortName = () => {
    if (sortNameSwitch === false) {
        const sortedBands = bands.toSorted(nameSorter_asc);
        displayBands(sortedBands);
        sortNameSwitch = true;
    }
    else if (sortNameSwitch === true) {
        const sortedBands = bands.toSorted(nameSorter_desc);
        displayBands(sortedBands);
        sortNameSwitch = false;
    }
};
const sortFormed = () => {
    if (sortFormedSwitch === false) {
        const sortedBands = bands.toSorted(formedSorter_asc);
        displayBands(sortedBands);
        sortFormedSwitch = true;
    }
    else if (sortFormedSwitch === true) {
        const sortedBands = bands.toSorted(formedSorter_desc);
        displayBands(sortedBands);
        sortFormedSwitch = false;
    }
};
const sortCountry = () => {
    if (sortCountrySwitch === false) {
        const sortedBands = bands.toSorted(countrySorter_asc);
        displayBands(sortedBands);
        sortCountrySwitch = true;
    }
    else if (sortCountrySwitch === true) {
        const sortedBands = bands.toSorted(countrySorter_desc);
        displayBands(sortedBands);
        sortCountrySwitch = false;
    }
};
const sortAlbums = () => {
    if (sortAlbumsSwitch === false) {
        const sortedBands = bands.toSorted(albumsSorter_asc);
        displayBands(sortedBands);
        sortAlbumsSwitch = true;
    }
    else if (sortAlbumsSwitch === true) {
        const sortedBands = bands.toSorted(albumsSorter_desc);
        displayBands(sortedBands);
        sortAlbumsSwitch = false;
    }
};
const displayBands = (bands) => {
    const container = document.getElementById("band-container");
    container.innerHTML = "";
    for (const band of bands) {
        const metalBandRow = generateRowBands(band);
        container.append(metalBandRow);
    }
};
const findCountry = (band) => {
    let bandlocation = band.location;
    let parts = bandlocation.split(', ');
    let lastPart = parts[parts.length - 1];
    return lastPart;
};
const generateRowBands = (bands) => {
    const row = document.createElement("div");
    row.classList.add("band-table");
    const idCell = document.createElement("div");
    idCell.classList.add("band-data", "band-id");
    idCell.innerHTML = bands.id.toString();
    row.appendChild(idCell);
    const nameCell = document.createElement("div");
    nameCell.classList.add("band-data", "band-name");
    nameCell.innerHTML = bands.name;
    row.appendChild(nameCell);
    const genreCell = document.createElement("div");
    genreCell.classList.add("band-data", "band-genre");
    genreCell.innerHTML = bands.genre;
    row.appendChild(genreCell);
    const formedCell = document.createElement("div");
    formedCell.classList.add("band-data", "band-formed");
    formedCell.innerHTML = bands.formed.toString();
    row.appendChild(formedCell);
    const locationCell = document.createElement("div");
    locationCell.classList.add("band-data", "band-location");
    locationCell.innerHTML = bands.location;
    row.appendChild(locationCell);
    const countryCell = document.createElement("div");
    countryCell.classList.add("band-data", "band-country");
    countryCell.innerHTML = findCountry(bands);
    row.appendChild(countryCell);
    const membersCell = document.createElement("div");
    membersCell.classList.add("band-data", "band-members");
    membersCell.innerHTML = bands.members.toString();
    row.appendChild(membersCell);
    const albumsCell = document.createElement("div");
    albumsCell.classList.add("band-data", "band-albums");
    const firstalbum = `${bands.albums[0].year} - "${bands.albums[0].name}"`;
    const lastalbum = `${bands.albums[bands.albums.length - 1].year} - "${bands.albums[bands.albums.length - 1].name}"`;
    albumsCell.innerHTML = `${bands.name} has ${bands.albums.length} albums. \n\n First album: ${firstalbum} \n Last Album: ${lastalbum}`;
    row.appendChild(albumsCell);
    return row;
};
const loadData = async () => {
    const url = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json";
    const response = await fetch(url);
    if (!response.ok) {
        console.log("Error while fetching data");
    }
    const data = await response.json();
    return data;
};
//# sourceMappingURL=script.js.map