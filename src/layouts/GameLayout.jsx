import React from "react";

export const GameLayout = ({children}) => {
  return(
      <div>
          <div className={"game-layout"}>
              {children}
          </div>
      </div>
  )
}