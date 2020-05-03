import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { MapDisplayService } from "../_services/map-display.service";

@Component({
    selector: "app-map-display",
    templateUrl: "./map-display.component.html",
    styleUrls: ["./map-display.component.css"],
})
export class MapDisplayComponent implements OnInit, AfterViewInit {
    // private backgroundWidth: number;
    // private backgroundHeight: number;
    // private backgroundHeightOffset = 100;
    private widthHeightRatio = 878 / 1000;
    @ViewChild("mainDiv") mainDiv: ElementRef;

    constructor(
        private mapDisplayService: MapDisplayService,
        private renderer: Renderer2 // private el: ElementRef
    ) {}

    ngOnInit(): void {
        // this.generate();
    }

    ngAfterViewInit() {
        console.log("ngAfterViewInit");
        this.drawBackground();
        this.drawHexes();
        // this.drawTiles();
        // this.drawNumbers();
        this.drawPorts();
        const timestampParagraph = this.renderer.createElement("p");
        this.renderer.setStyle(timestampParagraph, "font-family", "monospace");
        this.renderer.setStyle(timestampParagraph, "top", "50%");
        this.renderer.setStyle(timestampParagraph, "left", "2%");
        // const timestampText = this.renderer.createText(new Date().toISOString());
        const timestampText = this.renderer.createText("v7 " + new Date().toISOString());
        this.renderer.appendChild(timestampParagraph, timestampText);
        this.renderer.appendChild(this.mainDiv.nativeElement, timestampParagraph);
    }

    drawBackground(): void {
        const backgroundImage = this.renderer.createElement("img");
        this.renderer.setAttribute(backgroundImage, "src", "assets/images/background.png");
        this.renderer.setStyle(backgroundImage, "position", "absolute");
        // this.renderer.setStyle(backgroundImage, "top", `${this.backgroundHeightOffset}px`);
        this.renderer.setStyle(backgroundImage, "top", "15%");
        this.renderer.setStyle(backgroundImage, "left", "0%");
        this.renderer.setStyle(backgroundImage, "width", "100%");
        // this.renderer.setStyle(backgroundImage, "width", "1000px");
        // this.renderer.setStyle(backgroundImage, "height", "878px");
        // this.renderer.appendChild(this.mainDiv.nativeElement, backgroundImage);
        this.renderer.appendChild(this.mainDiv.nativeElement, backgroundImage);
        const loadedImage = backgroundImage as HTMLImageElement;
        // this.backgroundWidth = loadedImage.width;
        // FIXME idk why height always returns 0
        // this.backgroundHeight = loadedImage.height;
        // this.backgroundHeight = (878 / 1000) * this.backgroundWidth;
        // this.backgroundHeight = Math.round(this.backgroundHeight);
        // console.log("background width (pixels):" + this.backgroundWidth);
        // console.log("background height (pixels):" + this.backgroundHeight);
    }

    drawHexes(): void {
        const tileRow1TopOffset = 5;
        const tileRow1LeftOffset = 31;
        const numberRow1TopOffset = 8.75;
        const numberRow1LeftOffset = 31.75;
        for (let i = 0; i < 3; i++) {
            const hexToDraw = this.mapDisplayService.getNextHex();
            const tileLeftOffset = tileRow1LeftOffset + i * 17.25;
            const tile = this.createTile(hexToDraw.resource, tileRow1TopOffset, tileLeftOffset);
            this.renderer.appendChild(this.mainDiv.nativeElement, tile);
            if (hexToDraw.diceNumber === -1) {
                continue;
            }
            const numberLeftOffset = numberRow1LeftOffset + i * 15.2;
            const numberImage = this.createNumber(
                hexToDraw.diceNumber,
                numberRow1TopOffset,
                numberLeftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, numberImage);
        }
        const tileRow2TopOffset = 12.75;
        const tileRow2LeftOffset = 22.2;
        const numberRow2TopOffset = 16.2;
        const numberRow2LeftOffset = 24;
        for (let i = 0; i < 4; i++) {
            const hexToDraw = this.mapDisplayService.getNextHex();
            const tileLeftOffset = tileRow2LeftOffset + i * 17.25;
            const tile = this.createTile(hexToDraw.resource, tileRow2TopOffset, tileLeftOffset);
            this.renderer.appendChild(this.mainDiv.nativeElement, tile);
            if (hexToDraw.diceNumber === -1) {
                continue;
            }
            const numberLeftOffset = numberRow2LeftOffset + i * 15.2;
            const numberImage = this.createNumber(
                hexToDraw.diceNumber,
                numberRow2TopOffset,
                numberLeftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, numberImage);
        }
        const row3TopOffset = 20.4;
        const row3LeftOffset = 13.65;
        const numberRow3TopOffset = 24;
        const numberRow3LeftOffset = 16.5;
        for (let i = 0; i < 5; i++) {
            const hexToDraw = this.mapDisplayService.getNextHex();
            const leftOffset = row3LeftOffset + i * 17.25;
            const tile = this.createTile(hexToDraw.resource, row3TopOffset, leftOffset);
            this.renderer.appendChild(this.mainDiv.nativeElement, tile);
            if (hexToDraw.diceNumber === -1) {
                continue;
            }
            const numberLeftOffset = numberRow3LeftOffset + i * 15.2;
            const numberImage = this.createNumber(
                hexToDraw.diceNumber,
                numberRow3TopOffset,
                numberLeftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, numberImage);
        }
        const tileRow4TopOffset = 28.15;
        const tileRow4LeftOffset = 21.9;
        const numberRow4TopOffset = 31.7;
        const numberRow4LeftOffset = 24;
        for (let i = 0; i < 4; i++) {
            const hexToDraw = this.mapDisplayService.getNextHex();
            const leftOffset = tileRow4LeftOffset + i * 17.25;
            const tile = this.createTile(hexToDraw.resource, tileRow4TopOffset, leftOffset);
            this.renderer.appendChild(this.mainDiv.nativeElement, tile);
            if (hexToDraw.diceNumber === -1) {
                continue;
            }
            const numberLeftOffset = numberRow4LeftOffset + i * 15.2;
            const numberImage = this.createNumber(
                hexToDraw.diceNumber,
                numberRow4TopOffset,
                numberLeftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, numberImage);
        }
        const tileRow5TopOffset = 36;
        const tileRow5LeftOffset = 30.4;
        const numberRow5TopOffset = 39.5;
        const numberRow5LeftOffset = 31.5;
        for (let i = 0; i < 3; i++) {
            const hexToDraw = this.mapDisplayService.getNextHex();
            const leftOffset = tileRow5LeftOffset + i * 17.25;
            const tile = this.createTile(hexToDraw.resource, tileRow5TopOffset, leftOffset);
            this.renderer.appendChild(this.mainDiv.nativeElement, tile);
            if (hexToDraw.diceNumber === -1) {
                continue;
            }
            const numberLeftOffset = numberRow5LeftOffset + i * 15.2;
            const numberImage = this.createNumber(
                hexToDraw.diceNumber,
                numberRow5TopOffset,
                numberLeftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, numberImage);
        }
    }

    drawTiles(): void {
        const row1TopOffset = 5;
        const row1LeftOffset = 31;
        for (let i = 0; i < 3; i++) {
            const leftOffset = row1LeftOffset + i * 17.25;
            const tile = this.createTile(
                this.mapDisplayService.getTile(0, i),
                row1TopOffset,
                leftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, tile);
        }
        const row2TopOffset = 12.75;
        const row2LeftOffset = 22.2;
        for (let i = 0; i < 4; i++) {
            const leftOffset = row2LeftOffset + i * 17.25;
            const tile = this.createTile(
                this.mapDisplayService.getTile(1, i),
                row2TopOffset,
                leftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, tile);
        }
        const row3TopOffset = 20.4;
        const row3LeftOffset = 13.65;
        for (let i = 0; i < 5; i++) {
            const leftOffset = row3LeftOffset + i * 17.25;
            const tile = this.createTile(
                this.mapDisplayService.getTile(2, i),
                row3TopOffset,
                leftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, tile);
        }
        const row4TopOffset = 28.15;
        const row4LeftOffset = 21.9;
        for (let i = 0; i < 4; i++) {
            const leftOffset = row4LeftOffset + i * 17.25;
            const tile = this.createTile(
                this.mapDisplayService.getTile(3, i),
                row4TopOffset,
                leftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, tile);
        }
        const row5TopOffset = 36;
        const row5LeftOffset = 30.4;
        for (let i = 0; i < 3; i++) {
            const leftOffset = row5LeftOffset + i * 17.25;
            const tile = this.createTile(
                this.mapDisplayService.getTile(4, i),
                row5TopOffset,
                leftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, tile);
        }
    }

    createTile(resource: string, top: number, left: number): any {
        const tileImage = this.renderer.createElement("img");
        this.renderer.setAttribute(tileImage, "src", `assets/images/${resource}.png`);
        this.renderer.setStyle(tileImage, "position", "absolute");
        // const topCoord = this.backgroundHeight * top + this.backgroundHeightOffset;
        // const leftCoord = this.backgroundWidth * left;
        const topCoord = top + 15;
        const leftCoord = left * this.widthHeightRatio;
        // this.renderer.setStyle(tileImage, "top", `${topCoord}px`);
        // this.renderer.setStyle(tileImage, "left", `${leftCoord}px`);
        this.renderer.setStyle(tileImage, "top", `${topCoord}%`);
        this.renderer.setStyle(tileImage, "left", `${leftCoord}%`);
        // const tileWidth = this.backgroundWidth * 0.155; // 15.5%
        // this.renderer.setStyle(tileImage, "width", `${tileWidth}px`);
        this.renderer.setStyle(tileImage, "width", "15.5%");
        return tileImage;
    }

    drawPorts(): void {
        const port1 = this.createPort(this.mapDisplayService.getPort(), 1.75, 29.5, 160);
        this.renderer.appendChild(this.mainDiv.nativeElement, port1);
        const port2 = this.createPort(this.mapDisplayService.getPort(), 46, 27.5, 45);
        this.renderer.appendChild(this.mainDiv.nativeElement, port2);
        const port3 = this.createPort(this.mapDisplayService.getPort(), 46.4, 61, -30);
        this.renderer.appendChild(this.mainDiv.nativeElement, port3);
        const port4 = this.createPort(this.mapDisplayService.getPort(), 24.25, 103, -75);
        this.renderer.appendChild(this.mainDiv.nativeElement, port4);
    }

    createPort(resource: string, top: number, left: number, rotation: number): any {
        const portImage = this.renderer.createElement("img");
        this.renderer.setAttribute(portImage, "src", `assets/images/port_${resource}.png`);
        this.renderer.setStyle(portImage, "position", "absolute");
        const topCoord = top + 15;
        const leftCoord = left * this.widthHeightRatio;
        this.renderer.setStyle(portImage, "top", `${topCoord}%`);
        this.renderer.setStyle(portImage, "left", `${leftCoord}%`);
        // const portWidth = this.backgroundWidth * 0.06; // 6%
        // this.renderer.setStyle(portImage, "width", `${portWidth}px`);
        this.renderer.setStyle(portImage, "width", "6%");
        this.renderer.setStyle(portImage, "transform", `rotate(${rotation}deg)`);
        return portImage;
    }

    drawNumbers(): void {
        const row1TopOffset = 8.75;
        const row1LeftOffset = 31.75;
        // const row1TopOffset = 0.165;
        // const row1LeftOffset = 0.323;
        for (let i = 0; i < 3; i++) {
            if (this.mapDisplayService.isTileDesert(0, i)) {
                continue;
            }
            const leftOffset = row1LeftOffset + i * 15.2;
            const numberImage = this.createNumber(
                this.mapDisplayService.getNumber(0, i),
                row1TopOffset,
                leftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, numberImage);
        }
        const row2TopOffset = 16.2;
        const row2LeftOffset = 24;
        for (let i = 0; i < 4; i++) {
            if (this.mapDisplayService.isTileDesert(1, i)) {
                continue;
            }
            const leftOffset = row2LeftOffset + i * 15.2;
            const numberImage = this.createNumber(
                this.mapDisplayService.getNumber(1, i),
                row2TopOffset,
                leftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, numberImage);
        }
        const row3TopOffset = 24;
        const row3LeftOffset = 16.5;
        for (let i = 0; i < 5; i++) {
            if (this.mapDisplayService.isTileDesert(2, i)) {
                continue;
            }
            const leftOffset = row3LeftOffset + i * 15.2;
            const numberImage = this.createNumber(
                this.mapDisplayService.getNumber(2, i),
                row3TopOffset,
                leftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, numberImage);
        }
        const row4TopOffset = 31.7;
        const row4LeftOffset = 24;
        for (let i = 0; i < 4; i++) {
            if (this.mapDisplayService.isTileDesert(3, i)) {
                continue;
            }
            const leftOffset = row4LeftOffset + i * 15.2;
            const numberImage = this.createNumber(
                this.mapDisplayService.getNumber(3, i),
                row4TopOffset,
                leftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, numberImage);
        }
        const row5TopOffset = 39.5;
        const row5LeftOffset = 31.5;
        for (let i = 0; i < 3; i++) {
            if (this.mapDisplayService.isTileDesert(4, i)) {
                continue;
            }
            const leftOffset = row5LeftOffset + i * 15.2;
            const numberImage = this.createNumber(
                this.mapDisplayService.getNumber(4, i),
                row5TopOffset,
                leftOffset
            );
            this.renderer.appendChild(this.mainDiv.nativeElement, numberImage);
        }
    }

    createNumber(value: number, top: number, left: number): any {
        const circleDiv = this.renderer.createElement("div");
        this.renderer.setStyle(circleDiv, "position", "absolute");
        const topCoord = top + 15;
        const leftCoord = left;
        // const topCoord = this.backgroundHeight * top + this.backgroundHeightOffset;
        // const leftCoord = this.backgroundWidth * left;
        // const width = this.backgroundWidth * 0.055; // 5.5%
        const width = 5.5; // 5.5%
        // const width = 1000 * 0.055;
        this.renderer.setStyle(circleDiv, "top", `${topCoord}%`);
        this.renderer.setStyle(circleDiv, "left", `${leftCoord}%`);
        this.renderer.setStyle(circleDiv, "width", `${width}%`);
        // const height = width * this.widthHeightRatio;
        const height = width;
        this.renderer.setStyle(circleDiv, "height", `${width * 0.6}%`);
        let textColor = "#000000";
        if (value === 6 || value === 8) {
            textColor = "#FF0000";
        }
        this.renderer.setStyle(circleDiv, "color", `${textColor}`);
        this.renderer.setStyle(circleDiv, "background-color", "#FFE3A6");
        this.renderer.setStyle(circleDiv, "border-radius", "50%");
        this.renderer.setStyle(circleDiv, "font-size", `${width * 15}%`);
        this.renderer.setStyle(circleDiv, "text-align", "center");
        // this.renderer.setStyle(circleDiv, "line-height", `${width * 2}%`);
        this.renderer.setProperty(circleDiv, "innerHTML", `${value}`);
        // FIXME should it be "color" and "background" or should it be "background-color and foreground-color" ?
        return circleDiv;
    }

    generate(): void {
        console.log("map display component generate");
    }
}
