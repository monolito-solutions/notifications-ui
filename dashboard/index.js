// Define a function to fetch the data and create an HTML element
async function createNotificationElement() {
    const response = await fetch('http://localhost:3000/order-notifications');
    const data = await response.json();

    if (data.message != 'No message') {
        // Create a new div element with the notification data
        const notificationDiv = document.createElement('div');
        notificationDiv.classList.add('notification');
        notificationDiv.innerHTML = `
            <p>${data}</p>
            <span class="time">${new Date().toLocaleString()}</span>
        `;

        // Append the new div element to the notifications container
        const notificationsContainer = document.getElementById('notifications');
        notificationsContainer.appendChild(notificationDiv);
    };
}

// Call the function to create the new HTML element every second
setInterval(createNotificationElement, 1000);
