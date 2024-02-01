import timeout from "../functions/timeout.js";
import {act} from "react-dom/test-utils";

function boardReducer(prevstate, action) {
    switch (action.type) {
        case "START":
            const {num} = action
            let schema = []

            for (let i = 0; i < num; i++) {
                for (let j = 1; j < 3; j++) {
                    schema.push({
                        id: i + "-" + j,
                        value: i.toString(),
                        clicked: false
                    })
                }
            }
            schema = schema.sort((a, b) => 0.5 - Math.random())
            return schema
        case "CLICK":
            return prevstate.map(tile => {
                if (tile.id === action.id) {
                    return {...tile, clicked: true}
                } else {
                    return tile
                }
            })
        case "CHECK":
            const _clickedTiles = prevstate.filter(tile => tile.clicked)
            let _checked = {}
            for (let i = 0; i < _clickedTiles.length; i++) {
                if (_checked[_clickedTiles[i].value]) {
                    _checked[_clickedTiles[i].value] += 1
                } else {
                    _checked[_clickedTiles[i].value] = 1
                }
            }
            return prevstate.map(tile => {
                if (tile.clicked) {
                    if (_checked[tile.value] === 2) {
                        return {...tile, clicked: true, matched: true}
                    } else {
                        return {...tile, clicked: false}
                    }
                } else {
                    return tile
                }
            })
        case "RESET":
            return []
        default:
            throw new Error('Action not supported')
    }
}

function turnReducer(prevstate, action) {
    switch (action.type) {
        case "CHECKING":
            return {...prevstate, checking: action.value}
        case "CHECK_WON":
            const _board = action.board
            if (_board.filter(tile => tile.clicked).length === _board.length){
                return {...prevstate, won:true}
            }
            return {...prevstate, won:false}
        case "RESET":
            return {...prevstate, won:false, checking: false, moves:0}
        case "NEW_MOVE":
            return {...prevstate, moves:prevstate["moves"]+1}
        default:
            throw new Error('Action not supported')
    }
}

export {boardReducer, turnReducer}