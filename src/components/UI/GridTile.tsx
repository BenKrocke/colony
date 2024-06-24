import { Tile } from "../../classes/Tile";

const GridTile = ({ tile, onClick, onMouseOver }: { tile: Tile, onClick: any, onMouseOver: any }) => {
    return (
        <div className="w-6 h-6 text-center select-none hover:opacity-85" onMouseOver={(e) => { e.preventDefault(); onMouseOver(tile) }}>
            <img onDragStart={(e) => e.preventDefault()} id={String(tile.id)} src={tile.img.src} alt={tile.img.alt} width={24} onClick={() => onClick(tile)} />
        </div>
    )
}

export default GridTile;