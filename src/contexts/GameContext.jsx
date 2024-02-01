import React, {createContext, useEffect, useReducer} from "react";
import {boardReducer, turnReducer} from "../reducers/gameReducers.js";

const GameContext = createContext()

const Game = ({children}) => {
    const [board, dispatch] = useReducer(boardReducer,[])
    const [turn, dispatchTurn] = useReducer(turnReducer, {
        moves:0,
        checking: false,
        won:false
    })

    useEffect(() => {
        dispatchTurn({board, type:"CHECK_WON"})
    }, [board]);

    return(
        <>
            <GameContext.Provider value={{board, dispatch, turn, dispatchTurn}}>
                {children}
            </GameContext.Provider>
        </>
    )
}

export default Game

export {GameContext}