class Tetris {
    constructor(root, styled) {
        this.state = new TetrisState(10);
        this.blocks = new TetrisBlock();
        this.root = root;
        this.styled = styled;
        this.state.setBlock(this.blocks.getNextBlock());
        this.createContainer();
        this.randerBoard();
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
        this.inputBlock();
        this.state.board.forEach((row, rdx) => {
            row.forEach((col, cdx) => {
                this.state.table[rdx][cdx].style.background = col ? 'tomato' : '';
            });
        });
        setTimeout(this.randerBoard.bind(this), 100);
    }

    inputBlock() {
        const resize = Array.from(this.state.target);
        while (resize.length > 0 && !resize[resize.length - 1].includes(1)) resize.pop();

        if (resize.length + this.state.xy[1] < 20 && this.checkBoard(resize)) {
            this.state.target.forEach((row, rdx) => {
                const [x, y] = this.state.xy;
                if (row.includes(1) && this.state.board[rdx + y]?.includes(1)) {
                    row.forEach((_, cdx) => {
                        if (this.state.board[rdx + y]) {
                            this.state.board[rdx + y][cdx + x] = 0;
                        }
                    });
                }
            });
            this.state.xy[1]++;
            this.state.target.forEach((row, rdx) => {
                const [x, y] = this.state.xy;
                if (row.includes(1)) {
                    row.forEach((col, cdx) => {
                        if (col && this.state.board[rdx + y]) {
                            this.state.board[rdx + y][cdx + x] = col;
                        }
                    });
                }
            });
        } else {
            this.state.setBlock(this.blocks.getNextBlock());
        }
    }
    checkBoard = (arr) => {
        let result = true;
        const [x, y] = this.state.xy;
        arr[arr.length - 1].forEach((col, cdx) => {
            if (col && this.state.board[y + arr.length][x + cdx]) result = false;
        });
        return result;
    }
}
class TetrisState { // 이번에는 여러 클래스로 나누어서 코드를 짜본다.
    constructor(N) {
        this._board = this.initBoard(N);
        this.size = N;
        this._nodeTable = [];
        this._target = [];
        this._xy = [];
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
    get target() {
        return this._target;
    }
    set target(target) {
        this._target = target;
    }
    get xy() {
        return this._xy;
    }
    set xy(xy) {
        this._xy = xy;
    }
    resetBoard() {
        this._board = this.initBoard(this.size);
    }
    setBlock(block) {
        this.xy = [3, -1];
        this.target = block;
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
class TetrisBlock {
    constructor() {
        this.blocks = [
            [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
            [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
            [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
            [[1, 1], [1, 1]],
            [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
            [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
            [[1, 1, 0], [0, 1, 1], [0, 0, 0]]
        ];
    }
    getNextBlock = () => {
        const type = parseInt(Math.random() * 7);
        const block = Array.from(this.blocks[type]);

        return block;
    }
}
