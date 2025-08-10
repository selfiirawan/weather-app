const key = "ff5bc8ea45ec53242bc5ad103c5cbc0e";

async function search() {
    const phrase = document.querySelector('input[type="text"]').value;
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${phrase}&limit=5&appid=${key}`);
    const data = await response.json();
    const ul = document.querySelector('form ul');
    ul.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const {name, lat, lon, country} = data[i];
        ul.innerHTML += `<li 
                data-lat="${lat}" 
                data-lon="${lon}">
                ${name} <span>${country}</span></li>`;
    }
}

const debouncedSearch = _.debounce(() => {
    search();
}, 600);

document.querySelector('input[type="text"]')
    .addEventListener('keyup', debouncedSearch);