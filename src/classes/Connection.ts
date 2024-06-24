import { Tile } from "./Tile";

export class Connection {
    fromTile: Tile;
    toTile: Tile;
    cost: number;

    constructor(fromTile: Tile, toTile: Tile, cost: number) {
        this.fromTile = fromTile;
        this.toTile = toTile;
        this.cost = cost;
    }
}