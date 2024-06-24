import { Level } from "../classes/Level";
import { Resources } from "../classes/Resources";
import { TileType } from "../enums/TileType";
import { npcAttack } from "./enemyUtils";
import { gatherResources } from "./resourceUtils";

export const gameLoop = (level: Level, setLevel: Function, resources: Resources, setResources: Function, setTime: Function) => {
    let newLevel: Level = new Level(level.tiles);
    let newResources: Resources = structuredClone(resources);

    level?.getFlatTiles().forEach((tile) => {
        switch (tile.type) {
            case TileType.Goblin:
                newLevel = npcAttack(newLevel, tile);
                break;
            case TileType.Hut:
                newResources.wood += gatherResources(level, tile);
                break;
        }
    });

    if (newLevel != null) {
        setLevel(newLevel);
    }

    setResources(newResources);

    setTime(Date.now());
}