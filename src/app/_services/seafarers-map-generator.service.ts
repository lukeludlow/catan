import { Injectable } from "@angular/core";
import { Hex } from "./model/Hex";
import { RandomNumberService } from "./random-number.service";
import { DiceNumberGeneratorService } from "./dice-number-generator.service";
import { TerrainGeneratorService } from "./terrain-generator.service";
import { SeafarersMap } from "./model/SeafarersMap";

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

    public generateMap(): SeafarersMap {
        const map: SeafarersMap = this.generateNewMap();
        return map;
    }

    private generateNewMap(): SeafarersMap {
        let map: SeafarersMap = new SeafarersMap();
        map = this.terrainGenerator.generateTerrain(map);
        map = this.diceNumberGenerator.generateDiceNumbers(map);
        return map;
    }
}
