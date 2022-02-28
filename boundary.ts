import p5, { Vector } from "p5";

class Boundary {
  a: Vector;
  b: Vector;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.a = new Vector(x1, y1);
    this.b = new Vector(x2, y2);
  }

  show(s: p5) {
    s.stroke(255);
    s.line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

export default Boundary;
