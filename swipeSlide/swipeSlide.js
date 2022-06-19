function Swipe(Container, itemLength) {
  let isSwipe = false;
  let initOffset = 0;
  let currentStep = 0;
  let currentOffset = 0;

  const handleStart = (x) => {
    isSwipe = true;
    initOffset = x;
  };
  const handleMove = (x) => {
    if (isSwipe) {
      const offset = initOffset - x - currentOffset;
      Container.style.transition = 'none';
      Container.style.transform = `translateX(${offset}px)`;
    }
  };
  const handleEnd = (x) => {
    if (isSwipe) {
      const offset = initOffset - x;
      if (Math.abs(offset) >= 360 / 2) {
        if (offset > 0 && currentStep > 0) {
          currentStep--;
          currentOffset = currentStep * 360;
        } else if (offset < 0 && currentStep < itemLength - 1) {
          currentStep++;
          currentOffset = currentStep * 360;
        }
      }
      Container.style.transition = '400ms';
      Container.style.transform = `translateX(-${currentOffset}px)`;
      isSwipe = false;
    }
  };
  return {
    desktopStart: (e) => {
      handleStart(e.pageX);
    },
    desktopMove: (e) => {
      handleMove(e.pageX);
    },
    desktopEnd: (e) => {
      if (!/iPhone|iPad|Android/g.test(navigator.userAgent)) handleEnd(e.pageX);
    },
    mobileStart: (e) => {
      handleStart(e.touches[0].pageX);
    },
    mobileMove: (e) => {
      handleMove(e.targetTouches[0].pageX);
    },
    mobileEnd: (e) => {
      handleEnd(e.changedTouches[0].pageX);
    },
  };
}

function SlideComponent() {
  const SlideWrap = () => {
    const Node = document.createElement('article');
    setStyle(Node, {
      width: '360px',
      margin: '0 auto',
      overflow: 'hidden',
      border: '1px solid',
    });

    return Node;
  };
  const SlideContainer = (itemLength) => {
    const Node = document.createElement('ul');
    setStyle(Node, {
      display: 'flex',
      width: `${itemLength * 360}px`,
      margin: '0 auto',
      padding: 0,
      'list-style': 'none',
    });

    return Node;
  };
  const SlideItem = (text) => {
    const Node = document.createElement('li');
    Node.innerText = text;
    setStyle(Node, {
      width: '360px',
      height: '300px',
      border: 'tomato 1px solid',
      'text-align': 'center',
    });

    return Node;
  };

  return {
    SlideWrap,
    SlideContainer,
    SlideItem,
  };

  function setStyle(node, style) {
    for (const [key, value] of Object.entries(style)) {
      node.style[key] = value;
    }
  }
}
