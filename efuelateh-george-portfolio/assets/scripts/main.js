// This file contains JavaScript code for interactive elements of the portfolio, such as form validation or dynamic content loading.

document.addEventListener('DOMContentLoaded', function() {
    // Example of form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                event.preventDefault();
                alert('Please fill in all fields.');
            } else {
                alert('Thank you for your message, ' + name + '!');
            }
        });
    }

    // Example of dynamic content loading
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        fetch('assets/data/projects.json')
            .then(response => response.json())
            .then(data => {
                data.projects.forEach(project => {
                    const projectElement = document.createElement('div');
                    projectElement.classList.add('project');
                    projectElement.innerHTML = `
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="${project.link}" target="_blank">View Project</a>
                    `;
                    projectsSection.appendChild(projectElement);
                });
            })
            .catch(error => console.error('Error loading projects:', error));
    }
});