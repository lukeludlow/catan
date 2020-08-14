import { TestBed } from "@angular/core/testing";

import { TerrainGeneratorService } from "./terrain-generator.service";
import { Hex } from "./model/Hex";
import { RandomNumberService } from "./random-number.service";
import { SeafarersMap } from "./model/SeafarersMap";
import { Terrain } from "./model/Terrain";

describe("TerrainGeneratorService", () => {
    let terrainGenerator: TerrainGeneratorService;
    let randomNumberService: RandomNumberService;
    let map: SeafarersMap;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        terrainGenerator = TestBed.inject(TerrainGeneratorService);
        randomNumberService = TestBed.inject(RandomNumberService);
        map = new SeafarersMap();
    });

    it("each hex should have terrain type defined", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map);
        result.getRows().forEach((row) => {
            row.forEach((hex) => {
                expect(hex.getTerrain()).toBeDefined();
                expect(hex.getTerrain()).not.toEqual("");
            });
        });
    });

    it("brick terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map);
        expect(countHexesThatHaveTerrainType(result, Terrain.Brick)).toBeGreaterThanOrEqual(3);
        expect(countHexesThatHaveTerrainType(result, Terrain.Brick)).toBeLessThanOrEqual(5);
    });

    it("desert terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map);
        expect(countHexesThatHaveTerrainType(result, Terrain.Desert)).toBeGreaterThanOrEqual(0);
        expect(countHexesThatHaveTerrainType(result, Terrain.Desert)).toBeLessThanOrEqual(3);
    });

    it("gold terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map);
        expect(countHexesThatHaveTerrainType(result, Terrain.Gold)).toEqual(2);
    });

    it("rock terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map);
        expect(countHexesThatHaveTerrainType(result, Terrain.Rock)).toBeGreaterThanOrEqual(3);
        expect(countHexesThatHaveTerrainType(result, Terrain.Rock)).toBeLessThanOrEqual(5);
    });

    it("sea terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map);
        expect(countHexesThatHaveTerrainType(result, Terrain.Sea)).toBeGreaterThanOrEqual(12);
        expect(countHexesThatHaveTerrainType(result, Terrain.Sea)).toBeLessThanOrEqual(19);
    });

    it("sheep terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map);
        expect(countHexesThatHaveTerrainType(result, Terrain.Sheep)).toBeGreaterThanOrEqual(4);
        expect(countHexesThatHaveTerrainType(result, Terrain.Sheep)).toBeLessThanOrEqual(5);
    });

    it("tree terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map);
        expect(countHexesThatHaveTerrainType(result, Terrain.Tree)).toBeGreaterThanOrEqual(4);
        expect(countHexesThatHaveTerrainType(result, Terrain.Tree)).toBeLessThanOrEqual(5);
    });

    it("wheat terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map);
        expect(countHexesThatHaveTerrainType(result, Terrain.Wheat)).toBeGreaterThanOrEqual(4);
        expect(countHexesThatHaveTerrainType(result, Terrain.Wheat)).toBeLessThanOrEqual(5);
    });

    function countHexesThatHaveTerrainType(hexes: SeafarersMap, terrain: Terrain): number {
        return hexes.getRows().reduce((sum, row) => sum + row.filter((hex) => hex.getTerrain() === terrain).length, 0);
    }
});
