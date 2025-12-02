document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(15, 15, 15, 0.98)';
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth Scroll with Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form Submission - Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const statusMsg = document.getElementById('form-status');
            const originalText = btn.innerText;

            btn.innerText = 'Enviando...';
            btn.disabled = true;
            statusMsg.textContent = '';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    statusMsg.textContent = '¡Mensaje enviado con éxito! Nos contactaremos pronto.';
                    statusMsg.style.color = '#00ff88';
                    contactForm.reset();
                } else {
                    throw new Error('Error al enviar el formulario');
                }
            } catch (error) {
                statusMsg.textContent = 'Hubo un error. Por favor intenta nuevamente.';
                statusMsg.style.color = '#ff4444';
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;

                // Clear status message after 5 seconds
                setTimeout(() => {
                    statusMsg.textContent = '';
                }, 5000);
            }
        });
    }

    // Form Submission - Quote Form
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = quoteForm.querySelector('button[type="submit"]');
            const statusMsg = document.getElementById('quote-status');
            const originalText = btn.innerText;

            btn.innerText = 'Enviando...';
            btn.disabled = true;
            statusMsg.textContent = '';

            try {
                const formData = new FormData(quoteForm);
                const response = await fetch(quoteForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    statusMsg.textContent = '¡Cotización enviada con éxito! Te contactaremos pronto.';
                    statusMsg.style.color = '#00ff88';
                    quoteForm.reset();

                    // Close modal after 2 seconds
                    setTimeout(() => {
                        closeQuoteModal();
                        statusMsg.textContent = '';
                    }, 2000);
                } else {
                    throw new Error('Error al enviar el formulario');
                }
            } catch (error) {
                statusMsg.textContent = 'Hubo un error. Por favor intenta nuevamente.';
                statusMsg.style.color = '#ff4444';
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate elements
    const animateElements = document.querySelectorAll('.service-card, .about-text, .about-image, .contact-wrapper');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Product Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hide');
                        card.classList.add('show');
                    } else {
                        card.classList.remove('show');
                        card.classList.add('hide');
                    }
                });
            });
        });
    }
});

// Quote Modal Logic
const modal = document.getElementById('quoteModal');
const closeModalBtn = document.querySelector('.close-modal');
const whatsappLink = document.getElementById('whatsappLink');
const modalServiceName = document.getElementById('modalServiceName');

function openQuoteModal(serviceName) {
    if (modal) {
        modal.style.display = 'block';
        if (modalServiceName) modalServiceName.textContent = serviceName;

        // Set service type in hidden field
        const serviceTypeInput = document.getElementById('serviceType');
        if (serviceTypeInput) serviceTypeInput.value = serviceName;

        // Update WhatsApp link with pre-filled message
        if (whatsappLink) {
            const message = `Hola, estoy interesado en cotizar el servicio de: ${serviceName}`;
            whatsappLink.href = `https://wa.me/573143532307?text=${encodeURIComponent(message)}`;
        }
    }
}

function closeQuoteModal() {
    if (modal) {
        modal.style.display = 'none';
    }
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeQuoteModal);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeQuoteModal();
    }
});

// Expose functions to global scope for HTML onclick attributes
window.openQuoteModal = openQuoteModal;
window.closeQuoteModal = closeQuoteModal;
