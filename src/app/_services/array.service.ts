import { Injectable } from "@angular/core";
import { removeFromArrayCondition } from "./model/delegates";

@Injectable({
    providedIn: "root",
})
export class ArrayService {
    constructor() {}

    public removeFirstOccurrence(array: any[], removeConditionDelegate: removeFromArrayCondition): any[] {
        const index: number = array.findIndex((x) => removeConditionDelegate(x));
        array.splice(index, 1);
        return array;
    }
}
