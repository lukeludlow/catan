import { Terrain } from "./Terrain";

export class Hex {
    private terrain: Terrain;
    private diceNumber: number;
    private row: number;
    private col: number;

    constructor(row: number, col: number, terrain: Terrain = Terrain.Empty, diceNumber: number = 0) {
        this.terrain = terrain;
        this.diceNumber = diceNumber;
        this.row = row;
        this.col = col;
    }

    public getRow(): number {
        return this.row;
    }

    public setRow(row: number): void {
        this.row = row;
    }

    public getCol(): number {
        return this.col;
    }

    public setCol(col: number): void {
        this.col = col;
    }

    public getTerrain(): Terrain {
        return this.terrain;
    }

    public setTerrain(terrain: Terrain): void {
        this.terrain = terrain;
    }

    public getDiceNumber(): number {
        return this.diceNumber;
    }

    public setDiceNumber(diceNumber: number): void {
        this.diceNumber = diceNumber;
    }
}
