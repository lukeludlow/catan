import { Injectable } from "@angular/core";
import { Hex } from "./model/Hex";
import { RandomService } from "./random.service";
import { CollisionDetectorService } from "./collision-detector.service";
import { SeafarersMap } from "./model/SeafarersMap";
import { Terrain } from "./model/Terrain";
import { ArrayService } from "./array.service";

@Injectable({
    providedIn: "root",
})
export class DiceNumberGeneratorService {
    private randomService: RandomService;
    private collisionDetecter: CollisionDetectorService;
    private arrayService: ArrayService;

    constructor(randomService: RandomService, collisionDetector: CollisionDetectorService, arrayService: ArrayService) {
        this.randomService = randomService;
        this.collisionDetecter = collisionDetector;
        this.arrayService = arrayService;
    }

    public generateDiceNumbers(map: SeafarersMap): SeafarersMap {
        map = this.tryGenerateDiceNumbers(map);
        let numTimesGenerated: number = 1;
        while (this.collisionDetecter.detectCollisions(map)) {
            map = this.tryGenerateDiceNumbers(map);
            numTimesGenerated++;
        }
        console.log(
            `successfully generated dice numbeers. it took ${numTimesGenerated} times to generate a map with no collisions`
        );
        return map;
    }

    public tryGenerateDiceNumbers(map: SeafarersMap): SeafarersMap {
        map = this.resetDiceNumbers(map);
        let diceNumbers: number[] = this.getStartingDiceNumberPool();
        const numTerrainsToAssign: number = this.countTerrainsToAssign(map);
        for (let i = 0; i < numTerrainsToAssign; i++) {
            const diceNumber: number = this.randomService.getRandomElementFromArray(diceNumbers);
            diceNumbers = this.arrayService.removeFirstOccurrence(diceNumbers, (x) => x === diceNumber);
            const randomCoords = this.getRandomUnusedCoords(map);
            map.setHexDiceNumber(randomCoords.randomRow, randomCoords.randomCol, diceNumber);
        }
        return map;
    }

    private resetDiceNumbers(map: SeafarersMap): SeafarersMap {
        map.getRows().forEach((row) => {
            row.forEach((hex) => {
                map.setHexDiceNumber(hex.getRow(), hex.getCol(), 0);
            });
        });
        return map;
    }

    private countTerrainsToAssign(map: SeafarersMap): number {
        let numTerrainsToAssign: number = 0;
        map.getRows().forEach((row) => {
            row.forEach((hex) => {
                if (this.isValidTerrain(hex)) {
                    numTerrainsToAssign++;
                }
            });
        });
        return numTerrainsToAssign;
    }

    public getStartingDiceNumberPool(): number[] {
        let allDiceNumbers: number[] = new Array<number>();
        allDiceNumbers = this.addDiceNumberToArrayXTimes(allDiceNumbers, 2, 2);
        allDiceNumbers = this.addDiceNumberToArrayXTimes(allDiceNumbers, 3, 3);
        allDiceNumbers = this.addDiceNumberToArrayXTimes(allDiceNumbers, 4, 3);
        allDiceNumbers = this.addDiceNumberToArrayXTimes(allDiceNumbers, 5, 3);
        allDiceNumbers = this.addDiceNumberToArrayXTimes(allDiceNumbers, 6, 3);
        allDiceNumbers = this.addDiceNumberToArrayXTimes(allDiceNumbers, 8, 3);
        allDiceNumbers = this.addDiceNumberToArrayXTimes(allDiceNumbers, 9, 3);
        allDiceNumbers = this.addDiceNumberToArrayXTimes(allDiceNumbers, 10, 3);
        allDiceNumbers = this.addDiceNumberToArrayXTimes(allDiceNumbers, 11, 3);
        allDiceNumbers = this.addDiceNumberToArrayXTimes(allDiceNumbers, 12, 2);
        return allDiceNumbers;
    }

    private addDiceNumberToArrayXTimes(array: number[], diceNumber: number, x: number): number[] {
        for (let i = 0; i < x; i++) {
            array.push(diceNumber);
        }
        return array;
    }

    private areThereAnyAvailableCoords(map: SeafarersMap): boolean {
        return map.getRows().some((row) => row.some((hex) => this.isValidTerrain(hex) && hex.getDiceNumber() === 0));
    }

    private getRandomUnusedCoords(map: SeafarersMap): any {
        let randomRow: number = this.randomService.getRandomNumberExclusive(0, map.getRows().length);
        let randomCol: number = this.randomService.getRandomNumberExclusive(0, map.getRow(randomRow).length);
        let hexHasNoDiceNumber: boolean = map.getHex(randomRow, randomCol).getDiceNumber() === 0;
        let hexIsResourceTerrain: boolean = this.isValidTerrain(map.getHex(randomRow, randomCol));
        let okay: boolean = hexHasNoDiceNumber && hexIsResourceTerrain;
        if (okay) {
            return { randomRow, randomCol };
        } else {
            while (!okay) {
                randomRow = this.randomService.getRandomNumberExclusive(0, map.getRows().length);
                randomCol = this.randomService.getRandomNumberExclusive(0, map.getRow(randomRow).length);
                hexHasNoDiceNumber = map.getHex(randomRow, randomCol).getDiceNumber() === 0;
                hexIsResourceTerrain = this.isValidTerrain(map.getHex(randomRow, randomCol));
                okay = hexHasNoDiceNumber && hexIsResourceTerrain;
            }
            return { randomRow, randomCol };
        }
    }

    private isValidTerrain(hex: Hex): boolean {
        if (
            hex.getTerrain() !== Terrain.Empty &&
            hex.getTerrain() !== Terrain.Sea &&
            hex.getTerrain() !== Terrain.Desert
        ) {
            return true;
        } else {
            return false;
        }
    }
}
