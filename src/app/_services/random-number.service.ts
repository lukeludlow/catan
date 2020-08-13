import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class RandomNumberService {
    constructor() {}

    // e.g. getRandomNumberExclusive(0, 3) will return 0, 1, or 2
    public getRandomNumberExclusive(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // e.g. getRandomNumberInclusive(0, 3) will return 0, 1, 2, or 3
    public getRandomNumberInclusive(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public getRandomElementFromArray(array: any[]) {
        return array[Math.floor(Math.random() * array.length)];
    }
}
