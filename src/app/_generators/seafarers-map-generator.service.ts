import { Injectable } from "@angular/core";
import { Hex } from "../_models/Hex";
import { RandomService } from "../_services/random.service";
import { DiceNumberGenerator } from "./dice-number-generator.service";
import { TerrainGenerator } from "./terrain-generator.service";
import { SeafarersMap } from "../_models/SeafarersMap";
import { PortGenerator } from "../_generators/port-generator.service";

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

    constructor(
        randomService: RandomService,
        diceNumberGenerator: DiceNumberGenerator,
        terrainGenerator: TerrainGenerator,
        portGenerator: PortGenerator
    ) {
        this.randomService = randomService;
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
