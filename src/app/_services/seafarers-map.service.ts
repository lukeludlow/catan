import { Injectable } from "@angular/core"
import { Hex } from "./Hex"
import { HexRow } from "./HexRow"

@Injectable({
    providedIn: "root",
})
export class SeafarersMap {
    private static readonly numRows: number = 13
    private readonly rows: HexRow[]

    constructor() {
        this.rows = new Array<HexRow>(SeafarersMap.numRows)
        this.rows[0] = new HexRow(2)
        this.rows[1] = new HexRow(3)
        this.rows[2] = new HexRow(4)
        this.rows[3] = new HexRow(3)
        this.rows[4] = new HexRow(4)
        this.rows[5] = new HexRow(3)
        this.rows[6] = new HexRow(4)
        this.rows[7] = new HexRow(3)
        this.rows[8] = new HexRow(4)
        this.rows[9] = new HexRow(3)
        this.rows[10] = new HexRow(4)
        this.rows[11] = new HexRow(3)
        this.rows[12] = new HexRow(2)
    }

    public getRows(): HexRow[] {
        return this.rows
    }

    public getRow(rowIndex: number): HexRow {
        return this.rows[rowIndex]
    }
}
