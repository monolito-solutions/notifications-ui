import { useEffect, useState } from 'react';
import getNotifications from './getNotifications';
import React from 'react';


function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getNotifications().then((notifications) => {
        setNotifications(notifications);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
