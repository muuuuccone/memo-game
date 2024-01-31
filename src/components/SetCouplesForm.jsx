import React, {useContext, useRef} from "react";
import {GameContext} from "../contexts/GameContext.jsx";

const sizes = [
    {title: "Small", size: 8},
    {title: "Medium", size: 18},
    {title: "Large", size: 32}
]

export const SetCouplesForm = () => {
    const {dispatch} = useContext(GameContext)

    const handleSetNumber = (num) => {
        dispatch({num, type: 'START'})
    }

    return (
        <div>
            <div style={{display:"flex", justifyContent:'center', alignItems:"center"}}>
                <div style={{width:"min(8rem, 100%", opacity:"0.75"}}>
                    <img src={'/memo.png'} style={{width:'100%'}}/>
                </div>
                <h1>
                    MemoTime
                </h1>
            </div>
            <h3 style={{textAlign:"center"}}>
                Select board size
            </h3>
            <div style={{display:"flex", justifyContent:'space-between'}}>
                {sizes.map((s, i) =>
                    <button className={"choose-button"} onClick={() => handleSetNumber(s.size)} key={i}>
                        {s.title}
                        <br/>
                        <span style={{fontSize:'1rem'}}>{s.size} x {s.size}</span>
                    </button>
                )}
            </div>
        </div>
    )
}