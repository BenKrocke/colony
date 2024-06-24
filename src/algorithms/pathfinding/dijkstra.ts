import { Tile } from "../../classes/Tile";
import { Level } from "../../classes/Level";
import { TileType } from "../../enums/TileType";

function getTileWithSmallestDistance(tiles: Array<Tile>): Tile {
    return tiles.reduce((previousValue, currentValue) => {
        if (currentValue.pathfinding.distanceFromStart < previousValue.pathfinding.distanceFromStart) {
            return currentValue;
        } return previousValue;
    });
}

function dijkstra(level: Level, start: Tile, end: Tile) {
    if (start.id === end.id) return new Array<Tile>(start);
    if (end.type === TileType.Tree) return new Array<Tile>();

    const visited: Array<Tile> = [];
    let unvisited: Array<Tile> = new Array<Tile>().concat(...level.tiles);
    unvisited = unvisited.map((tile) => {
        tile.pathfinding.distanceFromStart = tile.id === start.id ? 0 : Number.MAX_VALUE;
        return tile;
    })

    let current = start;

    while (unvisited.length > 0) { // Check in the case of unreachable
        current = getTileWithSmallestDistance(unvisited);

        if (current.pathfinding.distanceFromStart === Number.MAX_VALUE) {
            console.log("Unreachable");
            current = start;
            break;
        }

        if (current.id === end.id) {
            console.log("Target found");
            break;
        }

        const connections = level.getConnectionsOfTile(current.id).filter((connection) => {
            if (visited.find((u) => {
                return u.id === connection.toTile.id
            })) return false;
            return true;
        });

        connections.forEach((connection) => {
            const thisDistance = connection.cost + connection.fromTile.pathfinding.distanceFromStart;

            if (connection.toTile.pathfinding.distanceFromStart > thisDistance) {
                connection.toTile.pathfinding.distanceFromStart = thisDistance;
            }
        });

        visited.push(current);
        unvisited.splice(unvisited.indexOf(current), 1);
    }

    const path = new Array<Tile>();
    if (current.id === start.id) return path;

    while (current.id !== start.id) {
        const connections = level.getConnectionsOfTile(current.id, true);

        if (connections.length > 0) {
            const shortestConnection = connections.reduce((previousValue, currentValue) => {
                if (currentValue.toTile.pathfinding.distanceFromStart < previousValue.toTile.pathfinding.distanceFromStart) {
                    return currentValue;
                } return previousValue;
            });

            path.push(current);
            current = shortestConnection.toTile;
        }
    }
    path.reverse();
    if (path.length > 0)
        path.pop();

    return path;
}





export { dijkstra }