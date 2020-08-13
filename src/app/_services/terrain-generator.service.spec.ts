import { TestBed } from "@angular/core/testing";

import { TerrainGeneratorService } from "./terrain-generator.service";
import { Hex } from "./Hex";
import { RandomNumberService } from "./random-number.service";

describe("TerrainGeneratorService", () => {
    let terrainGenerator: TerrainGeneratorService;
    let randomNumberService: RandomNumberService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        terrainGenerator = TestBed.inject(TerrainGeneratorService);
        randomNumberService = TestBed.inject(RandomNumberService);
    });

    it("each hex should have terrain type defined", () => {
        const result: Hex[][] = terrainGenerator.generateTerrain(getBlankHexMap());
        result.forEach((row) => {
            row.forEach((hex) => {
                expect(hex.getTerrain()).toBeDefined();
                expect(hex.getTerrain()).not.toEqual("");
            });
        });
    });

    it("brick terrain count", () => {
        const result: Hex[][] = terrainGenerator.generateTerrain(getBlankHexMap());
        expect(countHexesThatHaveTerrainType(result, "brick")).toBeGreaterThanOrEqual(3);
        expect(countHexesThatHaveTerrainType(result, "brick")).toBeLessThanOrEqual(5);
    });

    it("desert terrain count", () => {
        const result: Hex[][] = terrainGenerator.generateTerrain(getBlankHexMap());
        expect(countHexesThatHaveTerrainType(result, "desert")).toBeGreaterThanOrEqual(0);
        expect(countHexesThatHaveTerrainType(result, "desert")).toBeLessThanOrEqual(3);
    });

    it("gold terrain count", () => {
        const result: Hex[][] = terrainGenerator.generateTerrain(getBlankHexMap());
        // expect(countHexesThatHaveTerrainType(result, "gold")).toBeGreaterThanOrEqual(0);
        // expect(countHexesThatHaveTerrainType(result, "gold")).toBeLessThanOrEqual(2);
        expect(countHexesThatHaveTerrainType(result, "gold")).toEqual(2);
    });

    it("rock terrain count", () => {
        const result: Hex[][] = terrainGenerator.generateTerrain(getBlankHexMap());
        expect(countHexesThatHaveTerrainType(result, "rock")).toBeGreaterThanOrEqual(3);
        expect(countHexesThatHaveTerrainType(result, "rock")).toBeLessThanOrEqual(5);
    });

    it("sea terrain count", () => {
        const result: Hex[][] = terrainGenerator.generateTerrain(getBlankHexMap());
        expect(countHexesThatHaveTerrainType(result, "sea")).toBeGreaterThanOrEqual(12);
        expect(countHexesThatHaveTerrainType(result, "sea")).toBeLessThanOrEqual(19);
    });

    it("sheep terrain count", () => {
        const result: Hex[][] = terrainGenerator.generateTerrain(getBlankHexMap());
        expect(countHexesThatHaveTerrainType(result, "sheep")).toBeGreaterThanOrEqual(4);
        expect(countHexesThatHaveTerrainType(result, "sheep")).toBeLessThanOrEqual(5);
    });

    it("tree terrain count", () => {
        const result: Hex[][] = terrainGenerator.generateTerrain(getBlankHexMap());
        expect(countHexesThatHaveTerrainType(result, "tree")).toBeGreaterThanOrEqual(4);
        expect(countHexesThatHaveTerrainType(result, "tree")).toBeLessThanOrEqual(5);
    });

    it("wheat terrain count", () => {
        const result: Hex[][] = terrainGenerator.generateTerrain(getBlankHexMap());
        expect(countHexesThatHaveTerrainType(result, "wheat")).toBeGreaterThanOrEqual(4);
        expect(countHexesThatHaveTerrainType(result, "wheat")).toBeLessThanOrEqual(5);
    });

    function countHexesThatHaveTerrainType(hexes: Hex[][], terrain: string): number {
        return hexes.reduce((sum, row) => sum + row.filter((hex) => hex.getTerrain() === terrain).length, 0);
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
                blankMap[row][col] = new Hex();
            }
        }
        return blankMap;
    }
});
