/**
 * scripts.js
 * * Zawiera funkcje do dynamicznej obsługi stron.
 */


// --- 1. Funkcja dla o-nas.html: Rozwijanie/zwijanie sekcji "Więcej o firmie" ---
function setupToggleContent() {
    // Pobierz przycisk i ukrytą zawartość po ich ID
    const toggleButton = document.getElementById('toggleDescription');
    const hiddenContent = document.getElementById('rozszerzony-opis');

    // Sprawdź, czy elementy istnieją na bieżącej stronie, aby uniknąć błędów
    if (toggleButton && hiddenContent) {
        // Ustaw domyślny stan dla spójności (mimo, że CSS też to robi)
        hiddenContent.style.display = 'none';

        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();

            if (hiddenContent.style.display === 'none' || hiddenContent.style.display === '') {
                // Rozwiń zawartość
                hiddenContent.style.display = 'block';
                toggleButton.textContent = 'Zwiń opis «';
            } else {
                // Zwiń zawartość
                hiddenContent.style.display = 'none';
                toggleButton.textContent = 'Czytaj więcej o firmie »';
            }
        });
    }
}


// --- 2. Funkcja dla blog.html: Filtrowanie artykułów według kategorii (USUNIĘTO LIMIT WYŚWIETLANIA) ---
function filterBlogPosts() {
    const filterContainer = document.getElementById('category-filter-buttons');
    const allPosts = document.querySelectorAll('#featured-posts .blog-post-card');
    // USUNIĘTO: const maxPostsToShow = 5; // Maksymalna liczba artykułów do wyświetlenia

    if (!filterContainer || allPosts.length === 0) return;

    function applyFilter(filterValue) {
        let visiblePosts = [];

        allPosts.forEach(post => {
            const postCategories = post.getAttribute('data-categories');

            // 1. Ukryj wszystkie posty na początek
            post.classList.add('hidden-post');
            post.style.display = 'none'; // Używamy display:none dla kompatybilności

            // 2. Zbierz posty pasujące do filtra
            if (filterValue === 'wszystkie' || (postCategories && postCategories.includes(filterValue))) {
                visiblePosts.push(post);
            }
        });

        // 3. Wyświetl WSZYSTKIE widoczne posty (bez limitu, zgodnie z nowymi wymaganiami)
        for (let i = 0; i < visiblePosts.length; i++) {
            visiblePosts[i].classList.remove('hidden-post');
            visiblePosts[i].style.display = 'block';
        }
    }
    
    // Domyślne ustawienie przy ładowaniu strony: 'wszystkie'
    applyFilter('wszystkie'); 

    // Nasłuchiwanie kliknięć przycisków
    filterContainer.addEventListener('click', function(event) {
        const target = event.target.closest('[data-filter]');
        if (!target) return;

        event.preventDefault();

        const filterValue = target.getAttribute('data-filter');

        // Aktualizacja klasy 'active' i stylu
        document.querySelectorAll('#category-filter-buttons [data-filter]').forEach(btn => {
            btn.classList.remove('active');
            btn.style.backgroundColor = '#FFD700'; 
            btn.style.color = '#001f3f';
        });

        target.classList.add('active');
        target.style.backgroundColor = '#001f3f'; 
        target.style.color = '#fff';

        // Zastosowanie nowej logiki filtrowania
        applyFilter(filterValue);
    });
}


// Uruchom wszystkie funkcje po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {
    setupToggleContent();
    filterBlogPosts();
});