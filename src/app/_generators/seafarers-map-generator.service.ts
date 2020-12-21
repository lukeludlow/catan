import { Injectable } from "@angular/core";
import { Hex } from "../_models/Hex";
import { RandomService } from "../_services/random.service";
import { DiceNumberGenerator } from "./dice-number-generator.service";
import { TerrainGenerator } from "./terrain-generator.service";
import { SeafarersMap } from "../_models/SeafarersMap";
import { PortGenerator } from "../_generators/port-generator.service";
import { IslandCounter } from "../_validators/island-counter.service";
import { Settings } from "../_models/Settings";

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
    private randomService: RandomService;
    private diceNumberGenerator: DiceNumberGenerator;
    private terrainGenerator: TerrainGenerator;
    private portGenerator: PortGenerator;
    private islandCounter: IslandCounter;

    constructor(
        randomService: RandomService,
        diceNumberGenerator: DiceNumberGenerator,
        terrainGenerator: TerrainGenerator,
        portGenerator: PortGenerator,
        islandCounter: IslandCounter
    ) {
        this.randomService = randomService;
        this.diceNumberGenerator = diceNumberGenerator;
        this.terrainGenerator = terrainGenerator;
        this.portGenerator = portGenerator;
        this.islandCounter = islandCounter;
    }

    public generateMap(settings: Settings): SeafarersMap {
        let map: SeafarersMap = this.tryGenerate();
        let numTimesGenerated = 1;
        let isValidMap = this.validateMap(map, settings);
        while (!isValidMap) {
            map = this.tryGenerate();
            isValidMap = this.validateMap(map, settings);
            numTimesGenerated++;
        }
        console.log(`generated map after ${numTimesGenerated} validations`);
        return map;
    }

    private tryGenerate(): SeafarersMap {
        let map: SeafarersMap = new SeafarersMap();
        map = this.terrainGenerator.generateTerrain(map);
        map = this.diceNumberGenerator.generateDiceNumbers(map);
        map = this.portGenerator.generatePorts(map);
        return map;
    }

    public validateMap(map: SeafarersMap, settings: Settings): boolean {
        const validIslands = this.islandCounter.countIslands(map) === settings.islands;
        return validIslands;
    }
}
