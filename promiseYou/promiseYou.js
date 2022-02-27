class PromiseYou {
    constructor(callBack) {
        this.states = {
            '<pending>': 'pending',
            '<fulfilled>': 'fulfilled',
            '<rejected>': 'rejected'
        }
        this.promiseState = this.states['<pending>'];
        this.promiseResult = '';
        return callBack(this.resolve, this.reject);
    }
    resolve = (value) => {
        if (this.promiseState !== this.states['<pending>']) return;
        this.promiseState = this.states['<fulfilled>'];
        this.promiseResult = value;
    }
    reject = (value) => {
        if (this.promiseState !== this.states['<pending>']) return;
        this.promiseState = this.states['<rejected>'];
        this.promiseResult = value;
    }

    then(fillBack, rejectBack) {
        if (this.promiseState === this.states['<fulfilled>']) {
            return this.createNewContext(fillBack(this.promiseResult));
        }
        if (this.promiseState === this.states['<rejected>'] && rejectBack) {
            return this.createNewContext(rejectBack(this.promiseResult));
        }
        return this;
    }
    catch(rejectBack) {
        if (this.promiseState === this.states['<rejected>']) {
            return this.createNewContext(rejectBack(this.promiseResult));
        }
        return this;
    }
    finally(callback) {
        if (this.promiseState !== this.states['<pending>']) {
            callback();
        }
        return this;
    }
    createNewContext(result) {
        return new PromiseYou((resolve) => resolve(result));
    }
}