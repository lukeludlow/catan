import { ICatanMap } from "../_models/ICatanMap";

export interface IValidator {
    validate(map: ICatanMap): boolean;
}
