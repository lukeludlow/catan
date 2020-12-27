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
import { CollisionDetector } from "../_validators/collision-detector.service";

@Injectable({
    providedIn: "root",
})
export class SeafarersMapGenerator {
    private diceNumberGenerator: DiceNumberGenerator;
    private terrainGenerator: TerrainGenerator;
    private portGenerator: PortGenerator;
    private islandCounter: IslandCounter;
    private collisionDetector: CollisionDetector;

    private map: SeafarersMap;
    private settings: SeafarersSettings;

    constructor(
        diceNumberGenerator: DiceNumberGenerator,
        terrainGenerator: TerrainGenerator,
        portGenerator: PortGenerator,
        islandCounter: IslandCounter,
        collisionDetector: CollisionDetector
    ) {
        this.diceNumberGenerator = diceNumberGenerator;
        this.terrainGenerator = terrainGenerator;
        this.portGenerator = portGenerator;
        this.islandCounter = islandCounter;
        this.collisionDetector = collisionDetector;
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
        }
        console.log(`generated map after ${numTimesGenerated} validations`);
        return map;
    }

    private tryGenerate(): SeafarersMap {
        let map: SeafarersMap = new SeafarersMap();
        map = this.terrainGenerator.generateTerrain(map, this.settings) as SeafarersMap;
        map = this.diceNumberGenerator.generateDiceNumbers(map, this.settings) as SeafarersMap;
        map = this.portGenerator.generatePorts(map, this.settings) as SeafarersMap;
        return map;
    }

    public validateMap(map: SeafarersMap, settings: GenerateSettings): boolean {
        const noCollisions: boolean = !this.collisionDetector.detectCollisions(map);
        const validIslands: boolean = this.islandCounter.countIslands(map) === settings.islands;
        return noCollisions && validIslands;
    }
}
