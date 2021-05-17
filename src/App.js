import {BrowserRouter, HashRouter, Route, Switch} from "react-router-dom";
import {WaitingScreen} from "./waitingScreen";
import { io } from "socket.io-client"
import {Game} from "./game";
import {useState} from "react";
import {Redirect} from "react-router-dom";

export const socket = io('http://localhost:5000')

function App() {
    const [socketId, setSocketId] = useState('')
    socket.on('connection', () => {
        setSocketId(socket.id)
        console.log(socket.id)
    })

  return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={() => <WaitingScreen socketId={socketId} />}/>
            <Route exact path={`/game/${socketId}`} component={Game} />
               <Redirect to={`/game/${socketId}`}/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
