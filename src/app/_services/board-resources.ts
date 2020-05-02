import { Hex } from "./Hex";

export class BoardResources {
    private resourceNames: ["rock", "wheat", "brick", "tree", "sheep", "desert"];
    // private numRockTiles: number;
    // private numWheatTiles: number;
    // private numBrickTiles: number;
    // private numTreeTiles: number;
    // private numSheepTiles: number;
    // private numDesertTiles: number;

    private tiles: Map<string, number>;
    // private tiles: Map<string, number> = {
    //     rock: 3,
    //     wheat: 4,
    //     brick: 3,
    //     tree: 4,
    //     sheep: 4,
    //     desert: 1,
    // };

    // private numTwos: number;
    // private numThrees: number;
    // private numFours: number;
    // private numFives: number;
    // private numSixes: number;
    // private numEights: number;
    // private numNines: number;
    // private numTens: number;
    // private numElevens: number;
    // private numTwelves: number;

    private numbers: Map<number, number>;
    // private numbers = {
    //     twos: 1,
    //     threes: 2,
    //     fours: 2,
    //     fives: 2,
    //     sixes: 2,
    //     sevens: 2,
    //     eights: 2,
    //     nines: 2,
    //     tens: 2,
    //     elevens: 2,
    //     twelves: 1,
    // };

    // private numRockPorts: number;
    // private numWheatPorts: number;
    // private numBrickPorts: number;
    // private numTreePorts: number;
    // private numSheepPorts: number;

    private ports: Map<string, number>;
    // private ports = {
    //     rock: 1,
    //     wheat: 1,
    //     brick: 1,
    //     tree: 1,
    //     sheep: 1,
    // };

    hexes: Hex[][];

    constructor() {
        this.tiles = new Map<string, number>();
        this.tiles.set("rock", 3);
        this.tiles.set("wheat", 4);
        this.tiles.set("brick", 3);
        this.tiles.set("tree", 4);
        this.tiles.set("sheep", 4);
        this.tiles.set("desert", 1);

        this.ports = new Map<string, number>();
        this.ports.set("rock", 1);
        this.ports.set("wheat", 1);
        this.ports.set("brick", 1);
        this.ports.set("tree", 1);
        this.ports.set("sheep", 1);
        // this.numRockTiles = 3;
        // this.numWheatTiles = 4;
        // this.numBrickTiles = 3;
        // this.numTreeTiles = 4;
        // this.numSheepTiles = 4;
        // this.numDesertTiles = 1;

        this.numbers = new Map<number, number>();
        this.numbers.set(2, 1);
        this.numbers.set(3, 2);
        this.numbers.set(4, 2);
        this.numbers.set(5, 2);
        this.numbers.set(6, 2);
        this.numbers.set(8, 2);
        this.numbers.set(9, 2);
        this.numbers.set(10, 2);
        this.numbers.set(11, 2);
        this.numbers.set(12, 1);
        // this.numTwos = 1;
        // this.numThrees = 2;
        // this.numFours = 2;
        // this.numFives = 2;
        // this.numSixes = 2;
        // this.numEights = 2;
        // this.numNines = 2;
        // this.numTens = 2;
        // this.numElevens = 2;
        // this.numTwelves = 1;

        // this.numRockPorts = 1;
        // this.numWheatPorts = 1;
        // this.numBrickPorts = 1;
        // this.numTreePorts = 1;
        // this.numSheepPorts = 1;

        // for (let i = 0; i < 19; i++) {
        // this.hexes.push(new Hex())
        // }
        this.hexes = [];
        for (let i = 0; i < 5; i++) {
            this.hexes[i] = [];
            for (let j = 0; j < 5; j++) {
                this.hexes[i][j] = new Hex(-1, -1, -1, "none");
            }
        }
        console.log(this.hexes);
    }


    chooseRandomRemainingNumber(row: number, col: number): number {
        const remainingNumbers = new Set<number>();
        this.numbers.forEach((value, key) => {
            if (value > 0) {
                remainingNumbers.add(key);
            }
        });
        const remainingNumbersArray = [...remainingNumbers] as number[];
        console.log("remaining numbers array: " + remainingNumbersArray.toString());
        let randomIndex = this.getRandomNumberWithinRange(remainingNumbersArray.length);
        let chosenNumber = remainingNumbersArray[randomIndex];
        if (chosenNumber === 6 || chosenNumber === 8) {
            // if (this.isNearAnotherSixOrEight(row, col)) {
            while (
                (chosenNumber === 6 || chosenNumber === 8) &&
                this.isNearAnotherSixOrEight(row, col)
            ) {
                console.log("detected 6 and 8 too close to each other. generating again...");
                randomIndex = this.getRandomNumberWithinRange(remainingNumbersArray.length);
                chosenNumber = remainingNumbersArray[randomIndex];
            }
        }
        this.numbers.set(chosenNumber, this.numbers.get(chosenNumber) - 1);
        this.hexes[row][col].diceNumber = chosenNumber;
        return chosenNumber;
    }

    isNearAnotherSixOrEight(row: number, col: number): boolean {
        // let isHorizontalAdjacent =
        //     this.hexes[row - 1][col].value === 6 ||
        //     this.hexes[row + 1][col].value === 6 ||
        //     this.hexes[row - 1][col].value === 8 ||
        //     this.hexes[row + 1][col].value === 8;
        // let isVerticalAdjacent =
        //     this.hexes[row][col - 1].value === 6 ||
        //     this.hexes[row][col + 1].value === 6 ||
        //     this.hexes[row][col - 1].value === 8 ||
        //     this.hexes[row][col + 1].value === 8;
        // let isDiagonalAdjacent = false;
        // return isHorizontalAdjacent || isVerticalAdjacent || isDiagonalAdjacent;
        return this.getAdjacentHexes(row, col).some((item) => item.diceNumber === 6 || item.diceNumber === 8);
    }

    getAdjacentHexes(row: number, col: number): Hex[] {
        let adjacentHexes = [];
        if (row > 0) {
            adjacentHexes.push(this.hexes[row - 1][col]);
        }
        if (row < 4) {
            adjacentHexes.push(this.hexes[row + 1][col]);
        }
        if (col > 0) {
            adjacentHexes.push(this.hexes[row][col - 1]);
        }
        if (col < 4) {
            adjacentHexes.push(this.hexes[row][col + 1]);
        }
        // top left
        // top right
        // bottom left
        // bottom right
        return adjacentHexes;
    }

    chooseRandomRemainingTileResource(row: number, col: number): string {
        const remainingTiles = new Set<string>();
        this.tiles.forEach((value, key) => {
            if (value > 0) {
                remainingTiles.add(key);
            }
        });
        const remainingTilesArray = [...remainingTiles] as string[];
        console.log("remaining tiles array: " + remainingTilesArray.toString());
        const resource = this.chooseRandomFromArray(remainingTilesArray);
        this.tiles.set(resource, this.tiles.get(resource) - 1);
        // if (col === 0 || col === 4) {
        //     col = col + 2;
        // } else if (col === 1 || col === 3) {
        //     col = col + 1;
        // }
        this.hexes[row][col] = new Hex(row, col, -1, resource);
        console.log("added " + resource + " hex to position row" + row + "col" + col);
        console.log(this.hexes);
        return resource;
    }

    chooseRandomRemainingPortResource(): string {
        const remainingPorts = [];
        this.ports.forEach((value, key) => {
            if (value > 0) {
                remainingPorts.push(key);
            }
        });
        const resource = this.chooseRandomFromArray(remainingPorts);
        this.ports.set(resource, this.ports.get(resource) - 1);
        return resource;
    }

    chooseRandomFromArray(array: string[]): string {
        const randomIndex = this.getRandomNumberWithinRange(array.length);
        return array[randomIndex];
    }

    getRandomNumberWithinRange(range: number): number {
        return Math.floor(Math.random() * range);
    }
}
