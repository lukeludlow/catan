export class Hex {
    private terrain: string;
    private diceNumber: number;

    constructor(terrain: string = "", diceNumber: number = 0) {
        this.terrain = terrain;
        this.diceNumber = diceNumber;
    }

    public getTerrain(): string {
        return this.terrain;
    }

    public setTerrain(terrain: string): void {
        this.terrain = terrain;
    }

    public getDiceNumber(): number {
        return this.diceNumber;
    }

    public setDiceNumber(diceNumber: number): void {
        this.diceNumber = diceNumber;
    }
}
