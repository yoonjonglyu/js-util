function Main() {
  const Root = document.querySelector('#app');
  const SlideItems = [1, 2, 3, 4, 5];

  const Components = new SlideComponent();
  const Wrap = Components.SlideWrap();
  const Container = Components.SlideContainer(SlideItems.length);
  const Items = SlideItems.map((item) => Components.SlideItem(item));

  for (const item of Items) {
    Container.appendChild(item);
  }
  Wrap.appendChild(Container);
  Root.appendChild(Wrap);
}

Main();
