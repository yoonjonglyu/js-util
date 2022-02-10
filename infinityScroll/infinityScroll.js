class InfinityScroll {
    constructor(root) {
        this.root = root;
        this.container = '';
        this.isLoaded = false;
        this.render();
    }
    async makeContainer() {
        await loader.require([
            'styledInJs'
        ], (styled) => {
            const container = styled.article`
            display: flex;
            flex-flow: column;
        `;
            container.id = "container";

            this.container = container;
        });
    }
    makePivot() {
        const pivot = document.createElement('div');
        pivot.id = "scroll-pivot";
        pivot.style.height = "8px";

        return pivot;
    }
    async loading() {
        this.isLoaded = true;
        await loader.require([
            'styledInJs'
        ], async (styled) => {
            const loading = styled.progress`
            width: 100%;
            `;
            this.container.appendChild(loading);
            await new Promise((resolve) => setTimeout(resolve, 1300));
            this.container.removeChild(loading);
        });
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
        loader.require([
            'styledInJs'
        ], (styled) => {
            new Array(10).fill(true)
                .forEach((_, idx) => {
                    const item = styled.div`
                        display: flex;
                        flex-flow: column;
                        justify-content: center;
                        height: 200px;
                        margin-top: 8px;
                        text-align: center;
                        font-size: 2rem;
                        background-color: tomato;
                        &:active{
                            background: red;
                        }
                    `;
                    item.classList.add('item');
                    item.innerText = idx + 1;

                    this.container.appendChild(item);
                });
        });
    }

    async render() {
        await this.makeContainer();
        this.makeItem();
        const pivot = this.makePivot();
        this.createObserver(pivot);
        this.root.appendChild(this.container);
        this.root.appendChild(pivot);
    }
}

loader.define("infinityScroll", function () {
    return InfinityScroll;
});