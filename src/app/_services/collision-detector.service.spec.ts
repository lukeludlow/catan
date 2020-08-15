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

    it("detect vertical collisions", () => {
        const input: SeafarersMap = new SeafarersMap();
        input.setHexDiceNumber(1, 1, 6);
        input.setHexDiceNumber(3, 1, 6);
        const result: boolean = collisionDetector.detectCollisions(input);
        expect(result).toBeTrue();
    });
});
