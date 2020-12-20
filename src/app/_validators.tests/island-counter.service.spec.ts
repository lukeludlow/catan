import { TestBed } from "@angular/core/testing";
import { IslandCounter } from "../_validators/island-counter.service";
import { SeafarersMap } from "../_models/SeafarersMap";
import { Terrain } from "../_models/Terrain";

describe("IslandCounter", () => {
    let islandCounter: IslandCounter;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        islandCounter = TestBed.inject(IslandCounter);
    });

    it("should be created", () => {
        expect(islandCounter).toBeTruthy();
    });

    it("should count 0 when blank map", () => {
        const map: SeafarersMap = new SeafarersMap();
        const result: number = islandCounter.countIslands(map);
        expect(result).toEqual(0);
    });

    it("should count one when one hex", () => {
        const map: SeafarersMap = new SeafarersMap();
        map.setHexTerrain(0, 0, Terrain.Gold);
        const result: number = islandCounter.countIslands(map);
        expect(result).toEqual(1);
    });

    it("should count one when multiple connected hexes", () => {
        const map: SeafarersMap = new SeafarersMap();
        map.setHexTerrain(0, 0, Terrain.Gold);
        map.setHexTerrain(2, 1, Terrain.Gold);
        const result: number = islandCounter.countIslands(map);
        expect(result).toEqual(1);
    });
});
