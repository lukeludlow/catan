import { Injectable } from "@angular/core";
import { Hex } from "./Hex";
import { RandomNumberService } from "./random-number.service";

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
            max: 3,
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

    public generateTerrain(hexes: Hex[][]): Hex[][] {
        let availableTerrains: string[] = this.getAllAvailableTerrainsPool();
        availableTerrains = this.generateMinimumResourceTerrains(hexes, availableTerrains);
        for (
            let i = 0;
            i < TerrainGeneratorService.requiredHexesCount - TerrainGeneratorService.minimumResourcesCount;
            i++
        ) {
            const terrain: string = this.randomNumberService.getRandomElementFromArray(availableTerrains);
            availableTerrains = this.removeFirstOccurrence(availableTerrains, terrain);
            const randomCoords = this.getRandomUnusedCoords(hexes);
            hexes[randomCoords.randomRow][randomCoords.randomCol].setTerrain(terrain);
        }
        return hexes;
    }

    private generateMinimumResourceTerrains(hexes: Hex[][], availableTerrains: string[]): string[] {
        availableTerrains = this.generateTerrainXTimes(hexes, availableTerrains, "brick", this.terrainCounts.brick.min);
        availableTerrains = this.generateTerrainXTimes(hexes, availableTerrains, "gold", this.terrainCounts.gold.min);
        availableTerrains = this.generateTerrainXTimes(hexes, availableTerrains, "rock", this.terrainCounts.rock.min);
        // availableTerrains = this.generateTerrainXTimes(hexes, availableTerrains, "sea", this.terrainCounts.sea.min);
        availableTerrains = this.generateTerrainXTimes(hexes, availableTerrains, "sheep", this.terrainCounts.sheep.min);
        availableTerrains = this.generateTerrainXTimes(hexes, availableTerrains, "tree", this.terrainCounts.tree.min);
        availableTerrains = this.generateTerrainXTimes(hexes, availableTerrains, "wheat", this.terrainCounts.wheat.min);
        return availableTerrains;
    }

    private generateTerrainXTimes(hexes: Hex[][], availableTerrains: string[], terrain: string, x: number): string[] {
        for (let i = 0; i < x; i++) {
            availableTerrains = this.removeFirstOccurrence(availableTerrains, terrain);
            const randomCoords = this.getRandomUnusedCoords(hexes);
            hexes[randomCoords.randomRow][randomCoords.randomCol].setTerrain(terrain);
        }
        return availableTerrains;
    }

    public getAllAvailableTerrainsPool(): string[] {
        let allAvailableTerrains: string[] = new Array<string>();
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            "brick",
            this.terrainCounts.brick.max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            "desert",
            this.terrainCounts.desert.max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(allAvailableTerrains, "gold", this.terrainCounts.gold.max);
        allAvailableTerrains = this.addTerrainToArrayXTimes(allAvailableTerrains, "rock", this.terrainCounts.rock.max);
        allAvailableTerrains = this.addTerrainToArrayXTimes(allAvailableTerrains, "sea", this.terrainCounts.sea.max);
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            "sheep",
            this.terrainCounts.sheep.max
        );
        allAvailableTerrains = this.addTerrainToArrayXTimes(allAvailableTerrains, "tree", this.terrainCounts.tree.max);
        allAvailableTerrains = this.addTerrainToArrayXTimes(
            allAvailableTerrains,
            "wheat",
            this.terrainCounts.wheat.max
        );
        return allAvailableTerrains;
    }

    private removeFirstOccurrence(array: string[], terrain: string): string[] {
        const index: number = array.findIndex((x) => x === terrain);
        array.splice(index, 1);
        return array;
    }

    private addTerrainToArrayXTimes(array: string[], terrain: string, x: number): string[] {
        for (let i = 0; i < x; i++) {
            array.push(terrain);
        }
        return array;
    }

    private assignTerrainType(hexes: Hex[][], terrainType: string, numberHexesToAssign: number): Hex[][] {
        for (let i = 0; i < numberHexesToAssign; i++) {
            if (this.areThereAnyAvailableCoords(hexes)) {
                const randomCoords = this.getRandomUnusedCoords(hexes);
                hexes[randomCoords.randomRow][randomCoords.randomCol].setTerrain(terrainType);
            }
        }
        return hexes;
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

    private areThereAnyAvailableCoords(hexes: Hex[][]): boolean {
        return hexes.some((row) => row.some((hex) => hex.getTerrain() === ""));
    }
}
