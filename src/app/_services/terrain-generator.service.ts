import { Injectable } from "@angular/core";
import { Hex } from "./model/Hex";
import { RandomNumberService } from "./random-number.service";
import { SeafarersMap } from "./model/SeafarersMap";
import { Terrain } from "./model/Terrain";

@Injectable({
    providedIn: "root",
})
export class TerrainGeneratorService {
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
    private randomNumberService: RandomNumberService;
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

    constructor(randomNumberService: RandomNumberService) {
        this.randomNumberService = randomNumberService;
    }

    public generateTerrain(map: SeafarersMap): SeafarersMap {
        let availableTerrains: Terrain[] = this.getAllAvailableTerrainsPool();
        availableTerrains = this.generateMinimumResourceTerrains(map, availableTerrains);
        for (
            let i = 0;
            i < TerrainGeneratorService.requiredHexesCount - TerrainGeneratorService.minimumResourcesCount;
            i++
        ) {
            const terrain: Terrain = this.randomNumberService.getRandomElementFromArray(availableTerrains);
            availableTerrains = this.removeFirstOccurrence(availableTerrains, terrain);
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
        x: number
    ): Terrain[] {
        for (let i = 0; i < x; i++) {
            availableTerrains = this.removeFirstOccurrence(availableTerrains, terrain);
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

    private removeFirstOccurrence(array: Terrain[], terrain: Terrain): Terrain[] {
        const index: number = array.findIndex((x) => x === terrain);
        array.splice(index, 1);
        return array;
    }

    private addTerrainToArrayXTimes(array: Terrain[], terrain: Terrain, x: number): Terrain[] {
        for (let i = 0; i < x; i++) {
            array.push(terrain);
        }
        return array;
    }

    private getRandomUnusedCoords(map: SeafarersMap): any {
        let randomRow: number = this.randomNumberService.getRandomNumberExclusive(0, map.getRows().length);
        let randomCol: number = this.randomNumberService.getRandomNumberExclusive(0, map.getRow(randomRow).length);
        let hexIsEmptyTerrain: boolean = map.getHex(randomRow, randomCol).getTerrain() === Terrain.Empty;
        if (hexIsEmptyTerrain) {
            return { randomRow, randomCol };
        } else {
            while (!hexIsEmptyTerrain) {
                randomRow = this.randomNumberService.getRandomNumberExclusive(0, map.getRows().length);
                randomCol = this.randomNumberService.getRandomNumberExclusive(0, map.getRow(randomRow).length);
                hexIsEmptyTerrain = map.getHex(randomRow, randomCol).getTerrain() === Terrain.Empty;
            }
            return { randomRow, randomCol };
        }
    }
}