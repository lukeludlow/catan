import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { BasicHex } from "../_services/model/BasicHex";
import { BoardGeneratorService } from "../_services/board-generator.service";

// developer tools, responsive, 414x705

@Component({
    selector: "app-base-game",
    templateUrl: "./base-game.component.html",
    styleUrls: ["./base-game.component.css"],
})
export class BaseGameComponent implements OnInit, AfterViewInit {
    private widthHeightRatio = 878 / 1000;
    initialTopOffset = 10;
    @ViewChild("mapDiv") mapDiv: ElementRef;
    @ViewChild("versionInfoDiv") versionInfoDiv: ElementRef;

    constructor(
        private renderer: Renderer2, // private el: ElementRef
        private boardGeneratorService: BoardGeneratorService
    ) {}

    ngOnInit(): void {}

    ngAfterViewInit() {
        const width = this.mapDiv.nativeElement.clientWidth;
        console.log("mapDiv width: " + width);
        console.log("mapDiv height: " + this.mapDiv.nativeElement.clientHeight);
        this.renderer.setStyle(this.mapDiv.nativeElement, "height", `${width}`);
        const newHeight = width * this.widthHeightRatio;
        this.mapDiv.nativeElement.style.height = `${newHeight}px`;
        console.log("updated mapDiv height: " + this.mapDiv.nativeElement.clientHeight);
        this.mapDiv.nativeElement.style.top = `${this.initialTopOffset}%`;

        const hexes: BasicHex[][] = this.boardGeneratorService.generateWithNoCollisions();
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
        const timestampText = this.renderer.createText("v1.16 " + new Date().toISOString());
        this.renderer.appendChild(timestampParagraph, timestampText);
        this.renderer.appendChild(this.versionInfoDiv.nativeElement, timestampParagraph);
    }

    drawBackground(): void {
        const backgroundImage = this.renderer.createElement("img");
        this.renderer.setAttribute(backgroundImage, "src", "assets/images/background.png");
        this.renderer.setStyle(backgroundImage, "position", "absolute");
        // this.renderer.setStyle(backgroundImage, "top", `${this.initialTopOffset}%`);
        this.renderer.setStyle(backgroundImage, "top", "0%");
        this.renderer.setStyle(backgroundImage, "left", "0%");
        this.renderer.setStyle(backgroundImage, "width", "100%");
        // this.renderer.setStyle(backgroundImage, "height", "100%");
        this.renderer.appendChild(this.mapDiv.nativeElement, backgroundImage);
        const loadedImage = backgroundImage as HTMLImageElement;
    }

    drawHexResources(hexes: BasicHex[][]): void {
        const topRowOffsetStart = 10;
        const topRowOffsetIncrement = 15;
        const leftRowOffsetStart = 12;
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
                    this.renderer.appendChild(this.mapDiv.nativeElement, image);
                }
            }
        }
    }

    drawDiceNumbers(hexes: BasicHex[][]): void {
        const topRowOffsetStart = 17;
        const topRowOffsetIncrement = 15;
        const leftRowOffsetStart = 16.5;
        const leftRowOffsetIncrement = 7.5;
        const leftOffsetIncrement = 15.35;
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
                    this.renderer.appendChild(this.mapDiv.nativeElement, image);
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
        this.drawPort(ports[0], 89.25, 61.3, 330);
        this.drawPort(ports[1], 89.25, 27.5, 45);
        this.drawPort(ports[2], 62, 11.5, 60);
        this.drawPort(ports[3], 30, 12.1, 120);
        this.drawPort(ports[4], 3, 29.5, 160);
        this.drawPort(ports[5], 2, 60, 190);
        this.drawPort(ports[6], 17.5, 87.5, 210);
        this.drawPort(ports[7], 47, 103, 285);
        this.drawPort(ports[8], 73.25, 88, 310);
    }

    drawPort(resource: string, top: number, left: number, rotation: number): void {
        const portImage = this.createPortImage(resource, top, left, rotation);
        this.renderer.appendChild(this.mapDiv.nativeElement, portImage);
    }

    createPortImage(resource: string, top: number, left: number, rotation: number): any {
        const portImage = this.renderer.createElement("img");
        this.renderer.setAttribute(portImage, "src", `assets/images/port_${resource}.png`);
        this.renderer.setStyle(portImage, "position", "absolute");
        // const topCoord = top + this.initialTopOffset;
        const topCoord = top;
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
        // const height = width * 0.6;
        const height = width / this.widthHeightRatio;
        this.renderer.setStyle(circleDiv, "height", `${height}%`);
        let textColor = "#000000";
        if (value === 6 || value === 8) {
            textColor = "#FF0000";
        }
        this.renderer.setStyle(circleDiv, "color", `${textColor}`);
        this.renderer.setStyle(circleDiv, "background-color", "#FFE3A6");
        this.renderer.setStyle(circleDiv, "border-radius", "50%");
        this.renderer.setStyle(circleDiv, "font-size", `${80}%`);
        this.renderer.setStyle(circleDiv, "text-align", "center");
        // this.renderer.setStyle(circleDiv, "align-items", "center");
        // this.renderer.setStyle(circleDiv, "vertical-align", "middle");
        this.renderer.setStyle(circleDiv, "display", "inline");
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
