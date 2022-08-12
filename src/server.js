const Epoch = require("./epoch.js");
const express = require('express');
const app = express();

app.use(express.json());

const epochs = [];
const this_node_tx = [];

function create_genesis_epoch(data) {
    let nonce = Math.floor(Math.random() * (9999999999 - 1000000000)) + 1000000000;
    let genesis_epoch = new Epoch(0, Date.now(), data, nonce, "0");
    while (genesis_epoch.hash.substring(0,4) != "0000") {
        nonce = Math.floor(Math.random() * (9999999999 - 1000000000)) + 1000000000;
        genesis_epoch = new Epoch(0, Date.now(), data, nonce, "0");
    }
    return genesis_epoch
}

function vts_pow (previous_epoch, data) {
    let nonce = Math.floor(Math.random() * (9999999999 - 1000000000)) + 1000000000;
    let new_epoch = new Epoch(previous_epoch.epoch+1, Date.now(), data, nonce, previous_epoch.hash);
    while (new_epoch.hash.substring(0,4) != "0000") {
        nonce = Math.floor(Math.random() * (9999999999 - 1000000000)) + 1000000000;
        new_epoch = new Epoch(previous_epoch.epoch+1, Date.now(), data, nonce, previous_epoch.hash);
    }
    epochs.push(new_epoch);
    this_node_tx.push("{'sender':'Network', 'receviver': 'test_addr', 'Amount':1}");
    return new_epoch
}

 
app.post('/tx', (req, res) => {
    this_node_tx.push(req.body);
    console.log(req.body);
    console.log(this_node_tx);
});


app.get('/mine', (req, res) => {
    if (epochs.length == 0) {
        epochs.push(create_genesis_epoch("Genesis"));
    }
        last_epoch = epochs[epochs.length-1];
        new_epoch = vts_pow(last_epoch, this_node_tx.toString());

});

app.listen(9080, () => console.log('alive on http://localhost:9080'));