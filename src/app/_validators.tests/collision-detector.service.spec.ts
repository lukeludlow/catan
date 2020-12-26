import { TestBed } from "@angular/core/testing";

import { CollisionDetector } from "../_validators/collision-detector.service";
import { SeafarersMap } from "../_models/SeafarersMap";

describe("CollisionDetector", () => {
    let collisionDetector: CollisionDetector;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        collisionDetector = TestBed.inject(CollisionDetector);
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
