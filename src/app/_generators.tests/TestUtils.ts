import { SeafarersMap } from "../_maps/Seafarers/SeafarersMap";
import { Terrain } from "../_models/Terrain";

export function getSampleHexMapWithMinimumResources(): SeafarersMap {
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

export function getSampleHexMapWithMaximumResources(): SeafarersMap {
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
