class Tetris {
    constructor(root, styled) {
        this.state = new TetrisState(10);
        this.blocks = new TetrisBlock();
        this.root = root;
        this.styled = styled;
        this.game = setInterval(this.inputBlock.bind(this), 900);
        this.state.setBlock(this.blocks.getNextBlock());
        this.createContainer();
        this.controlBlock();
        this.renderGame();
    }

    createContainer() {
        const container = this.styled.main`
            display: flex;
            width: 600px;
            margin: 40px auto;
        `;

        container.appendChild(this.createBoard());
        container.appendChild(this.createScoreBoard());
        this.root.appendChild(container);
    }
    createScoreBoard() {
        const scoreBoard = this.styled.div`
            width: 180px;
            height: 200px;
            margin-left: 20px;
            border: 1px solid blue;
            text-align: center;
        `;
        const title = this.styled.h2`
        `;
        title.innerText = 'SCORE';
        const score = this.styled.h3`
        `;
        this.state.info = { score: score };
        scoreBoard.appendChild(title);
        scoreBoard.appendChild(score);

        return scoreBoard;
    }
    /**
     * @description 테트리스의 판을 매순간 dom 조작하기에는 리플로우가 너무 많이 일어나므로 
     * 격자 방식의 board를 만들어 놓고 repaint(각 격자의 color 변경)와 state 조작만을 통해서 게임 진행 사항을 표시해준다.
     */
    createBoard() {
        const board = this.styled.table`
            width: 400px;
            height: 650px;
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

    renderBoard = () => {
        this.state.board.forEach((row, rdx) => {
            row.forEach((col, cdx) => {
                this.state.table[rdx][cdx].style.background = col ? 'tomato' : '';
            });
        });
        
    }
    renderInformation = () => {
        this.state.info.score.innerText = `내 점수 : ${this.state.score} 점`;
    }
    renderGame = () => {
        this.renderBoard();
        this.renderInformation();
        requestAnimationFrame(this.renderGame);
    }

    inputBlock() {
        const resize = Array.from(this.state.target);
        while (resize.length > 0 && !resize[resize.length - 1].includes(1)) resize.pop();

        if (resize.length + this.state.xy[1] < this.state.height && this.checkBoard(resize, 'down')) {
            this.moveBlock('down');
        } else {
            if (this.state.xy[1] === -1) {
                clearInterval(this.game);
                alert('gameOver');
            } else {
                this.checkLine();
                this.state.setBlock(this.blocks.getNextBlock());
            }
        }
    }
    controlBlock() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && this.checkBoard(this.state.target, 'left')) {
                if (this.state.xy[0] > 0) this.moveBlock('left');
            } else if (e.key === 'ArrowRight' && this.checkBoard(this.state.target, 'right')) {
                if (this.state.xy[0] + this.state.target[0].length < this.state.width) this.moveBlock('right');
            } else if(e.key === 'ArrowDown'){
                this.state.score++;
                this.inputBlock();
            }
        });
        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp') {
                console.log('rotate');
            }
        })
    }
    moveBlock(forward) {
        // 흔적 제거
        this.state.setBoard(true);
        switch (forward) {
            case 'down':
                this.state.xy[1]++;
                break;
            case 'left':
                this.state.xy[0]--;
                break;
            case 'right':
                this.state.xy[0]++;
            default:
                break;
        }
        // 다시 그리기
        this.state.setBoard(false);
    }
    checkLine() {
        for (let idx = this.state.xy[1] - 4; idx < this.state.xy[1] + 4; idx++) {
            if (this.state.board[idx] && !this.state.board[idx].includes(0)) {
                let count = idx;
                while (count >= 0 && this.state.board[count]) {
                    this.state.board[count] = this.state.board[count - 1];
                    count--;
                }
                this.state.board[0] = new Array(this.state.width).fill(0);
                this.state.score += 100;
            }
        }
    }
    checkBoard = (arr, forward) => {
        let result = true;
        const [x, y] = this.state.xy;
        arr.forEach((row, rdx) => {
            if (y + rdx >= 0) {
                row.forEach((col, cdx) => {
                    switch (forward) {
                        case 'down':
                            if (!arr[rdx + 1] || !arr[rdx + 1][cdx]) {
                                if (col && this.state.board[y + rdx + 1][x + cdx]) result = false;
                            }
                            break;
                        case 'right':
                            if (cdx + 1 < this.state.width && !arr[rdx][cdx + 1]) {
                                if (col && this.state.board[y + rdx][x + cdx + 1]) result = false;
                            }
                            break;
                        case 'left':
                            if (!arr[rdx][cdx - 1]) {
                                if (col && this.state.board[y + rdx][x + cdx - 1]) result = false;
                            }
                            break;
                        default:
                            break;
                    }
                });
            }
        });
        return result;
    }
}
class TetrisState { // 이번에는 여러 클래스로 나누어서 코드를 짜본다.
    constructor(N) {
        this._board = this.initBoard(N);
        this._size = N;
        this._info = {};
        this._score = 0;
        this._nodeTable = [];
        this._target = [];
        this._xy = [];
    }
    get info() {
        return this._info;
    }
    set info(info) {
        this._info = {
            ...this._info,
            ...info
        };
    }
    get score() {
        return this._score;
    }
    set score(score) {
        this._score = score;
    }
    get width() {
        return this._size;
    }
    get height() {
        return this._size * 2;
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
    resetScore() {
        this._score = 0;
    }
    resetBoard() {
        this._board = this.initBoard(this._size);
    }
    setBlock(block) {
        this.xy = [3, -1];
        this.target = block;
    }
    setBoard(isReset) {
        this.target.forEach((row, rdx) => {
            const [x, y] = this.xy;
            row.forEach((col, cdx) => {
                if (col && this.board[rdx + y] && this.board[rdx + y][cdx + x] !== undefined) {
                    this.board[rdx + y][cdx + x] = isReset ? 0 : col;
                }
            });
        });
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
