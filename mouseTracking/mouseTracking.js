class MouseTracking {
    constructor(root) {
        this.root = root;
    }

    makeSpace() {
        const container = document.createElement('article');
        container.id = "space";
        container.style.position = "relative";
        container.style.width = "100%";
        container.style.minHeight = "100vh";
        container.style.backgroundColor = "#333344";

        return container;
    }
    makeTracker() {
        const tracker = document.createElement('div');
        tracker.className = "tracker";
        tracker.style.position = "absolute";
        tracker.style.width = "50px";
        tracker.style.height = "50px";
        tracker.style.backgroundColor = "#165252";
        tracker.style.borderRadius = "100%";

        return tracker;
    }
    setTrackingEvent(space, target) {
        space.addEventListener('mousemove', (e) => {
            target.style.top = `${e.clientY - 25}px`;
            target.style.left = `${e.clientX - 25}px`;
        });
        space.addEventListener('click', (e) => {
            const marker = this.makeTracker();
            marker.style.top = `${e.clientY - 25}px`;
            marker.style.left = `${e.clientX - 25}px`;
            marker.style.backgroundColor = "#898994";
            space.appendChild(marker);
        });
    }

    render() {
        const space = this.makeSpace();
        const tracker = this.makeTracker();
        this.setTrackingEvent(space, tracker);
        space.appendChild(tracker);
        this.root.appendChild(space);
    }
}
