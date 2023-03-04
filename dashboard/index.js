// Define a function to fetch the data and create an HTML element
async function createNotificationElement() {
    const response = await fetch('http://localhost:3000/order-notifications');
    const data = await response.json();
  
    // Create a new div element with the notification data
    const notificationDiv = document.createElement('div');
    notificationDiv.innerHTML = `<p>${data}</p>`;
  
    // Append the new div element to the body of the HTML document
    document.body.appendChild(notificationDiv);
  }
  
  // Call the function to create the new HTML element
  createNotificationElement();
  