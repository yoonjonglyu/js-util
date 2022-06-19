function Swipe() {
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
      const offset = initOffset - x;
      console.log(x, offset);
    }
  };
  const handleEnd = (x) => {
    if (isSwipe) {
    }
  };
  return {
    desktopStart: (e) => {
      handleStart(e.pageX);
    },
    desktopMove: (e) => {
      handleMove(e.pageX);
    },
    desktopEnd: (e) => {},
    mobileStart: (e) => {
      handleStart(e.pageX);
    },
    mobileMove: (e) => {
      handleMove(e.pagex);
    },
    mobileEnd: (e) => {
      handleEnd(e.pagex);
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
