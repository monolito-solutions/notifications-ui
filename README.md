# Notifications UI

Order notifications UI.

## Usage

- First execute Apache Pulsar with: `docker run -it -p 6650:6650  -p 8080:8080 --mount source=pulsardata,target=/pulsar/data --mount source=pulsarconf,target=/pulsar/conf apachepulsar/pulsar:2.10.3 bin/pulsar standalone`
- Then, you could run `node consumer.js` with `node producer.js` for test sending events through a topic.
- Finally, you can visualize the notifications dashboard by running `npm start` on `./dashboard`.

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](LICENSE)**
- Copyright 2023 © Monolito Solutions
