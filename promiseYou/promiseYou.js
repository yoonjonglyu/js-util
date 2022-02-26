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

    then(fillBack, rejectBack) {
        if (this.promiseState === this.states[1]) {
            const next = new PromiseYou((resolve) => resolve(fillBack));
            next.promiseResult = fillBack(this.promiseResult);

            return next;
        }
        return this;
    }
    catch(rejectBack) {
        if (this.promiseState === this.states[2]) {
            const next = new PromiseYou((resolve) => resolve(rejectBack));
            next.promiseResult = rejectBack(this.promiseResult);

            return next;
        }
        return this;
    }
}