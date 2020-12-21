import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from "@angular/core";
import { ChangeContext, Options as SliderOptions } from "@angular-slider/ngx-slider";
import { SeafarersMapGenerator } from "../_generators/seafarers-map-generator.service";
import { Hex } from "../_models/Hex";
import { SeafarersMap } from "../_models/SeafarersMap";
import { Terrain } from "../_models/Terrain";
import { Port } from "../_models/Port";
import { HexSide } from "../_models/HexSide";

@Component({
    selector: "app-seafarers",
    templateUrl: "./seafarers.component.html",
    styleUrls: ["./seafarers.component.css"],
})
export class SeafarersComponent implements OnInit, AfterViewInit {
    sliderOptions: SliderOptions = {
        floor: 1,
        ceil: 6,
    };
    sliderValue: number = 3;
    private readonly initialTopOffset: number = 10;
    private widthHeightRatio: number = 903 / 1024;
    private verticalRowOffsetIncrement: number = 15.42;
    private horizontalHexOffsetIncrement: number = 23.75;
    @ViewChild("mapDiv") mapDiv: ElementRef;
    @ViewChild("versionInfoDiv") versionInfoDiv: ElementRef;

    constructor(private seafarersMapGenerator: SeafarersMapGenerator, private renderer: Renderer2) {
        // console.log("constructor");
        // this.sliderValue = 3;
    }

    ngAfterViewInit() {
        const width = this.mapDiv.nativeElement.clientWidth;
        // console.log("mapDiv width: " + width);
        // console.log("mapDiv height: " + this.mapDiv.nativeElement.clientHeight);
        this.renderer.setStyle(this.mapDiv.nativeElement, "height", `${width}`);
        const newHeight = width * this.widthHeightRatio;
        this.mapDiv.nativeElement.style.height = `${newHeight}px`;
        // console.log("updated mapDiv height: " + this.mapDiv.nativeElement.clientHeight);
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
        const hexes: SeafarersMap = this.seafarersMapGenerator.generateMap({ islands: this.sliderValue });
        this.drawFirstAndLastRows(hexes);
        this.drawOddRows(hexes);
        this.drawEvenRows(hexes);
    }

    drawFirstAndLastRows(hexes: SeafarersMap): void {
        const leftOffsetStart: number = 30.15;
        this.drawRow(hexes.getRow(0), 2, 9.45, leftOffsetStart, this.horizontalHexOffsetIncrement);
        this.drawRow(hexes.getRow(12), 2, 101.85, leftOffsetStart, this.horizontalHexOffsetIncrement);
    }

    // (odd means rows that have 3 columns)
    private drawOddRows(hexes: SeafarersMap): void {
        const numHexes: number = 3;
        const numRows: number = 6;
        const topOffsetStart: number = 17;
        const leftOffsetStart: number = 18.25;
        for (let i = 0; i < numRows; i++) {
            const rowIndex: number = i * 2 + 1;
            const topOffset: number = topOffsetStart + this.verticalRowOffsetIncrement * i;
            this.drawRow(
                hexes.getRow(rowIndex),
                numHexes,
                topOffset,
                leftOffsetStart,
                this.horizontalHexOffsetIncrement
            );
        }
    }

    // (even means rows that have 4 columns)
    private drawEvenRows(hexes: SeafarersMap): void {
        const numHexes: number = 4;
        const numRows: number = 5;
        const topOffsetStart: number = 24.75;
        const leftOffsetStart: number = 6.4;
        for (let i = 0; i < numRows; i++) {
            const rowIndex: number = i * 2 + 2;
            const topOffset: number = topOffsetStart + this.verticalRowOffsetIncrement * i;
            this.drawRow(
                hexes.getRow(rowIndex),
                numHexes,
                topOffset,
                leftOffsetStart,
                this.horizontalHexOffsetIncrement
            );
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
            const hex: Hex = hexRow[col];
            if (hex.getTerrain() === Terrain.Sea) {
                continue;
            }
            const topCoord: number = topRowOffsetStart;
            const leftCoord: number = leftOffsetStart + leftOffsetIncrement * col;
            const image = this.createResourceTileImage(hex.getTerrain().toString(), topCoord, leftCoord);
            this.renderer.appendChild(this.mapDiv.nativeElement, image);
            if (hex.getTerrain() === Terrain.Desert) {
                continue;
            }
            const diceNumberImage = this.createDiceNumberImage(hex.getDiceNumber(), topCoord, leftCoord);
            this.renderer.appendChild(this.mapDiv.nativeElement, diceNumberImage);
            if (hex.getPort()) {
                // console.log(`hex at ${hex.getRow()}${hex.getCol()} has port ${HexSide[hex.getPort().getSide()]}`);
                const portImage = this.createPortImage(hex.getPort(), topCoord, leftCoord);
                this.renderer.appendChild(this.mapDiv.nativeElement, portImage);
            }
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

    createPortImage(port: Port, topCoord: number, leftCoord: number): any {
        const portImage = this.renderer.createElement("img");
        this.renderer.setAttribute(portImage, "src", `assets/images/seafarers/${port.getTerrain().toString()}port.png`);
        let rotation: number = 0;
        if (port.getSide() === HexSide.Top) {
            rotation = 180;
            topCoord = topCoord - 6.5;
            leftCoord = leftCoord + 4;
        } else if (port.getSide() === HexSide.Bottom) {
            rotation = 0;
            topCoord = topCoord + 15;
            leftCoord = leftCoord + 4;
        } else if (port.getSide() === HexSide.TopRight) {
            rotation = -120;
            topCoord = topCoord - 1.25;
            leftCoord = leftCoord + 12.3;
        } else if (port.getSide() === HexSide.BottomRight) {
            rotation = -60;
            topCoord = topCoord + 10;
            leftCoord = leftCoord + 12;
        } else if (port.getSide() === HexSide.TopLeft) {
            rotation = 120;
            topCoord = topCoord - 1;
            leftCoord = leftCoord - 4.15;
        } else if (port.getSide() === HexSide.BottomLeft) {
            rotation = 60;
            topCoord = topCoord + 10;
            leftCoord = leftCoord - 4.2;
        }
        this.renderer.setStyle(portImage, "position", "absolute");
        this.renderer.setStyle(portImage, "top", `${topCoord}%`);
        this.renderer.setStyle(portImage, "left", `${leftCoord}%`);
        this.renderer.setStyle(portImage, "width", "8%");
        this.renderer.setStyle(portImage, "transform", `rotate(${rotation}deg)`);
        return portImage;
    }

    ngOnInit(): void {}

    // onSliderValueChange(changeContext: ChangeContext): void {
    //     this.sliderValue = changeContext.value;
    //     console.log(`changing this.sliderValue=${this.sliderValue}`);
    // }

    reload(): void {
        console.log("map display component reload");
        // reload
        console.log(`1. this.sliderValue=${this.sliderValue}`);
        // window.location.href = window.location.href;
        this.drawBackground();
        this.drawHexes();
        console.log(`2. this.sliderValue=${this.sliderValue}`);
    }
}
