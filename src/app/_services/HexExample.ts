export class HexExample {
    constructor(public q: number, public r: number, public s: number) {
        if (Math.round(q + r + s) !== 0) throw "q + r + s must be 0";
    }

    public add(b: HexExample): HexExample {
        return new HexExample(this.q + b.q, this.r + b.r, this.s + b.s);
    }

    public subtract(b: HexExample): HexExample {
        return new HexExample(this.q - b.q, this.r - b.r, this.s - b.s);
    }

    public scale(k: number): HexExample {
        return new HexExample(this.q * k, this.r * k, this.s * k);
    }

    public rotateLeft(): HexExample {
        return new HexExample(-this.s, -this.q, -this.r);
    }

    public rotateRight(): HexExample {
        return new HexExample(-this.r, -this.s, -this.q);
    }

    public static directions: HexExample[] = [
        new HexExample(1, 0, -1),
        new HexExample(1, -1, 0),
        new HexExample(0, -1, 1),
        new HexExample(-1, 0, 1),
        new HexExample(-1, 1, 0),
        new HexExample(0, 1, -1),
    ];

    public static direction(direction: number): HexExample {
        return HexExample.directions[direction];
    }

    public neighbor(direction: number): HexExample {
        return this.add(HexExample.direction(direction));
    }

    public static diagonals: HexExample[] = [
        new HexExample(2, -1, -1),
        new HexExample(1, -2, 1),
        new HexExample(-1, -1, 2),
        new HexExample(-2, 1, 1),
        new HexExample(-1, 2, -1),
        new HexExample(1, 1, -2),
    ];

    public diagonalNeighbor(direction: number): HexExample {
        return this.add(HexExample.diagonals[direction]);
    }

    public len(): number {
        return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
    }

    public distance(b: HexExample): number {
        return this.subtract(b).len();
    }

    public round(): HexExample {
        var qi: number = Math.round(this.q);
        var ri: number = Math.round(this.r);
        var si: number = Math.round(this.s);
        var q_diff: number = Math.abs(qi - this.q);
        var r_diff: number = Math.abs(ri - this.r);
        var s_diff: number = Math.abs(si - this.s);
        if (q_diff > r_diff && q_diff > s_diff) {
            qi = -ri - si;
        } else if (r_diff > s_diff) {
            ri = -qi - si;
        } else {
            si = -qi - ri;
        }
        return new HexExample(qi, ri, si);
    }

    public lerp(b: HexExample, t: number): HexExample {
        return new HexExample(
            this.q * (1.0 - t) + b.q * t,
            this.r * (1.0 - t) + b.r * t,
            this.s * (1.0 - t) + b.s * t
        );
    }

    public linedraw(b: HexExample): HexExample[] {
        var N: number = this.distance(b);
        var a_nudge: HexExample = new HexExample(this.q + 1e-6, this.r + 1e-6, this.s - 2e-6);
        var b_nudge: HexExample = new HexExample(b.q + 1e-6, b.r + 1e-6, b.s - 2e-6);
        var results: HexExample[] = [];
        var step: number = 1.0 / Math.max(N, 1);
        for (var i = 0; i <= N; i++) {
            results.push(a_nudge.lerp(b_nudge, step * i).round());
        }
        return results;
    }
}
