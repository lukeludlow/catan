import { TestBed } from "@angular/core/testing";

import { SeafarersMapGenerator } from "./seafarers-map-generator.service";
import { Hex } from "./Hex";
import { RandomNumberService } from "./random-number.service";
import { DiceNumberGeneratorService } from "./dice-number-generator.service";
import { TerrainGeneratorService } from "./terrain-generator.service";

describe("SeafarersMapGenerator", () => {
    let seafarersMapGenerator: SeafarersMapGenerator;
    let randomNumberService: RandomNumberService;
    let diceNumberGenerator: DiceNumberGeneratorService;
    let terrainGenerator: TerrainGeneratorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        seafarersMapGenerator = TestBed.inject(SeafarersMapGenerator);
        randomNumberService = TestBed.inject(RandomNumberService);
        diceNumberGenerator = TestBed.inject(DiceNumberGeneratorService);
        terrainGenerator = TestBed.inject(TerrainGeneratorService);
    });

    it("should be created", () => {
        expect(seafarersMapGenerator).toBeTruthy();
    });

    it("should generate non null map", () => {
        expect(seafarersMapGenerator.generateMap()).not.toBeNull();
    });

    it("should have no undefined hexes", () => {
        const result: Hex[][] = seafarersMapGenerator.generateMap();
        result.forEach((row) => {
            row.forEach((hex) => {
                expect(hex).toBeDefined();
            });
        });
    });

    it("each hex should have terrain type defined", () => {
        const result: Hex[][] = seafarersMapGenerator.generateMap();
        result.forEach((row) => {
            row.forEach((hex) => {
                expect(hex.getTerrain()).toBeDefined();
                expect(hex.getTerrain()).not.toEqual("");
            });
        });
    });

    it("should call dice number generator", () => {
        spyOn(diceNumberGenerator, "assignDiceNumbers").and.callThrough();
        const result: Hex[][] = seafarersMapGenerator.generateMap();
        expect(diceNumberGenerator.assignDiceNumbers).toHaveBeenCalled();
    });

    it("should call terrain generator", () => {
        spyOn(terrainGenerator, "generateTerrain").and.callThrough();
        const result: Hex[][] = seafarersMapGenerator.generateMap();
        expect(terrainGenerator.generateTerrain).toHaveBeenCalled();
    });

    describe("test map hex counts", () => {
        it("should provide 13 rows", () => {
            expect(seafarersMapGenerator.generateMap().length).toEqual(13);
        });

        it("first and thirteenth should have two hexes", () => {
            expect(seafarersMapGenerator.generateMap()[0].length).toEqual(2);
            expect(seafarersMapGenerator.generateMap()[12].length).toEqual(2);
        });

        it("second and twelfth should have three hexes", () => {
            expect(seafarersMapGenerator.generateMap()[1].length).toEqual(3);
            expect(seafarersMapGenerator.generateMap()[11].length).toEqual(3);
        });

        it("third and eleventh should have four hexes", () => {
            expect(seafarersMapGenerator.generateMap()[2].length).toEqual(4);
            expect(seafarersMapGenerator.generateMap()[10].length).toEqual(4);
        });

        it("fourth and tenth should have three hexes", () => {
            expect(seafarersMapGenerator.generateMap()[3].length).toEqual(3);
            expect(seafarersMapGenerator.generateMap()[9].length).toEqual(3);
        });

        it("fifth and ninth should have four hexes", () => {
            expect(seafarersMapGenerator.generateMap()[4].length).toEqual(4);
            expect(seafarersMapGenerator.generateMap()[8].length).toEqual(4);
        });

        it("sixth and eighth should have three hexes", () => {
            expect(seafarersMapGenerator.generateMap()[5].length).toEqual(3);
            expect(seafarersMapGenerator.generateMap()[7].length).toEqual(3);
        });

        it("seventh should have four hexes", () => {
            expect(seafarersMapGenerator.generateMap()[6].length).toEqual(4);
        });
    });
});
