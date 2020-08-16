import { TestBed } from "@angular/core/testing";

import { PortGeneratorService } from "./port-generator.service";
import { SeafarersMap } from "./model/SeafarersMap";
import { Terrain } from "./model/Terrain";
import { HexSide } from "./model/HexSide";

describe("PortGeneratorService", () => {
    let portGenerator: PortGeneratorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        portGenerator = TestBed.inject(PortGeneratorService);
    });

    it("should be created", () => {
        expect(portGenerator).toBeTruthy();
    });

    it("hex is touching sea when it's at corner of map", () => {
        const input: SeafarersMap = new SeafarersMap();
        input.setHexTerrain(0, 0, Terrain.Gold);
        // note that all other hexes are Terrain.Empty
        const result: HexSide[] = portGenerator.findHexSidesTouchingSea(input, input.getHex(0, 0));
        expect(result).toContain(HexSide.Top);
        expect(result).toContain(HexSide.TopLeft);
        expect(result).toContain(HexSide.TopRight);
        // expect(portGenerator.findHexSidesTouchingSea(input, input.getHex(0, 0))).toBeTrue();
    });

    it("middle island hex all sides should be touching sea", () => {
        const input: SeafarersMap = new SeafarersMap();
        input.setHexTerrain(3, 1, Terrain.Gold);
        // top
        input.setHexTerrain(1, 1, Terrain.Sea);
        // top left
        input.setHexTerrain(2, 1, Terrain.Sea);
        // top right
        input.setHexTerrain(2, 2, Terrain.Sea);
        // bottom
        input.setHexTerrain(5, 1, Terrain.Sea);
        // bottom left
        input.setHexTerrain(4, 1, Terrain.Sea);
        // bottom right
        input.setHexTerrain(4, 2, Terrain.Sea);
        const result: HexSide[] = portGenerator.findHexSidesTouchingSea(input, input.getHex(3, 1));
        expect(result).toContain(HexSide.Top);
        expect(result).toContain(HexSide.TopLeft);
        expect(result).toContain(HexSide.TopRight);
        expect(result).toContain(HexSide.Bottom);
        expect(result).toContain(HexSide.BottomLeft);
        expect(result).toContain(HexSide.BottomRight);
    });

    it("should create a port for a hex", () => {
        const input: SeafarersMap = new SeafarersMap();
        input.getRows().forEach((row) => row.forEach((hex) => expect(hex.getPort()).toBeUndefined()));
        input.setHexTerrain(3, 1, Terrain.Gold);
        input.setHexTerrain(1, 1, Terrain.Sea);
        input.setHexTerrain(2, 1, Terrain.Sea);
        input.setHexTerrain(2, 2, Terrain.Sea);
        input.setHexTerrain(5, 1, Terrain.Sea);
        input.setHexTerrain(4, 1, Terrain.Sea);
        input.setHexTerrain(4, 2, Terrain.Sea);
        const result: SeafarersMap = portGenerator.generatePorts(input);
        expect(result.getHex(3, 1).getPort()).toBeDefined();
    });
});
