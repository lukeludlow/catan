import { Injectable } from "@angular/core";
import { Hex } from "./Hex";

// https://www.redblobgames.com/grids/hexagons/
// https://www.redblobgames.com/grids/hexagons/implementation.html

@Injectable({
    providedIn: "root",
})
export class BoardGeneratorService {
    private tiles: Map<string, number>;
    private diceNumbers: Map<number, number>;

    constructor() {
        this.tiles = new Map<string, number>();
        this.tiles.set("rock", 3);
        this.tiles.set("wheat", 4);
        this.tiles.set("brick", 3);
        this.tiles.set("tree", 4);
        this.tiles.set("sheep", 4);
        this.tiles.set("desert", 1);
        this.diceNumbers = new Map<number, number>();
        this.diceNumbers.set(2, 1);
        this.diceNumbers.set(3, 2);
        this.diceNumbers.set(4, 2);
        this.diceNumbers.set(5, 2);
        this.diceNumbers.set(6, 2);
        this.diceNumbers.set(8, 2);
        this.diceNumbers.set(9, 2);
        this.diceNumbers.set(10, 2);
        this.diceNumbers.set(11, 2);
        this.diceNumbers.set(12, 1);
    }

    public areHexesSixEightCollision(hex1: Hex, hex2: Hex): boolean {
        if (hex1.diceNumber === -1 || hex2.diceNumber === -1) {
            return false;
        }
        if (hex1.diceNumber !== 6 && hex1.diceNumber !== 8) {
            return false;
        }
        if (hex2.diceNumber !== 6 && hex2.diceNumber !== 8) {
            return false;
        }
        if (hex1.row === hex2.row && hex1.col === hex2.col) {
            // it's the same hex
            return false;
        }
        const oddrDirections = {
            odd: [
                [1, 0],
                [1, -1],
                [0, -1],
                [-1, 0],
                [0, 1],
                [1, 1],
            ],
            even: [
                [1, 0],
                [0, -1],
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, 1],
            ],
        };
        console.log("hex1: " + JSON.stringify(hex1));
        console.log("hex2: " + JSON.stringify(hex2));
        const isOddRow = hex1.row % 2 === 1;
        let neighborDirections: number[][];
        if (isOddRow) {
            // hex1col = hex1col + 1;
            console.log("is odd row");
            neighborDirections = oddrDirections.odd;
        } else {
            console.log("is even row");
            neighborDirections = oddrDirections.even;
        }
        console.log("hex1 coords: " + hex1.row + "," + hex1.col);
        for (const direction of neighborDirections) {
            const neighborRow = hex1.row + direction[0];
            const neighborCol = hex1.col + direction[1];
            console.log("checking neighbor coords: " + neighborRow + "," + neighborCol);
            if (neighborRow === hex2.row && neighborCol === hex2.col) {
                return true;
            }
        }
        return false;
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
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (hexes[row][col].resource !== "" && hexes[row][col].resource !== "desert") {
                    hexes[row][col].diceNumber = this.assignDiceNumber();
                }
            }
        }
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

    private assignDiceNumber(): number {
        const remainingDiceNumbers = new Set<number>();
        this.diceNumbers.forEach((numRemaining, diceNumber) => {
            if (numRemaining > 0) {
                remainingDiceNumbers.add(diceNumber);
            }
        });
        const randomIndex = Math.floor(Math.random() * remainingDiceNumbers.size);
        const assignedDiceNumber = [...remainingDiceNumbers][randomIndex];
        this.diceNumbers.set(assignedDiceNumber, this.diceNumbers.get(assignedDiceNumber) - 1);
        return assignedDiceNumber;
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
