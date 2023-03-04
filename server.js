const express = require('express');
const Pulsar = require('pulsar-client');
const app = express();
const port = 3000;


module.exports = (() => {
    let server;

    return {
        create: async () => {
            app.use(express.static('public'));

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

            app.get('/notifications', (req, res) => {
                const notifications = [];

                consumer.receive()
                    .then((messages) => {
                        console.log(messages);
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

            server = await new Promise((resolve, reject) => {
                const server = app.listen(port, () => resolve(server));
                console.log(`Server listening at http://localhost:${port}`);
            });
        },
        close: async () => {
            await new Promise((resolve, reject) =>
                server.close((err) => (err ? reject(err) : resolve()))
            );
        },
    };
})();
