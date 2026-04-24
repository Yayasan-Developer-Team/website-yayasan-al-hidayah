// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function (e) {
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
            if (!navMenu.classList.contains('active')) {
                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }



    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== DROPDOWN UNTUK MOBILE =====
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
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
    document.addEventListener('click', function (e) {
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
        navMenu.addEventListener('click', function (e) {
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

    // ===== AUTO CLOSE MENU FOR NORMAL LINKS ONLY =====
    const normalLinks = document.querySelectorAll(
        '.nav-list > li > .nav-link:not(.dropdown-toggle)'
    );

    normalLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768 && navMenu) {
                navMenu.classList.remove('active');

                const icon = mobileToggle?.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }

                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });

    // ===== AUTO CLOSE WHEN SUBMENU CLICKED =====
    const dropdownSubLinks = document.querySelectorAll('.dropdown-menu a');

    dropdownSubLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768 && navMenu) {
                navMenu.classList.remove('active');

                const icon = mobileToggle?.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }

                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });

    // ===== FORM SUBMISSION HANDLER =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.');
            this.reset();
        });
    }

    // ===== WINDOW RESIZE HANDLER =====
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
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

// BANNER IKLAN ATAS
const banner = document.getElementById('simpleBanner');
const closeBtn = document.getElementById('closeBanner');

// Cek apakah sudah ditutup sebelumnya (session only)
if (sessionStorage.getItem('bannerClosed') === 'true') {
    banner.classList.add('hide');
}

// Tombol close
if (closeBtn) {
    closeBtn.onclick = function () {
        banner.classList.add('hide');
        sessionStorage.setItem('bannerClosed', 'true');
    };
}

// Auto hilang 
setTimeout(function () {
    if (banner && !banner.classList.contains('hide')) {
        banner.classList.add('hide');
        sessionStorage.setItem('bannerClosed', 'true');
    }
}, 5 * 60 * 1000); // 5 menit


// ===== COUNTER ANIMATION FOR IMPACT SECTION =====
document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    function startCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight - 100;
    }

    function checkCounters() {
        const impactSection = document.querySelector('.impact-premium');
        if (impactSection && isElementInViewport(impactSection) && !animated) {
            animated = true;
            startCounters();
        }
    }

    window.addEventListener('scroll', checkCounters);
    checkCounters();
});


// ===== NEWS HORIZONTAL SCROLL =====
const wrapper = document.getElementById('newsHorizontalWrapper');
const track = document.getElementById('newsHorizontalTrack');
const leftBtn = document.getElementById('scrollLeftBtn');
const rightBtn = document.getElementById('scrollRightBtn');
const dotsContainer = document.getElementById('newsScrollDots');

if (wrapper && track) {
    // Create dots
    const cards = document.querySelectorAll('.news-horizontal-card');
    const cardCount = cards.length;

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < cardCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('scroll-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                const scrollAmount = wrapper.clientWidth * i;
                wrapper.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateActiveDot() {
        const scrollLeft = wrapper.scrollLeft;
        const itemWidth = wrapper.clientWidth;
        const activeIndex = Math.round(scrollLeft / itemWidth);

        document.querySelectorAll('.scroll-dot').forEach((dot, idx) => {
            if (idx === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    if (leftBtn && rightBtn) {
        leftBtn.addEventListener('click', () => {
            wrapper.scrollBy({ left: -350, behavior: 'smooth' });
        });

        rightBtn.addEventListener('click', () => {
            wrapper.scrollBy({ left: 350, behavior: 'smooth' });
        });
    }

    wrapper.addEventListener('scroll', updateActiveDot);

    createDots();
}



// ===== GALLERY HORIZONTAL SCROLL =====
const galleryWrapper = document.getElementById('galleryHorizontalWrapper');
const galleryTrack = document.getElementById('galleryHorizontalTrack');
const galleryLeftBtn = document.getElementById('galleryScrollLeftBtn');
const galleryRightBtn = document.getElementById('galleryScrollRightBtn');
const galleryDotsContainer = document.getElementById('galleryScrollDots');

// Scroll functionality
if (galleryWrapper) {
    // Create dots
    const galleryCards = document.querySelectorAll('.gallery-horizontal-card');
    const galleryCardCount = galleryCards.length;

    function createGalleryDots() {
        if (!galleryDotsContainer) return;
        galleryDotsContainer.innerHTML = '';
        for (let i = 0; i < galleryCardCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('gallery-scroll-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                const cardWidth = galleryCards[0]?.offsetWidth || 320;
                const gap = 24;
                const scrollAmount = (cardWidth + gap) * i;
                galleryWrapper.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            });
            galleryDotsContainer.appendChild(dot);
        }
    }

    function updateGalleryActiveDot() {
        const scrollLeft = galleryWrapper.scrollLeft;
        const cardWidth = galleryCards[0]?.offsetWidth || 320;
        const gap = 24;
        const activeIndex = Math.round(scrollLeft / (cardWidth + gap));

        document.querySelectorAll('.gallery-scroll-dot').forEach((dot, idx) => {
            if (idx === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    if (galleryLeftBtn && galleryRightBtn) {
        galleryLeftBtn.addEventListener('click', () => {
            const cardWidth = galleryCards[0]?.offsetWidth || 320;
            const gap = 24;
            galleryWrapper.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        });

        galleryRightBtn.addEventListener('click', () => {
            const cardWidth = galleryCards[0]?.offsetWidth || 320;
            const gap = 24;
            galleryWrapper.scrollBy({ left: (cardWidth + gap), behavior: 'smooth' });
        });
    }

    galleryWrapper.addEventListener('scroll', updateGalleryActiveDot);

    createGalleryDots();
}

// ===== GALLERY LIGHTBOX - DIPERBAIKI =====
const galleryLightbox = document.getElementById('galleryLightbox');
const galleryLightboxImg = document.getElementById('lightboxImage');
const galleryLightboxCaption = document.getElementById('lightboxCaption');
const closeGalleryLightbox = document.getElementById('lightboxClose');
const galleryPrevBtn = document.getElementById('lightboxPrev');
const galleryNextBtn = document.getElementById('lightboxNext');

// Data untuk semua gambar di gallery
let galleryImagesData = [];
let currentImageIndexGlobal = 0;

// Kumpulkan semua data gambar dari gallery
function collectGalleryImages() {
    const galleryCards = document.querySelectorAll('.gallery-horizontal-card');
    galleryImagesData = [];

    galleryCards.forEach((card, index) => {
        const img = card.querySelector('.gallery-card-image img');
        const title = card.querySelector('.gallery-title')?.innerText || 'Gallery Image';
        const category = card.querySelector('.gallery-category-badge')?.innerText || '';

        if (img) {
            galleryImagesData.push({
                src: img.src,
                title: title,
                category: category,
                index: index
            });
        }

        // Tambahkan event listener ke tombol view
        const viewBtn = card.querySelector('.gallery-view-btn');
        if (viewBtn) {
            // Hapus event listener lama untuk menghindari duplikasi
            const newViewBtn = viewBtn.cloneNode(true);
            viewBtn.parentNode.replaceChild(newViewBtn, viewBtn);

            newViewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                currentImageIndexGlobal = index;
                openLightboxModal(currentImageIndexGlobal);
            });
        }

        // Tambahkan event listener ke card image juga (klik gambar)
        const cardImage = card.querySelector('.gallery-card-image');
        if (cardImage) {
            cardImage.style.cursor = 'pointer';
            cardImage.addEventListener('click', () => {
                currentImageIndexGlobal = index;
                openLightboxModal(currentImageIndexGlobal);
            });
        }
    });
}

// Fungsi untuk membuka lightbox
function openLightboxModal(index) {
    if (!galleryLightbox || !galleryLightboxImg) {
        console.error('Lightbox elements not found!');
        return;
    }

    if (galleryImagesData.length === 0) {
        console.error('No images data found!');
        return;
    }

    const imageData = galleryImagesData[index];
    if (imageData) {
        galleryLightboxImg.src = imageData.src;
        if (galleryLightboxCaption) {
            galleryLightboxCaption.innerHTML = `<strong>${imageData.title}</strong> ${imageData.category ? '• ' + imageData.category : ''}`;
        }
        galleryLightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Tutup lightbox
function closeLightboxModal() {
    if (!galleryLightbox) return;
    galleryLightbox.classList.remove('show');
    document.body.style.overflow = '';
    // Optional: clear image src to stop loading
    if (galleryLightboxImg) {
        // Don't clear immediately to avoid flash
        setTimeout(() => { }, 100);
    }
}

// Gambar sebelumnya
function prevGalleryImage() {
    if (galleryImagesData.length === 0) return;
    currentImageIndexGlobal--;
    if (currentImageIndexGlobal < 0) {
        currentImageIndexGlobal = galleryImagesData.length - 1;
    }
    openLightboxModal(currentImageIndexGlobal);
}

// Gambar berikutnya
function nextGalleryImage() {
    if (galleryImagesData.length === 0) return;
    currentImageIndexGlobal++;
    if (currentImageIndexGlobal >= galleryImagesData.length) {
        currentImageIndexGlobal = 0;
    }
    openLightboxModal(currentImageIndexGlobal);
}

// Keyboard navigation
function handleLightboxKeyboard(e) {
    if (!galleryLightbox?.classList.contains('show')) return;

    if (e.key === 'Escape') {
        closeLightboxModal();
    } else if (e.key === 'ArrowLeft') {
        prevGalleryImage();
    } else if (e.key === 'ArrowRight') {
        nextGalleryImage();
    }
}

// Setup event listeners
if (closeGalleryLightbox) {
    closeGalleryLightbox.addEventListener('click', closeLightboxModal);
}
if (galleryPrevBtn) {
    galleryPrevBtn.addEventListener('click', prevGalleryImage);
}
if (galleryNextBtn) {
    galleryNextBtn.addEventListener('click', nextGalleryImage);
}

// Close lightbox ketika klik background (overlay)
if (galleryLightbox) {
    galleryLightbox.addEventListener('click', (e) => {
        if (e.target === galleryLightbox) {
            closeLightboxModal();
        }
    });
}

document.addEventListener('keydown', handleLightboxKeyboard);

// Inisialisasi setelah DOM loaded
document.addEventListener('DOMContentLoaded', function () {
    collectGalleryImages();
    console.log('Gallery initialized with', galleryImagesData.length, 'images');
});

// Jika ada gambar yang ditambahkan secara dinamis, panggil collectGalleryImages lagi
// Untuk sekarang, panggil sekali lagi setelah semua loading
window.addEventListener('load', function () {
    collectGalleryImages();
});

// ===== WHATSAPP HELP CARD (MUNCUL PERTAMA KALI) =====
document.addEventListener('DOMContentLoaded', function () {
    const helpCard = document.getElementById('whatsappHelpCard');
    const closeBtn = document.getElementById('closeHelpCard');

    if (!helpCard) return;

    // Cek sessionStorage
    const isClosed = sessionStorage.getItem('whatsappHelpClosed');

    if (isClosed === 'true') {
        helpCard.style.display = 'none';
    } else {
        helpCard.style.display = 'block';

        // Auto hilang setelah 30 DETIK (diubah dari 8 detik)
        setTimeout(function () {
            if (helpCard && helpCard.style.display !== 'none') {
                helpCard.classList.add('hide');
                setTimeout(() => {
                    helpCard.style.display = 'none';
                }, 300);
            }
        }, 5000); // 30000 ms = 30 detik
    }

    // Tombol close
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            helpCard.classList.add('hide');
            setTimeout(() => {
                helpCard.style.display = 'none';
            }, 300);
            sessionStorage.setItem('whatsappHelpClosed', 'true');
        });
    }

    // ===== MUNCULKAN KEGIATAN TERBARU SETELAH 30 DETIK =====
    setTimeout(function () {
        initKegiatanTerbaru();
    }, 60000);
});

// ===== KEGIATAN TERBARU (MUNCUL SETELAH 30 DETIK, HILANG 2 MENIT) =====
// Pastikan kode berjalan setelah halaman loading
(function() {
    
    // Ambil semua element
    var icon = document.getElementById('triggerIcon');
    var widget = document.getElementById('kegiatanWidget');
    var closeBtn = document.getElementById('btnClose');
    var container = document.getElementById('carouselContainer');
    var prevBtn = document.getElementById('btnPrev');
    var nextBtn = document.getElementById('btnNext');
    var dots = document.getElementById('dotContainer');
    
    // Fungsi buka widget (icon hilang, widget muncul)
    function bukaWidget() {
        widget.style.display = 'block';
        icon.style.display = 'none';
        console.log('Widget dibuka');
    }
    
    // Fungsi tutup widget (icon muncul, widget hilang)
    function tutupWidget() {
        widget.style.display = 'none';
        icon.style.display = 'flex';
        console.log('Widget ditutup');
    }
    
    // Event klik icon
    if (icon) {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            bukaWidget();
        });
    }
    
    // Event klik tombol close
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            tutupWidget();
        });
    }
    
    // Event klik di luar widget
    document.addEventListener('click', function(e) {
        if (widget && widget.style.display === 'block') {
            if (!widget.contains(e.target) && !icon.contains(e.target)) {
                tutupWidget();
            }
        }
    });
    
    // ===== CAROUSEL =====
    if (container && prevBtn && nextBtn) {
        var cards = document.querySelectorAll('.card-video');
        var currentIndex = 0;
        
        function updateDots() {
            if (!dots) return;
            dots.innerHTML = '';
            for (var i = 0; i < cards.length; i++) {
                var dot = document.createElement('div');
                dot.className = 'dot';
                if (i === currentIndex) dot.classList.add('active');
                dot.onclick = (function(index) {
                    return function() {
                        scrollToCard(index);
                    };
                })(i);
                dots.appendChild(dot);
            }
        }
        
        function scrollToCard(index) {
            if (index < 0) index = 0;
            if (index >= cards.length) index = cards.length - 1;
            currentIndex = index;
            var scrollPos = cards[currentIndex].offsetLeft - container.offsetLeft;
            container.scrollTo({ left: scrollPos, behavior: 'smooth' });
            updateDots();
        }
        
        function updateIndex() {
            var scrollPos = container.scrollLeft;
            var closest = 0;
            var minDistance = Infinity;
            for (var i = 0; i < cards.length; i++) {
                var cardLeft = cards[i].offsetLeft - container.offsetLeft;
                var distance = Math.abs(scrollPos - cardLeft);
                if (distance < minDistance) {
                    minDistance = distance;
                    closest = i;
                }
            }
            if (currentIndex !== closest) {
                currentIndex = closest;
                updateDots();
            }
        }
        
        prevBtn.onclick = function() {
            if (currentIndex > 0) scrollToCard(currentIndex - 1);
        };
        
        nextBtn.onclick = function() {
            if (currentIndex < cards.length - 1) scrollToCard(currentIndex + 1);
        };
        
        container.onscroll = updateIndex;
        
        updateDots();
        setTimeout(function() {
            scrollToCard(0);
        }, 100);
    }
    
    // Optional: Widget langsung muncul saat load (sesuai screenshot)
    // Hapus tanda // di bawah jika ingin langsung muncul
    // bukaWidget();
    
})();