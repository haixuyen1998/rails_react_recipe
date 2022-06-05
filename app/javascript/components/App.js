import React from "react";
import { Route, Switch } from 'react-router-dom'
import Airline from "./Airline/Airline";
import Airlines from "./Airlines/Airlines";

const App = () =>{
    return (
         <div>
            <Switch>
              <Route exact path="/" component={Airlines} />
              <Route exact path="/airlines/:slug" component={Airline} />
            </Switch>
        </div>
    )
}

export default App