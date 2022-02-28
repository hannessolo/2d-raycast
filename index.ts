import Boundary from "./boundary";
import p5, { Vector } from "p5";
import Ray from "./ray";
import intersect from "./lineIntersection";

new p5((s: p5) => {
  let walls: Boundary[] = [];
  let ray: Ray;

  s.setup = function () {
    const width = 400;
    s.createCanvas(width, width);

    // Create border
    walls.push(new Boundary(0, 0, 0, width));
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(0, width, width, width));
    walls.push(new Boundary(width, 0, width, width));

    // Add random walls
    walls.push(new Boundary(s.random() * 400, 100, s.random() * 400, 300));
    walls.push(new Boundary(300, s.random() * 400, 300, s.random() * 400));
    walls.push(new Boundary(300, 100, s.random() * 400, s.random() * 400));
    walls.push(new Boundary(s.random() * 400, 100, 300, s.random() * 400));

    ray = new Ray(100, 100);
  };

  s.draw = function () {
    s.background(0);

    ray.pos = new Vector(s.mouseX, s.mouseY);

    // FlatMap the vertices
    const vertices = walls.map((wall) => [wall.a, wall.b]).reduce((a, b) => a.concat(b));

    for (let i = 0; i < walls.length; i++) {
      for (let j = i + 1; j < walls.length; j++) {
        const intersection = intersect(walls[i], walls[j]);
        if (intersection != null) {
          vertices.push(intersection);
        }
      }
    }

    const unitX = new Vector(1, 0);
    vertices.sort((a, b) => unitX.angleBetween(Vector.sub(ray.pos, a)) - unitX.angleBetween(Vector.sub(ray.pos, b)));

    for (let wall of walls) {
      wall.show(s);
    }

    let lightAreaVertex: Vector[] = [];

    function castAndDrawAngle(angle: number): Vector {
      ray.castAngle(angle);
      let intersection = ray.intersect(walls);
      // ray.show(s, intersection);
      return intersection;
    }

    for (let vertex of vertices) {
      const angle = unitX.angleBetween(Vector.sub(vertex, ray.pos));
      lightAreaVertex.push(castAndDrawAngle(angle - 0.001));
      lightAreaVertex.push(castAndDrawAngle(angle));
      lightAreaVertex.push(castAndDrawAngle(angle + 0.001));
    }

    s.beginShape();
    s.fill(255, 255, 224, 200);
    for (let vertex of lightAreaVertex) {
      s.vertex(vertex.x, vertex.y);
    }
    s.endShape();
  };
});
