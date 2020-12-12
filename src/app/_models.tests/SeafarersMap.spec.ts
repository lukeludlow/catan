import { TestBed } from "@angular/core/testing";
import { SeafarersMap } from "../_models/SeafarersMap";
import { Hex } from "../_models/Hex";
import { Terrain } from "../_models/Terrain";

describe("SeafarersMap", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it("list neighbors simple", () => {
        const map: SeafarersMap = new SeafarersMap();
        const result: Hex[] = map.listNeighbors(map.getHex(0, 0));
        expect(result.length).toEqual(3);
        expect(result.some((hex) => hex === map.getHex(1, 0))).toBeTrue();
        expect(result.some((hex) => hex === map.getHex(1, 1))).toBeTrue();
        expect(result.some((hex) => hex === map.getHex(2, 1))).toBeTrue();
    });

    it("list neighbors for a middle hex odd row (row with three hexes)", () => {
        const map: SeafarersMap = new SeafarersMap();
        map.setHexDiceNumber(3, 1, 69);
        map.setHexDiceNumber(2, 1, 1);
        map.setHexDiceNumber(2, 2, 2);
        map.setHexDiceNumber(1, 1, 3);
        map.setHexDiceNumber(4, 1, 4);
        map.setHexDiceNumber(4, 2, 5);
        map.setHexDiceNumber(5, 1, 6);
        const result: Hex[] = map.listNeighbors(map.getHex(3, 1));
        expect(result.length).toEqual(6);
        expect(result.some((hex) => hex === map.getHex(2, 1))).toBeTrue();
        expect(result.some((hex) => hex === map.getHex(2, 2))).toBeTrue();
        expect(result.some((hex) => hex === map.getHex(1, 1))).toBeTrue();
        expect(result.some((hex) => hex === map.getHex(4, 1))).toBeTrue();
        expect(result.some((hex) => hex === map.getHex(4, 2))).toBeTrue();
        expect(result.some((hex) => hex === map.getHex(5, 1))).toBeTrue();
    });

    it("list neighbors should return hex with actual terrain and dice number", () => {
        const map: SeafarersMap = new SeafarersMap();
        map.setHexTerrain(2, 1, Terrain.Gold);
        map.setHexDiceNumber(2, 1, 69);
        const result: Hex[] = map.listNeighbors(map.getHex(0, 0));
        const foundHex: Hex = result.find((hex) => hex.getRow() === 2 && hex.getCol());
        expect(foundHex.getTerrain()).toEqual(Terrain.Gold);
        expect(foundHex.getDiceNumber()).toEqual(69);
    });
});
