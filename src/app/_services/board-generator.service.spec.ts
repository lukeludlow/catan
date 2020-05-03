import { TestBed } from "@angular/core/testing";

import { BoardGeneratorService } from "./board-generator.service";
import { Hex } from "./Hex";

describe("BoardGeneratorService", () => {
    let service: BoardGeneratorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BoardGeneratorService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("generate should return five by five array of hexes", () => {
        const hexes = service.generate();
        expect(hexes.length).toEqual(5);
        expect(hexes[0].length).toEqual(5);
        expect(hexes[1].length).toEqual(5);
        expect(hexes[2].length).toEqual(5);
        expect(hexes[3].length).toEqual(5);
        expect(hexes[4].length).toEqual(5);
    });

    it("generate should return 6 empty hexes", () => {
        const hexes = service.generate();
        let count = 0;
        hexes.forEach((row) =>
            row.forEach((hex) => {
                if (hex.resource === "") {
                    count++;
                }
            })
        );
        expect(count).toEqual(6);
    });

    it("generate should return 18 resource hexes", () => {
        const hexes = service.generate();
        const resourceNames = ["rock", "wheat", "brick", "tree", "sheep"];
        let numResourceHexes = 0;
        hexes.forEach((row) =>
            row.forEach((hex) => {
                if (hex.resource === null || hex.resource === undefined || hex.resource === "") {
                    // continue;
                    // do nothing
                    // } else if (resourceNames.includes(hex.resource)) {
                } else if (resourceNames.indexOf(hex.resource) !== -1) {
                    // else if (hex.resource && hex.resource !== "" && resourceNames.includes(hex.resource)) {
                    numResourceHexes = numResourceHexes + 1;
                }
            })
        );
        expect(numResourceHexes).toEqual(18);
    });

    it("generate should create correct amount of each resource", () => {
        const hexes = service.generate();
        const resourceTilesFound = new Map<string, number>();
        resourceTilesFound.set("rock", 0);
        resourceTilesFound.set("wheat", 0);
        resourceTilesFound.set("brick", 0);
        resourceTilesFound.set("tree", 0);
        resourceTilesFound.set("sheep", 0);
        resourceTilesFound.set("desert", 0);
        hexes.forEach((row) =>
            row.forEach((hex) => {
                resourceTilesFound.set(hex.resource, resourceTilesFound.get(hex.resource) + 1);
            })
        );
        expect(resourceTilesFound.get("rock")).toEqual(3);
        expect(resourceTilesFound.get("wheat")).toEqual(4);
        expect(resourceTilesFound.get("brick")).toEqual(3);
        expect(resourceTilesFound.get("tree")).toEqual(4);
        expect(resourceTilesFound.get("sheep")).toEqual(4);
        expect(resourceTilesFound.get("desert")).toEqual(1);
    });

    it("generate should assign dice numbers to each resource hex", () => {
        const hexes = service.generate();
        hexes.forEach((row) =>
            row.forEach((hex) => {
                if (hex.resource !== "" && hex.resource !== "desert") {
                    expect(hex.diceNumber).toBeGreaterThan(1);
                    expect(hex.diceNumber).toBeLessThan(13);
                }
            })
        );
    });

    it("generate should create correct amount of each diceNumber", () => {
        const hexes = service.generate();
        const diceNumbersFound = new Map<number, number>();
        diceNumbersFound.set(2, 0);
        diceNumbersFound.set(3, 0);
        diceNumbersFound.set(4, 0);
        diceNumbersFound.set(5, 0);
        diceNumbersFound.set(6, 0);
        diceNumbersFound.set(8, 0);
        diceNumbersFound.set(9, 0);
        diceNumbersFound.set(10, 0);
        diceNumbersFound.set(11, 0);
        diceNumbersFound.set(12, 0);
        hexes.forEach((row) =>
            row.forEach((hex) => {
                if (hex.resource !== "" && hex.resource !== "desert") {
                    diceNumbersFound.set(hex.diceNumber, diceNumbersFound.get(hex.diceNumber) + 1);
                }
            })
        );
        expect(diceNumbersFound.get(2)).toEqual(1);
        expect(diceNumbersFound.get(3)).toEqual(2);
        expect(diceNumbersFound.get(4)).toEqual(2);
        expect(diceNumbersFound.get(5)).toEqual(2);
        expect(diceNumbersFound.get(6)).toEqual(2);
        expect(diceNumbersFound.get(8)).toEqual(2);
        expect(diceNumbersFound.get(9)).toEqual(2);
        expect(diceNumbersFound.get(10)).toEqual(2);
        expect(diceNumbersFound.get(11)).toEqual(2);
        expect(diceNumbersFound.get(12)).toEqual(1);
    });

    it("areHexesSixEightCollision no assigned dice numbers should return false", () => {
        const gridSize = 5;
        const hexes = new Array<Array<Hex>>();
        for (let row = 0; row < gridSize; row++) {
            hexes[row] = new Array<Hex>(gridSize);
            for (let col = 0; col < gridSize; col++) {
                hexes[row][col] = new Hex(-1, -1, -1, "");
            }
        }
        const hex1 = hexes[2][1];
        const hex2 = hexes[2][2];
        const isCollision = service.areHexesSixEightCollision(hex1, hex2);
        expect(isCollision).toBeFalse();
    });

    it("areHexesSixEightCollision should detect horizontal collision", () => {
        const gridSize = 5;
        const hexes = new Array<Array<Hex>>();
        for (let row = 0; row < gridSize; row++) {
            hexes[row] = new Array<Hex>(gridSize);
            for (let col = 0; col < gridSize; col++) {
                hexes[row][col] = new Hex(-1, -1, -1, "");
            }
        }
        hexes[2][1] = new Hex(2, 1, 6, "rock");
        hexes[2][2] = new Hex(2, 2, 8, "rock");
        const hex1 = hexes[2][1];
        const hex2 = hexes[2][2];
        const isCollision = service.areHexesSixEightCollision(hex1, hex2);
        expect(isCollision).toBeTrue();
    });

    it("areHexesSixEightCollision should detect diagonal collision bottom left even to odd row", () => {
        const gridSize = 5;
        const hexes = new Array<Array<Hex>>();
        for (let row = 0; row < gridSize; row++) {
            hexes[row] = new Array<Hex>(gridSize);
            for (let col = 0; col < gridSize; col++) {
                hexes[row][col] = new Hex(-1, -1, -1, "");
            }
        }
        hexes[0][2] = new Hex(0, 2, 6, "rock");
        hexes[1][2] = new Hex(1, 2, 8, "rock");
        const hex1 = hexes[0][2];
        const hex2 = hexes[1][2];
        const isCollision = service.areHexesSixEightCollision(hex1, hex2);
        expect(isCollision).toBeTrue();
    });

    it("areHexesSixEightCollision should detect diagonal collision bottom left odd to even row", () => {
        const gridSize = 5;
        const hexes = new Array<Array<Hex>>();
        for (let row = 0; row < gridSize; row++) {
            hexes[row] = new Array<Hex>(gridSize);
            for (let col = 0; col < gridSize; col++) {
                hexes[row][col] = new Hex(-1, -1, -1, "");
            }
        }
        hexes[1][2] = new Hex(1, 2, 6, "rock");
        hexes[2][1] = new Hex(2, 1, 8, "rock");
        const hex1 = hexes[1][2];
        const hex2 = hexes[2][1];
        const isCollision = service.areHexesSixEightCollision(hex1, hex2);
        expect(isCollision).toBeTrue();
    });

    it("areHexesSixEightCollision should detect diagonal collision bottom right even to odd row", () => {
        const gridSize = 5;
        const hexes = new Array<Array<Hex>>();
        for (let row = 0; row < gridSize; row++) {
            hexes[row] = new Array<Hex>(gridSize);
            for (let col = 0; col < gridSize; col++) {
                hexes[row][col] = new Hex(-1, -1, -1, "");
            }
        }
        hexes[0][3] = new Hex(0, 3, 6, "rock");
        hexes[1][3] = new Hex(1, 3, 8, "rock");
        const hex1 = hexes[0][3];
        const hex2 = hexes[1][3];
        const isCollision = service.areHexesSixEightCollision(hex1, hex2);
        expect(isCollision).toBeTrue();
    });

    it("areHexesSixEightCollision should detect diagonal collision bottom right odd to even row", () => {
        const gridSize = 5;
        const hexes = new Array<Array<Hex>>();
        for (let row = 0; row < gridSize; row++) {
            hexes[row] = new Array<Hex>(gridSize);
            for (let col = 0; col < gridSize; col++) {
                hexes[row][col] = new Hex(-1, -1, -1, "");
            }
        }
        hexes[1][4] = new Hex(1, 4, 6, "rock");
        hexes[2][4] = new Hex(2, 4, 8, "rock");
        const hex1 = hexes[1][4];
        const hex2 = hexes[2][4];
        const isCollision = service.areHexesSixEightCollision(hex1, hex2);
        expect(isCollision).toBeTrue();
    });

    it("areHexesSixEightCollision should detect diagonal collision top left even to odd row", () => {
        const gridSize = 5;
        const hexes = new Array<Array<Hex>>();
        for (let row = 0; row < gridSize; row++) {
            hexes[row] = new Array<Hex>(gridSize);
            for (let col = 0; col < gridSize; col++) {
                hexes[row][col] = new Hex(-1, -1, -1, "");
            }
        }
        hexes[4][1] = new Hex(4, 1, 6, "rock");
        hexes[3][0] = new Hex(3, 0, 8, "rock");
        const hex1 = hexes[4][1];
        const hex2 = hexes[3][0];
        const isCollision = service.areHexesSixEightCollision(hex1, hex2);
        expect(isCollision).toBeTrue();
    });

    it("areHexesSixEightCollision should detect diagonal collision top left odd to even row", () => {
        const gridSize = 5;
        const hexes = new Array<Array<Hex>>();
        for (let row = 0; row < gridSize; row++) {
            hexes[row] = new Array<Hex>(gridSize);
            for (let col = 0; col < gridSize; col++) {
                hexes[row][col] = new Hex(-1, -1, -1, "");
            }
        }
        hexes[1][1] = new Hex(1, 1, 6, "rock");
        hexes[0][1] = new Hex(0, 1, 8, "rock");
        const hex1 = hexes[1][1];
        const hex2 = hexes[0][1];
        const isCollision = service.areHexesSixEightCollision(hex1, hex2);
        expect(isCollision).toBeTrue();
    });

    it("areHexesSixEightCollision should detect diagonal collision top right even to odd row", () => {
        const gridSize = 5;
        const hexes = new Array<Array<Hex>>();
        for (let row = 0; row < gridSize; row++) {
            hexes[row] = new Array<Hex>(gridSize);
            for (let col = 0; col < gridSize; col++) {
                hexes[row][col] = new Hex(-1, -1, -1, "");
            }
        }
        hexes[2][2] = new Hex(2, 2, 6, "rock");
        hexes[1][2] = new Hex(1, 2, 8, "rock");
        const hex1 = hexes[2][2];
        const hex2 = hexes[1][2];
        const isCollision = service.areHexesSixEightCollision(hex1, hex2);
        expect(isCollision).toBeTrue();
    });

    // it("areHexesSixEightCollision should detect diagonal collision top right odd to even row", () => {
    //     const gridSize = 5;
    //     const hexes = new Array<Array<Hex>>();
    //     for (let row = 0; row < gridSize; row++) {
    //         hexes[row] = new Array<Hex>(gridSize);
    //         for (let col = 0; col < gridSize; col++) {
    //             hexes[row][col] = new Hex(-1, -1, -1, "");
    //         }
    //     }
    //     hexes[3][3] = new Hex(3, 3, 6, "rock");
    //     hexes[2][4] = new Hex(2, 4, 8, "rock");
    //     const hex1 = hexes[3][3];
    //     const hex2 = hexes[2][4];
    //     const isCollision = service.areHexesSixEightCollision(hex1, hex2);
    //     expect(isCollision).toBeTrue();
    // });

    // it("generateWithNoCollisions board has collision it should generate brand new board", () => {
    //     const originalHexes = service.generateWithNoCollisions();
    //     // console.log(JSON.stringify(service.hexes, undefined, 2));
    //     spyOn(service, "generate");
    //     service.hexes[2][2].diceNumber = 6;
    //     service.hexes[2][3].diceNumber = 8;
    //     const regeneratedHexes = service.generateWithNoCollisions();
    //     // console.log(JSON.stringify(service.hexes, undefined, 2));
    //     // expect(regeneratedHexes === originalHexes).toBeFalse();
    //     expect(service.generate).toHaveBeenCalled();
    // });

    // it("generateWithNoCollisions board has no collision should do nothing", () => {
    //     const originalHexes = service.generateWithNoCollisions();
    //     const regeneratedHexes = service.generateWithNoCollisions();
    //     expect(regeneratedHexes === originalHexes).toBeTrue();
    // });
});
