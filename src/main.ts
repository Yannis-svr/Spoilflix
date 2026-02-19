import { fetchCharacters } from './api/rickmorty';

const section = document.querySelector('.home-section')!;
const loadingMsg = document.getElementById('loading-msg')!;
const errorMsg = document.getElementById('error-msg')!;
const retryBtn = document.getElementById('retry-btn')!;
const loadMoreBtn = document.getElementById('load-more-btn')!;

let currentPage = 1;
let totalPages = 1;

async function loadCharacters(page: number, append = false) {
    // État : chargement
    loadingMsg.hidden = false;
    errorMsg.hidden = true;
    loadMoreBtn.hidden = true;

    if (!append) {
        section.innerHTML = '';
    }

    try {
        const data = await fetchCharacters(page);

        // Mettre à jour la pagination
        currentPage = page;
        totalPages = data.info.pages;

        // État : succès
        loadingMsg.hidden = true;

        data.results.forEach(character => {
            const card = document.createElement('div');
            card.className = 'card-media';
            const statusClass = character.status.toLowerCase(); // 'alive', 'dead', 'unknown'

            card.innerHTML = `
  <div class="card-media__image">
    <img src="${character.image}" alt="${character.name}" />
  </div>
  <div class="card-media__content">
    <h2 class="card-media__title">${character.name}</h2>
    <p class="card-media__meta">
      <span class="status status--${statusClass}">${character.status}</span>
      · ${character.species}
    </p>
  </div>
`;

            section.appendChild(card);
        });

        // Afficher le bouton "Voir plus" s'il reste des pages
        if (currentPage < totalPages) {
            loadMoreBtn.hidden = false;
        }

    } catch (error) {
        // État : erreur
        loadingMsg.hidden = true;
        errorMsg.hidden = false;
    }
}

// Bouton réessayer
retryBtn.addEventListener('click', () => {
    currentPage = 1;
    void loadCharacters(currentPage);
});

// Bouton "Voir plus"
loadMoreBtn.addEventListener('click', () => {
    void loadCharacters(currentPage + 1, true); // append = true
});

loadCharacters(1);

