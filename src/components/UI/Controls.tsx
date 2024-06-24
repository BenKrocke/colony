import { Dispatch, SetStateAction } from "react";
import { TileType } from "../../enums/TileType";

const Controls = ({ selection, setSelection }: { selection: TileType | undefined, setSelection: Dispatch<SetStateAction<TileType | undefined>> }) => {
    return (
        <div className="flex flex-col bg-[#472d3c] text-white w-[260px]">
            <button className={`h-16 px-8 w-full border border-solid border-gray-400 ${selection === TileType.Hut && 'bg-gray-800'}`} onClick={() => setSelection(TileType.Hut)}>Build Hut</button>
            <button className={`h-16 px-8 w-full border border-solid border-gray-400 ${selection === TileType.Tower && 'bg-gray-800'}`} onClick={() => setSelection(TileType.Tower)}>Build Tower</button>
            <button className='h-16 px-8 w-full border border-solid border-gray-400' onClick={() => setSelection(undefined)}>Cancel building</button>
        </div >
    )
};

export default Controls;