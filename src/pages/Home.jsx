import React, {useContext, useEffect, useState} from "react";
import {GameContext} from "../contexts/GameContext.jsx";
import {SetCouplesForm} from "../components/SetCouplesForm.jsx";
import styled from "styled-components";
import {Tile} from "../components/Tile.jsx";
import {Main} from "../layouts/Main.jsx";
import {GameLayout} from "../layouts/GameLayout.jsx";

const TilesWrapper = styled.div`
    width: 100%;
    aspect-ratio: 1/1;
    display: grid;
    grid-template-columns: ${(props) => `repeat(${props.rows}, 1fr);`};;
    grid-template-rows: ${(props) => `repeat(${props.rows}, 1fr);`};
    gap: 10px;
`
export const Home = () => {
    const {board, turn, dispatch, dispatchTurn} = useContext(GameContext)

    function handleClick () {
        dispatch({type:"RESET"})
        dispatchTurn({type:"RESET"})
    }

    if (board.length === 0) {
        return (
            <Main>
                <SetCouplesForm/>
            </Main>
        )
    }

    return (
        <GameLayout>
            <div>
                <div>
                    <button className={'back-button'} onClick={handleClick}>
                        <div style={{width:'2rem', opacity:0.7}}>
                            <img src={'/arrow.png'} style={{width:'100%', transform:"rotate(180deg)"}}/>
                        </div>
                        Back
                    </button>
                </div>
                <div>
                    <h4>
                        Couples found: {board.filter(t => t.matched).length/2}
                    </h4>
                </div>
                <TilesWrapper gridInterval={board.length} rows={Math.sqrt(board.length)}>
                    {
                        board.map((tile, i) =>
                            <div>
                                <Tile key={i} tile={tile}/>
                            </div>
                        )
                    }
                </TilesWrapper>
                {turn.won && <div>
                    <h3>You won!</h3>
                    <button onClick={handleClick}>
                        Restart
                    </button>
                </div>}
            </div>
        </GameLayout>
    )
}