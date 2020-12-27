import { Injectable } from "@angular/core";
import { removeFromArrayIf } from "../_models/delegates";

@Injectable({
    providedIn: "root",
})
export class ArrayService {
    constructor() {}

    public removeFirstOccurrence(array: any[], shouldRemove: removeFromArrayIf): any[] {
        const index: number = array.findIndex((x) => shouldRemove(x));
        array.splice(index, 1);
        return array;
    }

    public addItemToArrayXTimes(array: any[], item: any, x: number): any[] {
        for (let i = 0; i < x; i++) {
            array.push(item);
        }
        return array;
    }
}
