import { CatanMap } from "../_maps/ICatanMap";

export interface IValidator {
    validate(map: CatanMap): boolean;
}
