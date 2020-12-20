import { Terrain } from "./Terrain";
import { Port } from "./Port";

export class Hex {
    private terrain: Terrain;
    private diceNumber: number;
    private row: number;
    private col: number;
    private port: Port;

    constructor(row: number, col: number, terrain: Terrain = Terrain.Empty, diceNumber: number = 0, port?: Port) {
        this.terrain = terrain;
        this.diceNumber = diceNumber;
        this.row = row;
        this.col = col;
        this.port = port;
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

    public getPort(): Port {
        return this.port;
    }

    public setPort(port: Port): void {
        this.port = port;
    }

    public hasTerrain(): boolean {
        if (this.terrain === Terrain.Empty || this.terrain === Terrain.Sea) {
            return false;
        } else {
            return true;
        }
    }
}
