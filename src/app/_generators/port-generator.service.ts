import { Injectable } from "@angular/core";
import { SeafarersMap } from "../_models/SeafarersMap";
import { Hex } from "../_models/Hex";
import { Terrain } from "../_models/Terrain";
import { HexSide } from "../_models/HexSide";
import { HexDirection } from "../_models/HexDirection";
import { RandomService } from "../_services/random.service";
import { Port } from "../_models/Port";
import { ArrayService } from "../_services/array.service";

@Injectable({
    providedIn: "root",
})
export class PortGenerator {
    private randomService: RandomService;
    private arrayService: ArrayService;

    constructor(randomService: RandomService, arrayService: ArrayService) {
        this.randomService = randomService;
        this.arrayService = arrayService;
    }

    public generatePorts(map: SeafarersMap): SeafarersMap {
        let availablePorts: Terrain[] = [
            Terrain.Brick,
            Terrain.Rock,
            Terrain.Sheep,
            Terrain.Tree,
            Terrain.Wheat,
            Terrain.Any,
            Terrain.Any,
            Terrain.Any,
            Terrain.Any,
            Terrain.Any,
        ];
        let availableHexes: Hex[] = [];
        map.getRows().forEach((row) => {
            row.forEach((hex) => {
                if (this.canHexHavePort(map, hex)) {
                    availableHexes.push(hex);
                }
            });
        });
        for (let i = 0; i < 10; i++) {
            if (availableHexes.length === 0) {
                break;
            }
            const portTerrain: Terrain = this.randomService.getRandomElementFromArray(availablePorts);
            availablePorts = this.arrayService.removeFirstOccurrence(availablePorts, (x: Terrain) => x === portTerrain);
            const chosenHex: Hex = this.randomService.getRandomElementFromArray(availableHexes);
            availableHexes = this.arrayService.removeFirstOccurrence(availableHexes, (x: Hex) => x === chosenHex);
            const availableSides: HexSide[] = this.findHexSidesTouchingSea(map, chosenHex);
            const side: HexSide = this.randomService.getRandomElementFromArray(availableSides);
            const generatedPort: Port = new Port(portTerrain, side);
            map.setHexPort(chosenHex, generatedPort);
        }
        return map;
    }

    public findHexSidesTouchingSea(map: SeafarersMap, hex: Hex): HexSide[] {
        const neighbors: Hex[] = map.listNeighbors(hex);
        const sidesTouchingSea: HexSide[] = [];
        if (this.isHexTouchingEdgeOfMap(hex)) {
            if (hex.getRow() === 0) {
                sidesTouchingSea.push(HexSide.Top);
                sidesTouchingSea.push(HexSide.TopLeft);
                sidesTouchingSea.push(HexSide.TopRight);
            } else if (hex.getRow() === 12) {
                sidesTouchingSea.push(HexSide.Bottom);
                sidesTouchingSea.push(HexSide.BottomLeft);
                sidesTouchingSea.push(HexSide.BottomRight);
            } else if (hex.getRow() === 1) {
                if (hex.getCol() === 0) {
                    sidesTouchingSea.push(HexSide.Top);
                    sidesTouchingSea.push(HexSide.TopLeft);
                } else if (hex.getCol() === 2) {
                    sidesTouchingSea.push(HexSide.Top);
                    sidesTouchingSea.push(HexSide.TopRight);
                }
            } else if (hex.getRow() === 11) {
                if (hex.getCol() === 0) {
                    sidesTouchingSea.push(HexSide.Bottom);
                    sidesTouchingSea.push(HexSide.BottomLeft);
                } else if (hex.getCol() === 2) {
                    sidesTouchingSea.push(HexSide.Bottom);
                    sidesTouchingSea.push(HexSide.BottomRight);
                }
            } else if (hex.getRow() === 2) {
                if (hex.getCol() === 0) {
                    sidesTouchingSea.push(HexSide.Top);
                    sidesTouchingSea.push(HexSide.TopLeft);
                    sidesTouchingSea.push(HexSide.BottomLeft);
                } else if (hex.getCol() === 3) {
                    sidesTouchingSea.push(HexSide.Top);
                    sidesTouchingSea.push(HexSide.TopRight);
                    sidesTouchingSea.push(HexSide.BottomRight);
                }
            } else if (hex.getRow() === 10) {
                if (hex.getCol() === 0) {
                    sidesTouchingSea.push(HexSide.Bottom);
                    sidesTouchingSea.push(HexSide.TopLeft);
                    sidesTouchingSea.push(HexSide.BottomLeft);
                } else if (hex.getCol() === 3) {
                    sidesTouchingSea.push(HexSide.Bottom);
                    sidesTouchingSea.push(HexSide.TopRight);
                    sidesTouchingSea.push(HexSide.BottomRight);
                }
            } else if (hex.getRow() === 4 || hex.getRow() === 6 || hex.getRow() === 8) {
                if (hex.getCol() === 0) {
                    sidesTouchingSea.push(HexSide.TopLeft);
                    sidesTouchingSea.push(HexSide.BottomLeft);
                } else if (hex.getCol() === 3) {
                    sidesTouchingSea.push(HexSide.TopRight);
                    sidesTouchingSea.push(HexSide.BottomRight);
                }
            }
        }
        if (this.isHexTouchingSea(map, hex)) {
            if (
                map.getHexNeighbor(hex, HexDirection.Up) &&
                map.getHexNeighbor(hex, HexDirection.Up).getTerrain() === Terrain.Sea
            ) {
                sidesTouchingSea.push(HexSide.Top);
            }
            if (
                map.getHexNeighbor(hex, HexDirection.UpLeft) &&
                map.getHexNeighbor(hex, HexDirection.UpLeft).getTerrain() === Terrain.Sea
            ) {
                sidesTouchingSea.push(HexSide.TopLeft);
            }
            if (
                map.getHexNeighbor(hex, HexDirection.UpRight) &&
                map.getHexNeighbor(hex, HexDirection.UpRight).getTerrain() === Terrain.Sea
            ) {
                sidesTouchingSea.push(HexSide.TopRight);
            }
            if (
                map.getHexNeighbor(hex, HexDirection.Down) &&
                map.getHexNeighbor(hex, HexDirection.Down).getTerrain() === Terrain.Sea
            ) {
                sidesTouchingSea.push(HexSide.Bottom);
            }
            if (
                map.getHexNeighbor(hex, HexDirection.DownLeft) &&
                map.getHexNeighbor(hex, HexDirection.DownLeft).getTerrain() === Terrain.Sea
            ) {
                sidesTouchingSea.push(HexSide.BottomLeft);
            }
            if (
                map.getHexNeighbor(hex, HexDirection.DownRight) &&
                map.getHexNeighbor(hex, HexDirection.DownRight).getTerrain() === Terrain.Sea
            ) {
                sidesTouchingSea.push(HexSide.BottomRight);
            }
        }
        return sidesTouchingSea;
    }

    private canHexHavePort(map: SeafarersMap, hex: Hex): boolean {
        const hasAccessToSea: boolean = this.isHexTouchingEdgeOfMap(hex) || this.isHexTouchingSea(map, hex);
        const isResourceTerrain: boolean =
            hex.getTerrain() !== Terrain.Sea &&
            hex.getTerrain() !== Terrain.Desert &&
            hex.getTerrain() !== Terrain.Empty;
        return hasAccessToSea && isResourceTerrain;
    }

    private isHexTouchingSea(map: SeafarersMap, hex: Hex): boolean {
        const neighbors: Hex[] = map.listNeighbors(hex);
        if (neighbors.some((neighborHex) => neighborHex.getTerrain() === Terrain.Sea)) {
            return true;
        } else {
            return false;
        }
    }

    private isHexTouchingEdgeOfMap(hex: Hex): boolean {
        if (hex.getRow() === 0 || hex.getRow() === 12) {
            return true;
        }
        if (this.isEven(hex.getRow()) && (hex.getCol() === 0 || hex.getCol() === 3)) {
            return true;
        }
        if (!this.isEven(hex.getRow()) && (hex.getRow() === 1 || hex.getRow() === 11)) {
            return true;
        }
        return false;
    }

    private isEven(x: number): boolean {
        return x % 2 === 0;
    }
}
