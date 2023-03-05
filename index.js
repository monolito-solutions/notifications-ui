import { createServer } from 'http';
import url from 'url';
import Pulsar from 'pulsar-client';

const hostname = 'localhost';
const port = '3000';

const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;

    // Get orders endpoint
    if (pathname === '/order-notifications' && req.method === 'GET') {
        getLastNotification()
            .then((data) => res.end(JSON.stringify(data)))
            .catch((err) => {
                console.error(err);
                res.end(JSON.stringify({ message: 'No message' }));
            });
    }
    // Invalid route
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

async function getLastNotification() {
    let client, consumer;
    try {
        // Create a client
        client = new Pulsar.Client({
            serviceUrl: 'pulsar://localhost:6650',
        });

        // Create a consumer
        consumer = await client.subscribe({
            topic: 'order-events',
            subscription: 'order-notifications',
            subscriptionType: 'shared'
        });

        // Receive message
        const msg = await consumer.receive(1000);
        const data = msg.getData().toString();
        consumer.acknowledge(msg);

        return data;
    } catch (err) {
        console.error(err);
        return { message: 'No message' };
    } finally {
        try {
            await consumer.close();
            await client.close();
        } catch (err) {
            console.error(err);
        }
    }
};
