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
    }
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
        contents.addEventListener('keyup', (e) => {
            if (e.key === "Enter") {
                const { idx, page } = e.target.dataset;
                this.addTextLine(page, parseInt(idx));
                contents.querySelector(`[data-idx='${parseInt(idx) + 1}']`).focus();
            } else {
                const { idx, page } = e.target.dataset;
                const state = contents.querySelector(`[data-idx='${idx}']`).value;
                if (idx === '0') this.changeTitle(parseInt(page), state);
                this.inputText(page, idx, state);
            }
        });
        this.renderContents(this.pages[0].idx);
        this.container.appendChild(contents);
    }

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
            const text = this.styled.textarea`
                display: block;
                width: 100%;
                margin-top: 12px;
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
                &:hover::placeholder{
                    opacity: 1;
                }

            `;
            text.value = item.text;
            text.placeholder = idx === 0 ?
                'Untitled' :
                'Type Memo';
            text.setAttribute('data-page', page);
            text.setAttribute('data-idx', idx);
            this.contents.appendChild(text);
        });
    }

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
    addTextLine(page, idx) {
        this.views[page] = [
            ...this.views[page].slice(0, idx + 1),
            {
                type: 'p',
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
    inputText(page, idx, state) {
        this.views[page][idx].text = state;
        this.saveData({
            pages: this.pages,
            views: this.views
        });
    }
    changeTitle(idx, state) {
        const pageIndex = this.pages.findIndex((page) => page.idx === idx);
        this.pages[pageIndex].title = state;
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