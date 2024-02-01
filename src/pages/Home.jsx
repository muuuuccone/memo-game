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
            {turn.won && <div className={"won-overlay"}>
                <div className={'won-card'}>
                    <h3>You won!</h3>
                    <button onClick={handleClick}
                            style={{padding: '0.5rem', paddingInline: '1rem', fontSize: '0.9rem'}}>
                        Restart
                    </button>
                </div>
            </div>}
            <div>
                <div>
                    <button className={'back-button'} onClick={handleClick}>
                        <div style={{width:'2rem', opacity:0.7}}>
                            <img src={'/arrow.png'} style={{width:'100%', transform:"rotate(180deg)"}}/>
                        </div>
                        Back
                    </button>
                </div>
                <div style={{paddingTop:'1rem', fontSize:'1.1rem', fontWeight:'bold'}}>
                    Moves: {turn.moves}
                </div>
                <div className={'bar-container'}>
                    <div className={"bar-indicator"}>
                        {board.filter(t => t.matched).length/2}/{board.length/2}
                    </div>
                    <div className={'bar-content'} style={{width: board.filter(t => t.matched).length/board.length*100 + "%"}}>

                    </div>
                    <div className={'bar-base'}>

                    </div>
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
            </div>
        </GameLayout>
    )
}