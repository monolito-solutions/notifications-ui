const Pulsar = require('pulsar-client');

process.on('exit', () => {
    consumer.close();
    client.close();
});

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
    while (true) {
        const msg = await consumer.receive();
        console.log(msg.getData().toString());
        consumer.acknowledge(msg);
    }
};

getNotifications();

module.exports = getNotifications;
