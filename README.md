# Js-util

바닐라 자바스크립트로 만드는 다양한 기능 및 애니메이션 등 유틸 모음

## 설명
각 폴더마다 독립된 기능 하나씩 존재한다. js 구현 및 디자인 시스템이나 공통단 작업 연습을 위한 Repo.

## 구조
1. [MouseTracking](https://yoonjonglyu.github.io/js-util/mouseTracking/) : 마우스 움직임이나 클릭에 반응하는 애니메이션, canvas나 html로 구현.  
   인프런 장애 페이지 보고 영감을 얻었다.
2. [InfinityScroll](https://yoonjonglyu.github.io/js-util/infinityScroll/) : 자주 쓰이는 스크롤 기법 중 하나로 IntersectionObserver로 구현했다.
3. [Pagination](https://yoonjonglyu.github.io/js-util/pagination/) : 자주 쓰이는 기법인 페이지네이션 기능을 바닐라로 간단히 구현했다.  
4. [StyledInJs](https://yoonjonglyu.github.io/js-util/styledInJs/) : 리액트에서 자주 사용하는 스타일드 컴포넌트를 참고하여서 간단히 만들어본 CSS IN JS 모듈이다.  
5. [ModuleLoader](https://yoonjonglyu.github.io/js-util/moduleLoader/) : AMD(Asynchronous Module Definition) 모듈로더를 간단히 구현한 내용이다. RequireJS를 참고 했다. 예제(링크)는 4번과 2번 모듈을 모듈로더를 통해서 불러와서 한페이지에 삽인한 내용이다. 기본적인 컨텍스트 분리, 비동기 모듈로딩, require, define 등을 구현해보았다.    
6. [PromiseYou](https://yoonjonglyu.github.io/js-util/promiseYou/) : 프로미스 구현체를 바닐라 js로 간단히 구현 해본 내용이다.
then, catch, finally 메서드를 간단히 구현했고, 해당 페이지에서는 데모를 확인가능하다.  
7. [Rotion](https://yoonjonglyu.github.io/js-util/rotion/) : 노션 기능을 간단하게 구현해본 것, 바닐라 js로 라인 추가하는 것이나 드래그로 순서변경하는 것 페이지 추가등 기능을 간단하게 목업해본 것이다. 노션 기능 자체를 만드는데는 그렇게 어렵진 않다. ui/ux적인 측면과 기능의 디테일을 따라가는게 어려울뿐이다.  
8. [Tetris](https://yoonjonglyu.github.io/js-util/tetris/) : 테트리스 기본적인 이동과 회전, 그리고 점수 와 랭킹 정도 간단한 기능만 만들었다. canvas를 사용하지 않고 순수하게 js dom 조작만을 통해서 게임을 만들었는데 만들면서 테트리스에 대해서 알아보니 겉모습과 다르게 상당히 섬세하고 복잡한 게임이라는 점을 느꼈다.  
9. [Store](https://yoonjonglyu.github.io/js-util/store/) : 상태관리 전역 스토어를 간단하게 구현 해본 내용 옵저버 패턴을 참고 해서 구현했다. react 의 useSelector, dispatch, useState 훅 인터페이스를 모방했다. v-dom방식이 아니다보니 watch(구독)을 수동으로 또 중복 실행에 대한 처리를 수동으로 처리해야한다는게 단점. 추후 개선방안이 나오면 수정할 예정이다.  
10. [SwipeSlide](https://yoonjonglyu.github.io/js-util/swipeSlide/) : 스와이프 기능과 슬라이드 기능을 간단하게 구현 해본 내용이다.
데스크탑과 모바일에서의 스와이프 액션과 반응형에 따른 리사이즈 이벤트 그리고 플립액션 + 간단한 자동 슬라이드 기능.
11. [logger](https://yoonjonglyu.github.io/js-util/logger/) : 프론트엔드 로그 기능에 대한 고민 간단한 시도.  

  
## LICENSE
- MIT

## author
- Isa(류윤종)