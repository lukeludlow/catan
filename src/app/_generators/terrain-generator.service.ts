import { Injectable } from "@angular/core";
import { Hex } from "../_models/Hex";
import { RandomService } from "../_services/random.service";
import { SeafarersMap } from "../_models/SeafarersMap";
import { Terrain } from "../_models/Terrain";
import { removeFromArrayIf } from "../_models/delegates";
import { ArrayService } from "../_services/array.service";

@Injectable({
    providedIn: "root",
})
export class TerrainGenerator {
    private static readonly minimumResourcesCount: number = 20;
    private static readonly requiredHexesCount: number = 42;
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
    private terrainCounts = {
        brick: {
            min: 3,
            max: 5,
        },
        desert: {
            min: 0,
            max: 1,
        },
        gold: {
            min: 2,
            max: 2,
        },
        rock: {
            min: 3,
            max: 5,
        },
        sea: {
            min: 12,
            max: 19,
        },
        sheep: {
            min: 4,
            max: 5,
        },
        tree: {
            min: 4,
            max: 5,
        },
        wheat: {
            min: 4,
            max: 5,
        },
    };
    private randomService: RandomService;
    private arrayService: ArrayService;

    constructor(randomService: RandomService, arrayService: ArrayService) {
        this.randomService = randomService;
        this.arrayService = arrayService;
    }

    public generateTerrain(map: SeafarersMap): SeafarersMap {
        let availableTerrains: Terrain[] = this.getAllAvailableTerrainsPool();
        availableTerrains = this.generateMinimumResourceTerrains(map, availableTerrains);
        for (
            let i = 0;
            i < TerrainGenerator.requiredHexesCount - TerrainGenerator.minimumResourcesCount;
            i++
        ) {
            const terrain: Terrain = this.randomService.getRandomElementFromArray(availableTerrains);
            availableTerrains = this.arrayService.removeFirstOccurrence(
                availableTerrains,
                (x: Terrain) => x === terrain
            );
            const randomCoords = this.getRandomUnusedCoords(map);
            map.setHexTerrain(randomCoords.randomRow, randomCoords.randomCol, terrain);
        }
        return map;
    }

    private generateMinimumResourceTerrains(map: SeafarersMap, availableTerrains: Terrain[]): Terrain[] {
        availableTerrains = this.generateTerrainXTimes(
            map,
            availableTerrains,
            Terrain.Brick,
            this.terrainCounts.brick.min
        );
        availableTerrains = this.generateTerrainXTimes(
            map,
            availableTerrains,
            Terrain.Gold,
            this.terrainCounts.gold.min
        );
        availableTerrains = this.generateTerrainXTimes(
            map,
            availableTerrains,
            Terrain.Rock,
            this.terrainCounts.rock.min
        );
        availableTerrains = this.generateTerrainXTimes(
            map,
            availableTerrains,
            Terrain.Sheep,
            this.terrainCounts.sheep.min
        );
        availableTerrains = this.generateTerrainXTimes(
            map,
            availableTerrains,
            Terrain.Tree,
            this.terrainCounts.tree.min
        );
        availableTerrains = this.generateTerrainXTimes(
            map,
            availableTerrains,
            Terrain.Wheat,
            this.terrainCounts.wheat.min
        );
        return availableTerrains;
    }

    private generateTerrainXTimes(
        map: SeafarersMap,
        availableTerrains: Terrain[],
        terrain: Terrain,
        numTimesToGenerate: number
    ): Terrain[] {
        for (let i = 0; i < numTimesToGenerate; i++) {
            availableTerrains = this.arrayService.removeFirstOccurrence(
                availableTerrains,
                (x: Terrain) => x === terrain
            );
            const randomCoords = this.getRandomUnusedCoords(map);
            map.setHexTerrain(randomCoords.randomRow, randomCoords.randomCol, terrain);
        }
        return availableTerrains;
    }

    public getAllAvailableTerrainsPool(): Terrain[] {
        let allAvailableTerrains: Terrain[] = new Array<Terrain>();
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Brick,
            this.terrainCounts.brick.max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Desert,
            this.terrainCounts.desert.max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Gold,
            this.terrainCounts.gold.max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Rock,
            this.terrainCounts.rock.max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Sea,
            this.terrainCounts.sea.max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Sheep,
            this.terrainCounts.sheep.max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Tree,
            this.terrainCounts.tree.max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            Terrain.Wheat,
            this.terrainCounts.wheat.max
        );
        return allAvailableTerrains;
    }

    private addTerrainToArrayXTimes(array: Terrain[], terrain: Terrain, x: number): Terrain[] {
        for (let i = 0; i < x; i++) {
            array.push(terrain);
        }
        return array;
    }

    private getRandomUnusedCoords(map: SeafarersMap): any {
        let randomRow: number = this.randomService.getRandomNumberExclusive(0, map.getRows().length);
        let randomCol: number = this.randomService.getRandomNumberExclusive(0, map.getRow(randomRow).length);
        let hexIsEmptyTerrain: boolean = map.getHex(randomRow, randomCol).getTerrain() === Terrain.Empty;
        if (hexIsEmptyTerrain) {
            return { randomRow, randomCol };
        } else {
            while (!hexIsEmptyTerrain) {
                randomRow = this.randomService.getRandomNumberExclusive(0, map.getRows().length);
                randomCol = this.randomService.getRandomNumberExclusive(0, map.getRow(randomRow).length);
                hexIsEmptyTerrain = map.getHex(randomRow, randomCol).getTerrain() === Terrain.Empty;
            }
            return { randomRow, randomCol };
        }
    }
}
