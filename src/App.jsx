import './App.css'
import {Route, Routes} from "react-router-dom";
import Game from "./contexts/GameContext.jsx";
import {Home} from "./pages/Home.jsx";

function App() {

  return (
    <Game>
      <Routes>
          <Route path={'/'} element={<Home/>}/>
      </Routes>
    </Game>
  )
}

export default App
