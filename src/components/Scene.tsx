
import GridTile from './UI/GridTile';
import map from '../maps/Level 1.json';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Level, mapToTiles } from '../classes/Level';
import Controls from './UI/Controls';
import { AudioType, TileType } from '../enums/TileType';
import React from 'react';
import { Tile } from '../classes/Tile';
import { Resources } from '../classes/Resources';
import ResourcesDisplay from './UI/ResourcesDisplay';
import { processMessage } from '../utils/messageUtils';
import Messages from './UI/MessagesDisplay';
import { handleInput } from '../utils/controls';
import { playAudio } from '../utils/audioUtils';
import { construct } from '../utils/constructionUtils';
import { gameLoop } from '../utils/gameLoop';

const layer = map.layers[0];

const GridTileMemo = React.memo(GridTile, (a, b) => {
    return JSON.stringify(a.tile) === JSON.stringify(b.tile);
});

function Scene() {
    const [time, setTime] = useState(Date.now());
    const [level, setLevel] = useState<Level>(new Level(mapToTiles(layer.data, layer.height, layer.width)));
    const [resources, setResources] = useState<Resources>(new Resources(50));
    const [selection, setSelection] = useState<TileType | undefined>();
    const [messages, setMessages] = useState<Array<string>>(["Game started"]);
    const constructRef = useRef<(tile: Tile) => void>();
    const gameLoopRef = useRef<{ level: Level, resources: Resources }>({ level, resources });

    // Assign ref function on every re-render
    constructRef.current = (tile: Tile) => {
        construct(selection, resources, broadcast, setResources, setLevel, level, tile);
    };

    const broadcast = (message: string) => {
        setMessages(processMessage(messages, message));
        playAudio(AudioType.Message);
    }

    const onGridTileClick = useCallback((tile: Tile) => {
        if (constructRef?.current) {
            constructRef.current(tile);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            gameLoop(gameLoopRef.current.level, setLevel, gameLoopRef.current.resources, setResources, setTime);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    useEffect(() => {
        handleInput();
    }, []);

    useEffect(() => {
        gameLoopRef.current.level = level;
        gameLoopRef.current.resources = resources;
    }, [level, resources]);

    useEffect(() => {
        // const bullet = document.createElement('div');
        // bullet.className = "absolute w-4 h-4 bg-red-500 z-50";
        // document.getElementById('200')?.parentNode?.append(bullet);

        // bullet.translate.
    }, []);

    return (
        <div className='w-full h-screen max-h-screen bg-black flex flex-col justify-center content-center'>
            <div className="w-[900px] mx-auto border border-gray-500">
                <ResourcesDisplay resources={resources} />

                <div className='flex'>
                    <div id="gameArea" className='overflow-scroll w-[640px] h-[640px]'>
                        <div className='grid grid-cols-[repeat(40,_minmax(0,_1fr))] w-[960px] h-[960px]'>
                            {level?.getFlatTiles().map((tile) => {
                                return (<GridTileMemo
                                    tile={tile}
                                    onMouseOver={(tile: any): void => { }}
                                    onClick={onGridTileClick}
                                    key={tile.id}
                                />);
                            })}
                        </div>
                    </div>
                    <Controls selection={selection} setSelection={setSelection} />
                </div>
                <Messages messages={messages} />
            </div>
        </div>
    );
}

export default Scene;
