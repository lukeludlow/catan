import { Injectable } from "@angular/core";
import { Hex } from "./model/Hex";
import { RandomNumberService } from "./random-number.service";
import { DiceNumberGeneratorService } from "./dice-number-generator.service";
import { TerrainGeneratorService } from "./terrain-generator.service";
import { SeafarersMap } from "./model/SeafarersMap";
import { PortGeneratorService } from "./port-generator.service";

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
    private portGenerator: PortGeneratorService;

    constructor(
        randomNumberService: RandomNumberService,
        diceNumberGenerator: DiceNumberGeneratorService,
        terrainGenerator: TerrainGeneratorService,
        portGenerator: PortGeneratorService
    ) {
        this.randomNumberService = randomNumberService;
        this.diceNumberGenerator = diceNumberGenerator;
        this.terrainGenerator = terrainGenerator;
        this.portGenerator = portGenerator;
    }

    public generateMap(): SeafarersMap {
        let map: SeafarersMap = new SeafarersMap();
        map = this.terrainGenerator.generateTerrain(map);
        map = this.diceNumberGenerator.generateDiceNumbers(map);
        map = this.portGenerator.generatePorts(map);
        return map;
    }
}
