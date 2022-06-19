function SwipeSlide(Container, itemLength) {
  let isSwipe = false;
  let initOffset = 0;
  let currentStep = 0;
  let currentOffset = 0;
  let swipeTime = 0;

  /**
   * @description 스와이프 기능(플립액션)과 리사이즈 관련 된 로직들
   */
  const handleStart = (x) => {
    isSwipe = true;
    initOffset = x;
    swipeTime = Date.now();
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
      const viewport = window.innerWidth > 500 ? 720 : 360;
      const offset = initOffset - x;
      if (Math.abs(offset) >= viewport / 2 || Date.now() - swipeTime < 200) {
        if (offset > 0 && currentStep > 0) {
          currentStep--;
          currentOffset = currentStep * viewport;
        } else if (offset < 0 && currentStep < itemLength - 1) {
          currentStep++;
          currentOffset = currentStep * viewport;
        }
      }
      Container.style.transition = '400ms';
      Container.style.transform = `translateX(-${currentOffset}px)`;
      isSwipe = false;
      swipeTime = 0;
    }
  };
  const handleResize = () => {
    const viewport = window.innerWidth > 500 ? 720 : 360;
    currentOffset = currentStep * viewport;
    Container.style.transition = '0';
    Container.style.transform = `translateX(-${currentOffset}px)`;
  };
  /**
   * @description 간단한 자동 슬라이드 기능
   */
  const handleSlide = (time) => {
    return setInterval(() => {
      currentStep < itemLength - 1 ? currentStep++ : (currentStep = 0);

      const viewport = window.innerWidth > 500 ? 720 : 360;
      currentOffset = currentStep * viewport;
      Container.style.transition = '500ms';
      Container.style.transform = `translateX(-${currentOffset}px)`;
    }, time);
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
    resize: (e) => {
      handleResize();
    },
    slide: (time) => {
      handleSlide(time);
    },
  };
}

function SlideComponent() {
  const SlideWrap = () => {
    const Node = document.createElement('article');
    setStyle(Node, {
      'width': '360px',
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
    const Style = document.createElement('style');
    setGlobalStyle(`@media screen and (min-width: 500px) {
      article {
        width: 720px !important;
      }
      ul {
        width: ${itemLength * 720}px !important;
      }
      li {
        width: 720px !important;
      }
    }`);
    document.querySelector('head').appendChild(Style);

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
  function setGlobalStyle(style) {
    const Style = document.createElement('style');
    Style.innerHTML = style;
    document.querySelector('head').appendChild(Style);
  }
}
