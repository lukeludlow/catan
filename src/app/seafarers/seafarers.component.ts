import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from "@angular/core";
import { SeafarersMapGenerator } from "../_services/seafarers-map-generator.service";
import { Hex } from "../_services/Hex";

@Component({
    selector: "app-seafarers",
    templateUrl: "./seafarers.component.html",
    styleUrls: ["./seafarers.component.css"],
})
export class SeafarersComponent implements OnInit, AfterViewInit {
    private readonly initialTopOffset: number = 10;
    private widthHeightRatio: number = 903 / 1024;
    private verticalRowOffsetIncrement: number = 15.42;
    private horizontalHexOffsetIncrement: number = 23.75;
    @ViewChild("mapDiv") mapDiv: ElementRef;
    @ViewChild("versionInfoDiv") versionInfoDiv: ElementRef;

    constructor(private seafarersMapGenerator: SeafarersMapGenerator, private renderer: Renderer2) {}

    ngAfterViewInit() {
        const width = this.mapDiv.nativeElement.clientWidth;
        console.log("mapDiv width: " + width);
        console.log("mapDiv height: " + this.mapDiv.nativeElement.clientHeight);
        this.renderer.setStyle(this.mapDiv.nativeElement, "height", `${width}`);
        const newHeight = width * this.widthHeightRatio;
        this.mapDiv.nativeElement.style.height = `${newHeight}px`;
        console.log("updated mapDiv height: " + this.mapDiv.nativeElement.clientHeight);
        this.mapDiv.nativeElement.style.top = `${this.initialTopOffset}%`;
        this.drawBackground();
        this.drawHexes();
    }

    drawBackground(): void {
        const backgroundImage = this.renderer.createElement("img");
        this.renderer.setAttribute(backgroundImage, "src", "assets/images/seafarers/board_perfect.png");
        this.renderer.setStyle(backgroundImage, "position", "absolute");
        this.renderer.setStyle(backgroundImage, "top", "0%");
        this.renderer.setStyle(backgroundImage, "left", "0%");
        this.renderer.setStyle(backgroundImage, "width", "100%");
        this.renderer.appendChild(this.mapDiv.nativeElement, backgroundImage);
    }

    drawHexes(): void {
        const hexes: Hex[][] = this.seafarersMapGenerator.generateMap();
        this.drawFirstAndLastRows(hexes);
        this.drawOddRows(hexes);
        this.drawEvenRows(hexes);
    }

    drawFirstAndLastRows(hexes: Hex[][]): void {
        const leftOffsetStart: number = 30.15;
        this.drawRow(hexes[0], 2, 9.45, leftOffsetStart, this.horizontalHexOffsetIncrement);
        this.drawRow(hexes[12], 2, 101.85, leftOffsetStart, this.horizontalHexOffsetIncrement);
    }

    // (odd means rows that have 3 columns)
    private drawOddRows(hexes: Hex[][]): void {
        const numHexes: number = 3;
        const numRows: number = 6;
        const topOffsetStart: number = 17;
        const leftOffsetStart: number = 18.25;
        for (let i = 0; i < numRows; i++) {
            const rowIndex: number = i * 2 + 1;
            const topOffset: number = topOffsetStart + this.verticalRowOffsetIncrement * i;
            this.drawRow(hexes[rowIndex], numHexes, topOffset, leftOffsetStart, this.horizontalHexOffsetIncrement);
        }
    }

    // (even means rows that have 4 columns)
    private drawEvenRows(hexes: Hex[][]): void {
        const numHexes: number = 4;
        const numRows: number = 5;
        const topOffsetStart: number = 24.75;
        const leftOffsetStart: number = 6.4;
        for (let i = 0; i < numRows; i++) {
            const rowIndex: number = i * 2 + 2;
            const topOffset: number = topOffsetStart + this.verticalRowOffsetIncrement * i;
            this.drawRow(hexes[rowIndex], numHexes, topOffset, leftOffsetStart, this.horizontalHexOffsetIncrement);
        }
    }

    drawRow(
        hexRow: Hex[],
        numColumns: number,
        topRowOffsetStart: number,
        leftOffsetStart: number,
        leftOffsetIncrement: number
    ) {
        for (let col = 0; col < numColumns; col++) {
            if (hexRow[col].getTerrain() === "sea") {
                continue;
            }
            const topCoord: number = topRowOffsetStart;
            const leftCoord: number = leftOffsetStart + leftOffsetIncrement * col;
            const image = this.createResourceTileImage(hexRow[col].getTerrain(), topCoord, leftCoord);
            this.renderer.appendChild(this.mapDiv.nativeElement, image);
            if (hexRow[col].getTerrain() === "desert") {
                continue;
            }
            const diceNumberImage = this.createDiceNumberImage(hexRow[col].getDiceNumber(), topCoord, leftCoord);
            this.renderer.appendChild(this.mapDiv.nativeElement, diceNumberImage);
        }
    }

    createResourceTileImage(resource: string, topCoord: number, leftCoord: number): any {
        const tileImage = this.renderer.createElement("img");
        this.renderer.setAttribute(tileImage, "src", `assets/images/seafarers/${resource}.png`);
        this.renderer.setStyle(tileImage, "position", "absolute");
        this.renderer.setStyle(tileImage, "top", `${topCoord}%`);
        this.renderer.setStyle(tileImage, "left", `${leftCoord}%`);
        this.renderer.setStyle(tileImage, "width", "15.85%");
        return tileImage;
    }

    createDiceNumberImage(diceNumber: number, topCoord: number, leftCoord: number): any {
        const diceNumberImage = this.renderer.createElement("img");
        this.renderer.setAttribute(diceNumberImage, "src", `assets/images/seafarers/${diceNumber}.png`);
        this.renderer.setStyle(diceNumberImage, "position", "absolute");
        this.renderer.setStyle(diceNumberImage, "top", `${topCoord + 6}%`);
        this.renderer.setStyle(diceNumberImage, "left", `${leftCoord + 5.5}%`);
        this.renderer.setStyle(diceNumberImage, "width", "4.5%");
        return diceNumberImage;
    }

    ngOnInit(): void {}

    reload(): void {
        console.log("map display component reload");
        // reload
        window.location.href = window.location.href;
    }
}
