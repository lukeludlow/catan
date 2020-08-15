import { Injectable } from "@angular/core";
import { Hex } from "./model/Hex";
import { SeafarersMap } from "./model/SeafarersMap";

@Injectable({
    providedIn: "root",
})
export class CollisionDetectorService {
    constructor() {}

    public detectCollisions(hexes: SeafarersMap): boolean {
        return false;
    }

    // public listNeighbors(map: SeafarersMap, row: number, col: number): number[] {
    //     let offset: number = 0;
    //     if (this.isEven(row)) {
    //         offset = -1;
    //     } else {
    //         offset = 0;
    //     }
    //     let topNeighbor: number = 0;
    //     if (this.isSpecialRow(row - 2)) {
    //         topNeighbor = map.getHex(row - 2, col + offset).getDiceNumber();
    //     } else {
    //         topNeighbor = map.getHex(row - 2, col).getDiceNumber();
    //     }
    //     const bottomNeighbor: number = map.getHex(row + 2, col).getDiceNumber();
    //     const topLeftNeighbor: number = map.getHex(row - 1, col + offset).getDiceNumber();
    //     const topRightNeighbor: number = map.getHex(row - 1, col + 1 + offset).getDiceNumber();
    //     const bottomLeftNeighbor: number = map.getHex(row + 1, col + offset).getDiceNumber();
    //     const bottomRightNeighbor: number = map.getHex(row + 1, col + 1 + offset).getDiceNumber();
    //     const neighbors: number[] = [
    //         topNeighbor,
    //         bottomNeighbor,
    //         topLeftNeighbor,
    //         topRightNeighbor,
    //         bottomLeftNeighbor,
    //         bottomRightNeighbor,
    //     ];
    //     return neighbors;
    // }


}
