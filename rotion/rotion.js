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
                this.addPage()
                this.renderPageList();
            }
        });
        this.renderPageList();
        this.container.appendChild(pageList);
    }
    createContents() {
        const contents = this.styled.div`
            height: 100%;
            background: tomato;
        `;
        this.contents = contents;
        this.renderContents(this.pages[0].idx);
        this.container.appendChild(contents);
    }

    renderPageList() {
        this.pageList.innerText = '';
        this.pages.map((item) => {
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
        this.views[page]?.map((item) => {
            const text = this.styled.input`
                display: block;
                background: none;
                border: none;
                outline: none;
                ${item.type}
            `;
            text.value = item.text;

            this.contents.appendChild(text);
        });
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