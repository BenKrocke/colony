import { AudioType } from "../enums/TileType";

export const playAudio = (audioType: AudioType) => {
    var audio = new Audio(audioType);
    audio.play();
}