import { Level } from "../classes/Level";
import { Tile } from "../classes/Tile";
import { TileType } from "../enums/TileType";
import hut from '../assets/sprites/hut.png';
import tower from '../assets/sprites/tower.png';
import empty from '../assets/sprites/empty.png';
import tree from '../assets/sprites/tree.png';
import goblin from '../assets/sprites/goblin.png';
import water_corner_1 from '../assets/sprites/water_corner_1.png';
import water_corner_2 from '../assets/sprites/water_corner_2.png';
import water_corner_3 from '../assets/sprites/water_corner_3.png';
import water_corner_4 from '../assets/sprites/water_corner_4.png';
import water_h1 from '../assets/sprites/water_h1.png';
import water_h2 from '../assets/sprites/water_h2.png';
import water_v1 from '../assets/sprites/water_v1.png';
import water_v2 from '../assets/sprites/water_v2.png';

import { Img } from "../types/types";

const spriteMap = new Map();
spriteMap.set(TileType.Goblin, { src: goblin, alt: "goblin" } as Img);
spriteMap.set(TileType.Grass, { src: empty, alt: "grass" } as Img);
spriteMap.set(TileType.WaterCornerOne, { src: water_corner_4, alt: "water" } as Img);
spriteMap.set(TileType.WaterCornerTwo, { src: water_corner_3, alt: "water" } as Img);
spriteMap.set(TileType.WaterCornerThree, { src: water_corner_2, alt: "water" } as Img);
spriteMap.set(TileType.WaterCornerFour, { src: water_corner_1, alt: "water" } as Img);
spriteMap.set(TileType.WaterHOne, { src: water_h1, alt: "water" } as Img);
spriteMap.set(TileType.WaterHTwo, { src: water_h2, alt: "water" } as Img);
spriteMap.set(TileType.WaterVOne, { src: water_v1, alt: "water" } as Img);
spriteMap.set(TileType.WaterVTwo, { src: water_v2, alt: "water" } as Img);
spriteMap.set(TileType.Tree, { src: tree, alt: "tree" } as Img);
spriteMap.set(TileType.Hut, { src: hut, alt: "hut" } as Img);
spriteMap.set(TileType.Tower, { src: tower, alt: "tower" } as Img);

export const getImg = (tileType: TileType): Img => {
    return spriteMap.get(tileType);
}

export const canGetConnect = (selection: TileType): boolean => {
    const canConnectArray = [TileType.Grass, TileType.Hut, TileType.Tower];
    if (canConnectArray.find((type) => {
        if (type === selection) return true;
        return false;
    })) {
        return true;
    } return false;
}

export const processLevel = (level: Level, tile: Tile, selection: TileType): Level => {
    const newTile = structuredClone(tile);
    newTile.type = selection;
    newTile.img = getImg(selection);
    newTile.canConnect = canGetConnect(selection);
    return level.updateTile(newTile);
}