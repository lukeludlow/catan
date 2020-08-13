import { TestBed } from "@angular/core/testing";

import { DiceNumberGeneratorService } from "./dice-number-generator.service";
import { Hex } from "./Hex";
import { RandomNumberService } from "./random-number.service";

describe("DiceNumberGeneratorService", () => {
    let diceNumberGeneratorService: DiceNumberGeneratorService;
    let randomNumberService: RandomNumberService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        diceNumberGeneratorService = TestBed.inject(DiceNumberGeneratorService);
        randomNumberService = TestBed.inject(RandomNumberService);
    });

    it("should be created", () => {
        expect(diceNumberGeneratorService).toBeTruthy();
    });

    it("should assign zero to sea hexes", () => {
        const input: Hex[][] = getBlankHexMap();
        input[0][0] = new Hex("sea");
        const result: Hex[][] = diceNumberGeneratorService.assignDiceNumbers(input);
        expect(result[0][0].getDiceNumber()).toEqual(0);
    });

    it("resource terrain should have number between two and twelve", () => {
        const input: Hex[][] = getBlankHexMap();
        input[0][0] = new Hex("rock");
        const result: Hex[][] = diceNumberGeneratorService.assignDiceNumbers(input);
        expect(result[0][0].getDiceNumber()).toBeGreaterThanOrEqual(2);
        expect(result[0][0].getDiceNumber()).toBeLessThanOrEqual(12);
    });

    it("should only generate numbers for available terrains", () => {
        const input: Hex[][] = getBlankHexMap();
        input[0][0] = new Hex("rock");
        const result: Hex[][] = diceNumberGeneratorService.assignDiceNumbers(input);
        for (let row = 0; row < result.length; row++) {
            for (let col = 0; col < result[row].length; col++) {
                if (row === 0 && col === 0) {
                    expect(result[row][col].getDiceNumber()).toBeGreaterThanOrEqual(2);
                    expect(result[row][col].getDiceNumber()).toBeLessThanOrEqual(12);
                } else {
                    expect(result[row][col].getDiceNumber()).toEqual(0);
                }
            }
        }
    });

    it("should generate numbers for every terrain", () => {
        const input: Hex[][] = getSampleHexMapWithMaximumResources();
        const result: Hex[][] = diceNumberGeneratorService.assignDiceNumbers(input);
        for (let row = 0; row < result.length; row++) {
            for (let col = 0; col < result[row].length; col++) {
                if (result[row][col].getTerrain() === "sea" || result[row][col].getTerrain() === "desert") {
                    expect(result[row][col].getDiceNumber()).toEqual(0);
                } else {
                    expect(result[row][col].getDiceNumber()).toBeGreaterThanOrEqual(2);
                    expect(result[row][col].getDiceNumber()).toBeLessThanOrEqual(12);
                }
            }
        }
    });

    it("should choose dice number from pool", () => {
        spyOn(randomNumberService, "getRandomElementFromArray").and.returnValue(9);
        const input: Hex[][] = getBlankHexMap();
        input[0][0] = new Hex("rock");
        const result: Hex[][] = diceNumberGeneratorService.assignDiceNumbers(input);
        expect(result[0][0].getDiceNumber()).toEqual(9);
    });

    it("should create dice number pool with proper number counts", () => {
        const diceNumberPool: number[] = diceNumberGeneratorService.getStartingDiceNumberPool();
        expect(diceNumberPool.filter((x) => x === 2).length).toEqual(2);
        expect(diceNumberPool.filter((x) => x === 3).length).toEqual(3);
        expect(diceNumberPool.filter((x) => x === 4).length).toEqual(3);
        expect(diceNumberPool.filter((x) => x === 5).length).toEqual(3);
        expect(diceNumberPool.filter((x) => x === 6).length).toEqual(3);
        expect(diceNumberPool.filter((x) => x === 8).length).toEqual(3);
        expect(diceNumberPool.filter((x) => x === 9).length).toEqual(3);
        expect(diceNumberPool.filter((x) => x === 10).length).toEqual(3);
        expect(diceNumberPool.filter((x) => x === 11).length).toEqual(3);
        expect(diceNumberPool.filter((x) => x === 12).length).toEqual(2);
    });

    // it("twos", () => {
    //     testMinMax(2, 1, 2);
    // });

    // it("threes", () => {
    //     testMinMax(3, 2, 3);
    // });

    // it("fours", () => {
    //     testMinMax(4, 2, 3);
    // });

    // it("fives", () => {
    //     testMinMax(5, 2, 3);
    // });

    // it("sixes", () => {
    //     testMinMax(6, 2, 3);
    // });

    // it("eights", () => {
    //     testMinMax(8, 2, 3);
    // });

    // it("nines", () => {
    //     testMinMax(9, 2, 3);
    // });

    // it("tens", () => {
    //     testMinMax(10, 2, 3);
    // });

    // it("elevens", () => {
    //     testMinMax(11, 2, 3);
    // });

    // it("twelves", () => {
    //     testMinMax(12, 1, 2);
    // });

    // function testMinMax(diceNumber: number, minPieces: number, maxPieces: number): void {
    //     const minInput: Hex[][] = getSampleHexMapWithMinimumResources();
    //     const minResult: Hex[][] = diceNumberGeneratorService.assignDiceNumbers(minInput);
    //     const minDiceNumberCount = countHexesThatHaveDiceNumber(minResult, diceNumber);
    //     expect(minDiceNumberCount).toBeGreaterThanOrEqual(minPieces);
    //     const maxInput: Hex[][] = getSampleHexMapWithMaximumResources();
    //     const maxResult: Hex[][] = diceNumberGeneratorService.assignDiceNumbers(maxInput);
    //     const maxDiceNumberCount = countHexesThatHaveDiceNumber(maxResult, diceNumber);
    //     expect(maxDiceNumberCount).toBeLessThanOrEqual(maxPieces);
    // }

    function getSampleHexMapWithMinimumResources(): Hex[][] {
        const hexMap: Hex[][] = getBlankHexMap();

        hexMap[0][0].setTerrain("brick");
        hexMap[0][1].setTerrain("brick");
        hexMap[1][0].setTerrain("brick");

        hexMap[1][1].setTerrain("rock");
        hexMap[1][2].setTerrain("rock");
        hexMap[2][0].setTerrain("rock");

        hexMap[2][1].setTerrain("sheep");
        hexMap[2][2].setTerrain("sheep");
        hexMap[2][3].setTerrain("sheep");
        hexMap[3][0].setTerrain("sheep");

        hexMap[3][1].setTerrain("tree");
        hexMap[3][2].setTerrain("tree");
        hexMap[4][0].setTerrain("tree");
        hexMap[4][1].setTerrain("tree");

        hexMap[4][2].setTerrain("wheat");
        hexMap[4][3].setTerrain("wheat");
        hexMap[5][0].setTerrain("wheat");
        hexMap[5][1].setTerrain("wheat");

        return hexMap;
    }

    function getSampleHexMapWithMaximumResources(): Hex[][] {
        const hexMap: Hex[][] = getBlankHexMap();

        hexMap[0][0].setTerrain("brick");
        hexMap[0][1].setTerrain("brick");
        hexMap[1][0].setTerrain("brick");
        hexMap[1][1].setTerrain("brick");
        hexMap[1][2].setTerrain("brick");

        hexMap[2][0].setTerrain("rock");
        hexMap[2][1].setTerrain("rock");
        hexMap[2][2].setTerrain("rock");
        hexMap[2][3].setTerrain("rock");
        hexMap[3][0].setTerrain("rock");

        hexMap[3][1].setTerrain("sheep");
        hexMap[3][2].setTerrain("sheep");
        hexMap[4][0].setTerrain("sheep");
        hexMap[4][1].setTerrain("sheep");
        hexMap[4][2].setTerrain("sheep");

        hexMap[4][3].setTerrain("tree");
        hexMap[5][0].setTerrain("tree");
        hexMap[5][1].setTerrain("tree");
        hexMap[5][2].setTerrain("tree");
        hexMap[6][0].setTerrain("tree");

        hexMap[6][1].setTerrain("wheat");
        hexMap[6][2].setTerrain("wheat");
        hexMap[6][3].setTerrain("wheat");
        hexMap[7][0].setTerrain("wheat");
        hexMap[7][1].setTerrain("wheat");

        hexMap[7][2].setTerrain("gold");
        hexMap[8][0].setTerrain("gold");

        return hexMap;
    }

    function getBlankHexMap(): Hex[][] {
        const blankMap: Hex[][] = new Array<Array<Hex>>(13);
        blankMap[0] = new Array<Hex>(2);
        blankMap[1] = new Array<Hex>(3);
        blankMap[2] = new Array<Hex>(4);
        blankMap[3] = new Array<Hex>(3);
        blankMap[4] = new Array<Hex>(4);
        blankMap[5] = new Array<Hex>(3);
        blankMap[6] = new Array<Hex>(4);
        blankMap[7] = new Array<Hex>(3);
        blankMap[8] = new Array<Hex>(4);
        blankMap[9] = new Array<Hex>(3);
        blankMap[10] = new Array<Hex>(4);
        blankMap[11] = new Array<Hex>(3);
        blankMap[12] = new Array<Hex>(2);
        for (let row = 0; row < blankMap.length; row++) {
            for (let col = 0; col < blankMap[row].length; col++) {
                blankMap[row][col] = new Hex("sea");
            }
        }
        return blankMap;
    }

    function countHexesThatHaveDiceNumber(hexes: Hex[][], diceNumber: number): number {
        return hexes.reduce((sum, row) => sum + row.filter((hex) => hex.getDiceNumber() === diceNumber).length, 0);
    }
});
