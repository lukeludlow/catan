import { TestBed } from "@angular/core/testing";

import { TerrainGenerator } from "../_generators/terrain-generator.service";
import { RandomService } from "../_services/random.service";
import { SeafarersMap } from "../_maps/Seafarers/SeafarersMap";
import { Terrain } from "../_models/Terrain";
import { MapSettings } from "../_maps/MapSettings";
import { SeafarersSettings } from "../_maps/Seafarers/SeafarersSettings";

describe("TerrainGenerator", () => {
    let terrainGenerator: TerrainGenerator;
    let randomService: RandomService;
    let map: SeafarersMap;
    let settings: MapSettings;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        terrainGenerator = TestBed.inject(TerrainGenerator);
        randomService = TestBed.inject(RandomService);
        map = new SeafarersMap();
        settings = new SeafarersSettings();
    });

    it("each hex should have terrain type defined", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map, settings);
        result.getRows().forEach((row) => {
            row.forEach((hex) => {
                expect(hex.getTerrain()).toBeDefined();
                expect(hex.getTerrain()).not.toEqual("");
            });
        });
    });

    // test for when min is too many tiles (throw exception)

    // test for when max is not enough tiles (throw exception)

    it("brick terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map, settings);
        expect(countHexesThatHaveTerrainType(result, Terrain.Brick)).toBeGreaterThanOrEqual(
            settings.terrainCounts.get(Terrain.Brick).min
        );
        expect(countHexesThatHaveTerrainType(result, Terrain.Brick)).toBeLessThanOrEqual(
            settings.terrainCounts.get(Terrain.Brick).max
        );
    });

    it("desert terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map, settings);
        expect(countHexesThatHaveTerrainType(result, Terrain.Desert)).toBeGreaterThanOrEqual(
            settings.terrainCounts.get(Terrain.Desert).min
        );
        expect(countHexesThatHaveTerrainType(result, Terrain.Desert)).toBeLessThanOrEqual(
            settings.terrainCounts.get(Terrain.Desert).max
        );
    });

    it("gold terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map, settings);
        expect(countHexesThatHaveTerrainType(result, Terrain.Gold)).toBeGreaterThanOrEqual(
            settings.terrainCounts.get(Terrain.Gold).min
        );
        expect(countHexesThatHaveTerrainType(result, Terrain.Gold)).toBeLessThanOrEqual(
            settings.terrainCounts.get(Terrain.Gold).max
        );
    });

    it("rock terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map, settings);
        expect(countHexesThatHaveTerrainType(result, Terrain.Rock)).toBeGreaterThanOrEqual(
            settings.terrainCounts.get(Terrain.Rock).min
        );
        expect(countHexesThatHaveTerrainType(result, Terrain.Rock)).toBeLessThanOrEqual(
            settings.terrainCounts.get(Terrain.Rock).max
        );
    });

    it("sea terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map, settings);
        expect(countHexesThatHaveTerrainType(result, Terrain.Sea)).toBeGreaterThanOrEqual(
            settings.terrainCounts.get(Terrain.Sea).min
        );
        expect(countHexesThatHaveTerrainType(result, Terrain.Sea)).toBeLessThanOrEqual(
            settings.terrainCounts.get(Terrain.Sea).max
        );
    });

    it("sheep terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map, settings);
        expect(countHexesThatHaveTerrainType(result, Terrain.Sheep)).toBeGreaterThanOrEqual(
            settings.terrainCounts.get(Terrain.Sheep).min
        );
        expect(countHexesThatHaveTerrainType(result, Terrain.Sheep)).toBeLessThanOrEqual(
            settings.terrainCounts.get(Terrain.Sheep).max
        );
    });

    it("tree terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map, settings);
        expect(countHexesThatHaveTerrainType(result, Terrain.Tree)).toBeGreaterThanOrEqual(
            settings.terrainCounts.get(Terrain.Tree).min
        );
        expect(countHexesThatHaveTerrainType(result, Terrain.Tree)).toBeLessThanOrEqual(
            settings.terrainCounts.get(Terrain.Tree).max
        );
    });

    it("wheat terrain count", () => {
        const result: SeafarersMap = terrainGenerator.generateTerrain(map, settings);
        expect(countHexesThatHaveTerrainType(result, Terrain.Wheat)).toBeGreaterThanOrEqual(
            settings.terrainCounts.get(Terrain.Wheat).min
        );
        expect(countHexesThatHaveTerrainType(result, Terrain.Wheat)).toBeLessThanOrEqual(
            settings.terrainCounts.get(Terrain.Wheat).max
        );
    });

    function countHexesThatHaveTerrainType(hexes: SeafarersMap, terrain: Terrain): number {
        return hexes.getRows().reduce((sum, row) => sum + row.filter((hex) => hex.getTerrain() === terrain).length, 0);
    }
});
