import React, { useEffect, useRef } from "react";

function CustomCursor() {
  const canvasRef = useRef(null);
  const mouseMoved = useRef(false);

  const pointer = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const params = {
    pointsNumber: 40,
    widthFactor: 0.3,
    mouseThreshold: 0.6,
    spring: 0.4,
    friction: 0.5,
  };

  const trail = useRef(
    new Array(params.pointsNumber).fill().map(() => ({
      x: pointer.current.x,
      y: pointer.current.y,
      dx: 0,
      dy: 0,
    }))
  );

  // Update mouse position
  const updateMousePosition = (x, y) => {
    pointer.current.x = x;
    pointer.current.y = y;
  };

  // Animate trail
  const update = (t, ctx, canvas) => {
    if (!mouseMoved.current) {
      pointer.current.x =
        (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
        window.innerWidth;
      pointer.current.y =
        (0.5 +
          0.2 * Math.cos(0.005 * t) +
          0.1 * Math.cos(0.01 * t)) *
        window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    trail.current.forEach((p, idx) => {
      const prev = idx === 0 ? pointer.current : trail.current[idx - 1];
      const spring = idx === 0 ? 0.4 * params.spring : params.spring;

      p.dx += (prev.x - p.x) * spring;
      p.dy += (prev.y - p.y) * spring;
      p.dx *= params.friction;
      p.dy *= params.friction;
      p.x += p.dx;
      p.y += p.dy;
    });

    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(trail.current[0].x, trail.current[0].y);

    for (let i = 1; i < trail.current.length - 1; i++) {
      const xc = 0.5 * (trail.current[i].x + trail.current[i + 1].x);
      const yc = 0.5 * (trail.current[i].y + trail.current[i + 1].y);
      ctx.quadraticCurveTo(trail.current[i].x, trail.current[i].y, xc, yc);
      ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
      ctx.stroke();
    }
    ctx.lineTo(
      trail.current[trail.current.length - 1].x,
      trail.current[trail.current.length - 1].y
    );
    ctx.stroke();

    requestAnimationFrame((time) => update(time, ctx, canvas));
  };

  // Setup canvas
  const setupCanvas = (canvas) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    setupCanvas(canvas);

    const moveHandler = (e) => {
      mouseMoved.current = true;
      updateMousePosition(e.pageX, e.pageY);
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("touchmove", (e) => {
      mouseMoved.current = true;
      updateMousePosition(
        e.targetTouches[0].pageX,
        e.targetTouches[0].pageY
      );
    });
    window.addEventListener("resize", () => setupCanvas(canvas));

    requestAnimationFrame((time) => update(time, ctx, canvas));

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("resize", () => setupCanvas(canvas));
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
    ></canvas>
  );
}

export default CustomCursor;
