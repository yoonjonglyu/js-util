class TetrisState { // 이번에는 여러 클래스로 나누어서 코드를 짜본다.
    constructor(N) {
        this.board = this.initBoard(N);
        this.size = N;
    }
    initBoard(N) {
        return Array.from(
            {
                length: N
            },
            () => new Array(N).fill(0)
        )
    }
}

class Tetris {
    constructor() {
        this.state = new TetrisState();
    }
}