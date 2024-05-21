class Logger {
  constructor() {
    this._navigator = globalThis.navigator;
    this.setlogger();
  }
  setlogger() {
    const event = globalThis.Event;
    event.prototype.logger = this.logger.bind(this);
  }

  /**
   * @description 결국 로그 데이터를 가공하고, 그걸 어떤방식으로 로그 할 것인가 정도를 따지게될듯. 장단점은 애매하다.
   * @param {any} 로그에 대한 외부입력 props
   */
  logger(e) {
    const agent = this.getAgent();
    const event = {
      type: e.type,
      target: e.srcElement,
    };
    console.log(agent, event, e);
  }

  /**
   * @description 접속자에 관한 정보를 담은 객체를 반환함.
   * @returns Object
   */
  getAgent() {
    const userAgent = this._navigator.userAgent;
    const url = globalThis.location.href;
    const device = this._navigator.userAgentData;

    const browserProps = {
      brand: device.brands[1].brand,
      version: device.brands[1].version,
      base: device.brands[0].brand,
    };

    const DeviceProps = {
      platform: device.platform || 'devlopmode',
    };

    return {
      url: url,
      userAgent,
      browser: browserProps,
      Device: DeviceProps,
    };
  }
}
