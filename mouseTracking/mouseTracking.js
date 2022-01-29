class MouseTracking {
    constructor(root) {
        this.root = root;
        this.render();
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
        const tracker = document.createElement('img');
        tracker.id = "tracker";
        tracker.src = "./assets/free-icon-ufo.png";
        tracker.alt = "ufo";
        tracker.style.position = "absolute";
        tracker.style.top = "-100vw";
        tracker.style.left = "50%";
        tracker.style.width = "50px";
        tracker.style.height = "50px";
        tracker.style.transition = "0.2s linear";

        return tracker;
    }
    makeMarker() {
        const marker = document.createElement('img');
        marker.className = "marker";
        marker.src = "./assets/premium-icon-star.png";
        marker.alt = "star";
        marker.style.position = "absolute";
        marker.style.width = "50px";
        marker.style.height = "50px";
        marker.style.animation = "star 0.6s linear";

        return marker;
    }
    setTrackingEvent(space, target) {
        space.addEventListener('mousemove', (e) => {
            target.style.top = `${e.clientY - 25}px`;
            target.style.left = `${e.clientX - 25}px`;
        });
    }
    setMarkingEvent(space) {
        space.addEventListener('click', (e) => {
            const marker = this.makeMarker();
            marker.style.top = `${e.clientY - 25}px`;
            marker.style.left = `${e.clientX - 25}px`;
            space.appendChild(marker);

            setTimeout(() => {
                space.removeChild(marker);
            }, 1100);
        });
    }
    setAnimation() {
        const head = document.querySelector('head');
        const styleSheets = document.createElement('style');
        styleSheets.innerText = `
        @keyframes star {
            from {
                transform: scale(0.2) translate(2000%, -1500%);
            }
            to {
                transform: none;
            }
          }
          `;
        head.appendChild(styleSheets);
    }

    render() {
        const space = this.makeSpace();
        const tracker = this.makeTracker();
        this.setTrackingEvent(space, tracker);
        this.setMarkingEvent(space);
        this.setAnimation();
        space.appendChild(tracker);
        this.root.appendChild(space);
    }
}
