(function () {
    const searchInput = document.getElementById('search');
    const noResults = document.getElementById('no-results');
    const categories = document.querySelectorAll('[data-category]');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        let anyVisible = false;

        categories.forEach((category) => {
            let categoryHasMatch = false;

            category.querySelectorAll('[data-group]').forEach((group) => {
                let groupHasMatch = false;
                const rows = group.querySelectorAll('.shortcut-row');

                rows.forEach((row) => {
                    const match = !query || row.dataset.search.includes(query);
                    row.hidden = !match;
                    if (match) {
                        groupHasMatch = true;
                    }
                });

                group.hidden = !groupHasMatch;
                if (groupHasMatch) {
                    categoryHasMatch = true;
                }
            });

            category.hidden = !categoryHasMatch;
            if (categoryHasMatch) {
                anyVisible = true;
            }
        });

        noResults.hidden = anyVisible;
    });
}());
