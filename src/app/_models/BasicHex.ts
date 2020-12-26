export class BasicHex {
    row: number;
    col: number;
    diceNumber: number;
    resource: string;
    constructor(row: number, col: number, diceNumber: number, resource: string) {
        this.row = row;
        this.col = col;
        this.diceNumber = diceNumber;
        this.resource = resource;
    }
}
