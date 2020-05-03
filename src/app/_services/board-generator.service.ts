import { Injectable } from "@angular/core";
import { Hex } from "./Hex";

// https://www.redblobgames.com/grids/hexagons/
// https://www.redblobgames.com/grids/hexagons/implementation.html

// num rock tiles: 3
// num wheat tiles: 4
// num brick tiles: 3
// num tree tiles: 4
// num sheep tiles: 4
// num desert tiles: 1

// num 2s: 1 (1dot)
// num 3s: 2 (2dot)
// num 4s: 2 (3dot)
// num 5s: 2 (4dot)
// num 6s: 2 (5dot)
// num 8s: 2 (5dot)
// num 9s: 2 (4dot)
// num 10s: 2 (3dot)
// num 11s: 2 (2dot)
// num 12s: 1 (1dot)

// num rock ports: 1
// num wheat ports: 1
// num tree ports: 1
// num sheep ports: 1
// num brick ports: 1
// num port slots needed (the question marks): 4

@Injectable({
    providedIn: "root",
})
export class BoardGeneratorService {
    hexes: Hex[][];

    constructor() {
        const gridSize = 5;
        this.hexes = new Array<Array<Hex>>();
        for (let row = 0; row < gridSize; row++) {
            this.hexes[row] = new Array<Hex>(gridSize);
            for (let col = 0; col < gridSize; col++) {
                this.hexes[row][col] = new Hex(-1, -1, -1, "");
            }
        }
    }

    public generatePorts(): string[] {
        const ports = ["rock", "wheat", "brick", "tree", "sheep"];
        // shuffle using fisher-yates algorithm
        const startingIndex = ports.length - 1;
        for (let i = startingIndex; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = ports[i];
            ports[i] = ports[j];
            ports[j] = temp;
        }
        ports.pop();
        return ports;
    }

    public areHexesSixEightCollision(hex1: Hex, hex2: Hex): boolean {
        if (hex1.diceNumber === -1 || hex2.diceNumber === -1) {
            return false;
        }
        if (hex1.row === -1 || hex2.row === -1 || hex1.col === -1 || hex2.col === -1) {
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
            even: [
                [1, 0],
                [1, -1],
                [0, -1],
                [-1, 0],
                [0, 1],
                [1, 1],
            ],
            odd: [
                [1, 0],
                [0, -1],
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, 1],
            ],
        };
        const allDirections = [
            [1, 1],
            [1, 0],
            [1, -1],
            [0, 1],
            [0, -1],
            [-1, 1],
            [-1, 0],
            [-1, -1],
        ];
        // console.log("hex1: " + JSON.stringify(hex1));
        // console.log("hex2: " + JSON.stringify(hex2));
        const isOddRow = hex1.row % 2 === 1;
        let neighborDirections: number[][];
        if (isOddRow) {
            // console.log("is odd row");
            neighborDirections = oddrDirections.odd;
        } else {
            // console.log("is even row");
            neighborDirections = oddrDirections.even;
        }
        // console.log("hex1 coords: " + hex1.row + "," + hex1.col);
        for (const direction of allDirections) {
            const neighborRow = hex1.row + direction[0];
            const neighborCol = hex1.col + direction[1];
            // if (isOddRow) {
            // hex1.col = hex1.col - 1;
            // } else {
            // hex1.col = hex1.col + 1;
            // }
            // console.log("checking neighbor coords: " + neighborRow + "," + neighborCol);
            if (neighborRow === hex2.row && neighborCol === hex2.col) {
                // console.log(
                //     "!!! COLLISION !!! between these two hexes: " +
                //         JSON.stringify(hex1) +
                //         " and " +
                //         JSON.stringify(hex2)
                // );
                return true;
            }
        }
        return false;
    }

    public generate(): Hex[][] {
        // const tiles: Map<string, number>;
        // const diceNumbers: Map<number, number>;

        const tiles = new Map<string, number>();
        tiles.set("rock", 3);
        tiles.set("wheat", 4);
        tiles.set("brick", 3);
        tiles.set("tree", 4);
        tiles.set("sheep", 4);
        tiles.set("desert", 1);
        const diceNumbers = new Map<number, number>();
        diceNumbers.set(2, 1);
        diceNumbers.set(3, 2);
        diceNumbers.set(4, 2);
        diceNumbers.set(5, 2);
        diceNumbers.set(6, 2);
        diceNumbers.set(8, 2);
        diceNumbers.set(9, 2);
        diceNumbers.set(10, 2);
        diceNumbers.set(11, 2);
        diceNumbers.set(12, 1);

        const gridSize = 5;
        const generatedHexes = new Array<Array<Hex>>();
        for (let row = 0; row < gridSize; row++) {
            generatedHexes[row] = new Array<Hex>(gridSize);
            for (let col = 0; col < gridSize; col++) {
                generatedHexes[row][col] = new Hex(-1, -1, -1, "");
            }
        }
        // assign resources
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (this.shouldCreateHexForPosition(row, col)) {
                    generatedHexes[row][col].row = row;
                    generatedHexes[row][col].col = col;
                    generatedHexes[row][col].resource = this.assignResource(tiles);
                }
            }
        }
        // assign dice numbers
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (
                    generatedHexes[row][col].resource !== "" &&
                    generatedHexes[row][col].resource !== "desert"
                ) {
                    generatedHexes[row][col].diceNumber = this.assignDiceNumber(diceNumbers);
                }
            }
        }
        this.hexes = generatedHexes;
        return generatedHexes;
    }

    public generateWithNoCollisions(): Hex[][] {
        // console.log("generateWithNoCollisions " + JSON.stringify(this.hexes, undefined, 2));
        if (!this.hexesHaveAlreadyBeenGenerated()) {
            console.log("generateWithNoCollisions: generating new board");
            this.generate();
            // console.log(JSON.stringify(this.hexes, undefined, 2));
        }
        let numTimesRegenerated = 0;
        while (this.areThereAnyCollisions(this.hexes)) {
            console.log("generateWithNoCollisions: detected board collision. regenerating...");
            this.generate();
            numTimesRegenerated++;
            // if (numTimesRegenerated > 9) {
            // console.log("tried to regenerate too many times. giving up.");
            // break;
            // }
            // console.log(JSON.stringify(this.hexes, undefined, 2));
        }
        console.log(
            "generateWithNoCollisions: good to go. it took " +
                numTimesRegenerated +
                " tries to generate a map with no collisions."
        );
        return this.hexes;
    }

    private hexesHaveAlreadyBeenGenerated(): boolean {
        return this.hexes[2][2].resource !== "";
    }

    private areThereAnyCollisions(hexes: Hex[][]): boolean {
        for (let i = 0; i < hexes.length; i++) {
            for (let j = 0; j < hexes[i].length; j++) {
                if (this.checkHexForCollisions(hexes[i][j], hexes)) {
                    return true;
                }
            }
        }
        // this.hexes.forEach((row) => {
        //     row.forEach((hex) => {
        //         if (this.checkHexForCollisions(hex)) {
        //             return true;
        //         }
        //     });
        // });
        return false;
    }

    private checkHexForCollisions(hex1: Hex, hexes: Hex[][]): boolean {
        for (let i = 0; i < hexes.length; i++) {
            for (let j = 0; j < hexes[i].length; j++) {
                if (this.areHexesSixEightCollision(hex1, hexes[i][j])) {
                    return true;
                }
            }
        }
        // this.hexes.forEach((row) => {
        //     row.forEach((hex2) => {
        //         if (this.areHexesSixEightCollision(hex1, hex2)) {
        //             return true;
        //         }
        //     });
        // });
        return false;
    }

    private assignResource(tiles: Map<string, number>): string {
        // const remainingTileResources = new Set<string>();
        const remainingTileResources = [];
        tiles.forEach((numRemaining, tileResource) => {
            if (numRemaining > 0) {
                // remainingTileResources.add(tileResource);
                remainingTileResources.push(tileResource);
            }
        });
        // const randomIndex = Math.floor(Math.random() * remainingTileResources.size);
        const randomIndex = Math.floor(Math.random() * remainingTileResources.length);
        // const assignedResource = [...remainingTileResources][randomIndex];
        const assignedResource = remainingTileResources[randomIndex];
        tiles.set(assignedResource, tiles.get(assignedResource) - 1);
        return assignedResource;
    }

    private assignDiceNumber(diceNumbers: Map<number, number>): number {
        // const remainingDiceNumbers = new Set<number>();
        const remainingDiceNumbers = [];
        diceNumbers.forEach((numRemaining, diceNumber) => {
            if (numRemaining > 0) {
                // remainingDiceNumbers.add(diceNumber);
                remainingDiceNumbers.push(diceNumber);
            }
        });
        // const randomIndex = Math.floor(Math.random() * remainingDiceNumbers.size);
        const randomIndex = Math.floor(Math.random() * remainingDiceNumbers.length);
        // const assignedDiceNumber = [...remainingDiceNumbers][randomIndex];
        const assignedDiceNumber = remainingDiceNumbers[randomIndex];
        diceNumbers.set(assignedDiceNumber, diceNumbers.get(assignedDiceNumber) - 1);
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
