const musicButton = document.querySelector('.music-btn');
const music = document.querySelector('.music-embed');

musicButton.addEventListener('click', () => {
    music.classList.toggle('-open');
})

