class TetrisState { // 이번에는 여러 클래스로 나누어서 코드를 짜본다.
    constructor(N) {
        this._board = this.initBoard(N);
        this.size = N;
        this._nodeTable = [];
    }
    get table() {
        return this._nodeTable;
    }
    set table(table) {
        this._nodeTable = table;
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
                length: N * 2
            },
            () => new Array(N).fill(0)
        )
    }
}
class Tetris {
    constructor(root, styled) {
        this.state = new TetrisState(10);
        this.blocks = new TetrisBlock();
        this.root = root;
        this.styled = styled;
        this.createContainer();
    }

    createContainer() {
        const container = this.styled.main`
            width: 80%;
            margin: 0 auto;
        `;

        container.appendChild(this.createBoard());
        this.root.appendChild(container);
    }
    /**
     * @description 테트리스의 판을 매순간 dom 조작하기에는 리플로우가 너무 많이 일어나므로 
     * 격자 방식의 board를 만들어 놓고 repaint(각 격자의 color 변경)와 state 조작만을 통해서 게임 진행 사항을 표시해준다.
     */
    createBoard() {
        const board = this.styled.table`
            width: 400px;
            height: 650px;
            margin: 40px auto;
        `;

        this.state.table = this.state.board.map((row) => {
            const tr = this.styled.tr`
            `;

            const rows = row.map(() => {
                const cel = this.styled.td`
                    border: 1px solid red;
                `;
                tr.appendChild(cel);

                return cel;
            });
            board.appendChild(tr);

            return rows;
        });

        return board;
    }

    randerBoard() {
        this.state.board.forEach((row, rdx) => {
            row.forEach((col, cdx) => {
                this.state.table[rdx][cdx].style.background = col ? 'tomato' : '';
            });
        })
    }
}
class TetrisBlock {
    constructor() {
        this.blocks = [
            [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
            [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
            [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
            [[1, 1], [1, 1]],
            [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
            [[0, 1, 0], [1, 1, 1][0, 0, 0]],
            [[1, 1, 0], [0, 1, 1], [0, 0, 0]]
        ];
    }
}