class PromiseYou {
    constructor(cb) {
        this.states = [
            'pending',
            'fulfilled',
            'rejected'
        ];
        this.promiseState = this.states[0];
        this.promiseResult = '';
        return cb(this.resolve, this.reject);
    }
    resolve = (value) => {
        if (this.promiseState !== this.states[0]) return this;
        this.promiseState = this.states[1];
        this.promiseResult = value;
    }
    reject = (value) => {
        if (this.promiseState !== this.states[0]) return this;
        this.promiseState = this.states[2];
        this.promiseResult = value;
    }

    then(cb) {
        if (this.promiseState === this.states[1]) {
            this.promiseResult = cb(this.promiseResult);
        }
        return this;
    }
    catch(cb) {
        if (this.promiseState === this.states[2]) {
            this.promiseResult = cb(this.promiseResult);
        }
        return this;
    }
}