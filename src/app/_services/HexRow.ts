import { Hex } from "./Hex"

export class HexRow {
    private row: Hex[]

    constructor(length: number) {
        this.row = new Array<Hex>(length)
    }

    public getLength(): number {
        return this.row.length
    }
}
