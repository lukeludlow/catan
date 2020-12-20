import { Injectable } from "@angular/core";
import { Hex } from "../_models/Hex";
import { SeafarersMap } from "../_models/SeafarersMap";
import { Terrain } from "../_models/Terrain";

@Injectable({
    providedIn: "root",
})
export class IslandCounter {
    constructor() {}

    public countIslands(map: SeafarersMap): number {
        const rows = map.getRows();
        const visited = new Set<Hex>();
        const islands = new Array<Set<Hex>>();
        rows.forEach((hexRow) =>
            hexRow.forEach((hex) => {
                if (hex.hasTerrain()) {
                    if (visited.has(hex)) {
                        //
                    } else {
                        visited.add(hex);
                        if (this.hexExistsInAnIsland(hex, islands)) {
                            //
                        } else {
                            if (this.anyNeighborExistsInAnIsland(map, hex, islands)) {
                                const island = this.getIslandForHex(map, hex, islands);
                                island.add(hex);
                            } else {
                                const newIsland = new Set<Hex>();
                                newIsland.add(hex);
                                islands.push(newIsland);
                            }
                        }
                    }
                }
            })
        );
        return islands.length;
    }

    private hexExistsInAnIsland(hex: Hex, islands: Array<Set<Hex>>): boolean {
        for (const island of islands) {
            if (island.has(hex)) {
                return true;
            }
        }
        return false;
    }

    private anyNeighborExistsInAnIsland(map: SeafarersMap, hex: Hex, islands: Array<Set<Hex>>): boolean {
        const neighbors = map.listNeighbors(hex);
        for (const neighborHex of neighbors) {
            for (const island of islands) {
                if (island.has(neighborHex)) {
                    return true;
                }
            }
        }
        return false;
    }

    private getIslandForHex(map: SeafarersMap, hex: Hex, islands: Array<Set<Hex>>): Set<Hex> {
        const neighbors = map.listNeighbors(hex);
        for (const neighborHex of neighbors) {
            for (const island of islands) {
                if (island.has(neighborHex)) {
                    return island;
                }
            }
        }
        throw new Error("no island exists containing that hex");
    }
}
