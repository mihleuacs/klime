interface Band {
    id: number;
    name: string;
    genre: string;
    formed: number;
    location: string;
    members: string[];
    albums: {
        name: string;
        year: number;
    }[];
}

let bandData: Band[] = [];

function fetchData(callback: () => void) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            bandData = data.metalBands;
            callback();
        }
    };
    xhr.send();
}

function populateBandList() {
    const bandList = document.getElementById('bandList')!;

    bandData.forEach(function (band) {
        const row = document.createElement('tr');
        row.innerHTML = '<td>' + band.id + '</td>' +
            '<td>' + band.name + '</td>' +
            '<td>' + band.formed + '</td>' +
            '<td>' + band.location + '</td>' +
            '<td>' + getCountry(band.location) + '</td>' +
            '<td>' + band.genre + '</td>' +
            '<td>' + formatMembers(band.members) + '</td>' +
            '<td>' + band.albums.length + '</td>' +
            '<td>' + band.albums[0].name + ' (' + band.albums[0].year + ')</td>' +
            '<td>' + band.albums[band.albums.length - 1].name + ' (' + band.albums[band.albums.length - 1].year + ')</td>' +
            '<td>' + calculateYearsActive(band) + '</td>';

        bandList.appendChild(row);

        row.addEventListener('click', function () {
            displayBandDetails(band);
        });
    });
}

function displayBandDetails(band: Band) {
    const modal = document.getElementById('bandModal')!;
    const modalContent = document.querySelector('.modal-content')!;
    modalContent.innerHTML = `
        <span class="close" id="closeModal" onclick="closeModal()">&times;</span>
        <h2>${band.name}</h2>
        <p>ID: ${band.id}</p>
        <p>Genre: ${band.genre}</p>
        <p>Formed: ${band.formed}</p>
        <p>Location: ${band.location}</p>
        <p>Country: ${getCountry(band.location)}</p>
        <p>Members: ${formatMembers(band.members)}</p>
        <p>Albums: ${band.albums.length}</p>
        <p>First Album: ${band.albums[0].name} (${band.albums[0].year})</p>
        <p>Last Album: ${band.albums[band.albums.length - 1].name} (${band.albums[band.albums.length - 1].year})</p>
        <p>Years Active: ${calculateYearsActive(band)}</p>
    `;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('bandModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function getCountry(location: string): string {
    const parts = location.split(',');
    if (parts.length > 1) {
        return parts[parts.length - 1].trim();
    } else {
        return 'N/A';
    }
}

function formatMembers(members: string[]): string {
    members.sort();
    if (members.length > 5) {
        return members.slice(0, 5).join(', ') + ' & more';
    } else if (members.length < 3) {
        return members.join(' & ');
    } else {
        return members.slice(0, members.length - 1).join(', ') + ' & ' + members[members.length - 1];
    }
}

function calculateYearsActive(band: Band): string {
    const currentYear = new Date().getFullYear();
    const startYear = band.formed;
    const lastAlbumYear = Math.max.apply(Math, band.albums.map(function (album) {
        return album.year;
    }));

    if (lastAlbumYear >= currentYear - 2) {
        return startYear + ' - present';
    } else {
        return startYear + ' - ' + lastAlbumYear;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fetchData(function () {
        populateBandList();
    });
});
