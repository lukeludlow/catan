import { TestBed } from "@angular/core/testing";

import { SeafarersMapGenerator } from "../_generators/seafarers-map-generator.service";
import { RandomService } from "../_services/random.service";
import { DiceNumberGenerator } from "../_generators/dice-number-generator.service";
import { TerrainGenerator } from "../_generators/terrain-generator.service";
import { SeafarersMap } from "../_models/SeafarersMap";
import { PortGenerator } from "../_generators/port-generator.service";

describe("SeafarersMapGenerator", () => {
    let seafarersMapGenerator: SeafarersMapGenerator;
    let randomService: RandomService;
    let diceNumberGenerator: DiceNumberGenerator;
    let terrainGenerator: TerrainGenerator;
    let portGenerator: PortGenerator;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        seafarersMapGenerator = TestBed.inject(SeafarersMapGenerator);
        randomService = TestBed.inject(RandomService);
        diceNumberGenerator = TestBed.inject(DiceNumberGenerator);
        terrainGenerator = TestBed.inject(TerrainGenerator);
        portGenerator = TestBed.inject(PortGenerator);
    });

    it("should be created", () => {
        expect(seafarersMapGenerator).toBeTruthy();
    });

    it("should generate non null map", () => {
        expect(seafarersMapGenerator.generateMap()).not.toBeNull();
    });

    it("should have no undefined hexes", () => {
        const result: SeafarersMap = seafarersMapGenerator.generateMap();
        result.getRows().forEach((row) => {
            row.forEach((hex) => {
                expect(hex).toBeDefined();
            });
        });
    });

    it("each hex should have terrain type defined", () => {
        const result: SeafarersMap = seafarersMapGenerator.generateMap();
        result.getRows().forEach((row) => {
            row.forEach((hex) => {
                expect(hex.getTerrain()).toBeDefined();
                expect(hex.getTerrain()).not.toEqual("");
            });
        });
    });

    it("should call dice number generator", () => {
        spyOn(diceNumberGenerator, "generateDiceNumbers").and.callThrough();
        const result: SeafarersMap = seafarersMapGenerator.generateMap();
        expect(diceNumberGenerator.generateDiceNumbers).toHaveBeenCalled();
    });

    it("should call terrain generator", () => {
        spyOn(terrainGenerator, "generateTerrain").and.callThrough();
        const result: SeafarersMap = seafarersMapGenerator.generateMap();
        expect(terrainGenerator.generateTerrain).toHaveBeenCalled();
    });

    it("should call port generator", () => {
        spyOn(portGenerator, "generatePorts").and.callThrough();
        const result: SeafarersMap = seafarersMapGenerator.generateMap();
        expect(portGenerator.generatePorts).toHaveBeenCalled();
    });

    describe("test map hex counts", () => {
        it("should provide 13 rows", () => {
            expect(seafarersMapGenerator.generateMap().getRows().length).toEqual(13);
        });

        it("first and thirteenth should have two hexes", () => {
            expect(seafarersMapGenerator.generateMap().getRow(0).length).toEqual(2);
            expect(seafarersMapGenerator.generateMap().getRow(12).length).toEqual(2);
        });

        it("second and twelfth should have three hexes", () => {
            expect(seafarersMapGenerator.generateMap().getRow(1).length).toEqual(3);
            expect(seafarersMapGenerator.generateMap().getRow(11).length).toEqual(3);
        });

        it("third and eleventh should have four hexes", () => {
            expect(seafarersMapGenerator.generateMap().getRow(2).length).toEqual(4);
            expect(seafarersMapGenerator.generateMap().getRow(10).length).toEqual(4);
        });

        it("fourth and tenth should have three hexes", () => {
            expect(seafarersMapGenerator.generateMap().getRow(3).length).toEqual(3);
            expect(seafarersMapGenerator.generateMap().getRow(9).length).toEqual(3);
        });

        it("fifth and ninth should have four hexes", () => {
            expect(seafarersMapGenerator.generateMap().getRow(4).length).toEqual(4);
            expect(seafarersMapGenerator.generateMap().getRow(8).length).toEqual(4);
        });

        it("sixth and eighth should have three hexes", () => {
            expect(seafarersMapGenerator.generateMap().getRow(5).length).toEqual(3);
            expect(seafarersMapGenerator.generateMap().getRow(7).length).toEqual(3);
        });

        it("seventh should have four hexes", () => {
            expect(seafarersMapGenerator.generateMap().getRow(6).length).toEqual(4);
        });
    });
});
