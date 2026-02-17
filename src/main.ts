import { fetchCharacters } from './api/rickmorty';

const section = document.querySelector('#mainCharacters')!;
const loadingMsg = document.getElementById('loading-msg')!;
const errorMsg = document.getElementById('error-msg')!;
const retryBtn = document.getElementById('retry-btn')!;

async function loadCharacters() {

    loadingMsg.hidden = false;
    errorMsg.hidden = true;
    section.innerHTML = '';

    try {
        const data = await fetchCharacters(1);

        loadingMsg.hidden = true;

        data.results.forEach(character => {
            const card = document.createElement('div');
            card.className = 'card-media';
            card.innerHTML = `
        <img src="${character.image}" alt="${character.name}" />
        <h2 class="card-media__title">${character.name}</h2>
        <p class="card-media__meta">${character.status} · ${character.species}</p>
      `;
            section.appendChild(card);
        });

    } catch (error) {

        loadingMsg.hidden = true;
        errorMsg.hidden = false;
    }
}


retryBtn.addEventListener('click', () => {
    void loadCharacters();
});

loadCharacters();