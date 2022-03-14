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
    /**
     * @description 테트리스의 판을 매순간 dom 조작하기에는 리플로우가 너무 많이 일어나므로 
     * 격자 방식의 board를 만들어 놓고 repaint(각 격자의 color 변경)와 state 조작만을 통해서 게임 진행 사항을 표시해준다.
     */
    createBoard() {
        const Board = document.createElement('table');

        return Board;
    }
}