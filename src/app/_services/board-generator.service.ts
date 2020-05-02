import { Injectable } from "@angular/core";
import { Hex } from "./Hex";

// https://www.redblobgames.com/grids/hexagons/
// https://www.redblobgames.com/grids/hexagons/implementation.html

@Injectable({
    providedIn: "root",
})
export class BoardGeneratorService {
    private tiles: Map<string, number>;

    constructor() {
        this.tiles = new Map<string, number>();
        this.tiles.set("rock", 3);
        this.tiles.set("wheat", 4);
        this.tiles.set("brick", 3);
        this.tiles.set("tree", 4);
        this.tiles.set("sheep", 4);
        this.tiles.set("desert", 1);
    }

    public generate(): Hex[][] {
        const gridSize = 5;
        const hexes = new Array<Array<Hex>>();
        for (let row = 0; row < gridSize; row++) {
            hexes[row] = new Array<Hex>(gridSize);
            for (let col = 0; col < gridSize; col++) {
                hexes[row][col] = new Hex(-1, -1, -1, "");
            }
        }
        // assign resources
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (this.shouldCreateHexForPosition(row, col)) {
                    hexes[row][col].row = row;
                    hexes[row][col].col = col;
                    hexes[row][col].resource = this.assignResource();
                }
            }
        }
        // assign dice numbers
        return hexes;
    }

    private assignResource(): string {
        const remainingTileResources = new Set<string>();
        this.tiles.forEach((numRemaining, tileResource) => {
            if (numRemaining > 0) {
                remainingTileResources.add(tileResource);
            }
        });
        const randomIndex = Math.floor(Math.random() * remainingTileResources.size);
        const assignedResource = [...remainingTileResources][randomIndex];
        this.tiles.set(assignedResource, this.tiles.get(assignedResource) - 1);
        return assignedResource;
    }

    private shouldCreateHexForPosition(row: number, col: number): boolean {
        if (row === 0 || row === 4) {
            if (col >= 1 && col <= 3) {
                return true;
            }
        }
        if (row === 1 || row === 3) {
            if (col >= 0 && col <= 3) {
                return true;
            }
        }
        if (row === 2) {
            return true;
        }
        return false;
    }
}
