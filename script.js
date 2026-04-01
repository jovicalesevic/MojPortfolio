const LANG_STORAGE_KEY = 'portfolio-lang';

function getStoredLang() {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    return stored === 'en' || stored === 'sr' ? stored : 'sr';
}

function syncDocumentTitle(lang) {
    const span = document.querySelector('.doc-title [data-lang="' + lang + '"]');
    if (span) {
        document.title = span.textContent.trim();
    }
}

function syncNavToggleAria(lang) {
    const btn = document.querySelector('.nav__toggle');
    const label = document.querySelector('.nav__toggle-label [data-lang="' + lang + '"]');
    if (btn && label) {
        btn.setAttribute('aria-label', label.textContent.trim());
    }
}

function syncNavLangGroupAria(lang) {
    const group = document.querySelector('.nav__lang');
    const label = document.querySelector('.nav__lang-aria-label [data-lang="' + lang + '"]');
    if (group && label) {
        group.setAttribute('aria-label', label.textContent.trim());
    }
}

function syncProjektImageAlts(lang) {
    document.querySelectorAll('.projekt__card').forEach((card) => {
        const img = card.querySelector('.projekt__thumb');
        const altSpan = card.querySelector('.projekt__img-alt [data-lang="' + lang + '"]');
        if (img && altSpan) {
            img.alt = altSpan.textContent.trim();
        }
    });
}

function applyLanguage(lang) {
    if (lang !== 'en' && lang !== 'sr') {
        return;
    }

    document.body.classList.remove('lang-sr', 'lang-en');
    document.body.classList.add('lang-' + lang);
    document.documentElement.lang = lang === 'en' ? 'en' : 'sr';

    syncDocumentTitle(lang);
    syncNavToggleAria(lang);
    syncNavLangGroupAria(lang);
    syncProjektImageAlts(lang);

    document.querySelectorAll('.nav__lang-btn').forEach((btn) => {
        const active = btn.getAttribute('data-lang-switch') === lang;
        btn.classList.toggle('nav__lang-btn--active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    localStorage.setItem(LANG_STORAGE_KEY, lang);
}

function initLanguage() {
    applyLanguage(getStoredLang());

    document.querySelectorAll('.nav__lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const l = btn.getAttribute('data-lang-switch');
            if (l === 'sr' || l === 'en') {
                applyLanguage(l);
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    initLanguage();
}

// Mobile menu toggle
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
const navLinksItems = document.querySelectorAll('.nav__links a');

navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks?.classList.toggle('active');
    document.body.style.overflow = navLinks?.classList.contains('active') ? 'hidden' : '';
});

navLinksItems.forEach((link) => {
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
