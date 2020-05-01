import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class MapDisplayService {
    private gameOption = "base";

    constructor() {}

    setGameOption(gameOption: string): void {
        this.gameOption = gameOption;
    }

    generate(): void {
        console.log("map display service generate: " + this.gameOption);
    }
}
