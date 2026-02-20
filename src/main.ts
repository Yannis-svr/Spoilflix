import type { Character } from './type/api';
import { fetchCharacters } from './api/rickmorty';
import { loadFavorites, saveFavorites, toggleFavorite } from './utils/favorites';
import { sortCharacters, type SortCriteria } from './utils/sort';
import { computeStats } from './utils/stats';

const section = document.querySelector('.home-section')!;
const loadingMsg = document.getElementById('loading-msg')!;
const errorMsg = document.getElementById('error-msg')!;
const retryBtn = document.getElementById('retry-btn')!;
const loadMoreBtn = document.getElementById('load-more-btn')!;
const statTotal = document.getElementById('stat-total')!;
const statFavs = document.getElementById('stat-favs')!;
const statAvgEp = document.getElementById('stat-avg-ep')!;
const statAlive = document.getElementById('stat-alive')!;
const statDead = document.getElementById('stat-dead')!;

let currentPage = 1;
let totalPages = 1;
let favorites: Set<number> = loadFavorites();
let allCharacters: Character[] = [];
let currentSort: SortCriteria = 'id-asc';
let activeFilter: 'all' | 'favorites' = 'all';
let searchTerm = '';

async function loadCharacters(page: number, append = false) {
  loadingMsg.hidden = false;
  errorMsg.hidden = true;
  loadMoreBtn.hidden = true;

  if (!append) {
    section.innerHTML = '';
    allCharacters = [];
  }

  try {
    const data = await fetchCharacters(page);
    currentPage = page;
    totalPages = data.info.pages;
    loadingMsg.hidden = true;

    allCharacters = [...allCharacters, ...data.results];

    renderCharacters();
    updateStats();

    if (currentPage < totalPages && activeFilter === 'all') {
      loadMoreBtn.hidden = false;
    }

  } catch (error) {
    loadingMsg.hidden = true;
    errorMsg.hidden = false;
  }
}

function renderCharacters() {
  section.innerHTML = '';

  let toDisplay = activeFilter === 'favorites'
      ? allCharacters.filter(c => favorites.has(c.id))
      : allCharacters;

  if (searchTerm.trim() !== '') {
    toDisplay = toDisplay.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const sorted = sortCharacters(toDisplay, currentSort);

  if (sorted.length === 0) {
    let message = '';
    if (activeFilter === 'favorites' && searchTerm === '') {
      message = 'Aucun favori pour le moment';
    } else if (searchTerm !== '') {
      message = `Aucun personnage trouvé pour "${searchTerm}"`;
    } else {
      message = 'Aucun personnage trouvé.';
    }
    section.innerHTML = `<p style="color: #aaa; text-align: center; padding: 40px;">${message}</p>`;
    return;
  }

  sorted.forEach(character => {
    const card = document.createElement('div');
    card.className = 'card-media';
    card.dataset.characterId = String(character.id);
    card.onclick = () => openModal(character);

    const isFavorite = favorites.has(character.id);

    card.innerHTML = `
            <img src="${character.image}" alt="${character.name}" />
            <div class="card-media__content">
                <h3 class="card-media__title">${character.name}</h3>
                <p class="card-media__meta">
                    ${character.status} • ${character.species}
                </p>
            </div>
            <button class="fav-btn ${isFavorite ? 'fav-btn--active' : ''}" data-fav-id="${character.id}">
                ${isFavorite ? '★' : '☆'}
            </button>
        `;

    section.appendChild(card);
  });

  updateStats();
}

function updateStats() {
  const displayed = activeFilter === 'favorites'
      ? allCharacters.filter(c => favorites.has(c.id))
      : allCharacters;

  const filtered = searchTerm.trim() !== ''
      ? displayed.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : displayed;

  const stats = computeStats(filtered, favorites);

  statTotal.textContent = String(stats.totalDisplayed);
  statFavs.textContent = String(stats.favoritesCount);
  statAvgEp.textContent = String(stats.avgEpisodes);
  statAlive.textContent = String(stats.aliveCount);
  statDead.textContent = String(stats.deadCount);
}

function openModal(character: Character) {
  console.log('test du modale')
  const modal = document.getElementById('character-modal')!;
  const modalBody = document.getElementById('modal-body')!;

  const statusClass = character.status.toLowerCase();

  modalBody.innerHTML = `
        <div class="modal-detail__header">
            <img class="modal-detail__image" src="${character.image}" alt="${character.name}" />
            <div>
                <h2 class="modal-detail__title">${character.name}</h2>
                <span class="modal-detail__status modal-detail__status--${statusClass}">${character.status}</span>
            </div>
        </div>
        
        <div class="modal-detail__info">
            <div class="modal-detail__field">
                <div class="modal-detail__label">Espèce</div>
                <div class="modal-detail__value">${character.species}</div>
            </div>
            <div class="modal-detail__field">
                <div class="modal-detail__label">Genre</div>
                <div class="modal-detail__value">${character.gender}</div>
            </div>
            <div class="modal-detail__field">
                <div class="modal-detail__label">Origine</div>
                <div class="modal-detail__value">${character.origin.name}</div>
            </div>
            <div class="modal-detail__field">
                <div class="modal-detail__label">Localisation</div>
                <div class="modal-detail__value">${character.location.name}</div>
            </div>
        </div>
        
        <div class="modal-detail__episodes">
            <div class="modal-detail__episode-label">Épisodes</div>
            <div class="modal-detail__episode-list">${character.episode.length} apparitions</div>
        </div>
    `;

  modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('character-modal')!;
  modal.classList.add('hidden');
}

retryBtn.addEventListener('click', () => {
  currentPage = 1;
  void loadCharacters(currentPage);
});

loadMoreBtn.addEventListener('click', () => {
  void loadCharacters(currentPage + 1, true);
});

section.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;


  const favBtn = target.closest<HTMLElement>('[data-fav-id]');
  if (favBtn?.dataset.favId) {
    e.stopPropagation();
    const id = parseInt(favBtn.dataset.favId, 10);
    favorites = toggleFavorite(favorites, id);
    saveFavorites(favorites);
    renderCharacters();
    return;
  }


  const card = target.closest<HTMLElement>('.card-media');
  if (card?.dataset.characterId) {
    const id = parseInt(card.dataset.characterId, 10);
    const character = allCharacters.find(c => c.id === id);
    if (character) {
      openModal(character);
    }
  }
});

const sortSelect = document.getElementById('sort-select') as HTMLSelectElement;
if (sortSelect) {
  sortSelect.addEventListener('change', () => {
    currentSort = sortSelect.value as SortCriteria;
    renderCharacters();
  });
}

const filterAllBtn = document.getElementById('filter-all');
const filterFavBtn = document.getElementById('filter-fav');

filterAllBtn?.addEventListener('click', () => {
  activeFilter = 'all';
  filterAllBtn.classList.add('filter-btn--active');
  filterFavBtn?.classList.remove('filter-btn--active');
  loadMoreBtn.hidden = currentPage >= totalPages;
  renderCharacters();
});

filterFavBtn?.addEventListener('click', () => {
  activeFilter = 'favorites';
  filterFavBtn.classList.add('filter-btn--active');
  filterAllBtn?.classList.remove('filter-btn--active');
  loadMoreBtn.hidden = true;
  renderCharacters();
});

const searchInput = document.getElementById('search-input') as HTMLInputElement;
if (searchInput) {
  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value;
    renderCharacters();
  });
}


document.getElementById('modal-close')?.addEventListener('click', closeModal);

document.getElementById('character-modal')?.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).classList.contains('modal__overlay')) {
    closeModal();
  }
});


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

loadCharacters(1);