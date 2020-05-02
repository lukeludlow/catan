import { Injectable } from "@angular/core";
import { Hex } from "./Hex";
import { BoardResources } from "./board-resources";

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
export class MapDisplayService {
    // private resourceNames: ["rock", "wheat", "brick", "tree", "sheep", "desert"];
    private boardHexes: Hex[];
    private boardResources: BoardResources;

    private gameOption = "base";

    constructor() {
        this.boardResources = new BoardResources();
    }

    setGameOption(gameOption: string): void {
        this.gameOption = gameOption;
    }

    generate(): void {
        console.log("map display service generate: " + this.gameOption);
    }

    getTile(row: number, col: number): string {
        // let tileType: string;
        // tileType = "rock";
        // console.log("getTile: " + tileType);
        // return tileType;
        return this.boardResources.chooseRandomRemainingTileResource(row, col);
    }

    getPort(): string {
        // const randomIndex = Math.floor(Math.random() * this.availablePorts.length);
        // const portType = this.availablePorts[randomIndex];
        // const portType = this.boardResources.chooseRandomRemainingPortResource();
        // this.availablePorts = this.availablePorts.filter(item => item !== portType);
        // this.availablePorts.splice(randomIndex, 1);
        // console.log("getPort: " + portType);
        return this.boardResources.chooseRandomRemainingPortResource();
    }

    getNumber(row: number, col: number): number {
        // let numberValue: number;
        // numberValue = 9;
        // console.log("getNumber: " + numberValue);
        // return numberValue;
        return this.boardResources.chooseRandomRemainingNumber(row, col);
    }

    isTileDesert(row: number, col: number): boolean {
        return this.boardResources.hexes[row][col].resource === "desert";
    }
}
