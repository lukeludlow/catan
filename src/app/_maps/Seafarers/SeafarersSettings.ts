import { Injectable } from "@angular/core";
import { Terrain } from "../../_models/Terrain";
import { TerrainCount } from "../../_models/TerrainCount";
import { MapSettings } from "../MapSettings";

@Injectable({
    providedIn: "root",
})
export class SeafarersSettings implements MapSettings {
    requiredHexesCount: number = 42;
    terrainTypes: Array<Terrain> = [
        Terrain.Brick,
        Terrain.Desert,
        Terrain.Gold,
        Terrain.Rock,
        Terrain.Sea,
        Terrain.Sheep,
        Terrain.Tree,
        Terrain.Wheat,
    ];
    terrainCounts: Map<Terrain, TerrainCount> = new Map<Terrain, TerrainCount>([
        [Terrain.Brick, { min: 2, max: 5 }],
        [Terrain.Desert, { min: 0, max: 0 }],
        [Terrain.Gold, { min: 0, max: 2 }],
        [Terrain.Rock, { min: 2, max: 5 }],
        [Terrain.Sea, { min: 12, max: 19 }],
        [Terrain.Sheep, { min: 2, max: 5 }],
        [Terrain.Tree, { min: 2, max: 5 }],
        [Terrain.Wheat, { min: 2, max: 5 }],
    ]);
    diceNumbers: Map<number, number> = new Map<number, number>([
        [2, 2],
        [3, 3],
        [4, 3],
        [5, 3],
        [6, 3],
        [8, 3],
        [9, 3],
        [10, 3],
        [11, 3],
        [12, 2],
    ]);
    ports: Map<Terrain, TerrainCount> = new Map<Terrain, TerrainCount>([
        [Terrain.Brick, { min: 1, max: 1 }],
        [Terrain.Rock, { min: 1, max: 1 }],
        [Terrain.Sheep, { min: 1, max: 1 }],
        [Terrain.Tree, { min: 1, max: 1 }],
        [Terrain.Wheat, { min: 1, max: 1 }],
        [Terrain.Any, { min: 5, max: 5 }],
    ]);
}
