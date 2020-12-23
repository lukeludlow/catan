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
        return this.countIslands2(map);
    }

    private countIslands2(map: SeafarersMap): number {
        // console.log("countIslands2");
        const rows = map.getRows();
        const visited = new Set<Hex>();
        const islands = new Array<Set<Hex>>();
        // console.log("counting islands...");
        for (const hexRow of rows) {
            for (const hex of hexRow) {
                if (hex.hasTerrain()) {
                    if (visited.has(hex)) {
                        //
                    } else {
                        let island = new Set<Hex>();
                        island = this.dfs(map, hex, visited, island);
                        islands.push(island);
                    }
                }
            }
        }
        const islandSizeRequirement = 3;
        let islandsCount = 0;
        for (const island of islands) {
            if (island.size >= islandSizeRequirement) {
                islandsCount++;
            }
        }
        // console.log(`IslandCounter: ${islandsCount} islands`);
        return islandsCount;
    }

    private dfs(map: SeafarersMap, current: Hex, visited: Set<Hex>, island: Set<Hex>): Set<Hex> {
        // console.log(`dfs on hex current = [${current.getRow()}][${current.getCol()}]`);
        if (visited.has(current) || !current.hasTerrain()) {
            return island;
        }
        visited.add(current);
        island.add(current);
        const neighbors = map.listNeighbors(current);
        for (const neighborHex of neighbors) {
            island = this.dfs(map, neighborHex, visited, island);
        }
        return island;
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
