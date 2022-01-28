class MouseTracking {
    constructor(root) {
        this.root = root;
    }

    makeSpace() {
        const container = document.createElement('article');
        container.id = "space";
        container.style.width = "100%";
        container.style.minHeight = "100vh";
        container.style.backgroundColor = "#333344";

        return container;
    }

    render() {
        this.root.appendChild(this.makeSpace());
    }
}
