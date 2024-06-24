import { Level } from "../classes/Level";
import { Resources } from "../classes/Resources";
import { Tile } from "../classes/Tile";
import { TileType } from "../enums/TileType";

export const ableToAfford = (resources: Resources, tileType: TileType) => {
    switch (tileType) {
        case TileType.Hut:
            return resources.wood >= 50;
        case TileType.Tower:
            return resources.wood >= 150;
    }
}

export const processResources = (resources: Resources, tileType: TileType): Resources => {
    const newResources = structuredClone(resources);

    switch (tileType) {
        case TileType.Hut:
            newResources.wood -= 50;
            break;
        case TileType.Tower:
            newResources.wood -= 150;
            break;
    }

    return newResources;
}

export const gatherResources = (level: Level, tile: Tile) => {
    const neighbors = level.getNeighborsOfTile(tile.id);
    let resources = 0;
    neighbors.forEach((neighbor) => {
        if (neighbor.type === TileType.Tree) {
            resources += 5;
        }
    });
    return resources;
}