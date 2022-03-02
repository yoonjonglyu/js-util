class Rotion {
    constructor(root) {
        this.root = root;
        this.container = this.createContainer();
        this.pages = [];
        this.views = {};
        this.loadData();
    }
    createContainer() {
        const container = 'container';
        this.createArea(container);
        this.root.appendChild(container);
        return container;
    }
    createArea(container) {
        const pageList = 'pageList';
        this.renderPageList(pageList);
        container.appendChild(pageList);

        const contents = 'contents';
        container.appendChild(contents);
    }

    renderPageList(list) {
        const pages = this.pages.map((item) => {
            item.idx;
            item.title;
        });

        list.appendChild(pages);
    }

    loadData() {
        const data = localStorage.getItem('rotions');
        if (data === null) this.initData();
        const { pages, views } = JSON.parse(data);
        this.pages = pages;
        this.views = views;
    }
    initData() {
        const initState = {
            pages: [],
            views: {}
        };
        localStorage.setItem('rotions', JSON.stringify(initState));
    }
}