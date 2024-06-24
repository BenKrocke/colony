import { Level } from "../classes/Level";
import { Resources } from "../classes/Resources";
import { Tile } from "../classes/Tile";
import { TileType, AudioType } from "../enums/TileType";
import { playAudio } from "./audioUtils";
import { processLevel } from "./levelUtils";
import { ableToAfford, processResources } from "./resourceUtils";

export const construct = (selection: TileType | undefined, resources: Resources, broadcast: Function, setResources: Function, setLevel: Function, level: Level, tile: Tile) => {
    if (!selection) return;
    if (!ableToAfford(resources, selection)) {
        broadcast("Insufficient funds");
        return;
    }
    if (tile.type !== TileType.Grass) {
        broadcast("You can only construct on grass");
        return;
    }
    setResources(processResources(resources, selection));
    setLevel(processLevel(level, tile, selection));
    playAudio(AudioType.Construct);
}