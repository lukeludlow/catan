import { TestBed } from "@angular/core/testing";

import { CollisionDetectorService } from "./collision-detector.service";
import { Hex } from "./model/Hex";
import { SeafarersMap } from "./model/SeafarersMap";

describe("CollisionDetectorService", () => {
    let collisionDetector: CollisionDetectorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        collisionDetector = TestBed.inject(CollisionDetectorService);
    });

    it("should be created", () => {
        expect(collisionDetector).toBeTruthy();
    });

    it("should return false when blank map", () => {
        const input: SeafarersMap = new SeafarersMap();
        const result: boolean = collisionDetector.detectCollisions(input);
        expect(result).toBeFalse();
    });

    // it("detect vertical collisions", () => {
    //     const input: SeafarersMap = new SeafarersMap();
    //     input.getHex(1, 1).setDiceNumber(6);
    //     input.getHex(3, 1).setDiceNumber(6);
    //     const result: boolean = collisionDetector.detectCollisions(input);
    //     expect(result).toBeTrue();
    // });

    it("list neighbors for a middle hex odd row (row with three hexes)", () => {
        const input: SeafarersMap = new SeafarersMap();
        input.getHex(3, 1).setDiceNumber(69);
        input.getHex(2, 1).setDiceNumber(1);
        input.getHex(2, 2).setDiceNumber(2);
        input.getHex(1, 1).setDiceNumber(3);
        input.getHex(4, 1).setDiceNumber(4);
        input.getHex(4, 2).setDiceNumber(5);
        input.getHex(5, 1).setDiceNumber(6);
        const result: number[] = collisionDetector.listNeighbors(input, 3, 1);
        const expected: number[] = [1, 2, 3, 4, 5, 6];
        expected.forEach((x) => expect(result).toContain(x));
    });

    it("list neighbors for a middle hex even row (row with four hexes)", () => {
        const input: SeafarersMap = new SeafarersMap();
        input.getHex(2, 1).setDiceNumber(69);
        input.getHex(0, 0).setDiceNumber(1);
        input.getHex(4, 1).setDiceNumber(2);
        input.getHex(1, 0).setDiceNumber(3);
        input.getHex(1, 1).setDiceNumber(4);
        input.getHex(3, 0).setDiceNumber(5);
        input.getHex(3, 1).setDiceNumber(6);
        const result: number[] = collisionDetector.listNeighbors(input, 2, 1);
        const expected: number[] = [1, 2, 3, 4, 5, 6];
        expected.forEach((x) => expect(result).toContain(x));
    });
});
