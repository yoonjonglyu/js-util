class Rotion {
    constructor() {
        this.pages = [];
        this.views = {};
        this.loadData();
    }

    loadData() {
        const data = localStorage.getItem('rotions');
        if (data === null) {
            const initState = {
                pages: [],
                views: {}
            };
            localStorage.setItem('rotions', JSON.stringify(initState));
        } else {
            const { pages, views } = JSON.parse(data);
            this.pages = pages;
            this.views = views;
        }
    }
}