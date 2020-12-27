import { TestBed } from "@angular/core/testing";

import { SeafarersMapGenerator } from "../_generators/seafarers-map-generator.service";
import { RandomService } from "../_services/random.service";
import { DiceNumberGenerator } from "../_generators/dice-number-generator.service";
import { TerrainGenerator } from "../_generators/terrain-generator.service";
import { SeafarersMap } from "../_maps/Seafarers/SeafarersMap";
import { PortGenerator } from "../_generators/port-generator.service";
import { IslandCounter } from "../_validators/island-counter.service";

describe("SeafarersMapGenerator", () => {
    let seafarersMapGenerator: SeafarersMapGenerator;
    let randomService: RandomService;
    let diceNumberGenerator: DiceNumberGenerator;
    let terrainGenerator: TerrainGenerator;
    let portGenerator: PortGenerator;
    let islandCounter: IslandCounter;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        seafarersMapGenerator = TestBed.inject(SeafarersMapGenerator);
        randomService = TestBed.inject(RandomService);
        diceNumberGenerator = TestBed.inject(DiceNumberGenerator);
        terrainGenerator = TestBed.inject(TerrainGenerator);
        portGenerator = TestBed.inject(PortGenerator);
        islandCounter = TestBed.inject(IslandCounter);
    });

    it("should be created", () => {
        expect(seafarersMapGenerator).toBeTruthy();
    });

    it("should generate non null map", () => {
        expect(seafarersMapGenerator.generateMap({ islands: 3 })).not.toBeNull();
    });

    it("should have no undefined hexes", () => {
        const result: SeafarersMap = seafarersMapGenerator.generateMap({ islands: 3 });
        result.getRows().forEach((row) => {
            row.forEach((hex) => {
                expect(hex).toBeDefined();
            });
        });
    });

    it("each hex should have terrain type defined", () => {
        const result: SeafarersMap = seafarersMapGenerator.generateMap({ islands: 3 });
        result.getRows().forEach((row) => {
            row.forEach((hex) => {
                expect(hex.getTerrain()).toBeDefined();
                expect(hex.getTerrain()).not.toEqual("");
            });
        });
    });

    it("should call dice number generator", () => {
        spyOn(diceNumberGenerator, "generateDiceNumbers").and.callThrough();
        const result: SeafarersMap = seafarersMapGenerator.generateMap({ islands: 3 });
        expect(diceNumberGenerator.generateDiceNumbers).toHaveBeenCalled();
    });

    it("should call terrain generator", () => {
        spyOn(terrainGenerator, "generateTerrain").and.callThrough();
        const result: SeafarersMap = seafarersMapGenerator.generateMap({ islands: 3 });
        expect(terrainGenerator.generateTerrain).toHaveBeenCalled();
    });

    it("should call port generator", () => {
        spyOn(portGenerator, "generatePorts").and.callThrough();
        const result: SeafarersMap = seafarersMapGenerator.generateMap({ islands: 3 });
        expect(portGenerator.generatePorts).toHaveBeenCalled();
    });

    it("should validate map", () => {
        spyOn(seafarersMapGenerator, "generateMap").and.callThrough();
        spyOn(seafarersMapGenerator, "validateMap").and.callThrough();
        const result: SeafarersMap = seafarersMapGenerator.generateMap({ islands: 3 });
        expect(seafarersMapGenerator.generateMap).toHaveBeenCalledTimes(1);
        expect(seafarersMapGenerator.validateMap).toHaveBeenCalled();
    });

    it("should regenerate every time validate fails", () => {
        spyOn(islandCounter, "countIslands").and.returnValues(1, 1, 4);
        spyOn(seafarersMapGenerator, "validateMap").and.callThrough();
        const result: SeafarersMap = seafarersMapGenerator.generateMap({ islands: 4 });
        expect(seafarersMapGenerator.validateMap).toHaveBeenCalledTimes(3);
    });

    describe("test map hex counts", () => {
        it("should provide 13 rows", () => {
            expect(seafarersMapGenerator.generateMap({ islands: 3 }).getRows().length).toEqual(13);
        });

        it("first and thirteenth should have two hexes", () => {
            expect(seafarersMapGenerator.generateMap({ islands: 3 }).getRow(0).length).toEqual(2);
            expect(seafarersMapGenerator.generateMap({ islands: 3 }).getRow(12).length).toEqual(2);
        });

        it("second and twelfth should have three hexes", () => {
            expect(seafarersMapGenerator.generateMap({ islands: 3 }).getRow(1).length).toEqual(3);
            expect(seafarersMapGenerator.generateMap({ islands: 3 }).getRow(11).length).toEqual(3);
        });

        it("third and eleventh should have four hexes", () => {
            expect(seafarersMapGenerator.generateMap({ islands: 3 }).getRow(2).length).toEqual(4);
            expect(seafarersMapGenerator.generateMap({ islands: 3 }).getRow(10).length).toEqual(4);
        });

        it("fourth and tenth should have three hexes", () => {
            expect(seafarersMapGenerator.generateMap({ islands: 3 }).getRow(3).length).toEqual(3);
            expect(seafarersMapGenerator.generateMap({ islands: 3 }).getRow(9).length).toEqual(3);
        });

        it("fifth and ninth should have four hexes", () => {
            expect(seafarersMapGenerator.generateMap({ islands: 3 }).getRow(4).length).toEqual(4);
            expect(seafarersMapGenerator.generateMap({ islands: 3 }).getRow(8).length).toEqual(4);
        });

        it("sixth and eighth should have three hexes", () => {
            expect(seafarersMapGenerator.generateMap({ islands: 3 }).getRow(5).length).toEqual(3);
            expect(seafarersMapGenerator.generateMap({ islands: 3 }).getRow(7).length).toEqual(3);
        });

        it("seventh should have four hexes", () => {
            expect(seafarersMapGenerator.generateMap({ islands: 3 }).getRow(6).length).toEqual(4);
        });
    });
});
