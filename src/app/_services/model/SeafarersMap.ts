import { Hex } from "./Hex";
import { Terrain } from "./Terrain";

export class SeafarersMap {
    private hexes: Hex[][];

    constructor() {
        this.hexes = this.createBlankHexMap();
    }

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
