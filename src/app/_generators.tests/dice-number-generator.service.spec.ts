import { TestBed } from "@angular/core/testing";

import { DiceNumberGenerator } from "../_generators/dice-number-generator.service";
import { Hex } from "../_models/Hex";
import { RandomService } from "../_services/random.service";
import { CollisionDetector } from "../_validators/collision-detector.service";
import { SeafarersMap } from "../_models/SeafarersMap";
import { Terrain } from "../_models/Terrain";

describe("DiceNumberGenerator", () => {
    let diceNumberGeneratorService: DiceNumberGenerator;
    let randomService: RandomService;
    let collisionDetector: CollisionDetector;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        diceNumberGeneratorService = TestBed.inject(DiceNumberGenerator);
        randomService = TestBed.inject(RandomService);
        collisionDetector = TestBed.inject(CollisionDetector);
    });

    it("should be created", () => {
        expect(diceNumberGeneratorService).toBeTruthy();
    });

    it("should assign zero to sea hexes", () => {
        const input: SeafarersMap = new SeafarersMap();
        input.setHex(new Hex(0, 0, Terrain.Sea));
        const result: SeafarersMap = diceNumberGeneratorService.generateDiceNumbers(input);
        expect(result.getHex(0, 0).getDiceNumber()).toEqual(0);
    });

    it("resource terrain should have number between two and twelve", () => {
        const input: SeafarersMap = new SeafarersMap();
        input.setHex(new Hex(0, 0, Terrain.Rock));
        const result: SeafarersMap = diceNumberGeneratorService.generateDiceNumbers(input);
        expect(result.getHex(0, 0).getDiceNumber()).toBeGreaterThanOrEqual(2);
        expect(result.getHex(0, 0).getDiceNumber()).toBeLessThanOrEqual(12);
    });

    it("should generate numbers for every terrain", () => {
        const input: SeafarersMap = getSampleHexMapWithMaximumResources();
        const result: SeafarersMap = diceNumberGeneratorService.generateDiceNumbers(input);
        result.getRows().forEach((row) => {
            row.forEach((hex) => {
                if (
                    hex.getTerrain() === Terrain.Sea ||
                    hex.getTerrain() === Terrain.Desert ||
                    hex.getTerrain() === Terrain.Empty
                ) {
                    expect(hex.getDiceNumber()).toEqual(0);
                } else {
                    expect(hex.getDiceNumber()).toBeGreaterThanOrEqual(2);
                    expect(hex.getDiceNumber()).toBeLessThanOrEqual(12);
                }
            });
        });
    });

    it("should choose dice number from pool", () => {
        spyOn(randomService, "getRandomElementFromArray").and.returnValue(9);
        const input: SeafarersMap = new SeafarersMap();
        input.setHex(new Hex(0, 0, Terrain.Rock));
        const result: SeafarersMap = diceNumberGeneratorService.generateDiceNumbers(input);
        expect(result.getHex(0, 0).getDiceNumber()).toEqual(9);
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

    it("should check for collisions", () => {
        spyOn(collisionDetector, "detectCollisions").and.callThrough();
        const input: SeafarersMap = getSampleHexMapWithMaximumResources();
        const result: SeafarersMap = diceNumberGeneratorService.generateDiceNumbers(input);
        expect(collisionDetector.detectCollisions).toHaveBeenCalled();
    });

    it("should regenerate while there is a collision", () => {
        spyOn(collisionDetector, "detectCollisions").and.returnValues(true, true, false);
        spyOn(diceNumberGeneratorService, "tryGenerateDiceNumbers");
        const input: SeafarersMap = getSampleHexMapWithMaximumResources();
        const result: SeafarersMap = diceNumberGeneratorService.generateDiceNumbers(input);
        expect(collisionDetector.detectCollisions).toHaveBeenCalledTimes(3);
        expect(diceNumberGeneratorService.tryGenerateDiceNumbers).toHaveBeenCalledTimes(3);
    });

    function getSampleHexMapWithMinimumResources(): SeafarersMap {
        const hexMap: SeafarersMap = new SeafarersMap();

        hexMap.setHexTerrain(0, 0, Terrain.Brick);
        hexMap.setHexTerrain(0, 1, Terrain.Brick);
        hexMap.setHexTerrain(1, 0, Terrain.Brick);

        hexMap.setHexTerrain(1, 1, Terrain.Rock);
        hexMap.setHexTerrain(1, 2, Terrain.Rock);
        hexMap.setHexTerrain(2, 0, Terrain.Rock);

        hexMap.setHexTerrain(2, 1, Terrain.Sheep);
        hexMap.setHexTerrain(2, 2, Terrain.Sheep);
        hexMap.setHexTerrain(2, 3, Terrain.Sheep);
        hexMap.setHexTerrain(3, 0, Terrain.Sheep);

        hexMap.setHexTerrain(3, 1, Terrain.Tree);
        hexMap.setHexTerrain(3, 2, Terrain.Tree);
        hexMap.setHexTerrain(4, 0, Terrain.Tree);
        hexMap.setHexTerrain(4, 1, Terrain.Tree);

        hexMap.setHexTerrain(4, 2, Terrain.Wheat);
        hexMap.setHexTerrain(4, 3, Terrain.Wheat);
        hexMap.setHexTerrain(5, 0, Terrain.Wheat);
        hexMap.setHexTerrain(5, 1, Terrain.Wheat);

        return hexMap;
    }

    function getSampleHexMapWithMaximumResources(): SeafarersMap {
        const hexMap: SeafarersMap = new SeafarersMap();

        hexMap.setHexTerrain(0, 0, Terrain.Brick);
        hexMap.setHexTerrain(0, 1, Terrain.Brick);
        hexMap.setHexTerrain(1, 0, Terrain.Brick);
        hexMap.setHexTerrain(1, 1, Terrain.Brick);
        hexMap.setHexTerrain(1, 2, Terrain.Brick);

        hexMap.setHexTerrain(2, 0, Terrain.Rock);
        hexMap.setHexTerrain(2, 1, Terrain.Rock);
        hexMap.setHexTerrain(2, 2, Terrain.Rock);
        hexMap.setHexTerrain(2, 3, Terrain.Rock);
        hexMap.setHexTerrain(3, 0, Terrain.Rock);

        hexMap.setHexTerrain(3, 1, Terrain.Sheep);
        hexMap.setHexTerrain(3, 2, Terrain.Sheep);
        hexMap.setHexTerrain(4, 0, Terrain.Sheep);
        hexMap.setHexTerrain(4, 1, Terrain.Sheep);
        hexMap.setHexTerrain(4, 2, Terrain.Sheep);

        hexMap.setHexTerrain(4, 3, Terrain.Tree);
        hexMap.setHexTerrain(5, 0, Terrain.Tree);
        hexMap.setHexTerrain(5, 1, Terrain.Tree);
        hexMap.setHexTerrain(5, 2, Terrain.Tree);
        hexMap.setHexTerrain(6, 0, Terrain.Tree);

        hexMap.setHexTerrain(6, 1, Terrain.Wheat);
        hexMap.setHexTerrain(6, 2, Terrain.Wheat);
        hexMap.setHexTerrain(6, 3, Terrain.Wheat);
        hexMap.setHexTerrain(7, 0, Terrain.Wheat);
        hexMap.setHexTerrain(7, 1, Terrain.Wheat);

        hexMap.setHexTerrain(7, 2, Terrain.Gold);
        hexMap.setHexTerrain(8, 0, Terrain.Gold);

        return hexMap;
    }

    function countHexesThatHaveDiceNumber(hexes: SeafarersMap, diceNumber: number): number {
        return hexes
            .getRows()
            .reduce((sum, row) => sum + row.filter((hex) => hex.getDiceNumber() === diceNumber).length, 0);
    }
});
