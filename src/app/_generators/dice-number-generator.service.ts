import { Injectable } from "@angular/core";
import { Hex } from "../_models/Hex";
import { RandomService } from "../_services/random.service";
import { CollisionDetector } from "../_validators/collision-detector.service";
import { Terrain } from "../_models/Terrain";
import { ArrayService } from "../_services/array.service";
import { CatanMap } from "../_maps/ICatanMap";
import { MapSettings } from "../_maps/MapSettings";

@Injectable({
    providedIn: "root",
})
export class DiceNumberGenerator {
    private randomService: RandomService;
    private arrayService: ArrayService;

    constructor(randomService: RandomService, arrayService: ArrayService) {
        this.randomService = randomService;
        this.arrayService = arrayService;
    }

    public generateDiceNumbers(map: CatanMap, settings: MapSettings): CatanMap {
        map = this.tryGenerateDiceNumbers(map, settings);
        return map;
    }

    public tryGenerateDiceNumbers(map: CatanMap, settings: MapSettings): CatanMap {
        map = this.resetDiceNumbers(map);
        let diceNumbers: number[] = this.getStartingDiceNumberPool(settings);
        const numTerrainsToAssign: number = this.countTerrainsToAssign(map);
        for (let i = 0; i < numTerrainsToAssign; i++) {
            const diceNumber: number = this.randomService.getRandomElementFromArray(diceNumbers);
            diceNumbers = this.arrayService.removeFirstOccurrence(diceNumbers, (x) => x === diceNumber);
            const randomCoords = this.getRandomUnusedCoords(map);
            map.setHexDiceNumber(randomCoords.randomRow, randomCoords.randomCol, diceNumber);
        }
        return map;
    }

    private resetDiceNumbers(map: CatanMap): CatanMap {
        map.getRows().forEach((row) => {
            row.forEach((hex) => {
                map.setHexDiceNumber(hex.getRow(), hex.getCol(), 0);
            });
        });
        return map;
    }

    private countTerrainsToAssign(map: CatanMap): number {
        let numTerrainsToAssign: number = 0;
        map.getRows().forEach((row) => {
            row.forEach((hex) => {
                if (hex.isResourceTerrain()) {
                    numTerrainsToAssign++;
                }
            });
        });
        return numTerrainsToAssign;
    }

    public getStartingDiceNumberPool(settings: MapSettings): number[] {
        let allDiceNumbers: number[] = new Array<number>();
        for (const diceNumber of settings.diceNumbers) {
            const dice: number = diceNumber[0];
            const count: number = diceNumber[1];
            allDiceNumbers = this.arrayService.addItemToArrayXTimes(allDiceNumbers, dice, count);
        }
        return allDiceNumbers;
    }

    // private areThereAnyAvailableCoords(map: CatanMap): boolean {
    // return map.getRows().some((row) => row.some((hex) => hex.isResourceTerrain() && hex.getDiceNumber() === 0));
    // }

    private getRandomUnusedCoords(map: CatanMap): any {
        let randomRow: number = this.randomService.getRandomNumberExclusive(0, map.getRows().length);
        let randomCol: number = this.randomService.getRandomNumberExclusive(0, map.getRow(randomRow).length);
        let hexHasNoDiceNumber: boolean = map.getHex(randomRow, randomCol).getDiceNumber() === 0;
        let hexIsResourceTerrain: boolean = map.getHex(randomRow, randomCol).isResourceTerrain();
        let okay: boolean = hexHasNoDiceNumber && hexIsResourceTerrain;
        if (okay) {
            return { randomRow, randomCol };
        } else {
            while (!okay) {
                randomRow = this.randomService.getRandomNumberExclusive(0, map.getRows().length);
                randomCol = this.randomService.getRandomNumberExclusive(0, map.getRow(randomRow).length);
                hexHasNoDiceNumber = map.getHex(randomRow, randomCol).getDiceNumber() === 0;
                hexIsResourceTerrain = map.getHex(randomRow, randomCol).isResourceTerrain();
                okay = hexHasNoDiceNumber && hexIsResourceTerrain;
            }
            return { randomRow, randomCol };
        }
    }
}
