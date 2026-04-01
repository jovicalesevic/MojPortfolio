function setLanguage(lang) {
    // 1. Promeni klasu na body elementu
    document.body.classList.remove('lang-sr', 'lang-en');
    document.body.classList.add('lang-' + lang);

    // 2. Sačuvaj izbor u memoriju pretraživača
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;

    // 3. Osveži izgled dugmadi (active stanje)
    const buttons = document.querySelectorAll('.nav__lang-btn');
    buttons.forEach((btn) => {
        if (btn.getAttribute('data-lang-target') === lang) {
            btn.classList.add('nav__lang-btn--active');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('nav__lang-btn--active');
            btn.setAttribute('aria-pressed', 'false');
        }
    });
}

// Pokreni pri učitavanju stranice
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'sr';
    setLanguage(savedLang === 'en' ? 'en' : 'sr');

    const navToggle = document.querySelector('.nav__toggle');
    const navLinks = document.querySelector('.nav__links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    document.querySelectorAll('.nav__links a').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navLinks?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    });
});
