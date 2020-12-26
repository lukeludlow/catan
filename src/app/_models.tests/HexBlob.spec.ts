import { HexBlob, OffsetCoord, Point } from "../_models/HexBlob";

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

    function equalHexBlob(name: string, a: HexBlob, b: HexBlob): void {
        expect(a.q === b.q && a.s === b.s && a.r === b.r).toBeTrue();
    }

    function equalOffsetcoord(name: string, a: OffsetCoord, b: OffsetCoord): void {
        expect(a.col === b.col && a.row === b.row).toBeTrue();
    }

    function equalInt(name: string, a: number, b: number): void {
        expect(a === b).toBeTrue();
    }
});
