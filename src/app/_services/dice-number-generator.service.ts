import { Injectable } from "@angular/core";
import { Hex } from "./Hex";
import { RandomNumberService } from "./random-number.service";

@Injectable({
    providedIn: "root",
})
export class DiceNumberGeneratorService {
    private randomNumberService: RandomNumberService;

    constructor(randomNumberService: RandomNumberService) {
        this.randomNumberService = randomNumberService;
    }

    public assignDiceNumbers(hexes: Hex[][]): Hex[][] {
        let diceNumbers: number[] = this.getStartingDiceNumberPool();
        const numTerrainsToAssign: number = this.countTerrainsToAssign(hexes);
        for (let i = 0; i < numTerrainsToAssign; i++) {
            const diceNumber: number = this.randomNumberService.getRandomElementFromArray(diceNumbers);
            diceNumbers = this.removeFirstOccurrence(diceNumbers, diceNumber);
            const randomCoords = this.getRandomUnusedCoords(hexes);
            hexes[randomCoords.randomRow][randomCoords.randomCol].setDiceNumber(diceNumber);
        }
        // hexes = this.assignDiceNumber(hexes, 2, 1, 2);
        // hexes = this.assignDiceNumber(hexes, 3, 2, 3);
        // hexes = this.assignDiceNumber(hexes, 4, 2, 3);
        // hexes = this.assignDiceNumber(hexes, 5, 2, 3);
        // hexes = this.assignDiceNumber(hexes, 6, 2, 3);
        // hexes = this.assignDiceNumber(hexes, 8, 2, 3);
        // hexes = this.assignDiceNumber(hexes, 9, 2, 3);
        // hexes = this.assignDiceNumber(hexes, 10, 2, 3);
        // hexes = this.assignDiceNumber(hexes, 11, 2, 3);
        // hexes = this.assignDiceNumber(hexes, 12, 1, 2);
        return hexes;
    }

    private removeFirstOccurrence(array: number[], diceNumberToRemove: number): number[] {
        const index: number = array.findIndex((x) => x === diceNumberToRemove);
        array = array.splice(index, 1);
        return array;
    }

    private countTerrainsToAssign(hexes: Hex[][]): number {
        let numTerrainsToAssign: number = 0;
        hexes.forEach((row) => {
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

    private assignDiceNumber(
        hexes: Hex[][],
        diceNumber: number,
        minPiecesToCreate: number,
        maxPiecesToCreate: number
    ): Hex[][] {
        const numPiecesToCreate = this.randomNumberService.getRandomNumberInclusive(
            minPiecesToCreate,
            maxPiecesToCreate
        );
        for (let i = 0; i < numPiecesToCreate; i++) {
            if (this.areThereAnyAvailableCoords(hexes)) {
                const randomCoords = this.getRandomUnusedCoords(hexes);
                hexes[randomCoords.randomRow][randomCoords.randomCol].setDiceNumber(diceNumber);
            }
        }
        return hexes;
    }

    private areThereAnyAvailableCoords(hexes: Hex[][]): boolean {
        return hexes.some((row) => row.some((hex) => this.isValidTerrain(hex) && hex.getDiceNumber() === 0));
    }

    private getRandomUnusedCoords(hexes: Hex[][]): any {
        let randomRow: number = this.randomNumberService.getRandomNumberExclusive(0, hexes.length);
        let randomCol: number = this.randomNumberService.getRandomNumberExclusive(0, hexes[randomRow].length);
        let hexHasNoDiceNumber: boolean = hexes[randomRow][randomCol].getDiceNumber() === 0;
        let hexIsResourceTerrain: boolean = this.isValidTerrain(hexes[randomRow][randomCol]);
        let okay: boolean = hexHasNoDiceNumber && hexIsResourceTerrain;
        if (okay) {
            return { randomRow, randomCol };
        } else {
            while (!okay) {
                randomRow = this.randomNumberService.getRandomNumberExclusive(0, hexes.length);
                randomCol = this.randomNumberService.getRandomNumberExclusive(0, hexes[randomRow].length);
                hexHasNoDiceNumber = hexes[randomRow][randomCol].getDiceNumber() === 0;
                hexIsResourceTerrain = this.isValidTerrain(hexes[randomRow][randomCol]);
                okay = hexHasNoDiceNumber && hexIsResourceTerrain;
            }
            return { randomRow, randomCol };
        }
    }

    private isValidTerrain(hex: Hex): boolean {
        if (hex.getTerrain() !== "" && hex.getTerrain() !== "sea" && hex.getTerrain() !== "desert") {
            return true;
        } else {
            return false;
        }
    }
}
