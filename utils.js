"use strict";

function point_in_extent(x, y, x0, y0, x1, y1) {
    return ! ( x < x0 || y < y0 || x >= x1 || y >= y1 );
}

function near(a,b) {
    return Math.abs(a - b) <= EPSILON;
}

function point_in_element(x, y, el) {
    return point_in_extent(x, y, el.x00, el.y, el.x + el.w, el.y + el.h);
}

var get_time = (function() {
    if (window.performance) {
        if (window.performance.now)
            return function() { return window.performance.now() }
        if (window.performance.webkitNow)
            return function() { return window.performance.webkitNow() }
    }
    return function() { return new Date().getTime() }
})();

function draw_ellipse_1(ctx, cx, cy, rx, ry) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 45 * Math.PI/180, 0, 2 * Math.PI);
    ctx.stroke();
}

function draw_ellipse_2(context, cx, cy, rx, ry){
    context.save();
    context.beginPath();
    context.translate(cx - rx, cy - ry);
    context.scale(rx, ry);
    context.arc(1, 1, 1, 0, 2 * Math.PI, false);
    context.restore();
    context.stroke();
}

function draw_ellipse_3(ctx, x, y, w, h, color) {
    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle
    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    //ctx.closePath(); // not used correctly, see comments (use to close off open path)
    ctx.fillStyle = 'hsl(' + color + ', 100%, 50%)';
    ctx.fill();
    //ctx.stroke();
}

function draw_ellipse(ctx, x, y, w, h, c) {
    draw_ellipse_3(ctx, x, y, w, h, c);
}

function draw_line(ctx, x0, y0, x1, y1, w, c) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineWidth = w;
    ctx.strokeStyle = c;
    ctx.stroke();
}
