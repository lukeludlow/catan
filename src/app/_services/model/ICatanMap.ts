import { Hex } from "./Hex";
import { HexBlob } from "./HexBlob";
import { Terrain } from "./Terrain";
import { Port } from "./Port";

export interface ICatanMap {
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
