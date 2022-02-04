class Pagination {
    constructor(items, root) {
        this.root = root;
        this.items = items;
        this.container = this.makeContainer();
        this.render();
    }
    makeContainer() {
        const container = document.createElement('article');
        container.id = "container";

        return container;
    }
    makeNav(currentPage) {
        const nav = document.createElement('nav');
        nav.id = "paginations";
        const ul = document.createElement('ul');
        ul.style.listStyle = "none";
        Array.from({ length: 10 }, (_, idx) => currentPage * 10 + idx + 1)
            .forEach((el) => {
                const li = document.createElement('li');
                li.style.display = "inline-block";
                li.style.margin = "8px";
                li.innerText = el;
                li.addEventListener('click', () => {
                    this.setPage(el);
                    if (currentPage !== Math.floor(el / 10)) {
                        this.root.removeChild(nav);
                        const next = this.makeNav(Math.floor(el / 10));
                        this.root.appendChild(next);
                    }

                });
                if (Math.floor(this.items.length / 10) > el) ul.appendChild(li);
            });
        nav.appendChild(ul);

        return nav;
    }
    setPage(page) {
        this.container.innerText = "";
        const ul = document.createElement('ul');
        for (let int = page * 10; int < (page + 1) * 10; int++) {
            const li = document.createElement('li');
            li.className = "page-item";
            li.innerText = this.items[int];
            ul.appendChild(li);
        }
        this.container.appendChild(ul);
    }
    render() {
        const nav = this.makeNav(0);
        this.setPage(0);
        this.root.appendChild(this.container);
        this.root.appendChild(nav);
    }
}