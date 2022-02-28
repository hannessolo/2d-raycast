import p5, { Vector, ANGLE_MODE } from "p5";
import Boundary from "./boundary";

class Ray {
  pos: Vector;
  dir: Vector;

  constructor(x: number, y: number) {
    this.pos = new Vector(x, y);
    this.dir = new Vector(0, 0);
  }

  castTowards(x: number, y: number) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir = this.dir.normalize();
  }

  castAngle(angle: number) {
    this.dir = Vector.fromAngle(angle);
  }

  show(s: p5, to: Vector) {
    s.stroke(255);
    s.push();
    s.translate(this.pos.x, this.pos.y);
    s.line(0, 0, to.x - this.pos.x, to.y - this.pos.y);
    s.strokeWeight(8);
    s.point(0, 0);
    s.pop();

    // s.line(this.pos.x, this.pos.x)
  }

  /**
   * Calculates the intersection point between ray and wall.
   * @param wall The boundary
   * @returns Null if there is no intersection, else the point of intersection
   */
  intersect(walls: Boundary[]): Vector {
    let bestU = 100000;
    let bestVector = new Vector(0, 0);

    for (let wall of walls) {
      // Positions of the wall
      const x1 = wall.a.x;
      const y1 = wall.a.y;
      const x2 = wall.b.x;
      const y2 = wall.b.y;

      // Positions of the ray
      const x3 = this.pos.x;
      const y3 = this.pos.y;
      const x4 = this.pos.x + this.dir.x;
      const y4 = this.pos.y + this.dir.y;

      const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
      const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x4)) / denominator;

      if (t > -0.00001 && t < 1.00001 && u >= 0 && u < bestU) {
        bestVector = new Vector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
        bestU = u;
      }
    }

    return bestVector;
  }
}

export default Ray;
