module.exports = class Transaction {
    constructor(txhash, sender, recipient, fee, sig) {
        this.txhash = txhash;
        this.sender = sender;
        this.recipient = recipient;
        this.fee = fee;
        this.sig = sig;
    }

    transaction_tostring() {
        return `'sender':'${this.sender}', 'recipient':'${this.recipient}', 'fee':'${this.fee}', 'sig':'${this.sig}'`;
    }
};