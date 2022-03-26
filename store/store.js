class Store {
    constructor() {
        this._store = {};
        this._observe = {};
    }
    useSelector(key) {
        return this._store[key];
    }
    dispatch(key, state) {
        this._store[key] = state;
    }
    useState(initState) {
        for (const [key, value] of Object.entries(initState)) {
            Object.defineProperty(this._store, key, {
                get() {
                    return this[`_${key}`];
                },
                set(value) {
                    this[`_${key}`] = value;
                }
            });
            this._store[key] = value;
            
            return [
                this.useSelector(key),
                (state) => this.dispatch.call(this, key, state)
            ];
        }
    }
    /**
     * 1. 간단히 selector 와 dispatch를 구현하고
     * 2. 그를 useState훅 처럼 가져다가 쓰는 것을 구현하자.
     * 3. state를 selector하거나 dispatch하는 경우에 해당 Node를 구독하게 만드는 로직이 필요할 거 같다.
     */
}