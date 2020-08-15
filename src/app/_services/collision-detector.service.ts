import { Injectable } from "@angular/core";
import { Hex } from "./model/Hex";
import { SeafarersMap } from "./model/SeafarersMap";

@Injectable({
    providedIn: "root",
})
export class CollisionDetectorService {
    constructor() {}

    public detectCollisions(map: SeafarersMap): boolean {
        for (const row of map.getRows()) {
            for (const hex of row) {
                if (this.isHexSixOrEight(hex)) {
                    const neighbors: Hex[] = map.listNeighbors(hex);
                    if (neighbors.some((neighborHex) => this.isHexSixOrEight(neighborHex))) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private isHexSixOrEight(hex: Hex): boolean {
        return hex.getDiceNumber() === 6 || hex.getDiceNumber() === 8;
    }
}
