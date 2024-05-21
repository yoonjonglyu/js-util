const loader = new ModuleLoader();
function Main() {
  // 로그 import
  new Logger();
  // ui를 위해서 모듈로더와 styleinjs 모듈 사용
  loader.config({
    baseUrl: '../',
    paths: {
      dom: 'styledInJs/domElements.js',
      styledInJs: 'styledInJs/styledInJs.js',
    },
  });
  loader.require(['styledInJs'], (styled) => {
    const root = document.querySelector('#app');
    const container = styled.div`
      width: 100%;
      height: 200px;
      background: gray;
    `;
    const button = styled.button`
      display: block;
      margin: 0 auto;
    `;
    button.innerHTML = 'Log(console)';

    button.addEventListener('click', (e) => {
      // 이벤트 프로토타입으로 있는 로그 함수 실행으로 로깅
      e.logger(e);
    });
    container.appendChild(button);
    root.appendChild(container);
  });
}

Main();
