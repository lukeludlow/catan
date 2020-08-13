import { Injectable } from "@angular/core";
import { Hex } from "./Hex";
import { RandomNumberService } from "./random-number.service";

@Injectable({
    providedIn: "root",
})
export class SeafarersMapGenerator {
    private static readonly numRows: number = 13;
    private static readonly terrainTypes: string[] = [
        "brick",
        "desert",
        "gold",
        "rock",
        "sea",
        "sheep",
        "tree",
        "wheat",
    ];
    private terrainCounts: Map<string, number>;
    private randomNumberService: RandomNumberService;

    constructor(randomNumberService: RandomNumberService) {
        this.randomNumberService = randomNumberService;
    }

    public generateMap(): Hex[][] {
        const map: Hex[][] = this.generateNewMap();
        return map;
    }

    private generateNewMap(): Hex[][] {
        let map: Hex[][] = this.createBlankMap();
        this.terrainCounts = this.refreshTerrainCounts();
        map = this.assignTerrains(map, this.terrainCounts);
        return map;
    }

    private assignTerrains(hexes: Hex[][], terrainCounts: Map<string, number>): Hex[][] {
        hexes = this.assignTerrainType(hexes, "brick", 5);
        hexes = this.assignTerrainType(hexes, "rock", 5);
        hexes = this.assignTerrainType(hexes, "sheep", 5);
        hexes = this.assignTerrainType(hexes, "tree", 5);
        hexes = this.assignTerrainType(hexes, "wheat", 5);
        hexes = this.assignTerrainType(hexes, "gold", 2);
        hexes = this.fillWithSea(hexes);
        // for (let row = 0; row < 13; row++) {
        //     for (let col = 0; col < hexes[row].length; col++) {
        //         hexes[row][col].setTerrain(this.assignTerrain());
        //     }
        // }
        // return hexes;
        return hexes;
    }

    private assignTerrainType(hexes: Hex[][], terrainType: string, numberHexesToAssign: number): Hex[][] {
        for (let i = 0; i < numberHexesToAssign; i++) {
            const randomCoords = this.getRandomUnusedCoords(hexes);
            hexes[randomCoords.randomRow][randomCoords.randomCol].setTerrain(terrainType);
        }
        return hexes;
    }

    private getRandomUnusedCoords(hexes: Hex[][]): any {
        let randomRow: number = this.randomNumberService.getRandomNumberExclusive(0, hexes.length);
        let randomCol: number = this.randomNumberService.getRandomNumberExclusive(0, hexes[randomRow].length);
        let hexIsEmptyTerrain: boolean = hexes[randomRow][randomCol].getTerrain() === "";
        if (hexIsEmptyTerrain) {
            return { randomRow, randomCol };
        } else {
            while (!hexIsEmptyTerrain) {
                randomRow = this.randomNumberService.getRandomNumberExclusive(0, hexes.length);
                randomCol = this.randomNumberService.getRandomNumberExclusive(0, hexes[randomRow].length);
                hexIsEmptyTerrain = hexes[randomRow][randomCol].getTerrain() === "";
            }
            return { randomRow, randomCol };
        }
    }

    private fillWithSea(hexes: Hex[][]): Hex[][] {
        for (let row = 0; row < 13; row++) {
            for (let col = 0; col < hexes[row].length; col++) {
                if (hexes[row][col].getTerrain() === "") {
                    hexes[row][col].setTerrain("sea");
                }
            }
        }
        return hexes;
    }

    private refreshTerrainCounts(): Map<string, number> {
        return new Map<string, number>([
            ["brick", 5],
            ["desert", 3],
            ["gold", 2],
            ["rock", 5],
            ["sea", 19],
            ["sheep", 5],
            ["tree", 5],
            ["wheat", 5],
        ]);
    }

    // private assignTerrain(): string {
    //     const remainingTerrains: string[] = [];
    //     this.terrainCounts.forEach((value: number, key: string) => {
    //         for (let i = 0; i < value; i++) {
    //             remainingTerrains.push(key);
    //         }
    //     });
    //     const randomTerrain: string = this.getRandomElementFromArray(remainingTerrains);
    //     this.terrainCounts.set(randomTerrain, this.terrainCounts.get(randomTerrain) - 1);
    //     return randomTerrain;
    // }

    // private getRandomTerrain(): string {
    //     return SeafarersMapGenerator.terrainTypes[
    //         this.randomNumberService.getRandomNumberExclusive(0, SeafarersMapGenerator.terrainTypes.length)
    //     ];
    // }

    private createBlankMap(): Hex[][] {
        const blankMap: Hex[][] = new Array<Array<Hex>>(SeafarersMapGenerator.numRows);
        blankMap[0] = new Array<Hex>(2);
        blankMap[1] = new Array<Hex>(3);
        blankMap[2] = new Array<Hex>(4);
        blankMap[3] = new Array<Hex>(3);
        blankMap[4] = new Array<Hex>(4);
        blankMap[5] = new Array<Hex>(3);
        blankMap[6] = new Array<Hex>(4);
        blankMap[7] = new Array<Hex>(3);
        blankMap[8] = new Array<Hex>(4);
        blankMap[9] = new Array<Hex>(3);
        blankMap[10] = new Array<Hex>(4);
        blankMap[11] = new Array<Hex>(3);
        blankMap[12] = new Array<Hex>(2);
        for (let row = 0; row < SeafarersMapGenerator.numRows; row++) {
            for (let col = 0; col < blankMap[row].length; col++) {
                blankMap[row][col] = new Hex();
            }
        }
        return blankMap;
    }
}
