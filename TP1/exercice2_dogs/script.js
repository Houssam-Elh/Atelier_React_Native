const LIST_API = 'https://dog.ceo/api/breeds/list/all';
const IMAGES_API_BASE = 'https://dog.ceo/api/breed/';

const breedSelect = document.getElementById('breed-select');
const searchInput = document.getElementById('search-input');
const imageGrid = document.getElementById('image-grid');
const statusMessage = document.getElementById('status-message');

let allBreeds = [];

// Charger la liste des races
async function fetchBreeds() {
    try {
        const response = await fetch(LIST_API);
        const data = await response.json();
        allBreeds = Object.keys(data.message);
        populateSelect(allBreeds);
    } catch (error) {
        showStatus('Erreur lors de la récupération des races', 'error');
    }
}

// Remplir le select
function populateSelect(breeds) {
    breedSelect.innerHTML = '<option value="">Choisir une race...</option>';
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
        breedSelect.appendChild(option);
    });
}

// Filtrer les races
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allBreeds.filter(breed => breed.includes(term));
    populateSelect(filtered);
});

// Charger les images d'une race (GET)
breedSelect.addEventListener('change', async (e) => {
    const breed = e.target.value;
    if (!breed) return;

    imageGrid.innerHTML = '';
    showStatus('Chargement des images...', '');

    try {
        const response = await fetch(`${IMAGES_API_BASE}${breed}/images`);
        const data = await response.json();
        const images = data.message.slice(0, 12); // Limiter à 12 images

        if (images.length === 0) {
            showStatus('Aucune image trouvée.', 'error');
        } else {
            renderImages(images);
            showStatus('', '');
        }
    } catch (error) {
        showStatus('Erreur lors du chargement des images', 'error');
    }
});

function renderImages(images) {
    images.forEach(imgUrl => {
        const div = document.createElement('div');
        div.className = 'dog-card';
        div.innerHTML = `<img src="${imgUrl}" alt="Chien">`;
        imageGrid.appendChild(div);
    });
}

function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = type;
}

// Initialisation
fetchBreeds();
