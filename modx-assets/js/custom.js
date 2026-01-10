// Custom JavaScript for MODX + Bootstrap 5

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================
    // Project Filters
    // ====================
    
    // Type Filter
    const typeButtons = document.querySelectorAll('input[name="typeFilter"]');
    typeButtons.forEach(button => {
        button.addEventListener('change', filterProjects);
    });
    
    // Area Range Filter
    const areaRange = document.getElementById('areaRange');
    const areaValue = document.getElementById('areaValue');
    if (areaRange && areaValue) {
        areaRange.addEventListener('input', function() {
            areaValue.textContent = this.value;
            filterProjects();
        });
    }
    
    // Price Range Filter
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = formatPrice(this.value);
            filterProjects();
        });
    }
    
    function filterProjects() {
        const selectedType = document.querySelector('input[name="typeFilter"]:checked').id;
        const maxArea = areaRange ? parseInt(areaRange.value) : 200;
        const maxPrice = priceRange ? parseInt(priceRange.value) : 5000000;
        
        const cards = document.querySelectorAll('.project-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const cardType = card.dataset.type;
            const cardArea = parseInt(card.dataset.area);
            const cardPrice = parseInt(card.dataset.price);
            
            let visible = true;
            
            // Type filter
            if (selectedType === 'typeHouse' && cardType !== 'house') visible = false;
            if (selectedType === 'typeBanya' && cardType !== 'banya') visible = false;
            
            // Area filter
            if (cardArea > maxArea) visible = false;
            
            // Price filter
            if (cardPrice > maxPrice) visible = false;
            
            if (visible) {
                card.closest('.col-md-6').style.display = 'block';
                visibleCount++;
            } else {
                card.closest('.col-md-6').style.display = 'none';
            }
        });
        
        // Show "no results" message
        const grid = document.getElementById('projectsGrid');
        let noResults = document.getElementById('noResults');
        
        if (visibleCount === 0 && grid) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.id = 'noResults';
                noResults.className = 'col-12 text-center py-5';
                noResults.innerHTML = `
                    <i class="bi bi-search text-muted" style="font-size: 3rem;"></i>
                    <p class="text-muted fs-5 mt-3">Проекты не найдены. Попробуйте изменить фильтры.</p>
                `;
                grid.appendChild(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }
    
    // ====================
    // Calculator
    // ====================
    
    const projectTypeBtns = document.querySelectorAll('.project-type-btn');
    const projectTypeInput = document.getElementById('projectType');
    
    projectTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            projectTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (projectTypeInput) {
                projectTypeInput.value = this.dataset.type;
            }
        });
    });
    
    // ====================
    // Favorites
    // ====================
    
    window.addToFavorites = function(projectId) {
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        if (favorites.includes(projectId)) {
            favorites = favorites.filter(id => id !== projectId);
            alert('Удалено из избранного');
        } else {
            favorites.push(projectId);
            alert('Добавлено в избранное');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };
    
    // ====================
    // Phone Mask
    // ====================
    
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value[0] === '8') value = '7' + value.slice(1);
                if (value[0] !== '7') value = '7' + value;
            }
            
            let formatted = '+7';
            if (value.length > 1) formatted += ' (' + value.slice(1, 4);
            if (value.length >= 5) formatted += ') ' + value.slice(4, 7);
            if (value.length >= 8) formatted += '-' + value.slice(7, 9);
            if (value.length >= 10) formatted += '-' + value.slice(9, 11);
            
            e.target.value = formatted;
        });
    });
    
    // ====================
    // Scroll Animations
    // ====================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .icon-box').forEach(el => {
        observer.observe(el);
    });
    
    // ====================
    // Smooth Scroll
    // ====================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ====================
    // Form Validation
    // ====================
    
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
    
    // ====================
    // Back to Top Button
    // ====================
    
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTop.className = 'btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle';
    backToTop.style.cssText = 'width: 50px; height: 50px; display: none; z-index: 1000;';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ====================
    // Helper Functions
    // ====================
    
    function formatPrice(price) {
        return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
    }
    
    // ====================
    // Modal Auto-show
    // ====================
    
    // Show promo modal after 30 seconds (if exists)
    setTimeout(() => {
        const promoModal = document.getElementById('promoModal');
        if (promoModal && !localStorage.getItem('promoShown')) {
            const modal = new bootstrap.Modal(promoModal);
            modal.show();
            localStorage.setItem('promoShown', 'true');
        }
    }, 30000);
    
    // ====================
    // Console Info
    // ====================
    
    console.log('%c🚀 Дома и Бани', 'font-size: 20px; font-weight: bold; color: #F97316;');
    console.log('%cСайт работает на MODX Revolution 2.8.8 + Bootstrap 5', 'color: #22C55E;');
});

// ====================
// Rating Stars (for reviews)
// ====================

function setRating(stars) {
    const ratingInput = document.getElementById('rating');
    if (ratingInput) ratingInput.value = stars;
    
    document.querySelectorAll('.rating-star').forEach((star, index) => {
        if (index < stars) {
            star.classList.remove('bi-star');
            star.classList.add('bi-star-fill');
        } else {
            star.classList.remove('bi-star-fill');
            star.classList.add('bi-star');
        }
    });
}

// ====================
// Image Gallery (Lightbox)
// ====================

function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center';
    lightbox.style.cssText = 'background: rgba(0,0,0,0.9); z-index: 9999; cursor: pointer;';
    lightbox.innerHTML = `
        <img src="${src}" alt="${alt}" class="img-fluid" style="max-width: 90%; max-height: 90vh;">
        <button class="btn btn-close btn-close-white position-absolute top-0 end-0 m-3"></button>
    `;
    
    lightbox.addEventListener('click', () => lightbox.remove());
    document.body.appendChild(lightbox);
}
