import { Terrain } from "../_models/Terrain";
import { TerrainCount } from "../_models/TerrainCount";

export interface MapSettings {
    requiredHexesCount: number;
    terrainTypes: Array<Terrain>;
    terrainCounts: Map<Terrain, TerrainCount>;
    diceNumbers: Map<number, number>;
    ports: Map<Terrain, TerrainCount>;
}
