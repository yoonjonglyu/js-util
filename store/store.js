class Store {
    constructor() {
        this._store = {};
    }
    useSelector() {

    }
    dispatch() {

    }
    useState() {
        
        return [this.useSelector, this.dispatch];
    }
    /**
     * 1. 간단히 selector 와 dispatch를 구현하고
     * 2. 그를 useState훅 처럼 가져다가 쓰는 것을 구현하자.
     * 3. state를 selector하거나 dispatch하는 경우에 해당 Node를 구독하게 만드는 로직이 필요할 거 같다.
     */
}