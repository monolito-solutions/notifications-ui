const express = require('express');
const { Client, ConsumerType } = require('pulsar-client');

const app = express();
const port = 3000;

app.use(express.static('public'));

const client = new Client({
    serviceUrl: 'http://localhost:8080',
});

const consumer = client.subscribe({
    topic: 'orders',
    subscription: 'order_notifications',
    subscriptionType: ConsumerType.Shared,
});

app.get('/notifications', (req, res) => {
    const notifications = [];

    consumer.seek({
        messageId: {
            ledgerId: -1,
            entryId: -1,
            batchIndex: -1,
        },
    });

    consumer.receive({
        maxMessages: 100,
        timeout: 1000,
    })
        .then((messages) => {
            messages.forEach((msg) => {
                const data = JSON.parse(msg.getData().toString());
                notifications.push(data);
                consumer.acknowledge(msg);
            });

            res.json(notifications);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error retrieving notifications');
        });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
