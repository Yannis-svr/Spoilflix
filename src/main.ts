import { fetchCharacters } from './api/rickmorty';

async function init() {
    try {
        const data = await fetchCharacters(1);

        const section = document.querySelector('.home-section');
        if (!section) return;

        // Vider les cartes écrites en dur dans le HTML
        section.innerHTML = '';

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
        console.error(error);
    }
}

init();