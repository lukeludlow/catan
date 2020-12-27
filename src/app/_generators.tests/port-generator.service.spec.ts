import { TestBed } from "@angular/core/testing";

import { PortGenerator } from "../_generators/port-generator.service";
import { SeafarersMap } from "../_maps/Seafarers/SeafarersMap";
import { Terrain } from "../_models/Terrain";
import { HexSide } from "../_models/HexSide";
import { MapSettings } from "../_maps/MapSettings";
import { SeafarersSettings } from "../_maps/Seafarers/SeafarersSettings";
import { CatanMap } from "../_maps/ICatanMap";

describe("PortGenerator", () => {
    let portGenerator: PortGenerator;
    const settings: MapSettings = new SeafarersSettings();

    beforeEach(() => {
        TestBed.configureTestingModule({});
        portGenerator = TestBed.inject(PortGenerator);
    });

    it("should be created", () => {
        expect(portGenerator).toBeTruthy();
    });

    it("hex is touching sea when it's at corner of map", () => {
        const map: CatanMap = new SeafarersMap();
        map.setHexTerrain(0, 0, Terrain.Gold);
        // note that all other hexes are Terrain.Empty
        const result: HexSide[] = portGenerator.findHexSidesTouchingSea(map, map.getHex(0, 0));
        expect(result).toContain(HexSide.Top);
        expect(result).toContain(HexSide.TopLeft);
        expect(result).toContain(HexSide.TopRight);
    });

    it("middle island hex all sides should be touching sea", () => {
        const map: CatanMap = new SeafarersMap();
        map.setHexTerrain(3, 1, Terrain.Gold);
        // top
        map.setHexTerrain(1, 1, Terrain.Sea);
        // top left
        map.setHexTerrain(2, 1, Terrain.Sea);
        // top right
        map.setHexTerrain(2, 2, Terrain.Sea);
        // bottom
        map.setHexTerrain(5, 1, Terrain.Sea);
        // bottom left
        map.setHexTerrain(4, 1, Terrain.Sea);
        // bottom right
        map.setHexTerrain(4, 2, Terrain.Sea);
        const result: HexSide[] = portGenerator.findHexSidesTouchingSea(map, map.getHex(3, 1));
        expect(result).toContain(HexSide.Top);
        expect(result).toContain(HexSide.TopLeft);
        expect(result).toContain(HexSide.TopRight);
        expect(result).toContain(HexSide.Bottom);
        expect(result).toContain(HexSide.BottomLeft);
        expect(result).toContain(HexSide.BottomRight);
    });

    it("should create a port for a hex", () => {
        const map: CatanMap = new SeafarersMap();
        map.getRows().forEach((row) => row.forEach((hex) => expect(hex.getPort()).toBeUndefined()));
        map.setHexTerrain(3, 1, Terrain.Gold);
        map.setHexTerrain(1, 1, Terrain.Sea);
        map.setHexTerrain(2, 1, Terrain.Sea);
        map.setHexTerrain(2, 2, Terrain.Sea);
        map.setHexTerrain(5, 1, Terrain.Sea);
        map.setHexTerrain(4, 1, Terrain.Sea);
        map.setHexTerrain(4, 2, Terrain.Sea);
        const result: CatanMap = portGenerator.generatePorts(map, settings);
        expect(result.getHex(3, 1).getPort()).toBeDefined();
    });

    it("should assign number of ports based on settings", () => {
        let map: CatanMap = new SeafarersMap();
        map.getRows().forEach((row) => {
            row.forEach((hex) => {
                hex.setTerrain(Terrain.Sea);
            });
        });
        map.setHexTerrain(0, 0, Terrain.Gold);
        map.setHexTerrain(0, 1, Terrain.Gold);
        map.setHexTerrain(2, 0, Terrain.Gold);
        map.setHexTerrain(2, 3, Terrain.Gold);
        map.setHexTerrain(5, 0, Terrain.Gold);
        map.setHexTerrain(5, 1, Terrain.Gold);
        map.setHexTerrain(5, 2, Terrain.Gold);
        map.setHexTerrain(8, 0, Terrain.Gold);
        map.setHexTerrain(12, 0, Terrain.Gold);
        map.setHexTerrain(12, 1, Terrain.Gold);
        map = portGenerator.generatePorts(map, settings);
        expectPortCountToBeWithin(map, settings, Terrain.Brick);
        expectPortCountToBeWithin(map, settings, Terrain.Rock);
        expectPortCountToBeWithin(map, settings, Terrain.Sheep);
        expectPortCountToBeWithin(map, settings, Terrain.Tree);
        expectPortCountToBeWithin(map, settings, Terrain.Wheat);
        expectPortCountToBeWithin(map, settings, Terrain.Any);
    });

    function expectPortCountToBeWithin(map: CatanMap, countSettings: MapSettings, portTerrain: Terrain) {
        const min: number = countSettings.ports.get(portTerrain).min;
        const max: number = countSettings.ports.get(portTerrain).max;
        const count: number = countPortsInMap(map, portTerrain);
        expect(count).toBeGreaterThanOrEqual(min);
        expect(count).toBeLessThanOrEqual(max);
    }

    function countPortsInMap(hexes: CatanMap, portTerrain: Terrain): number {
        let count: number = 0;
        for (const row of hexes.getRows()) {
            for (const hex of row) {
                if (hex.getPort() !== undefined && hex.getPort().getTerrain() === portTerrain) {
                    count++;
                }
            }
        }
        return count;
        // return hexes.getRows().reduce((sum, row) => sum + row.filter((hex) => hex.getTerrain() === portTerrain).length, 0);
    }
});
