function Main() {
  const Root = document.querySelector('#app');
  const SlideItems = [1, 2, 3, 4, 5];

  const Components = new SlideComponent();

  const Wrap = Components.SlideWrap();
  const Container = Components.SlideContainer(SlideItems.length);
  addEvents(Wrap, Container, SlideItems);
  const Items = SlideItems.map((item) => Components.SlideItem(item));

  for (const item of Items) {
    Container.appendChild(item);
  }
  Wrap.appendChild(Container);
  Root.appendChild(Wrap);

  function addEvents(Wrap, Container, items) {
    const SwipeEvents = new SwipeSlide(Container, items.length);
    //SwipeEvents.slide(3000);

    Wrap.addEventListener('touchstart', SwipeEvents.mobileStart);
    Wrap.addEventListener('touchmove', SwipeEvents.mobileMove);
    Wrap.addEventListener('touchend', SwipeEvents.mobileEnd);
    Wrap.addEventListener('touchcancel', SwipeEvents.mobileEnd);

    Wrap.addEventListener('pointerdown', SwipeEvents.desktopStart);
    Wrap.addEventListener('pointermove', SwipeEvents.desktopMove);
    Wrap.addEventListener('pointerup', SwipeEvents.desktopEnd);
    Wrap.addEventListener('pointerleave', SwipeEvents.desktopEnd);

    window.addEventListener('resize', SwipeEvents.resize);
  }
}

Main();
