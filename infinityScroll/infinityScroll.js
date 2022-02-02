class InfinityScroll {
    constructor(root) {
        this.root = root;
        this.container = this.makeContainer();
        this.isLoaded = false;
        this.render();
    }
    makeContainer() {
        const container = document.createElement('article');
        container.id = "container";

        return container;
    }
    makePivot() {
        const pivot = document.createElement('div');
        pivot.id = "scroll-pivot";
        pivot.style.height = "8px";

        return pivot;
    }
    createObserver(pivot) {
        const observer = new IntersectionObserver(async (entry) => {
            if (!entry.isIntersecting && !this.isLoaded) {
                this.isLoaded = true;
                observer.unobserve(pivot);
                console.log('test', entry, observer);
                this.makeItem();
                this.isLoaded = false;
                observer.observe(pivot);
            }
        }, {
            root: this.root,
            rootMargin: "0px",
            threshold: 0.5,
        });
        observer.observe(pivot);
    }
    makeItem() {
        new Array(10).fill(true)
            .forEach((_, idx) => {
                const item = document.createElement('div');
                item.className = "item"
                item.innerText = idx;
                item.style.width = "100%";
                item.style.height = "200px";
                item.style.margin = "12px";
                item.style.textAlign = "center";
                item.style.backgroundColor = "tomato";

                this.container.appendChild(item);
            });
    }

    render() {
        const pivot = this.makePivot();
        this.createObserver(pivot);
        this.root.appendChild(this.container);
        this.root.appendChild(pivot);
    }
}