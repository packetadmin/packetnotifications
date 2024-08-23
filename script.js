// URL for GitHub JSON file (replace with your raw file URL)
const JSON_URL = 'https://raw.githubusercontent.com/packetadmin/packetnotifications/main/notifications.json';

document.addEventListener('DOMContentLoaded', function () {
    openSection('home');  // Default section
    loadNotifications();  // Preload notifications

    // Setup the refresh button click event
    document.getElementById('refreshNotifications').addEventListener('click', loadNotifications);
});

function openSection(sectionId) {
    // Remove active class from all content sections
    document.querySelectorAll('.content').forEach(function (content) {
        content.classList.remove('active');
    });

    // Add active class to the selected section
    document.getElementById(sectionId).classList.add('active');

    // Remove active class from all nav links
    document.querySelectorAll('.navbar a').forEach(function (link) {
        link.classList.remove('active');
    });

    // Add active class to the selected nav link
    document.querySelector(`.navbar a[onclick="openSection('${sectionId}')"]`).classList.add('active');
}

function loadNotifications() {
    fetch(JSON_URL)
        .then(response => response.json())
        .then(data => {
            const notificationsContainer = document.getElementById('notificationTiles');
            notificationsContainer.innerHTML = ''; // Clear existing tiles

            data.notifications.forEach(notification => {
                const tile = document.createElement('div');
                tile.className = 'notification-tile';

                // Optional image
                if (notification.image) {
                    tile.innerHTML += `<img src="${notification.image}" alt="Notification Image">`;
                }

                // Title and message
                tile.innerHTML += `
                    <h3>${notification.title || 'No Title'}</h3>
                    <p>${notification.message || 'No Message'}</p>
                `;

                // Phone number or link
                if (notification.phoneNumber) {
                    tile.innerHTML += `<button onclick="window.location.href='tel:${notification.phoneNumber}'">${notification.phoneNumber}</button>`;
                } else if (notification.link) {
                    tile.innerHTML += `<button onclick="window.open('${notification.link}', '_blank')">More Info</button>`;
                }

                notificationsContainer.appendChild(tile);
            });
        })
        .catch(error => {
            console.error('Error loading notifications:', error);
        });
}
