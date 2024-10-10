const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const toggleThemeBtn = document.getElementById('toggle-theme');
const gallery = document.querySelector('.gallery');
let autoSlide;
let currentIndex = 0;
let zoomed = false;

// Legenda
const lightboxCaption = document.createElement('div');
lightboxCaption.classList.add('lightbox-caption');
lightbox.appendChild(lightboxCaption);

// Alternar Tema
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Zoom na imagem
lightboxImg.addEventListener('click', () => {
    if (!zoomed) {
        lightboxImg.style.transform = 'scale(2)';
        lightboxImg.style.cursor = 'zoom-out';
        zoomed = true;
    } else {
        lightboxImg.style.transform = 'scale(1)';
        lightboxImg.style.cursor = 'zoom-in';
        zoomed = false;
    }
});

// Exibir imagem e legenda no lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        lightbox.classList.add('show');
        lightboxImg.src = item.src;
        lightboxCaption.textContent = item.getAttribute('data-caption');
        gallery.classList.add('blur');
        currentIndex = index;
        stopAutoSlide();
        startAutoSlide();
    });
});

// Fechar lightbox
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('show');
    gallery.classList.remove('blur');
    stopAutoSlide();
});

// Navegar entre as imagens
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
    lightboxImg.src = galleryItems[currentIndex].src;
    lightboxCaption.textContent = galleryItems[currentIndex].getAttribute('data-caption');
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
    lightboxImg.src = galleryItems[currentIndex].src;
    lightboxCaption.textContent = galleryItems[currentIndex].getAttribute('data-caption');
});

// Fechar ao clicar fora
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('show');
        gallery.classList.remove('blur');
        stopAutoSlide();
    }
});

// Teclas de atalho para navegação
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox.classList.remove('show');
        gallery.classList.remove('blur');
        stopAutoSlide();
    } else if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});

// Carrossel automático
function startAutoSlide() {
    autoSlide = setInterval(() => {
        nextBtn.click();
    }, 3000);
}

function stopAutoSlide() {
    clearInterval(autoSlide);
}

lightbox.addEventListener('mouseover', stopAutoSlide);
lightbox.addEventListener('mouseout', startAutoSlide);

startAutoSlide(); // Inicia o carrossel ao carregar a página
