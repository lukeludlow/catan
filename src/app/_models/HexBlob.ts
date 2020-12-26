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
            throw new Error("offset must be EVEN (+1) or ODD (-1)");
        }
        return new HexBlob(q, r, s);
    }
}
