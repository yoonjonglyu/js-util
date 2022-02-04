class Pagination {
    constructor(root) {
        this.root = root;
        this.container = this.makeContainer();
        this.render();
    }
    makeContainer() {
        const container = document.createElement('article');
        container.id = "container";

        return container;
    }
    makeNav() {
        const nav = document.createElement('nav');
        nav.id = "paginations";
        const ul = document.createElement('ul');
        ul.style.listStyle = "none";
        Array.from({ length: 10 }, (_, idx) => idx + 1)
            .forEach((el) => {
                const li = document.createElement('li');
                li.style.display = "inline-block";
                li.style.margin = "8px";
                li.innerText = el;
                li.addEventListener('click', () => {
                    this.setPage(el);
                });
                ul.appendChild(li);
            });
        nav.appendChild(ul);

        return nav;
    }
    setPage(page) {
        this.container.innerHTML = page;
    }
    render() {
        const nav = this.makeNav();
        this.setPage("메인");
        this.root.appendChild(this.container);
        this.root.appendChild(nav);
    }
}