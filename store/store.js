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
    dispatch(action) {
        const { type, payload } = action;
        setTimeout(() => this._store[type] = payload, 0);
    }
    /**
     * 1. 간단히 selector 와 dispatch를 구현하고
     * 2. 그를 useState훅 처럼 가져다가 쓰는 것을 구현하자.
     * 3. state를 selector하거나 dispatch하는 경우에 해당 Node를 구독하게 만드는 로직이 필요할 거 같다.
     */
    useState(initState) {
        if (typeof initState === 'string' && this._store[initState] !== undefined) {
            return [
                this.useSelector(initState),
                (state) => this.dispatch({ type: initState, payload: state }),
            ];
        } else {
            if (typeof initState === 'string') {
                console.error('스토어에 등록 되지 않은 상태는 호출 할 수 없습니다.');
                return [];
            }
            for (const [key, value] of Object.entries(initState)) {
                if (!this._store[key]) {
                    const that = this;
                    const _key = `_${key}`;
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
                    this._store[_key] = value;
                    this._observe[key] = [];
                }

                return [
                    this.useSelector(key),
                    (state) => this.dispatch({ type: key, payload: state }),
                ];
            }
        }
    }
    checkSameFunction(a, b) {
        return a.toString() === b.toString();
    }
}