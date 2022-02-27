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
        if (this.promiseState !== this.states[0]) return;
        this.promiseState = this.states[1];
        this.promiseResult = value;
    }
    reject = (value) => {
        if (this.promiseState !== this.states[0]) return;
        this.promiseState = this.states[2];
        this.promiseResult = value;
    }

    then(fillBack, rejectBack) {
        if (this.promiseState === this.states[1]) {
            return this.createNewContext(fillBack(this.promiseResult));
        }
        if (this.promiseState === this.states[2] && rejectBack) {
            return this.createNewContext(rejectBack(this.promiseResult));
        }
        return this;
    }
    catch(rejectBack) {
        if (this.promiseState === this.states[2]) {
            return this.createNewContext(rejectBack(this.promiseResult));
        }
        return this;
    }
    createNewContext(result) {
        return new PromiseYou((resolve) => resolve(result));
    }
}