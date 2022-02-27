class PromiseYou {
    constructor(callBack) {
        this.states = {
            '<pending>': 'pending',
            '<fulfilled>': 'fulfilled',
            '<rejected>': 'rejected'
        }
        this.promiseState = this.states['<pending>'];
        this.promiseResult = '';
        this.taskQueue = [];

        try {
            return callBack(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }
    resolve = (value) => {
        if (this.promiseState !== this.states['<pending>']) return;
        this.promiseState = this.states['<fulfilled>'];
        this.promiseResult = value;
        this.taskQueue.reduce((result, cb) => cb(result), this);
        this.taskQueue = [];
    }
    reject = (value) => {
        if (this.promiseState !== this.states['<pending>']) return;
        this.promiseState = this.states['<rejected>'];
        this.promiseResult = value;
        this.taskQueue.reduce((result, cb) => cb(result), this);
        this.taskQueue = [];
    }

    then(fillBack, rejectBack) {
        try {
            if (this.promiseState === this.states['<pending>']) {
                this.taskQueue.push((promise) => promise.then(fillBack, rejectBack));
            }

            if (this.promiseState === this.states['<fulfilled>']) {
                return this.createNewContext(fillBack(this.promiseResult));
            }
            if (this.promiseState === this.states['<rejected>'] && rejectBack) {
                return this.createNewContext(rejectBack(this.promiseResult));
            }
        } catch (e) {
            this.promiseState = this.states['<pending>'];
            this.reject(e);
        }

        return this;
    }
    catch(rejectBack) {
        try {
            if (this.promiseState === this.states['<pending>']) {
                this.taskQueue.push((promise) => promise.catch(rejectBack));
            }
            if (this.promiseState === this.states['<rejected>']) {
                return this.createNewContext(rejectBack(this.promiseResult));
            }
        } catch (e) {
            this.promiseState = this.states['<pending>'];
            this.reject(e);
        }

        return this;
    }
    finally(callback) {
        try {
            if (this.promiseState === this.states['<pending>']) {
                this.taskQueue.push((promise) => promise.finally(callback));
            }
            if (this.promiseState !== this.states['<pending>']) {
                callback();
            }
        } catch (e) {
            this.promiseState = this.states['<pending>'];
            this.reject(e);
        }

        return this;
    }
    createNewContext(result) {
        return new PromiseYou((resolve) => resolve(result));
    }
}