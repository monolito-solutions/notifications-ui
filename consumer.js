const { Client, ConsumerType } = require('pulsar-client');

const client = new Client({
    serviceUrl: 'pulsar://localhost:6650',
});

const consumer = client.subscribe({
    topic: 'orders',
    subscription: 'order_notifications',
    subscriptionType: ConsumerType.Shared,
});

consumer.on('message', (msg) => {
    const data = JSON.parse(msg.getData().toString());
    console.log(`Received order notification: ${JSON.stringify(data)}`);
    consumer.acknowledge(msg);
});
