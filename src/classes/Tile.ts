import { TileType } from "../enums/TileType";
import { Img, Pathfinding } from "../types/types";

export class Tile {
    id: number;
    type: TileType;
    pathfinding: Pathfinding;
    img: Img;
    canConnect: boolean;

    constructor(id: number, type: TileType, cost: number, img: Img, canConnect: boolean) {
        this.id = id;
        this.type = type;
        this.canConnect = canConnect;

        this.pathfinding = {
            cost,
            distanceFromStart: -1
        }
        this.img = img;
    }
}