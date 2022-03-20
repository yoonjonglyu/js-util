class Tetris {
    constructor(root, styled) {
        this.root = root;
        this.styled = styled;
        this.state = new TetrisState(10);
        this.blocks = new TetrisBlock();
        this.game = 0;
        this.isRender = 0;
        this.isCrash = false;
        this.state.setBlock(this.blocks.getNextBlock());
        this.createContainer();
        this.playGame();
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
            width: 160px;
            height: 600px;
            padding: 10px;
            margin-left: 20px;
            border: 1px solid blue;
            text-align: center;
        `;
        const scoreTitle = this.styled.h2`
        `;
        scoreTitle.innerText = 'SCORE';
        const score = this.styled.h3`
        `;
        this.state.info = { score: score };
        this.renderInformation();

        const help = this.styled.h4`
            color: tomato;
        `;
        help.innerText = '게임 시작은 키보드 방향키 아래 화살표로 시작합니다.';
        scoreBoard.appendChild(scoreTitle);
        scoreBoard.appendChild(score);
        scoreBoard.appendChild(help);
        this.createRanks(scoreBoard);

        return scoreBoard;
    }
    createRanks(scoreBoard) {
        const ranksTitle = this.styled.h2``;
        ranksTitle.innerText = 'RANKS';
        const ranks = this.styled.ul`
            padding: 0;
            list-style: none;
            text-align: center;
        `;
        this.state.info = { ranks: ranks };
        this.renderRanks();

        scoreBoard.appendChild(ranksTitle);
        scoreBoard.appendChild(ranks);
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
    playGame() {
        const startGame = (e) => {
            if (e.key === 'ArrowDown') {
                const isAnswer = confirm('새 게임을 시작하시겠어요?');
                if (isAnswer) {
                    document.removeEventListener('keydown', startGame);
                    this.game = setInterval(this.dropBlock.bind(this), 900);
                    this.renderGame();
                    this.controlBlock(true);
                    alert('묻고 더블로가!');
                } else {
                    alert('너 다음에 한판 더해');
                }
            }
        }
        document.addEventListener('keydown', startGame);
    }
    gameOver() {
        cancelAnimationFrame(this.isRender);
        clearInterval(this.game);
        alert('gameover');
        const isAnswer = prompt('랭킹에 등록 할 닉네임을 입력해주세요.', 'ASD');
        this.state.ranks = [
            ...this.state.ranks,
            [isAnswer, this.state.score]
        ];
        this.state.resetBoard();
        this.state.resetScore();
        this.controlBlock(false);
        this.renderRanks();
        this.playGame();
    }

    renderGame = () => {
        this.renderBoard();
        this.renderInformation();
        this.isRender = requestAnimationFrame(this.renderGame);
    }
    renderBoard = () => {
        this.state.board.forEach((row, rdx) => {
            row.forEach((col, cdx) => {
                this.state.table[rdx][cdx].style.background = this.blocks.getBlockColors(col);
            });
        });
    }
    renderInformation = () => {
        this.state.info.score.innerText = `내 점수 : ${this.state.score} 점`;
    }
    renderRanks = () => {
        this.state.info.ranks.innerText = '';
        this.state.ranks.forEach((rank, idx) => {
            const [name, score] = rank;
            const item = this.styled.li`
            `;
            item.innerText = `[${idx + 1} 등]${name} 님 : ${score} 점`;
            this.state.info.ranks.appendChild(item);
        });
        if (this.state.ranks.length === 0) this.state.info.ranks.innerText = '등록된 랭킹이 없습니다.';
    }

    dropBlock() {
        this.moveBlock('down');
        if (this.isCrash) {
            if (this.state.xy[1] === -1) {
                this.gameOver();
                this.isCrash = false;
            } else {
                this.checkLine();
                this.state.setBlock(this.blocks.getNextBlock());
                this.isCrash = false;
            }
        }
    }
    controlBlock(handle) {
        if (handle) {
            document.addEventListener('keydown', this.moveEvent);
            document.addEventListener('keyup', this.rotateEvent);
        } else {
            document.removeEventListener('keydown', this.moveEvent);
            document.removeEventListener('keyup', this.rotateEvent);
        }
    }
    moveEvent = (e) => {
        if (e.key === 'ArrowLeft') {
            this.moveBlock('left');
        } else if (e.key === 'ArrowRight') {
            this.moveBlock('right');
        } else if (e.key === 'ArrowDown') {
            this.state.score++;
            this.dropBlock();
        }
    }
    rotateEvent = (e) => {
        if (e.key === 'ArrowUp') this.moveBlock('rotate');
    }
    moveBlock(forward) {
        this.state.setBoard(true);
        switch (forward) {
            case 'down':
                const resize = Array.from(this.state.target);
                while (resize.length > 0 && !resize[resize.length - 1].find((col) => col > 0)) resize.pop();
                this.checkBoard(resize, 'down') ?
                    this.state.xy[1]++ :
                    this.isCrash = true;
                break;
            case 'left':
                if (this.checkBoard(this.state.target, 'left')) this.state.xy[0]--;
                break;
            case 'right':
                if (this.checkBoard(this.state.target, 'right')) this.state.xy[0]++;
                break;
            case 'rotate':
                const nextTarget = JSON.parse(JSON.stringify(this.state.target));
                nextTarget.forEach((_, rdx) => {
                    for (let cdx = 0; cdx < rdx; cdx++) {
                        [nextTarget[cdx][rdx], nextTarget[rdx][cdx]] =
                            [nextTarget[rdx][cdx], nextTarget[cdx][rdx]];
                    }
                });
                nextTarget.forEach((row) => row.reverse());
                if (this.checkBoard(nextTarget, 'rotate')) this.state.target = nextTarget;
                break;
            default:
                break;
        }
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
            if (y + rdx < 0) rdx++;
            row.forEach((col, cdx) => {
                switch (forward) {
                    case 'down':
                        if (arr.length + y >= this.state.height) result = false;
                        if (col && this.state.board[y + rdx + 1] && this.state.board[y + rdx + 1][x + cdx]) result = false;
                        break;
                    case 'right':
                        if (col && x + cdx >= this.state.width - 1) result = false;
                        if (col && this.state.board[y + rdx][x + cdx + 1]) result = false;
                        break;
                    case 'left':
                        if (col && x + cdx < 1) result = false;
                        if (col && this.state.board[y + rdx][x + cdx - 1]) result = false;
                        break;
                    case 'rotate':
                        if (col && (x + cdx >= this.state.width || x + cdx < 0)) result = false;
                        if (col && (!this.state.board[y + rdx] || this.state.board[y + rdx][x + cdx])) result = false;
                        break;
                    default:
                        break;
                }
            });
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
        this._ranks = [];
        this._nodeTable = [];
        this._target = [];
        this._xy = [];
        this.loadRanks();
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
    get ranks() {
        return this._ranks;
    }
    set ranks(ranks) {
        ranks.sort((a, b) => b[1] - a[1]);
        if (ranks.length > 5) ranks.pop();
        this._ranks = ranks;
        localStorage.setItem('tetris-ranks', JSON.stringify(ranks));
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
    loadRanks() {
        const check = localStorage.getItem('tetris-ranks');
        check === null ?
            this.initScore() :
            this.ranks = JSON.parse(localStorage.getItem('tetris-ranks'));
    }
    initScore() {
        localStorage.setItem('tetris-ranks', JSON.stringify([]));
    }
}
class TetrisBlock {
    constructor() {
        this.blocks = [
            [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
            [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]],
            [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
            [[4, 4], [4, 4]],
            [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
            [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
            [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
        ];
        this.colors = [
            'none',
            '#0152b5',
            '#029dd9',
            '#fb6902',
            '#fcc900',
            '#56ad29',
            '#852587',
            '#da1e29',
        ];
    }
    getBlockColors = (type) => {
        return this.colors[type];
    }
    getNextBlock = () => {
        const type = parseInt(Math.random() * 7);
        const block = this.blocks[type];

        return block;
    }
}
