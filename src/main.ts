import type { Character } from './type/api';
import { fetchCharacters } from './api/rickmorty';
import { loadFavorites, saveFavorites, toggleFavorite } from './utils/favorites';
import { sortCharacters, type SortCriteria } from './utils/sort';

const section = document.querySelector('.home-section')!;
const loadingMsg = document.getElementById('loading-msg')!;
const errorMsg = document.getElementById('error-msg')!;
const retryBtn = document.getElementById('retry-btn')!;
const loadMoreBtn = document.getElementById('load-more-btn')!;

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

    if (currentPage < totalPages && activeFilter === 'all') {
      loadMoreBtn.hidden = false;
    }
  } catch {
    loadingMsg.hidden = true;
    errorMsg.hidden = false;
  }
}

function renderCharacters() {
  section.innerHTML = '';

  let toDisplay =
    activeFilter === 'favorites' ? allCharacters.filter((c) => favorites.has(c.id)) : allCharacters;

  if (searchTerm.trim() !== '') {
    toDisplay = toDisplay.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
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

  sorted.forEach((character) => {
    const card = document.createElement('div');
    card.className = 'card-media';
    card.dataset.characterId = String(character.id);

    const isFavorite = favorites.has(character.id);

    card.innerHTML = `
            <img src="${character.image}" alt="${character.name}" />
            <button class="fav-btn ${isFavorite ? 'fav-btn--active' : ''}" data-fav-id="${character.id}">
                ${isFavorite ? '★' : '☆'}
            </button>
            <div style="padding: 12px;">
                <h3 style="margin: 0 0 6px 0; font-size: 7px; color: #fff;">${character.name}</h3>
                <p style="margin: 0; font-size: 7px; color: #aaa;">
                    ${character.status} • ${character.species}
                </p>
            </div>
        `;

    section.appendChild(card);
  });
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
    const id = parseInt(favBtn.dataset.favId, 10);
    favorites = toggleFavorite(favorites, id);
    saveFavorites(favorites);

    renderCharacters();
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

loadCharacters(1);
