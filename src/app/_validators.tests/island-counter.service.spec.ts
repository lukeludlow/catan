import { TestBed } from "@angular/core/testing";
import { IslandCounter } from "../_validators/island-counter.service";
import { SeafarersMap } from "../_maps/Seafarers/SeafarersMap";
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

    // it("should count one when one hex", () => {
    //     const map: SeafarersMap = new SeafarersMap();
    //     map.setHexTerrain(0, 0, Terrain.Gold);
    //     const result: number = islandCounter.countIslands(map);
    //     expect(result).toEqual(1);
    // });

    // it("should count one when multiple connected hexes", () => {
    //     const map: SeafarersMap = new SeafarersMap();
    //     map.setHexTerrain(0, 0, Terrain.Gold);
    //     map.setHexTerrain(2, 1, Terrain.Gold);
    //     const result: number = islandCounter.countIslands(map);
    //     expect(result).toEqual(1);
    // });

    // it("should count separate disconnected hexes", () => {
    //     const map: SeafarersMap = new SeafarersMap();
    //     map.setHexTerrain(0, 0, Terrain.Gold);
    //     map.setHexTerrain(12, 1, Terrain.Gold);
    //     map.setHexTerrain(5, 2, Terrain.Gold);
    //     const result: number = islandCounter.countIslands(map);
    //     expect(result).toEqual(3);
    // });

    it("big fat test case", () => {
        const map: SeafarersMap = new SeafarersMap();

        map.setHexTerrain(0, 0, Terrain.Sheep);
        map.setHexTerrain(0, 1, Terrain.Rock);

        map.setHexTerrain(1, 0, Terrain.Gold);
        map.setHexTerrain(1, 1, Terrain.Tree);
        map.setHexTerrain(1, 2, Terrain.Rock);

        map.setHexTerrain(2, 0, Terrain.Sheep);
        map.setHexTerrain(2, 1, Terrain.Wheat);
        map.setHexTerrain(2, 2, Terrain.Sea);
        map.setHexTerrain(2, 3, Terrain.Sea);

        map.setHexTerrain(3, 0, Terrain.Sea);
        map.setHexTerrain(3, 1, Terrain.Sea);
        map.setHexTerrain(3, 2, Terrain.Rock);

        map.setHexTerrain(4, 0, Terrain.Brick);
        map.setHexTerrain(4, 1, Terrain.Sea);
        map.setHexTerrain(4, 2, Terrain.Sea);
        map.setHexTerrain(4, 3, Terrain.Rock);

        map.setHexTerrain(5, 0, Terrain.Wheat);
        map.setHexTerrain(5, 1, Terrain.Sea);
        map.setHexTerrain(5, 2, Terrain.Wheat);

        map.setHexTerrain(6, 0, Terrain.Tree);
        map.setHexTerrain(6, 1, Terrain.Wheat);
        map.setHexTerrain(6, 2, Terrain.Sheep);
        map.setHexTerrain(6, 3, Terrain.Sea);

        map.setHexTerrain(7, 0, Terrain.Sea);
        map.setHexTerrain(7, 1, Terrain.Sheep);
        map.setHexTerrain(7, 2, Terrain.Sea);

        map.setHexTerrain(8, 0, Terrain.Brick);
        map.setHexTerrain(8, 1, Terrain.Rock);
        map.setHexTerrain(8, 2, Terrain.Gold);
        map.setHexTerrain(8, 3, Terrain.Sea);

        map.setHexTerrain(9, 0, Terrain.Sea);
        map.setHexTerrain(9, 1, Terrain.Desert);
        map.setHexTerrain(9, 2, Terrain.Sea);

        map.setHexTerrain(10, 0, Terrain.Brick);
        map.setHexTerrain(10, 1, Terrain.Tree);
        map.setHexTerrain(10, 2, Terrain.Sea);
        map.setHexTerrain(10, 3, Terrain.Wheat);

        map.setHexTerrain(11, 0, Terrain.Tree);
        map.setHexTerrain(11, 1, Terrain.Sea);
        map.setHexTerrain(11, 2, Terrain.Brick);

        map.setHexTerrain(12, 0, Terrain.Tree);
        map.setHexTerrain(12, 1, Terrain.Sheep);

        const result: number = islandCounter.countIslands(map);
        expect(result).toEqual(2);
    });

    it("islands are composed of at least three hexes", () => {
        const map: SeafarersMap = new SeafarersMap();

        map.setHexTerrain(2, 1, Terrain.Gold);
        map.setHexTerrain(4, 1, Terrain.Gold);
        map.setHexTerrain(3, 1, Terrain.Gold);

        map.setHexTerrain(8, 2, Terrain.Gold);
        map.setHexTerrain(9, 2, Terrain.Gold);
        map.setHexTerrain(10, 2, Terrain.Gold);

        map.setHexTerrain(7, 0, Terrain.Gold);
        map.setHexTerrain(9, 0, Terrain.Gold);

        const result: number = islandCounter.countIslands(map);
        expect(result).toEqual(2);
    });
});
