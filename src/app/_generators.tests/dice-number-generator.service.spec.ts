import { TestBed } from "@angular/core/testing";

import { DiceNumberGenerator } from "../_generators/dice-number-generator.service";
import { Hex } from "../_models/Hex";
import { RandomService } from "../_services/random.service";
import { CollisionDetector } from "../_validators/collision-detector.service";
import { SeafarersMap } from "../_maps/Seafarers/SeafarersMap";
import { Terrain } from "../_models/Terrain";
import { CatanMap } from "../_maps/ICatanMap";
import { getSampleHexMapWithMaximumResources } from "./TestUtils";
import { MapSettings } from "../_maps/MapSettings";
import { SeafarersSettings } from "../_maps/Seafarers/SeafarersSettings";

describe("DiceNumberGenerator", () => {
    let diceNumberGeneratorService: DiceNumberGenerator;
    let randomService: RandomService;
    let collisionDetector: CollisionDetector;
    const settings: MapSettings = new SeafarersSettings();

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
        const input: CatanMap = new SeafarersMap();
        input.setHex(new Hex(0, 0, Terrain.Sea));
        const result: CatanMap = diceNumberGeneratorService.generateDiceNumbers(input, settings);
        expect(result.getHex(0, 0).getDiceNumber()).toEqual(0);
    });

    it("resource terrain should have number between two and twelve", () => {
        const input: CatanMap = new SeafarersMap();
        input.setHex(new Hex(0, 0, Terrain.Rock));
        const result: CatanMap = diceNumberGeneratorService.generateDiceNumbers(input, settings);
        expect(result.getHex(0, 0).getDiceNumber()).toBeGreaterThanOrEqual(2);
        expect(result.getHex(0, 0).getDiceNumber()).toBeLessThanOrEqual(12);
    });

    it("should generate numbers for every terrain", () => {
        const input: CatanMap = getSampleHexMapWithMaximumResources();
        const result: CatanMap = diceNumberGeneratorService.generateDiceNumbers(input, settings);
        result.getRows().forEach((row) => {
            row.forEach((hex) => {
                if (hex.isResourceTerrain()) {
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
        const input: CatanMap = new SeafarersMap();
        input.setHex(new Hex(0, 0, Terrain.Rock));
        const result: CatanMap = diceNumberGeneratorService.generateDiceNumbers(input, settings);
        expect(result.getHex(0, 0).getDiceNumber()).toEqual(9);
    });

    it("should create dice number pool with number counts from settings", () => {
        const diceNumberPool: number[] = diceNumberGeneratorService.getStartingDiceNumberPool(settings);
        for (let i = 2; i <= 12; i++) {
            if (i === 7) {
                continue;
            }
            expect(diceNumberPool.filter((x) => x === i).length).toEqual(settings.diceNumbers.get(i));
        }
    });
});
