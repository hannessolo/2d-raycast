import { Vector } from "p5";
import Boundary from "./boundary";

export default function intersect(wallA: Boundary, wallB: Boundary): Vector | null {
  const x1 = wallA.a.x;
  const y1 = wallA.a.y;
  const x2 = wallA.b.x;
  const y2 = wallA.b.y;

  // Positions of the ray
  const x3 = wallB.a.x;
  const y3 = wallB.a.y;
  const x4 = wallB.b.x;
  const y4 = wallB.b.y;

  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (denominator == 0) {
    return null;
  }

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x4)) / denominator;

  if (t > -0.00001 && t < 1.00001 && u > -0.00001 && t < 1.00001) {
    return new Vector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
  }
  return null;
}
