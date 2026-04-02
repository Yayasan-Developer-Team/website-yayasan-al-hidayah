// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }

    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== DROPDOWN UNTUK MOBILE =====
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = this.closest('.dropdown');
                
                // Tutup dropdown lain yang terbuka
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== dropdown && d.classList.contains('active')) {
                        d.classList.remove('active');
                    }
                });
                
                dropdown.classList.toggle('active');
            }
        });
    });

    // ===== CLOSE MOBILE MENU WHEN CLICKING OUTSIDE =====
    document.addEventListener('click', function(e) {
        if (navMenu && mobileToggle) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        }
    });

    // ===== PREVENT MENU FROM CLOSING WHEN CLICKING INSIDE =====
    if (navMenu) {
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // ===== ACTIVE LINK BASED ON CURRENT PAGE =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });

    // ===== FORM SUBMISSION HANDLER =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.');
            this.reset();
        });
    }

    // ===== WINDOW RESIZE HANDLER =====
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reset mobile menu jika ukuran layar berubah ke desktop
            if (window.innerWidth > 768 && navMenu && mobileToggle) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
            
            // Reset dropdown states
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }, 250);
    });
});

// ===== KEGIATAN TERBARU =====
document.addEventListener('DOMContentLoaded', function() {
    const adElement = document.getElementById('videoAd');
    const closeBtn = document.getElementById('closeVideoAd');
    const container = document.getElementById('videoAdCarousel');
    const prevBtn = document.getElementById('videoAdPrev');
    const nextBtn = document.getElementById('videoAdNext');
    const dotsContainer = document.getElementById('videoAdDots');
    
    
    // Close button
    if (closeBtn && adElement) {
    closeBtn.addEventListener('click', function() {
        adElement.style.display = 'none';
    });
}
    
    // Carousel functionality
    if (!container || !prevBtn || !nextBtn) return;
    
    let cards = document.querySelectorAll('.video-ad-card');
    let currentIndex = 0;
    
    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('video-ad-dot');
            if (index === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => scrollToIndex(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    function scrollToIndex(index) {
        if (cards.length === 0) return;
        index = Math.max(0, Math.min(index, cards.length - 1));
        currentIndex = index;
        const scrollPosition = cards[currentIndex].offsetLeft - container.offsetLeft;
        container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        updateDots();
    }
    
    function updateCurrentIndex() {
        const scrollPosition = container.scrollLeft;
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        cards.forEach((card, index) => {
            const cardLeft = card.offsetLeft - container.offsetLeft;
            const distance = Math.abs(scrollPosition - cardLeft);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });
        
        if (currentIndex !== closestIndex) {
            currentIndex = closestIndex;
            updateDots();
        }
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) scrollToIndex(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) scrollToIndex(currentIndex + 1);
    });
    
    container.addEventListener('scroll', () => requestAnimationFrame(updateCurrentIndex));
    
    // Initialize
    updateDots();
    setTimeout(() => scrollToIndex(0), 100);
});


// BANNER IKLAN ATAS
const banner = document.getElementById('simpleBanner');
const closeBtn = document.getElementById('closeBanner');

// Cek apakah sudah ditutup sebelumnya (session only)
if (sessionStorage.getItem('bannerClosed') === 'true') {
    banner.classList.add('hide');
}

// Tombol close
if (closeBtn) {
    closeBtn.onclick = function() {
        banner.classList.add('hide');
        sessionStorage.setItem('bannerClosed', 'true');
    };
}

// Auto hilang setelah 15 menit (900000 ms)
setTimeout(function() {
    if (banner && !banner.classList.contains('hide')) {
        banner.classList.add('hide');
        sessionStorage.setItem('bannerClosed', 'true');
    }
}, 5 * 60 * 1000); // 15 menit