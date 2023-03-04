const notificationsList = document.getElementById('notifications');

function getNotifications() {
    fetch('/notifications')
        .then(response => response.json())
        .then(data => {
            notificationsList.innerHTML = '';
            data.forEach(notification => {
                const listItem = document.createElement('li');
                const text = document.createTextNode(`${notification.orderId}: ${notification.message}`);
                listItem.appendChild(text);
                notificationsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error(error);
            notificationsList.innerHTML = 'Error retrieving notifications';
        });
}

getNotifications();
setInterval(getNotifications, 5000);
