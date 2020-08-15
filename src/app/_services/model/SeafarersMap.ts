import { Hex } from "./Hex";
import { Terrain } from "./Terrain";
import { HexBlob, OffsetCoord } from "./HexBlob";

export class SeafarersMap {
    private hexes: Hex[][];

    constructor() {
        this.hexes = this.createBlankHexMap();
    }

    public listNeighbors(hex: Hex): Hex[] {
        const neighbors: Hex[] = new Array<Hex>();
        const convertedHex: HexBlob = this.convertHexCoordsToHexBlobCube(hex);
        for (let i = 0; i < HexBlob.directions.length; i++) {
            const neighbor: HexBlob = convertedHex.neighbor(i);
            const deconvertedNeighbor: Hex = this.convertHexBlobToHexCoords(neighbor);
            if (this.isWithinBounds(deconvertedNeighbor)) {
                neighbors.push(this.hexes[deconvertedNeighbor.getRow()][deconvertedNeighbor.getCol()]);
            }
        }
        return neighbors;
    }

    private isWithinBounds(hex: Hex): boolean {
        if (hex.getRow() < 0 || hex.getCol() < 0) {
            return false;
        } else if (hex.getRow() > 12 || hex.getCol() > 3) {
            return false;
        } else {
            return true;
        }
    }

    private convertHexCoordsToHexBlobCube(hex: Hex): HexBlob {
        let qStart: number = 0;
        if (hex.getRow() === 0 || hex.getRow() === 12) {
            qStart = -1;
        } else if (this.isEven(hex.getRow())) {
            qStart = -3;
        } else {
            qStart = -2;
        }
        const q: number = qStart + hex.getCol() * 2;
        let rStart: number = 0;
        if (hex.getRow() === 0) {
            rStart = 0;
        } else if (hex.getRow() === 1) {
            rStart = 1;
        } else if (hex.getRow() === 2 || hex.getRow() === 3) {
            rStart = 2;
        } else if (hex.getRow() === 4 || hex.getRow() === 5) {
            rStart = 3;
        } else if (hex.getRow() === 6 || hex.getRow() === 7) {
            rStart = 4;
        } else if (hex.getRow() === 8 || hex.getRow() === 9) {
            rStart = 5;
        } else if (hex.getRow() === 10 || hex.getRow() === 11) {
            rStart = 6;
        } else if (hex.getRow() === 12) {
            rStart = 6;
        }
        const r: number = rStart - hex.getCol();
        return new HexBlob(q, r, -q - r);
    }

    private convertHexBlobToHexCoords(hexBlob: HexBlob): Hex {
        const q: number = hexBlob.q;
        const r: number = hexBlob.r;
        const row: number = this.figureOutRow(q, r);
        const col: number = this.figureOutCol(q, r);
        if (this.isWithinBounds(new Hex(row, col))) {
            return this.getHex(row, col);
        } else {
            return new Hex(-1, -1);
        }
    }

    private figureOutRow(q: number, r: number): number {
        if (q === -1 && r === 0) {
            return 0;
        } else if (q === 1 && r === -1) {
            return 0;
        } else if (q === -1 && r === 6) {
            return 12;
        } else if (q === 1 && r === 5) {
            return 12;
        }
        let row: number = -1;
        const col: number = this.figureOutCol(q, r);
        const rStart: number = r + col;
        if (rStart === 1) {
            return 1;
        } else if (rStart === 2) {
            if (this.isEven(q)) {
                return 3;
            } else {
                return 2;
            }
        } else if (rStart === 3) {
            if (this.isEven(q)) {
                return 5;
            } else {
                return 4;
            }
        } else if (rStart === 4) {
            if (this.isEven(q)) {
                return 7;
            } else {
                return 6;
            }
        } else if (rStart === 5) {
            if (this.isEven(q)) {
                return 9;
            } else {
                return 8;
            }
        } else if (rStart === 6) {
            if (this.isEven(q)) {
                return 11;
            } else {
                return 10;
            }
        }
        return row;
    }

    private figureOutCol(q: number, r: number): number {
        if (q === -1 && r === 0) {
            return 0;
        } else if (q === 1 && r === -1) {
            return 1;
        } else if (q === -1 && r === 6) {
            return 0;
        } else if (q === 1 && r === 5) {
            return 1;
        }
        let col: number = -1;
        if (this.isEven(q)) {
            // if q is even, that means the row is odd
            if (q === -2) {
                col = 0;
            } else if (q === 0) {
                col = 1;
            } else if (q === 2) {
                col = 2;
            }
        } else {
            // if q is odd, that means the row is even
            if (q === -3) {
                col = 0;
            } else if (q === -1) {
                col = 1;
            } else if (q === 1) {
                col = 2;
            } else if (q === 3) {
                col = 3;
            }
        }
        return col;
    }

    private isEven(x: number): boolean {
        return x % 2 === 0;
    }

    private isSpecialRow(row: number): boolean {
        return row === 0 || row === 12;
    }

    // // "odd" row means a row with three hexes
    // private isOddRow(row: number): boolean {
    //     return row === 3 || row === 5 || row === 7 || row === 9;
    // }

    // // "even" row means a row with four hexes
    // private isEvenRow(row: number): boolean {
    //     return row === 2 || row === 4 || row === 6 || row === 8 || row === 10;
    // }

    private createBlankHexMap(): Hex[][] {
        const blankMap: Hex[][] = new Array<Array<Hex>>(13);
        blankMap[0] = new Array<Hex>(2);
        blankMap[1] = new Array<Hex>(3);
        blankMap[2] = new Array<Hex>(4);
        blankMap[3] = new Array<Hex>(3);
        blankMap[4] = new Array<Hex>(4);
        blankMap[5] = new Array<Hex>(3);
        blankMap[6] = new Array<Hex>(4);
        blankMap[7] = new Array<Hex>(3);
        blankMap[8] = new Array<Hex>(4);
        blankMap[9] = new Array<Hex>(3);
        blankMap[10] = new Array<Hex>(4);
        blankMap[11] = new Array<Hex>(3);
        blankMap[12] = new Array<Hex>(2);
        for (let row = 0; row < blankMap.length; row++) {
            for (let col = 0; col < blankMap[row].length; col++) {
                blankMap[row][col] = new Hex(row, col, Terrain.Empty);
            }
        }
        return blankMap;
    }

    public setHex(hex: Hex): void {
        this.hexes[hex.getRow()][hex.getCol()] = hex;
    }

    public setHexTerrain(row: number, col: number, terrain: Terrain): void {
        this.hexes[row][col].setTerrain(terrain);
    }

    public setHexDiceNumber(row: number, col: number, diceNumber: number): void {
        this.hexes[row][col].setDiceNumber(diceNumber);
    }

    public getHex(row: number, col: number): Hex {
        return this.hexes[row][col];
    }

    public getRows(): Hex[][] {
        return this.hexes;
    }

    public getRow(row: number): Hex[] {
        return this.hexes[row];
    }
}
