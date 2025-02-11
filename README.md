ImageCoin Node
============

A ImageCoin full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services. At the minimum a node has an interface to [ImageCoin Core (ImageCoind) v1.2.0](https://github.com/mceme/imagecoin/) for more advanced address queries. Additional services can be enabled to make a node more useful such as exposing new APIs, running a block explorer and wallet service.

## Usages

### As a standalone server

Follow these manual : https://github.com/mceme/imagecoin-node/raw/master/IMG-libinstall.docx

```bash
git clone https://github.com/mceme/imagecoin-node
cd imagecoin-node
sudo npm install --unsafe-perm=true --allow-root
sudo npm install zeromq  --unsafe-perm=true --allow-root
sudo npm install mceme/imagecoin-lib
sudo npm install mceme/imagecoin-rpc
sudo npm install mceme/imagecoin-p2p
sudo npm install mceme/insight-api
sudo npm install mceme/insight-ui
./bin/imagecoin-node start
```

When running the start command, it will seek for a .imagecoincore folder with a imagecoin-node.json conf file.
If it doesn't exist, it will create it, with basic task to connect to ImageCoind.

Some plugins are available :

- Insight-API : `./bin/imagecoin-node addservice @mceme/insight-api`
- Insight-UI : `./bin/imagecoin-node addservice @mceme/insight-ui`

You also might want to add these index to your imagecoin.conf file :
```
-addressindex
-timestampindex
-spentindex
```

### As a library

```bash
npm install mceme/imagecoin-node
```

```javascript
const imgcore = require('@mceme/imagecoin-node');
const config = require('./imagecoin-node.json');

let node = imgcore.scaffold.start({ path: "", config: config });
node.on('ready', function() {
    //img core started
    imagecoind.on('tx', function(txData) {
        let tx = new imagecoincore.lib.Transaction(txData);
    });
});
```

## Prerequisites

- ImageCoin Core (ImageCoind) (v1.2.0) with support for additional indexing *(see above)*
- Node.js v8+
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~20GB of disk storage
- ~1GB of RAM

## Configuration

ImageCoincore includes a Command Line Interface (CLI) for managing, configuring and interfacing with your Axecore Node.

```bash
imagecoin-node create -d <imagecoin-data-dir> mynode
cd mynode
imagecoin-node install <service>
imagecoin-node install https://github.com/yourname/helloworld
imagecoin-node start
```

This will create a directory with configuration files for your node and install the necessary dependencies.

Please note that [IMG Core](https://github.com/mceme/ImageCoin/tree/master) needs to be installed first.

For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of Bitcore:

- [Insight API](https://github.com/mceme/insight-api/tree/master)
- [Insight UI](https://github.com/mceme/insight-ui/tree/master)
- [Bitcore Wallet Service](https://github.com/mceme/axecore-wallet-service/tree/master)

## Documentation

- [Upgrade Notes](docs/upgrade.md)
- [Services](docs/services.md)
  - [axed](docs/services/axed.md) - Interface to Axe Core
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.


## Setting up dev environment (with Insight)

Prerequisite : Having a axed node already runing `axed --daemon`.

imagecoin-node : `git clone https://github.com/mceme/imagecoin-node -b develop`
Insight-api (optional) : `git clone https://github.com/mceme/insight-api -b develop`
Insight-UI (optional) : `git clone https://github.com/mceme/insight-ui -b develop`

Install them :
```
cd imagecoin-node && npm install \
 && cd ../insight-ui && npm install \
 && cd ../insight-api && npm install && cd ..
```

Symbolic linking in parent folder :
```
npm link ../insight-api
npm link ../insight-ui
```

Start with `./bin/imagecoin-node start` to first generate a ~/.imagecoincore/imagecoin-node.json file.
Append this file with `"@mceme/insight-ui"` and `"@mceme/insight-api"` in the services array.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/axerunners/axecore/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/mceme/imagecoin-node/blob/master/LICENSE).

Copyright 2013-2015 BitPay, Inc.

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)
