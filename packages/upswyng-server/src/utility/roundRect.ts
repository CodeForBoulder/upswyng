/**
 * Creates a canvas filled with a 45-degree pinstripe.
 *
 * https://stackoverflow.com/questions/32201479/continuous-hatch-line-needed-in-canvas-with-repeated-pattern
 *
 * @return the filled HTMLCanvasElement.
 */
function createPinstripeCanvas(width, height, color: string) {
  const patternCanvas = document.createElement("canvas");
  const pctx: CanvasRenderingContext2D = patternCanvas.getContext("2d", {
    antialias: true,
  }) as CanvasRenderingContext2D;

  const DIVISIONS = 4;

  patternCanvas.width = width;
  patternCanvas.height = height;
  pctx.fillStyle = color;

  // Top line
  pctx.beginPath();
  pctx.moveTo(0, height * (1 / DIVISIONS));
  pctx.lineTo(width * (1 / DIVISIONS), 0);
  pctx.lineTo(0, 0);
  pctx.lineTo(0, height * (1 / DIVISIONS));
  pctx.fill();

  // Middle line
  pctx.beginPath();
  pctx.moveTo(width, height * (1 / DIVISIONS));
  pctx.lineTo(width * (1 / DIVISIONS), height);
  pctx.lineTo(0, height);
  pctx.lineTo(0, height * ((DIVISIONS - 1) / DIVISIONS));
  pctx.lineTo(width * ((DIVISIONS - 1) / DIVISIONS), 0);
  pctx.lineTo(width, 0);
  pctx.lineTo(width, height * (1 / DIVISIONS));
  pctx.fill();

  // Bottom line
  pctx.beginPath();
  pctx.moveTo(width, height * ((DIVISIONS - 1) / DIVISIONS));
  pctx.lineTo(width * ((DIVISIONS - 1) / DIVISIONS), height);
  pctx.lineTo(width, height);
  pctx.lineTo(width, height * ((DIVISIONS - 1) / DIVISIONS));
  pctx.fill();

  return patternCanvas;
}

function drawRoundedSquarePath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: { tl: number; tr: number; br: number; bl: number }
) {
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  );
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 *
 * https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
export default function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number | { tl: number; tr: number; br: number; bl: number } | "full",
  fill: boolean,
  stroke: boolean,
  stripeColor: string | null = null
) {
  if (typeof stroke === "undefined") {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  if (typeof radius === "number") {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  }
  if (radius === "full") {
    radius = { tl: height / 2, tr: height / 2, br: height / 2, bl: height / 2 };
  } else {
    const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (const side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  drawRoundedSquarePath(ctx, x, y, width, height, radius); // background color
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

  if (stripeColor) {
    ctx.restore();
    ctx.save();
    const p = createPinstripeCanvas(32, 32, stripeColor);
    ctx.fillStyle = ctx.createPattern(p, "repeat");
    drawRoundedSquarePath(ctx, x, y, width, height, radius);
    ctx.fill();
  }
}
