import { HexBlob, OffsetCoord, DoubledCoord, Layout, Point } from "./HexBlob";

describe("HexBlob", () => {
    it("testHexBlobArithmetic", () => {
        equalHexBlob("hex_add", new HexBlob(4, -10, 6), new HexBlob(1, -3, 2).add(new HexBlob(3, -7, 4)));
        equalHexBlob("hex_subtract", new HexBlob(-2, 4, -2), new HexBlob(1, -3, 2).subtract(new HexBlob(3, -7, 4)));
    });

    it("testHexBlobDirection", () => {
        equalHexBlob("hex_direction", new HexBlob(0, -1, 1), HexBlob.direction(2));
    });

    it("testHexBlobNeighbor", () => {
        equalHexBlob("hex_neighbor", new HexBlob(1, -3, 2), new HexBlob(1, -2, 1).neighbor(2));
    });

    it("testHexBlobDiagonal", () => {
        equalHexBlob("hex_diagonal", new HexBlob(-1, -1, 2), new HexBlob(1, -2, 1).diagonalNeighbor(3));
    });

    it("testHexBlobDistance", () => {
        equalInt("hex_distance", 7, new HexBlob(3, -7, 4).distance(new HexBlob(0, 0, 0)));
    });

    it("testHexBlobRotateRight", () => {
        equalHexBlob("hex_rotate_right", new HexBlob(1, -3, 2).rotateRight(), new HexBlob(3, -2, -1));
    });

    it("testHexBlobRotateLeft", () => {
        equalHexBlob("hex_rotate_left", new HexBlob(1, -3, 2).rotateLeft(), new HexBlob(-2, -1, 3));
    });

    it("testHexBlobRound", () => {
        const a: HexBlob = new HexBlob(0.0, 0.0, 0.0);
        const b: HexBlob = new HexBlob(1.0, -1.0, 0.0);
        const c: HexBlob = new HexBlob(0.0, -1.0, 1.0);
        equalHexBlob(
            "hex_round 1",
            new HexBlob(5, -10, 5),
            new HexBlob(0.0, 0.0, 0.0).lerp(new HexBlob(10.0, -20.0, 10.0), 0.5).round()
        );
        equalHexBlob("hex_round 2", a.round(), a.lerp(b, 0.499).round());
        equalHexBlob("hex_round 3", b.round(), a.lerp(b, 0.501).round());
        equalHexBlob(
            "hex_round 4",
            a.round(),
            new HexBlob(
                a.q * 0.4 + b.q * 0.3 + c.q * 0.3,
                a.r * 0.4 + b.r * 0.3 + c.r * 0.3,
                a.s * 0.4 + b.s * 0.3 + c.s * 0.3
            ).round()
        );
        equalHexBlob(
            "hex_round 5",
            c.round(),
            new HexBlob(
                a.q * 0.3 + b.q * 0.3 + c.q * 0.4,
                a.r * 0.3 + b.r * 0.3 + c.r * 0.4,
                a.s * 0.3 + b.s * 0.3 + c.s * 0.4
            ).round()
        );
    });

    it("testHexBlobLinedraw", () => {
        equalHexBlobArray(
            "hex_linedraw",
            [
                new HexBlob(0, 0, 0),
                new HexBlob(0, -1, 1),
                new HexBlob(0, -2, 2),
                new HexBlob(1, -3, 2),
                new HexBlob(1, -4, 3),
                new HexBlob(1, -5, 4),
            ],
            new HexBlob(0, 0, 0).linedraw(new HexBlob(1, -5, 4))
        );
    });

    it("testLayout", () => {
        const h: HexBlob = new HexBlob(3, 4, -7);
        const flat: Layout = new Layout(Layout.flat, new Point(10.0, 15.0), new Point(35.0, 71.0));
        equalHexBlob("layout", h, flat.pixelToHexBlob(flat.hexToPixel(h)).round());
        const pointy: Layout = new Layout(Layout.pointy, new Point(10.0, 15.0), new Point(35.0, 71.0));
        equalHexBlob("layout", h, pointy.pixelToHexBlob(pointy.hexToPixel(h)).round());
    });

    it("testOffsetRoundtrip", () => {
        const a: HexBlob = new HexBlob(3, 4, -7);
        const b: OffsetCoord = new OffsetCoord(1, -3);
        equalHexBlob(
            "conversion_roundtrip even-q",
            a,
            OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, a))
        );
        equalOffsetcoord(
            "conversion_roundtrip even-q",
            b,
            OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, b))
        );
        equalHexBlob(
            "conversion_roundtrip odd-q",
            a,
            OffsetCoord.qoffsetToCube(OffsetCoord.ODD, OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, a))
        );
        equalOffsetcoord(
            "conversion_roundtrip odd-q",
            b,
            OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, OffsetCoord.qoffsetToCube(OffsetCoord.ODD, b))
        );
        equalHexBlob(
            "conversion_roundtrip even-r",
            a,
            OffsetCoord.roffsetToCube(OffsetCoord.EVEN, OffsetCoord.roffsetFromCube(OffsetCoord.EVEN, a))
        );
        equalOffsetcoord(
            "conversion_roundtrip even-r",
            b,
            OffsetCoord.roffsetFromCube(OffsetCoord.EVEN, OffsetCoord.roffsetToCube(OffsetCoord.EVEN, b))
        );
        equalHexBlob(
            "conversion_roundtrip odd-r",
            a,
            OffsetCoord.roffsetToCube(OffsetCoord.ODD, OffsetCoord.roffsetFromCube(OffsetCoord.ODD, a))
        );
        equalOffsetcoord(
            "conversion_roundtrip odd-r",
            b,
            OffsetCoord.roffsetFromCube(OffsetCoord.ODD, OffsetCoord.roffsetToCube(OffsetCoord.ODD, b))
        );
    });

    it("testOffsetFromCube", () => {
        equalOffsetcoord(
            "offset_from_cube even-q",
            new OffsetCoord(1, 3),
            OffsetCoord.qoffsetFromCube(OffsetCoord.EVEN, new HexBlob(1, 2, -3))
        );
        equalOffsetcoord(
            "offset_from_cube odd-q",
            new OffsetCoord(1, 2),
            OffsetCoord.qoffsetFromCube(OffsetCoord.ODD, new HexBlob(1, 2, -3))
        );
    });

    it("testOffsetToCube", () => {
        equalHexBlob(
            "offset_to_cube even-",
            new HexBlob(1, 2, -3),
            OffsetCoord.qoffsetToCube(OffsetCoord.EVEN, new OffsetCoord(1, 3))
        );
        equalHexBlob(
            "offset_to_cube odd-q",
            new HexBlob(1, 2, -3),
            OffsetCoord.qoffsetToCube(OffsetCoord.ODD, new OffsetCoord(1, 2))
        );
    });

    it("testDoubledRoundtrip", () => {
        const a: HexBlob = new HexBlob(3, 4, -7);
        const b: DoubledCoord = new DoubledCoord(1, -3);
        equalHexBlob("conversion_roundtrip doubled-q", a, DoubledCoord.qdoubledFromCube(a).qdoubledToCube());
        equalDoubledcoord("conversion_roundtrip doubled-q", b, DoubledCoord.qdoubledFromCube(b.qdoubledToCube()));
        equalHexBlob("conversion_roundtrip doubled-r", a, DoubledCoord.rdoubledFromCube(a).rdoubledToCube());
        equalDoubledcoord("conversion_roundtrip doubled-r", b, DoubledCoord.rdoubledFromCube(b.rdoubledToCube()));
    });

    it("testDoubledFromCube", () => {
        equalDoubledcoord(
            "doubled_from_cube doubled-q",
            new DoubledCoord(1, 5),
            DoubledCoord.qdoubledFromCube(new HexBlob(1, 2, -3))
        );
        equalDoubledcoord(
            "doubled_from_cube doubled-r",
            new DoubledCoord(4, 2),
            DoubledCoord.rdoubledFromCube(new HexBlob(1, 2, -3))
        );
    });

    it("testDoubledToCube", () => {
        equalHexBlob("doubled_to_cube doubled-q", new HexBlob(1, 2, -3), new DoubledCoord(1, 5).qdoubledToCube());
        equalHexBlob("doubled_to_cube doubled-r", new HexBlob(1, 2, -3), new DoubledCoord(4, 2).rdoubledToCube());
    });

    function equalHexBlob(name: string, a: HexBlob, b: HexBlob): void {
        expect(a.q === b.q && a.s === b.s && a.r === b.r).toBeTrue();
    }

    function equalOffsetcoord(name: string, a: OffsetCoord, b: OffsetCoord): void {
        expect(a.col === b.col && a.row === b.row).toBeTrue();
    }

    function equalDoubledcoord(name: string, a: DoubledCoord, b: DoubledCoord): void {
        expect(a.col === b.col && a.row === b.row).toBeTrue();
    }

    function equalInt(name: string, a: number, b: number): void {
        expect(a === b).toBeTrue();
    }

    function equalHexBlobArray(name: string, a: HexBlob[], b: HexBlob[]): void {
        equalInt(name, a.length, b.length);
        for (let i = 0; i < a.length; i++) {
            equalHexBlob(name, a[i], b[i]);
        }
    }
});
