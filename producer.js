const { Client } = require('pulsar-client');

const client = new Client({
    serviceUrl: 'pulsar://localhost:6650',
});

const producer = client.createProducer({
    topic: 'orders',
});

setInterval(() => {
    const order = {
        product: 'example_product',
        amount: Math.round(Math.random() * 10000) / 100,
    };

    console.log(`Sending order notification: ${JSON.stringify(order)}`);

    producer.send({
        data: JSON.stringify(order),
    });
}, 5000);
