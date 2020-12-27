import { Hex } from "../_models/Hex";
import { HexBlob } from "../_models/HexBlob";
import { Terrain } from "../_models/Terrain";
import { Port } from "../_models/Port";

export interface CatanMap {
    getHex(row: number, col: number): Hex;
    getRows(): Hex[][];
    getRow(row: number): Hex[];
    setHex(hex: Hex): void;
    setHexTerrain(row: number, col: number, terrain: Terrain): void;
    setHexDiceNumber(row: number, col: number, diceNumber: number): void;
    setHexPort(hex: Hex, port: Port): void;
    getHexNeighbor(hex: Hex, neighborDirection: HexBlob): Hex;
    listNeighbors(hex: Hex): Hex[];
}
