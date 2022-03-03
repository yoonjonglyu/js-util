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
        const pageList = this.styled.ul`
            margin: 0;
            padding: 12px;
            &:hover {
                border-bottom: 1px solid green;
            }
        `;
        this.pageList = pageList;
        this.renderPageList();
        this.container.appendChild(pageList);

        const contents = this.styled.div`
            height: 100%;
            background: tomato;
        `;
        this.contents = contents;
        this.renderContents(this.pages[0].title);
        this.container.appendChild(contents);
    }

    renderPageList() {
        this.pages.map((item) => {
            const page = this.styled.li`
                display: inline-block;
                margin-right: 12px;
                color: #8f8f8f;
                &:hover {
                    color: cyan;
                }
            `;
            page.innerText = item.title;
            this.pageList.appendChild(page);
        });
    }
    renderContents(page) {
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

    loadData() {
        const check = localStorage.getItem('rotions');
        if (check === null) this.initData();
        const { pages, views } = JSON.parse(localStorage.getItem('rotions'));
        this.pages = pages;
        this.views = views;
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
                '기본페이지' : [
                    {
                        type: 'h1',
                        text: '안녕하세요.'
                    }
                ],
                'page1' : [

                ]
            }
        };
        localStorage.setItem('rotions', JSON.stringify(initState));
    }
}