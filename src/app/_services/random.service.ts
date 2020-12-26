import { Injectable } from "@angular/core";
import { ICatanMap } from "../_models/ICatanMap";
import { matchHexIf } from "../_models/delegates";
import { HexCoords } from "../_models/HexCoords";

@Injectable({
    providedIn: "root",
})
export class RandomService {
    constructor() {}

    // e.g. getRandomNumberExclusive(0, 3) will return 0, 1, or 2
    public getRandomNumberExclusive(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // e.g. getRandomNumberInclusive(0, 3) will return 0, 1, 2, or 3
    public getRandomNumberInclusive(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public getRandomElementFromArray(array: any[]) {
        return array[Math.floor(Math.random() * array.length)];
    }

    public getRandomCoords(map: ICatanMap, shouldMatchHex: matchHexIf): HexCoords {
        let randomRow: number = this.getRandomNumberExclusive(0, map.getRows().length);
        let randomCol: number = this.getRandomNumberExclusive(0, map.getRow(randomRow).length);
        while (!shouldMatchHex(map.getHex(randomRow, randomCol))) {
            randomRow = this.getRandomNumberExclusive(0, map.getRows().length);
            randomCol = this.getRandomNumberExclusive(0, map.getRow(randomRow).length);
        }
        return { row: randomRow, col: randomCol };
    }
}
