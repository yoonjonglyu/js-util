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
        container.style.display = "flex";
        container.style.flexFlow = "column";

        return container;
    }
    makePivot() {
        const pivot = document.createElement('div');
        pivot.id = "scroll-pivot";
        pivot.style.height = "8px";

        return pivot;
    }
    async loading() {
        this.isLoaded = true;
        const loading = document.createElement('progress');
        loading.style.width = "100%";

        this.container.appendChild(loading);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        this.container.removeChild(loading);
        this.isLoaded = false;
    }
    createObserver(pivot) {
        const onScroll = async ([entry]) => {
            if (entry.isIntersecting && !this.isLoaded) {
                observer.unobserve(pivot);
                await this.loading();
                this.makeItem();
                observer.observe(pivot);
            }
        }
        const observer = new IntersectionObserver(onScroll, {
            threshold: 1,
        });
        observer.observe(pivot);
    }
    makeItem() {
        new Array(10).fill(true)
            .forEach((_, idx) => {
                const item = document.createElement('div');
                item.className = "item"
                item.innerText = idx + 1;
                item.style.display = "flex";
                item.style.flexFlow = "column";
                item.style.justifyContent = "center";
                item.style.height = "200px";
                item.style.marginTop = "8px";
                item.style.textAlign = "center";
                item.style.fontSize = "2rem";
                item.style.backgroundColor = "tomato";

                this.container.appendChild(item);
            });
    }

    render() {
        const pivot = this.makePivot();
        this.createObserver(pivot);
        this.makeItem();
        this.root.appendChild(this.container);
        this.root.appendChild(pivot);
    }
}