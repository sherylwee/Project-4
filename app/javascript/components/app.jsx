import React from 'react';
import Newitems from './newitems'

import { Route, Link } from "react-router-dom";

class App extends React.Component{

  render() {
    return(
      <div>
        <nav>
          <h1>React Router</h1>
          <Link to="/newitems">New items</Link>
          <Link to="/useraccept">Users to accept</Link>
        </nav>
        <main>
          <Route
            path='/newitems'
            render={() => (
              <Newitems/>
            )}
          />
          <Route
            path='/useraccept'
            render={() => (
              <Oranges/>
            )}
          />
        </main>
      </div>
    )
  }
}

export default App