import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { Hex } from "../_services/Hex";
import { BoardGeneratorService } from "../_services/board-generator.service";

@Component({
    selector: "app-map-display",
    templateUrl: "./map-display.component.html",
    styleUrls: ["./map-display.component.css"],
})
export class MapDisplayComponent implements OnInit, AfterViewInit {
    private widthHeightRatio = 878 / 1000;
    private initialTopOffset = 10;
    @ViewChild("mainDiv") mainDiv: ElementRef;
    @ViewChild("versionInfoDiv") versionInfoDiv: ElementRef;

    constructor(
        private renderer: Renderer2, // private el: ElementRef
        private boardGeneratorService: BoardGeneratorService
    ) {}

    ngOnInit(): void {
        console.log("map display component ngOnInit");
    }

    ngAfterViewInit() {
        console.log("map display componenet ngAfterViewInit");
        const hexes: Hex[][] = this.boardGeneratorService.generateWithNoCollisions();
        this.drawBackground();
        this.drawHexResources(hexes);
        this.drawDiceNumbers(hexes);
        const ports: string[] = this.boardGeneratorService.generatePorts();
        this.drawPorts(ports);
        this.drawVersionInfo();
    }

    // FIXME delete this, just for my own use
    drawVersionInfo(): void {
        const timestampParagraph = this.renderer.createElement("p");
        this.renderer.setStyle(timestampParagraph, "font-family", "monospace");
        this.renderer.setStyle(timestampParagraph, "top", "50%");
        this.renderer.setStyle(timestampParagraph, "left", "2%");
        const timestampText = this.renderer.createText("v1.11 " + new Date().toISOString());
        this.renderer.appendChild(timestampParagraph, timestampText);
        this.renderer.appendChild(this.versionInfoDiv.nativeElement, timestampParagraph);
    }

    drawBackground(): void {
        const backgroundImage = this.renderer.createElement("img");
        this.renderer.setAttribute(backgroundImage, "src", "assets/images/background.png");
        this.renderer.setStyle(backgroundImage, "position", "absolute");
        this.renderer.setStyle(backgroundImage, "top", `${this.initialTopOffset}%`);
        this.renderer.setStyle(backgroundImage, "left", "0%");
        this.renderer.setStyle(backgroundImage, "width", "100%");
        this.renderer.appendChild(this.mainDiv.nativeElement, backgroundImage);
        const loadedImage = backgroundImage as HTMLImageElement;
    }

    drawHexResources(hexes: Hex[][]): void {
        const topRowOffsetStart = 5 + this.initialTopOffset;
        const topRowOffsetIncrement = 7.75;
        const leftRowOffsetStart = 11.85;
        const leftRowOffsetIncrement = 7.5;
        const leftOffsetIncrement = 15.25;
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const hex = hexes[row][col];
                if (hex.resource !== "") {
                    const topCoord = topRowOffsetStart + topRowOffsetIncrement * row;
                    const leftRowOffset =
                        leftRowOffsetStart + leftRowOffsetIncrement * Math.abs(2 - row);
                    let leftColOffset = leftOffsetIncrement * col;
                    if (row === 0 || row === 4) {
                        leftColOffset = leftOffsetIncrement * (col - 1);
                    }
                    const leftCoord = leftRowOffset + leftColOffset;
                    const image = this.createResourceTileImage(hex.resource, topCoord, leftCoord);
                    this.renderer.appendChild(this.mainDiv.nativeElement, image);
                }
            }
        }
    }

    drawDiceNumbers(hexes: Hex[][]): void {
        const topRowOffsetStart = 8.75 + this.initialTopOffset;
        const topRowOffsetIncrement = 7.75;
        const leftRowOffsetStart = 16.5;
        const leftRowOffsetIncrement = 7.5;
        const leftOffsetIncrement = 15.25;
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const hex = hexes[row][col];
                if (hex.diceNumber !== -1) {
                    const topCoord = topRowOffsetStart + topRowOffsetIncrement * row;
                    const leftRowOffset =
                        leftRowOffsetStart + leftRowOffsetIncrement * Math.abs(2 - row);
                    let leftColOffset = leftOffsetIncrement * col;
                    if (row === 0 || row === 4) {
                        leftColOffset = leftOffsetIncrement * (col - 1);
                    }
                    const leftCoord = leftRowOffset + leftColOffset;
                    const image = this.createDiceNumberImage(hex.diceNumber, topCoord, leftCoord);
                    this.renderer.appendChild(this.mainDiv.nativeElement, image);
                }
            }
        }
    }

    createResourceTileImage(resource: string, topCoord: number, leftCoord: number): any {
        const tileImage = this.renderer.createElement("img");
        this.renderer.setAttribute(tileImage, "src", `assets/images/${resource}.png`);
        this.renderer.setStyle(tileImage, "position", "absolute");
        this.renderer.setStyle(tileImage, "top", `${topCoord}%`);
        this.renderer.setStyle(tileImage, "left", `${leftCoord}%`);
        this.renderer.setStyle(tileImage, "width", "15.5%");
        return tileImage;
    }

    drawPorts(ports: string[]): void {
        const port1 = this.createPortImage(ports[0], 1.75, 29.5, 160);
        this.renderer.appendChild(this.mainDiv.nativeElement, port1);
        const port2 = this.createPortImage(ports[1], 46, 27.5, 45);
        this.renderer.appendChild(this.mainDiv.nativeElement, port2);
        const port3 = this.createPortImage(ports[2], 46.4, 61, -30);
        this.renderer.appendChild(this.mainDiv.nativeElement, port3);
        const port4 = this.createPortImage(ports[3], 24.25, 103, -75);
        this.renderer.appendChild(this.mainDiv.nativeElement, port4);
    }

    createPortImage(resource: string, top: number, left: number, rotation: number): any {
        const portImage = this.renderer.createElement("img");
        this.renderer.setAttribute(portImage, "src", `assets/images/port_${resource}.png`);
        this.renderer.setStyle(portImage, "position", "absolute");
        const topCoord = top + this.initialTopOffset;
        const leftCoord = left * this.widthHeightRatio;
        this.renderer.setStyle(portImage, "top", `${topCoord}%`);
        this.renderer.setStyle(portImage, "left", `${leftCoord}%`);
        this.renderer.setStyle(portImage, "width", "6%");
        this.renderer.setStyle(portImage, "transform", `rotate(${rotation}deg)`);
        return portImage;
    }

    createDiceNumberImage(value: number, topCoord: number, leftCoord: number): any {
        const circleDiv = this.renderer.createElement("div");
        this.renderer.setStyle(circleDiv, "position", "absolute");
        const width = 5.5;
        this.renderer.setStyle(circleDiv, "top", `${topCoord}%`);
        this.renderer.setStyle(circleDiv, "left", `${leftCoord}%`);
        this.renderer.setStyle(circleDiv, "width", `${width}%`);
        const height = width * 0.6;
        this.renderer.setStyle(circleDiv, "height", `${height}%`);
        let textColor = "#000000";
        if (value === 6 || value === 8) {
            textColor = "#FF0000";
        }
        this.renderer.setStyle(circleDiv, "color", `${textColor}`);
        this.renderer.setStyle(circleDiv, "background-color", "#FFE3A6");
        this.renderer.setStyle(circleDiv, "border-radius", "50%");
        this.renderer.setStyle(circleDiv, "font-size", `${width * 15}%`);
        this.renderer.setStyle(circleDiv, "text-align", "center");
        this.renderer.setProperty(circleDiv, "innerHTML", `${value}`);
        // FIXME should it be "color" and "background" or should it be "background-color and foreground-color" ?
        return circleDiv;
    }

    reload(): void {
        console.log("map display component reload");
        // reload
        window.location.href = window.location.href;
    }
}
