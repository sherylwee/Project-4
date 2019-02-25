import React from 'react';
import Newitems from './newitems'

import { Route, Link } from "react-router-dom";
import 'whatwg-fetch'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      company: [],
    };
  }

  componentDidMount() {

    var reactThis = this;

    fetch('http://localhost:3000/companies.json')
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        console.log({json})
        reactThis.setState({company: json})
      }).catch(function (err) {
        console.log(err)
      })
  }


  render() {

    const names = this.state.company.map((test,index)=>{
      return <div key={index}>
                <h1>{test.name}</h1>
                <p>{test.description}</p>
                <p>{test.contact}</p>
             </div>
    })
    
    return (
      <div>
        <nav>
          
          {names}
          <Link to="/newitems">New items</Link>
          <Link to="/useraccept">Users to accept</Link>
        </nav>
        <main>
          <Route
            path='/newitems'
            render={() => (
              <Newitems />
            )}
          />
          <Route
            path='/useraccept'
            render={() => (
              <Oranges />
            )}
          />
        </main>
      </div>
    )
  }
}

export default App