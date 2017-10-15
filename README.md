### Eth Contract builder

## Installation

```bash
npm install -g truffle
npm install -g ethereumjs-testrpc
```

```bash
npm install
testrpc -m 'burger burger burger burger burger burger burger burger burger burger burger burger' // separate window
truffle compile (can skip this step)
truffle migrate
npm start
```

## Launching the Contract Reader

1. Navigate to the `contract-reader` directory.
2. Run `php -S localhost:8080`
3. Open a contract by navigating to `http://localhost:8080/#0x...`
