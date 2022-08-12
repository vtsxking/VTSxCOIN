const crypto = require('crypto')

module.exports = class Epoch {
    constructor(epoch, timestamp, data, nonce, previous_hash) {
        this.epoch = epoch;
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = nonce;
        this.previous_hash = previous_hash;
        this.hash = this.epoch_block();
    }

    epoch_tostring() {
        return (this.epoch + this.timestamp + this.data + this.nonce + this.previous_hash)
    }

    epoch_block() {
        return crypto.createHash('sha256').update(this.epoch_tostring()).digest('hex')   
    }
};