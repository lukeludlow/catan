import { TestBed } from "@angular/core/testing";

import { SeafarersMapGenerator } from "./seafarers-map-generator.service";
import { Hex } from "./Hex";
import { RandomNumberService } from "./random-number.service";

describe("SeafarersMapGenerator", () => {
    let seafarersMapGenerator: SeafarersMapGenerator;
    let randomNumberService: RandomNumberService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        seafarersMapGenerator = TestBed.inject(SeafarersMapGenerator);
        randomNumberService = TestBed.inject(RandomNumberService);
    });

    it("should be created", () => {
        expect(seafarersMapGenerator).toBeTruthy();
    });

    describe("generate map", () => {
        it("should generate non null map", () => {
            expect(seafarersMapGenerator.generateMap()).not.toBeNull();
        });

        it("should call random number generator", () => {
            spyOn(randomNumberService, "getRandomNumberExclusive").and.callThrough();
            seafarersMapGenerator.generateMap();
            expect(randomNumberService.getRandomNumberExclusive).toHaveBeenCalled();
        });

        // it("should assign terrain to hex", () => {
        //     spyOn(seafarersMapGenerator, "getRandomNumberWithin").and.returnValue(0);
        //     const result: Hex[][] = seafarersMapGenerator.generateMap();
        //     expect(result[0][0].getTerrain()).toEqual("brick");
        // });

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

        it("brick terrain count", () => {
            const result: Hex[][] = seafarersMapGenerator.generateMap();
            expect(countHexesThatHaveTerrainType(result, "brick")).toBeGreaterThanOrEqual(3);
            expect(countHexesThatHaveTerrainType(result, "brick")).toBeLessThanOrEqual(5);
        });

        it("desert terrain count", () => {
            const result: Hex[][] = seafarersMapGenerator.generateMap();
            expect(countHexesThatHaveTerrainType(result, "desert")).toBeLessThanOrEqual(3);
        });

        it("gold terrain count", () => {
            const result: Hex[][] = seafarersMapGenerator.generateMap();
            expect(countHexesThatHaveTerrainType(result, "gold")).toBeLessThanOrEqual(2);
        });

        it("rock terrain count", () => {
            const result: Hex[][] = seafarersMapGenerator.generateMap();
            expect(countHexesThatHaveTerrainType(result, "rock")).toBeGreaterThanOrEqual(3);
            expect(countHexesThatHaveTerrainType(result, "rock")).toBeLessThanOrEqual(5);
        });

        it("sea terrain count", () => {
            const result: Hex[][] = seafarersMapGenerator.generateMap();
            expect(countHexesThatHaveTerrainType(result, "sea")).toBeLessThanOrEqual(19);
        });

        it("sheep terrain count", () => {
            const result: Hex[][] = seafarersMapGenerator.generateMap();
            expect(countHexesThatHaveTerrainType(result, "sheep")).toBeGreaterThanOrEqual(4);
            expect(countHexesThatHaveTerrainType(result, "sheep")).toBeLessThanOrEqual(5);
        });

        it("tree terrain count", () => {
            const result: Hex[][] = seafarersMapGenerator.generateMap();
            expect(countHexesThatHaveTerrainType(result, "tree")).toBeGreaterThanOrEqual(4);
            expect(countHexesThatHaveTerrainType(result, "tree")).toBeLessThanOrEqual(5);
        });

        it("wheat terrain count", () => {
            const result: Hex[][] = seafarersMapGenerator.generateMap();
            expect(countHexesThatHaveTerrainType(result, "wheat")).toBeGreaterThanOrEqual(4);
            expect(countHexesThatHaveTerrainType(result, "wheat")).toBeLessThanOrEqual(5);
        });

        function countHexesThatHaveTerrainType(hexes: Hex[][], terrain: string): number {
            return hexes.reduce((sum, row) => sum + row.filter((hex) => hex.getTerrain() === terrain).length, 0);
        }
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

    // it("test first row coords", () => {
    //     expect(seafarersMapGenerator.generateMap()[0)[0].getCol()).toEqual(-1);
    // });

    // it("origin is middle of second row", () => {
    //     expect(seafarersMapGenerator.generateMap()[1)[1].getCol()).toEqual(0);
    //     expect(seafarersMapGenerator.generateMap()[1)[1].generateMap()[)).toEqual(0);
    // });
});
