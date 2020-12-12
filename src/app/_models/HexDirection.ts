import { HexBlob } from "./HexBlob";

export class HexDirection {
    public static readonly Up: HexBlob = HexBlob.directions[2];
    public static readonly UpLeft: HexBlob = HexBlob.directions[3];
    public static readonly UpRight: HexBlob = HexBlob.directions[1];
    public static readonly Down: HexBlob = HexBlob.directions[5];
    public static readonly DownLeft: HexBlob = HexBlob.directions[4];
    public static readonly DownRight: HexBlob = HexBlob.directions[0];
}
