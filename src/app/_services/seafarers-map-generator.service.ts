import { Injectable } from "@angular/core";
import { Hex } from "./Hex";
import { RandomNumberService } from "./random-number.service";
import { DiceNumberGeneratorService } from "./dice-number-generator.service";
import { TerrainGeneratorService } from "./terrain-generator.service";

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
    private diceNumberGenerator: DiceNumberGeneratorService;
    private terrainGenerator: TerrainGeneratorService;

    constructor(
        randomNumberService: RandomNumberService,
        diceNumberGenerator: DiceNumberGeneratorService,
        terrainGenerator: TerrainGeneratorService
    ) {
        this.randomNumberService = randomNumberService;
        this.diceNumberGenerator = diceNumberGenerator;
        this.terrainGenerator = terrainGenerator;
    }

    public generateMap(): Hex[][] {
        const map: Hex[][] = this.generateNewMap();
        return map;
    }

    private generateNewMap(): Hex[][] {
        let map: Hex[][] = this.createBlankMap();
        map = this.terrainGenerator.generateTerrain(map);
        map = this.diceNumberGenerator.assignDiceNumbers(map);
        return map;
    }

   

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
