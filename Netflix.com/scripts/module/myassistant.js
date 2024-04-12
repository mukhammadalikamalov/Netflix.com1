// Get the modal
var modal = document.getElementById("modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to open modal and display movie details
function openModal(title, overview) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-overview").textContent = overview;
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


// JavaScript to handle modal functionality
document.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalOverview = document.getElementById('modal-overview');
        const movieTitle = card.querySelector('.movie-title').textContent;
        const movieOverview = card.querySelector('.movie-overview').textContent;
        const moviePoster = card.querySelector('.movie-poster').src;

        modalTitle.textContent = movieTitle;
        modalOverview.textContent = movieOverview;
        moviePoster.textContent = moviePoster;
        modal.style.display = 'block';

        // Display the movie image inside the modal
        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = `
      <span class="close">&times;</span>
      <h2 id="modal-title">${movieTitle}</h2>
      <img src="${moviePoster}" alt="${movieTitle}" style="width: 100%;">
      <p id="modal-overview">${movieOverview}</p>
    `;

        // Close modal when the close button or outside modal is clicked
        const closeModal = document.querySelector('.close');
        modal.onclick = function (event) {
            if (event.target === modal || event.target === closeModal) {
                modal.style.display = 'none';
            }
        };
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
        },
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 0,
            stretch: 80,
            depth: 200,
            modifier: 1,
            slideShadows: false,
        },
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});