const Pulsar = require('pulsar-client');

async function getNotifications() {
    // Create a client
    const client = new Pulsar.Client({
        serviceUrl: 'pulsar://localhost:6650',
    });

    // Create a consumer
    const consumer = await client.subscribe({
        topic: 'orders',
        subscription: 'order_notifications',
        subscriptionType: 'shared'
    });

    // Receive messages
    const notifications = [];
    while (true) {
        const msg = await consumer.receive();
        const data = JSON.parse(msg.getData().toString());
        notifications.push(data);
        consumer.acknowledge(msg);
    }
};

export default getNotifications;
