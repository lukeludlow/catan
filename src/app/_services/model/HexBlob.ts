// Generated code -- CC0 -- No Rights Reserved -- http://www.redblobgames.com/grids/hexagons/

export class Point {
    constructor(public x: number, public y: number) {}
}

export class HexBlob {
    constructor(public q: number, public r: number, public s: number) {
        if (Math.round(q + r + s) !== 0) {
            throw new Error("q + r + s must be 0");
        }
    }
    public static directions: HexBlob[] = [
        new HexBlob(1, 0, -1),
        new HexBlob(1, -1, 0),
        new HexBlob(0, -1, 1),
        new HexBlob(-1, 0, 1),
        new HexBlob(-1, 1, 0),
        new HexBlob(0, 1, -1),
    ];

    public static diagonals: HexBlob[] = [
        new HexBlob(2, -1, -1),
        new HexBlob(1, -2, 1),
        new HexBlob(-1, -1, 2),
        new HexBlob(-2, 1, 1),
        new HexBlob(-1, 2, -1),
        new HexBlob(1, 1, -2),
    ];

    public static direction(direction: number): HexBlob {
        return HexBlob.directions[direction];
    }

    public add(b: HexBlob): HexBlob {
        return new HexBlob(this.q + b.q, this.r + b.r, this.s + b.s);
    }

    public subtract(b: HexBlob): HexBlob {
        return new HexBlob(this.q - b.q, this.r - b.r, this.s - b.s);
    }

    public scale(k: number): HexBlob {
        return new HexBlob(this.q * k, this.r * k, this.s * k);
    }

    public rotateLeft(): HexBlob {
        return new HexBlob(-this.s, -this.q, -this.r);
    }

    public rotateRight(): HexBlob {
        return new HexBlob(-this.r, -this.s, -this.q);
    }

    public neighbor(direction: number): HexBlob {
        return this.add(HexBlob.direction(direction));
    }

    public diagonalNeighbor(direction: number): HexBlob {
        return this.add(HexBlob.diagonals[direction]);
    }

    public len(): number {
        return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
    }

    public distance(b: HexBlob): number {
        return this.subtract(b).len();
    }

    public round(): HexBlob {
        let qi: number = Math.round(this.q);
        let ri: number = Math.round(this.r);
        let si: number = Math.round(this.s);
        const qDiff: number = Math.abs(qi - this.q);
        const rDiff: number = Math.abs(ri - this.r);
        const sDiff: number = Math.abs(si - this.s);
        if (qDiff > rDiff && qDiff > sDiff) {
            qi = -ri - si;
        } else if (rDiff > sDiff) {
            ri = -qi - si;
        } else {
            si = -qi - ri;
        }
        return new HexBlob(qi, ri, si);
    }

    public lerp(b: HexBlob, t: number): HexBlob {
        return new HexBlob(this.q * (1.0 - t) + b.q * t, this.r * (1.0 - t) + b.r * t, this.s * (1.0 - t) + b.s * t);
    }

    public linedraw(b: HexBlob): HexBlob[] {
        const N: number = this.distance(b);
        const aNudge: HexBlob = new HexBlob(this.q + 1e-6, this.r + 1e-6, this.s - 2e-6);
        const bNudge: HexBlob = new HexBlob(b.q + 1e-6, b.r + 1e-6, b.s - 2e-6);
        const results: HexBlob[] = [];
        const step: number = 1.0 / Math.max(N, 1);
        for (let i = 0; i <= N; i++) {
            results.push(aNudge.lerp(bNudge, step * i).round());
        }
        return results;
    }
}

export class OffsetCoord {
    constructor(public col: number, public row: number) {}
    public static EVEN: number = 1;
    public static ODD: number = -1;

    public static qoffsetFromCube(offset: number, h: HexBlob): OffsetCoord {
        var col: number = h.q;
        var row: number = h.r + (h.q + offset * (h.q & 1)) / 2;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw new Error("offset must be EVEN (+1) or ODD (-1)");
        }
        return new OffsetCoord(col, row);
    }

    public static qoffsetToCube(offset: number, h: OffsetCoord): HexBlob {
        var q: number = h.col;
        var r: number = h.row - (h.col + offset * (h.col & 1)) / 2;
        var s: number = -q - r;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw new Error("offset must be EVEN (+1) or ODD (-1)");
        }
        return new HexBlob(q, r, s);
    }

    public static roffsetFromCube(offset: number, h: HexBlob): OffsetCoord {
        var col: number = h.q + (h.r + offset * (h.r & 1)) / 2;
        var row: number = h.r;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw new Error("offset must be EVEN (+1) or ODD (-1)");
        }
        return new OffsetCoord(col, row);
    }

    public static roffsetToCube(offset: number, h: OffsetCoord): HexBlob {
        var q: number = h.col - (h.row + offset * (h.row & 1)) / 2;
        var r: number = h.row;
        var s: number = -q - r;
        if (offset !== OffsetCoord.EVEN && offset !== OffsetCoord.ODD) {
            throw "offset must be EVEN (+1) or ODD (-1)";
        }
        return new HexBlob(q, r, s);
    }
}

export class DoubledCoord {
    constructor(public col: number, public row: number) {}

    public static qdoubledFromCube(h: HexBlob): DoubledCoord {
        var col: number = h.q;
        var row: number = 2 * h.r + h.q;
        return new DoubledCoord(col, row);
    }

    public qdoubledToCube(): HexBlob {
        var q: number = this.col;
        var r: number = (this.row - this.col) / 2;
        var s: number = -q - r;
        return new HexBlob(q, r, s);
    }

    public static rdoubledFromCube(h: HexBlob): DoubledCoord {
        var col: number = 2 * h.q + h.r;
        var row: number = h.r;
        return new DoubledCoord(col, row);
    }

    public rdoubledToCube(): HexBlob {
        var q: number = (this.col - this.row) / 2;
        var r: number = this.row;
        var s: number = -q - r;
        return new HexBlob(q, r, s);
    }
}

export class Orientation {
    constructor(
        public f0: number,
        public f1: number,
        public f2: number,
        public f3: number,
        public b0: number,
        public b1: number,
        public b2: number,
        public b3: number,
        public start_angle: number
    ) {}
}

export class Layout {
    constructor(public orientation: Orientation, public size: Point, public origin: Point) {}
    public static pointy: Orientation = new Orientation(
        Math.sqrt(3.0),
        Math.sqrt(3.0) / 2.0,
        0.0,
        3.0 / 2.0,
        Math.sqrt(3.0) / 3.0,
        -1.0 / 3.0,
        0.0,
        2.0 / 3.0,
        0.5
    );
    public static flat: Orientation = new Orientation(
        3.0 / 2.0,
        0.0,
        Math.sqrt(3.0) / 2.0,
        Math.sqrt(3.0),
        2.0 / 3.0,
        0.0,
        -1.0 / 3.0,
        Math.sqrt(3.0) / 3.0,
        0.0
    );

    public hexToPixel(h: HexBlob): Point {
        var M: Orientation = this.orientation;
        var size: Point = this.size;
        var origin: Point = this.origin;
        var x: number = (M.f0 * h.q + M.f1 * h.r) * size.x;
        var y: number = (M.f2 * h.q + M.f3 * h.r) * size.y;
        return new Point(x + origin.x, y + origin.y);
    }

    public pixelToHexBlob(p: Point): HexBlob {
        var M: Orientation = this.orientation;
        var size: Point = this.size;
        var origin: Point = this.origin;
        var pt: Point = new Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
        var q: number = M.b0 * pt.x + M.b1 * pt.y;
        var r: number = M.b2 * pt.x + M.b3 * pt.y;
        return new HexBlob(q, r, -q - r);
    }

    public hexCornerOffset(corner: number): Point {
        var M: Orientation = this.orientation;
        var size: Point = this.size;
        var angle: number = (2.0 * Math.PI * (M.start_angle - corner)) / 6.0;
        return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
    }

    public polygonCorners(h: HexBlob): Point[] {
        var corners: Point[] = [];
        var center: Point = this.hexToPixel(h);
        for (var i = 0; i < 6; i++) {
            var offset: Point = this.hexCornerOffset(i);
            corners.push(new Point(center.x + offset.x, center.y + offset.y));
        }
        return corners;
    }
}
