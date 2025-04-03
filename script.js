const username = 'AndrewKlement';

// GitHub API endpoint for user's repositories
const apiUrl = `https://api.github.com/users/${username}/repos`;

// Fetching the repositories from the GitHub API
fetch(apiUrl)
    .then(response => response.json())
    .then(repos => {
        console.log(repos);
        const reposList = document.getElementById('repos-cont');

        repos.forEach(repo => {
            if (repo.name !== username) {
                const div = document.createElement('div');
                div.classList.add('grid-item');
                div.innerHTML = `
                    <div class="project-title">${repo.name}</div>
                    <div class="project-desc">${repo.description || 'No description available.'}</div>
                    <a href="${repo.html_url}" target="_blank" class="project-logo-cont">
                        <img src="assets/images/github-mark.svg" class="gitlogo">
                    </a>
                `;
                reposList.appendChild(div);
            }
        });

        // Initialize Masonry after items are appended
        var grid = document.querySelector('.grid');
        var msnry = new Masonry(grid, {
            itemSelector: '.grid-item',
            columnWidth: 376,
            gutter: 45,
            fitWidth: true,
            horizontalOrder: false
        });
    })
    .catch(error => {
        console.error('Error fetching GitHub repos:', error);
    });