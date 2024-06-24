import { TileType } from "../enums/TileType";
import { Indexes } from "../types/types";
import { Connection } from "./Connection";
import { Tile } from "./Tile";
import { getImg } from "../utils/levelUtils";

function checkCanConnect(tileType: TileType): boolean {
    if (tileType.toString() === TileType.Grass.toString() || tileType.toString() === TileType.Hut.toString() || tileType.toString() === TileType.Tower.toString()) {
        return true;
    }

    return false;
}

export function mapToTiles(mapData: Array<number>, height: number, width: number) {
    const tiles = new Array(height);
    let runningIndex = 0;

    for (let heightIndex = 0; heightIndex < height; heightIndex++) {
        tiles[heightIndex] = new Array(width);

        for (let widthIndex = 0; widthIndex < width; widthIndex++) {
            tiles[heightIndex][widthIndex] = new Tile(
                runningIndex,
                mapData[runningIndex],
                1,
                getImg(mapData[runningIndex]),
                checkCanConnect(mapData[runningIndex])
            )

            runningIndex++;
        }
    }

    return tiles;
}

export class Level {
    tiles: Array<Array<Tile>>;

    getFlatTiles(): Array<Tile> {
        return new Array<Tile>().concat(...this.tiles);
    }

    constructor(tiles: Array<Array<Tile>>) {
        this.tiles = tiles;
    }

    private findIndexesById(id: number): Indexes {
        let indexes: Indexes = {
            row: -1,
            col: -1
        };

        this.tiles.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if (col.id === id) {
                    indexes = {
                        row: rowIndex,
                        col: colIndex
                    };
                }
            });
        });

        return indexes
    }

    updateTile(tile: Tile): Level {
        const indexes = this.findIndexesById(tile.id);

        if (indexes.row === -1) {
            console.error("Can't find indexes");
            return this;
        }

        const newLevel = new Level(structuredClone(this.tiles));

        newLevel.tiles[indexes.row][indexes.col] = tile;

        return newLevel;
    }

    getNeighborsOfTile(id: number): Array<Tile> {
        const indexes = this.findIndexesById(id);
        const cols = [-2, -1, 0, 1, 2];
        const neighbors = new Array<Tile>();
        for (let row = 0; row < 5; row++) {
            cols.forEach(col => {
                const rowIndex = indexes.row + (row - 1);
                if (rowIndex < 0 || rowIndex > this.tiles.length - 1) return;
                const rowArray = this.tiles[rowIndex];
                const neighbor = rowArray[indexes.col + col];
                if (typeof neighbor !== 'undefined' && neighbor.id !== id) {
                    neighbors.push(neighbor);
                }
            });
        }
        return neighbors;
    }

    getConnectionsOfTile(id: number, ignoreCanConnect: boolean = false): Array<Connection> {
        const indexes = this.findIndexesById(id);
        const sourceTile = this.tiles.at(indexes.row)?.at(indexes.col);
        if (!sourceTile) {
            return [];
        }

        const cols = [-1, 0, 1]; // if row -1 and row +1.. col 0 and col 3 are double cost
        const connections = new Array<Connection>();
        for (let row = 0; row < 3; row++) {
            cols.forEach(col => {
                const rowIndex = indexes.row + (row - 1);
                if (rowIndex < 0 || rowIndex > this.tiles.length - 1) return;
                const rowArray = this.tiles[rowIndex];

                const neighbor = rowArray[indexes.col + col];
                if (typeof neighbor !== 'undefined' && neighbor.id !== id && (ignoreCanConnect || neighbor.canConnect)) {
                    connections.push(new Connection(
                        sourceTile,
                        neighbor,
                        ((row === 0 || row === 2) && (col === -1 || col === 1)) ? 2 : 1
                    ));
                }
            })
        }

        return connections;
    }
}