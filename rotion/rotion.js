class Rotion {
    constructor() {
        this.pages = [];
        this.views = {};
        this.loadData();
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