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

function getID(text) {
    const positionsDeH = [];
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "H") {
            positionsDeH.push(i);
        }
    }
    return text.substring(positionsDeH[2] + 1, positionsDeH[2] + 37);
}

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
        const buffer = msg.getData()
        const data = Buffer.from(buffer, 'utf-8').toString();
        let response;
        consumer.acknowledge(msg);
        const order_id = getID(data)
        if (data.includes("EventOrderDispatched")) {
            response = "Order " + order_id + " has been dispatched."
        } else if (data.includes("EventInventoryChecked")) {
            response = "Checking inventory for order " + order_id
        } else if (data.includes("EventOrderCreated")) {
            response = "Order " + order_id + " has been created in Entregas de Los Alpes"
        } else {
            return data;
        }
        return response;
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
