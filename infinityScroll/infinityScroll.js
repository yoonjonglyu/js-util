class InfinityScroll {
    constructor(root) {
        this.root = root;
        this.render();
    }

    makePivot(){
        const pivot = document.createElement('div');
        pivot.id = "scroll-pivot";
        
        return pivot;
    }

    render() {
        const pivot = this.makePivot();
        this.root.appendChild(pivot);
    }
}