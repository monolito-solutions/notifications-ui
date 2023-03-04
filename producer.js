const Pulsar = require("pulsar-client");

async function produceTest() {
    const client = new Pulsar.Client({
        serviceUrl: "pulsar://localhost:6650"
    });

    const producer = await client.createProducer({
        topic: 'orders',
    });

    const order = {
        product: 'example_product',
        amount: Math.round(Math.random() * 10000) / 100,
    };

    console.log(`Sending order notification: ${JSON.stringify(order)}`);

    await producer.send({
        data: Buffer.from(JSON.stringify(order)),
    });

    await client.close();
}

async function run() {
    for (let i = 0; i < 5; i++) {
        await produceTest();
    }
}

run();
