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
        const style = {
            display: "flex",
            flexFlow: "column",
            width: "100%",
            height: "680px"
        };
        for (const [key, value] of Object.entries(style)) {
            container.style[key] = value;
        }

        return container;
    }
    makeNav(currentPage) {
        const nav = document.createElement('nav');
        nav.id = "paginations";
        const style = {
            display: "flex",
            flexFlow: "column",
            width: "100%",
        };
        for (const [key, value] of Object.entries(style)) {
            nav.style[key] = value;
        }

        const ul = document.createElement('ul');
        const ulStyle = {
            display: "flex",
            justifyContent: "center",
            margin: 0,
            padding: 0,
            listStyle: "none",
        }
        for (const [key, value] of Object.entries(ulStyle)) {
            ul.style[key] = value;
        }

        if (currentPage > 0) {
            const prev = document.createElement('li');
            prev.className = "prev";
            const liStyle = {
                display: "flex",
                margin: "8px",
                padding: "8px",
            }
            for (const [key, value] of Object.entries(liStyle)) {
                prev.style[key] = value;
            }
            prev.innerText = "prev";
            prev.addEventListener('click', () => {
                this.root.removeChild(nav);
                const nextNav = this.makeNav(currentPage - 1);
                this.root.appendChild(nextNav);
            })
            ul.appendChild(prev);
        }

        Array.from({ length: 10 }, (_, idx) => currentPage * 10 + idx + 1)
            .forEach((el) => {
                const li = document.createElement('li');
                li.className = "page";
                const liStyle = {
                    display: "flex",
                    margin: "8px",
                    padding: "8px",
                }
                for (const [key, value] of Object.entries(liStyle)) {
                    li.style[key] = value;
                }
                li.innerText = el;
                li.addEventListener('click', () => {
                    this.setPage(el);
                    if (currentPage !== Math.floor(el / 10)) {
                        this.root.removeChild(nav);
                        const nextNav = this.makeNav(Math.floor(el / 10));
                        this.root.appendChild(nextNav);
                    }
                });
                if (Math.floor(this.items.length / 10) > el) ul.appendChild(li);
            });

        if (currentPage + 1 < Math.floor(this.items.length / 100)) {
            const next = document.createElement('li');
            next.className = "next";
            const liStyle = {
                display: "flex",
                margin: "8px",
                padding: "8px",
            }
            for (const [key, value] of Object.entries(liStyle)) {
                next.style[key] = value;
            }
            next.innerText = "next";
            next.addEventListener('click', () => {
                this.root.removeChild(nav);
                const nextNav = this.makeNav(currentPage + 1);
                this.root.appendChild(nextNav);
            })
            ul.appendChild(next);
        }

        nav.appendChild(ul);

        return nav;
    }
    setPage(page) {
        this.container.innerText = "";
        const ul = document.createElement('ul');
        const style = {
            display: "flex",
            flexFlow: "column",
            flex: "1",
            margin: "8px",
            padding: 0,
            listStyle: "none"
        };
        for (const [key, value] of Object.entries(style)) {
            ul.style[key] = value;
        }
        for (let int = page * 10; int < (page + 1) * 10; int++) {
            const li = document.createElement('li');
            li.className = "page-item";
            li.innerText = this.items[int];
            const style = {
                display: "flex",
                flexFlow: "column",
                flex: "1",
                width: "100%",
                margin: "8px",
                fontSize: "2rem",
                color: "red",
                textAlign: "center",
                backgroundColor: "#4848e4",
            };
            for (const [key, value] of Object.entries(style)) {
                li.style[key] = value;
            }
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