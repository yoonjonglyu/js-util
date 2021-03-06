class Rotion {
    constructor(root, styled) {
        this.root = root;
        this.styled = styled;
        this.pages = [];
        this.views = {};
        this.loadData();
        this.container = '';
        this.pageList = '';
        this.contents = '';
        this.createContainer();
        this.drag = {
            page: 0,
            idx: 0,
        }
        this.types = [
            'h1',
            'h2',
            'p'
        ];
    }
    /**
     * @description 노션을 구성하는 페이지 리스트 & 메모 레이아웃 DOM 구성
     */
    createContainer() {
        const container = this.styled.article`
            display: flex;
            flex-flow: column;
            flex: 1;
        `;
        container.id = "rotion-container";
        this.container = container;
        this.createArea();
        this.root.appendChild(container);
    }
    createArea() {
        this.createPageList();
        this.createContents();
    }
    createPageList() {
        const pageList = this.styled.ul`
            display: flex;
            width: 1000px;
            height: 58px;
            box-sizing: border-box;
            margin: 0;
            padding: 12px;
            overflow: hidden;
            overflow-x: auto;
            white-space:nowrap;
            &:hover {
                border-bottom: 1px solid green;
            }
        `;
        this.pageList = pageList;
        /**
         * @description 페이지 전환 및 페이지 추가 이벤트
         */
        pageList.addEventListener('click', (e) => {
            if (e.target.dataset.idx) this.renderContents(e.target.dataset.idx);
            if (e.target.dataset.add) {
                this.addPage();
            }
        });
        this.renderPageList();
        this.container.appendChild(pageList);
    }
    createContents() {
        const contents = this.styled.div`
            height: 100%;
        `;
        this.contents = contents;
        /**
         * @description 메모 내용 수정 & 새로운 단락 생성 & 삭제 이벤트
         */
        contents.addEventListener('keyup', (e) => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;

            const { page, idx } = e.target.dataset;
            if (e.key === 'Enter') {
                this.addTextLine(page, parseInt(idx), 'p');
                contents.querySelector(`textarea[data-idx='${parseInt(idx) + 1}']`).focus();
            } else {
                const state = contents.querySelector(`textarea[data-idx='${idx}']`).value;
                if (idx === '0') this.changeTitle(parseInt(page), state);
                if (idx !== '0' && e.key === 'Backspace' && this.views[page][idx].text.length === 0) {
                    this.removeTextLine(page, parseInt(idx));
                    contents.querySelector(`textarea[data-idx='${parseInt(idx) - 1}']`).focus();
                } else {
                    this.inputText(page, idx, state);
                }
            }
        });
        /**
         * @description 같은 페이지내 방향키을 이용한 이동 이벤트
         */
        contents.addEventListener('keyup', (e) => {
            const { page, idx } = e.target.dataset;
            const cursor = e.target.selectionStart;
            if (e.key === 'ArrowUp' && idx !== '0') {
                if (cursor === 0) contents.querySelector(`textarea[data-idx='${parseInt(idx) - 1}']`).focus();
            } else if (e.key === 'ArrowLeft' && idx !== '0') {
                if (cursor === 0) contents.querySelector(`textarea[data-idx='${parseInt(idx) - 1}']`).focus();
            } else if (e.key === 'ArrowDown' && this.views[page].length - 1 > parseInt(idx)) {
                if (cursor === this.views[page][idx].text.length) contents.querySelector(`textarea[data-idx='${parseInt(idx) + 1}']`).focus();
            } else if (e.key === 'ArrowRight' && this.views[page].length - 1 > parseInt(idx)) {
                if (cursor === this.views[page][idx].text.length) contents.querySelector(`textarea[data-idx='${parseInt(idx) + 1}']`).focus();
            }
        })
        this.renderContents(this.pages[0].idx);
        this.container.appendChild(contents);
    }
    /** 
     * @description 페이지 목록 & 해당 페이지 메모 렌더링
     */
    renderPageList() {
        this.pageList.innerText = '';
        this.pages.forEach((item) => {
            const page = makeItem.call(this);
            page.innerText = item.title;
            page.setAttribute('data-idx', item.idx);
            this.pageList.appendChild(page);
        });

        const addPage = makeItem.call(this);
        addPage.innerText = 'Add Page';
        addPage.setAttribute('data-add', true);
        this.pageList.appendChild(addPage);

        function makeItem() {
            return this.styled.li`
                display: inline-block;
                margin-right: 12px;
                color: #8f8f8f;
                &:hover {
                    color: cyan;
                }
            `;
        }
    }
    renderContents(page) {
        this.contents.innerText = '';
        this.views[page]?.forEach((item, idx) => {
            const textBox = this.styled.p`
                position: relative;
                width: 98%;
                margin-top: 12px;
                padding: 0 8px;
                &:hover button {
                    opacity: 0.8;
                }
            `;
            textBox.draggable = 'true';
            textBox.setAttribute('data-page', page);
            textBox.setAttribute('data-idx', idx);
            textBox.setAttribute('data-drag', true);
            const addLine = this.styled.button`
                float: left;
                background: none;
                border: none;
                opacity: 0;
            `;
            addLine.innerText = 'A';
            addLine.setAttribute('data-page', page);
            addLine.setAttribute('data-idx', idx);
            addLine.addEventListener('click', (e) => {
                const { page, idx } = e.target.dataset;
                this.renderAddLineType(textBox, (type) => this.addTextLine(page, parseInt(idx), type));
            });
            textBox.appendChild(addLine);

            const handle = this.styled.button`
                float: left;
                background: none;
                border: none;
                opacity: 0;
            `;
            handle.innerText = 'H';
            handle.setAttribute('data-page', page);
            handle.setAttribute('data-idx', idx);
            textBox.appendChild(handle);
            this.dragTextLine(textBox, handle);

            const text = this.styled.textarea`
                width: 95%;
                padding: 0;
                background: none;
                border: none;
                border-bottom: 1px solid #4d4a4a3d;
                outline: none;
                resize: none;
                overflow: hidden;
                ${this.getTypeStyle(item.type)}
                &::placeholder {
                    opacity: 0;
                }
                &:focus::placeholder{
                    opacity: 1;
                }
            `;
            text.value = item.text;
            text.placeholder = idx === 0 ?
                'Untitled' :
                'Type Memo';
            text.setAttribute('data-page', page);
            text.setAttribute('data-idx', idx);
            textBox.appendChild(text);

            this.contents.appendChild(textBox);
        });
    }
    renderAddLineType(textBox, addLine) {
        const typeBox = this.styled.ul`
            position: absolute;
            top: 0;
            margin: 0;
            padding: 8px;
            list-style: none;
            z-index: 999999;
            background: lightblue;
        `;
        typeBox.addEventListener('click', (e) => {
            const { type } = e.target.dataset;
            if (type) {
                addLine(type);
            }
        });
        this.types.forEach((type) => {
            const item = this.styled.li`
            `
            item.innerText = type;
            item.setAttribute('data-type', type);

            typeBox.appendChild(item);
        });

        textBox.appendChild(typeBox);
    }
    dragTextLine(textBox, handle) {
        textBox.addEventListener("dragstart", (e) => {
            handle.style.opacity = 0;
        });
        textBox.addEventListener("dragend", (e) => {
            const { page, idx } = e.target.dataset;
            if (this.drag.page === page && this.drag.idx !== idx) {
                if (this.drag.idx !== '0' && idx !== '0') this.changeTextLine(page, this.drag.idx, idx);
            }
            this.drag = {
                page: 0,
                idx: 0
            };
            handle.style.opacity = '';
        });

        /* 드롭 대상에서 이벤트 발생 */
        textBox.addEventListener("dragover", (e) => {
            const { page, idx } = e.target.dataset;
            this.drag = {
                page,
                idx
            };
            if (e.target.dataset.drag) e.target.style.borderBottom = "5px solid red";
        });
        textBox.addEventListener("dragleave", (e) => {
            // 요소를 드래그하여 드롭하려던 대상으로부터 벗어났을 때 배경색 리셋
            if (e.target.dataset.drag) e.target.style.borderBottom = "";
        });
    }
    /**
     * @description 각 라인 타입에 따른 커스텀 스타일
     * @param {string} type 
     * @returns string css
     */
    getTypeStyle(type) {
        const styles = {
            title: `
                font-size: 2.5rem;
                font-weight: bold;
                &::placeholder {
                    opacity: 1 !important;
                }
            `,
            h1: `
                font-size: 1.8rem;
                font-weight: bold;
            `,
            h2: `
                font-size: 1.5rem;
                font-weight: bold;
            `,
            p: `
                font-size: 1rem;
            `,
        }

        return styles[type];
    }
    /**
     * @description 노션 데이터 처리 로직
     */
    addPage() {
        const idx = this.pages[this.pages.length - 1].idx + 1;
        this.pages = [
            ...this.pages,
            {
                idx: idx,
                title: 'Untitled'
            }
        ]
        this.views[idx] = [
            {
                type: 'title',
                text: ''
            },
        ];
        this.saveData({
            pages: this.pages,
            views: this.views
        });
        this.renderPageList();
    }
    addTextLine(page, idx, type) {
        this.views[page] = [
            ...this.views[page].slice(0, idx + 1),
            {
                type: type,
                text: '',
            },
            ...this.views[page].slice(idx + 1, this.views[page].length)
        ];
        this.saveData({
            pages: this.pages,
            views: this.views
        });
        this.renderContents(page);
    }
    removeTextLine(page, idx) {
        this.views[page] = [
            ...this.views[page].slice(0, idx),
            ...this.views[page].slice(idx + 1, this.views[page].length)
        ];
        this.saveData({
            pages: this.pages,
            views: this.views
        });
        this.renderContents(page);
    }
    changeTextLine(page, ldx, rdx) {
        const state = this.views[page][ldx];
        this.views[page][ldx] = this.views[page][rdx];
        this.views[page][rdx] = state;
        this.saveData({
            pages: this.pages,
            views: this.views
        });
        this.renderContents(page);
    }
    inputText(page, idx, state) {
        this.views[page][idx].text = state;
        this.saveData({
            pages: this.pages,
            views: this.views
        });
    }
    changeTitle(idx, state) {
        const pageIndex = this.pages.findIndex((page) => page.idx === idx);
        this.pages[pageIndex].title = state.length > 0 ?
            state :
            'Untitled';
        this.renderPageList();
    }
    loadData() {
        const check = localStorage.getItem('rotions');
        if (check === null) this.initData();
        const { pages, views } = JSON.parse(localStorage.getItem('rotions'));
        this.pages = pages;
        this.views = views;
    }
    saveData(data) {
        localStorage.setItem('rotions', JSON.stringify(data));
    }
    initData() {
        const initState = {
            pages: [
                {
                    idx: 1,
                    title: '기본페이지'
                },
                {
                    idx: 2,
                    title: 'page1'
                }
            ],
            views: {
                '1': [
                    {
                        type: 'title',
                        text: '기본페이지'
                    },
                    {
                        type: 'h1',
                        text: '안녕하세요.'
                    }
                ],
                '2': [
                    {
                        type: 'title',
                        text: 'page1'
                    },
                ]
            }
        };
        this.saveData(initState);
    }
}