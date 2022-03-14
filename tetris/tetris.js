class TetrisState { // 이번에는 여러 클래스로 나누어서 코드를 짜본다.
    constructor(N) {
        this._board = this.initBoard(N);
        this.size = N;
    }
    get board() {
        return this._board;
    }
    set board(board) {
        this._board = board;
    }
    resetBoard() {
        this._board = this.initBoard(this.size);
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
    constructor(root) {
        this.state = new TetrisState(10);
        this.root = root;
    }

    createContainer() {
        const container = document.createElement('main');

        this.root.appendChild(container);
    }
}