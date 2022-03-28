class Store {
    constructor() {
        this._store = {};
        this._observe = {};
        this.currentObserve = null;
    }
    watch(callback) {
        this.currentObserve = callback;
        callback();
        this.currentObserve = null;
    }
    useSelector(key) {
        return this._store[key];
    }
    dispatch(key, state) {
        this._store[key] = state;
    }
    /**
     * 1. 간단히 selector 와 dispatch를 구현하고
     * 2. 그를 useState훅 처럼 가져다가 쓰는 것을 구현하자.
     * 3. state를 selector하거나 dispatch하는 경우에 해당 Node를 구독하게 만드는 로직이 필요할 거 같다.
     */
    useState(initState) {
        const that = this;
        for (const [key, value] of Object.entries(initState)) {
            if (!this._store[key]) { // 첫 생성시 초기화 
                const _key = `_${key}`;
                this._store[_key] = value;
                this._observe[key] = [];
                Object.defineProperty(this._store, key, {
                    get() {
                        if (checkAvail()) that._observe[key].push(that.currentObserve);
                        return this[_key];

                        function checkAvail() {
                            return that.currentObserve &&
                                !that._observe[key].filter((prev) => that.checkSameFunction(prev, that.currentObserve)).length > 0;
                        }
                    },
                    set(value) {
                        this[_key] = value;
                        that._observe[key].forEach((callbak) => callbak());
                    }
                });
            } // useState를 통해서 글로벌 상태를 공유한다.

            return [
                () => this.useSelector(key),
                (state) => this.dispatch(key, state),
            ];
        }
    }
    checkSameFunction(a, b) {
        return a.toString() === b.toString();
    }
}