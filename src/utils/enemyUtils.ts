import { dijkstra } from "../algorithms/pathfinding/dijkstra";
import { Level } from "../classes/Level";
import { Tile } from "../classes/Tile";
import { TileType } from "../enums/TileType";
import { processLevel } from "./levelUtils";

export const npcAttack = (level: Level, tile: Tile) => {
    const foundTile = level?.getFlatTiles().find((tile: Tile) => { //TODO: Apply BWS
        if (tile.type === TileType.Hut) {
            return true;
        } return false;
    });

    if (foundTile) {
        const pathfound = dijkstra(level, tile, foundTile);
        if (pathfound.length > 0) {
            // if (pathfound[0].type !== TileType.Goblin) {
            level = processLevel(level, tile, TileType.Grass);
            level = processLevel(level, pathfound[0], TileType.Goblin);
            // }
        }
    } else {
        console.log("None found");
    }

    return level;
}