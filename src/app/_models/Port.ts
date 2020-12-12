import { Terrain } from "./Terrain";
import { HexSide } from "./HexSide";

export class Port {
    private terrain: Terrain;
    private side: HexSide;

    constructor(terrain: Terrain, side: HexSide) {
        this.terrain = terrain;
        this.side = side;
    }

    public getTerrain(): Terrain {
        return this.terrain;
    }

    public getSide(): HexSide {
        return this.side;
    }
}
