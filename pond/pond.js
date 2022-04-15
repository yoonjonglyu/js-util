class Pond {
  /**
   * 연못, 빗방울 떨어지면서 동심원, 터치로 동심원 퍼지는거 구현.
   * 물위에 떠있는 사물들(얼음이나 연꽃따위) 움직임 구현 및 그에 따른 동심원 구현.
   * 동심원끼리 충돌해서 상쇄하는거 구현(어려움 예상).
   * 포커스 조정을 통한 관측자 view 핸들링 구현.
   */
  constructor(root) {
    this._root = root;
    this.canvas = new Canvas(this.createCanvas());
  }
  createCanvas() {
    const canvas = document.createElement('canvas');
    this._root.appendChild(canvas);

    return canvas;
  }
}

class Canvas {
  /**
   * canvas 추상 클래스 구현
   */
  constructor(canvas) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
  }

  fillRect(color, xy, size) {
    this._ctx.fillStyle = color;
    this._ctx.fillRect(...xy, ...size);
  }
}
