import React, {useContext, useEffect} from "react";
import {GameContext} from "../contexts/GameContext.jsx";
import timeout from "../functions/timeout.js";

import {iconsMap} from "../assets/iconsMap.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core";

export const Tile = ({tile}) => {
    const {board, dispatch, turn, dispatchTurn} = useContext(GameContext)

    useEffect(() => {
        if (board.length > 0 && board.filter((tile) => tile.clicked).length >= 2 && tile.clicked) {
            check().then()
        }
    }, [tile.clicked]);

    async function check() {
        const _clickedTiles = board.filter((tile) => tile.clicked)
        dispatchTurn({type: "CHECKING", value: true})
        if (_clickedTiles.length % 2 === 0) {
            await timeout(1000)
            console.log("here")
            dispatch({type: "CHECK"})
        }
        dispatchTurn({type: "CHECKING", value: false})
    }

    function handleClick() {
        dispatchTurn({type:"NEW_MOVE"})
        dispatch({id: tile.id, type: "CLICK"})
    }

    return (
        <div style={{width:"100%", aspectRatio:'1/1', position:"relative"}} onClick={turn.checking ? null : handleClick}>
            <div className={`card ${tile.clicked ? "clicked" : ""}`}>
                <div className={"front"}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img src={'/memo.png'} style={{width: '4rem'}} draggable={false}/>
                    </div>
                </div>
                <div className={"back"}>
                    <div>
                        <FontAwesomeIcon size={'2x'} icon={iconsMap[tile.value]} />
                    </div>
                </div>
            </div>
        </div>
    )
}