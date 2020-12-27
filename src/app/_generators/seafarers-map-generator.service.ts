import { Injectable } from "@angular/core";
import { Hex } from "../_models/Hex";
import { RandomService } from "../_services/random.service";
import { DiceNumberGenerator } from "./dice-number-generator.service";
import { TerrainGenerator } from "./terrain-generator.service";
import { SeafarersMap } from "../_maps/Seafarers/SeafarersMap";
import { PortGenerator } from "../_generators/port-generator.service";
import { IslandCounter } from "../_validators/island-counter.service";
import { GenerateSettings } from "../_models/generate-settings";
import { SeafarersSettings } from "../_maps/Seafarers/SeafarersSettings";

@Injectable({
    providedIn: "root",
})
export class SeafarersMapGenerator {
    private diceNumberGenerator: DiceNumberGenerator;
    private terrainGenerator: TerrainGenerator;
    private portGenerator: PortGenerator;
    private islandCounter: IslandCounter;

    private map: SeafarersMap;
    private settings: SeafarersSettings;

    constructor(
        diceNumberGenerator: DiceNumberGenerator,
        terrainGenerator: TerrainGenerator,
        portGenerator: PortGenerator,
        islandCounter: IslandCounter
    ) {
        this.diceNumberGenerator = diceNumberGenerator;
        this.terrainGenerator = terrainGenerator;
        this.portGenerator = portGenerator;
        this.islandCounter = islandCounter;
        this.settings = new SeafarersSettings();
    }

    public getMap(): SeafarersMap {
        return this.map;
    }

    public tryGenerateMapChunk(settings: GenerateSettings): boolean {
        const map: SeafarersMap = this.tryGenerate();
        const isValidMap = this.validateMap(map, settings);
        if (isValidMap) {
            this.map = map;
        }
        return isValidMap;
    }

    public generateMap(settings: GenerateSettings): SeafarersMap {
        let map: SeafarersMap = this.tryGenerate();
        let numTimesGenerated = 1;
        let isValidMap = this.validateMap(map, settings);
        while (!isValidMap) {
            map = this.tryGenerate();
            isValidMap = this.validateMap(map, settings);
            numTimesGenerated++;
            setTimeout(() => {}, 1);
        }
        console.log(`generated map after ${numTimesGenerated} validations`);
        return map;
    }

    private tryGenerate(): SeafarersMap {
        let map: SeafarersMap = new SeafarersMap();
        map = this.terrainGenerator.generateTerrain(map, this.settings);
        map = this.diceNumberGenerator.generateDiceNumbers(map);
        map = this.portGenerator.generatePorts(map, this.settings);
        return map;
    }

    public validateMap(map: SeafarersMap, settings: GenerateSettings): boolean {
        const validIslands = this.islandCounter.countIslands(map) === settings.islands;
        return validIslands;
    }
}
