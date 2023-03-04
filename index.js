const app = require("./server.js");

app.create();

setTimeout(app.close, 60000);