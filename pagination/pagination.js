class Pagination {
    constructor(root) {
        this.root = root;
        this.render();
    }

    makeNav() {
        const nav = document.createElement('nav');
        nav.id = "paginations";

        return nav;
    }
    render() {
        const nav = this.makeNav();
        this.root.appendChild(nav);
    }
}