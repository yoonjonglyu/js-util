class TetrisState { // 이번에는 여러 클래스로 나누어서 코드를 짜본다.
    constructor(){
        this.board = [];
    }
}

class Tetris {
    constructor() {
        this.state = new TetrisState();
    }
}