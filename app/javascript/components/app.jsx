import React from 'react';
import Newitems from './newitems'
import Newcompany from './newcompany'

import { Route, Link, HashRouter as Router, Switch } from "react-router-dom";
import 'whatwg-fetch'

class App extends React.Component {
  constructor() {
    super();
    this.deleteHandler = this.deleteHandler.bind(this);
    this.state = {
      company: [],
    };
  }

  deleteHandler(e) {
    let company = this.state.company.slice();
    company.splice(e, 1)
    this.setState({ company: company })
  }

  componentDidMount() {

    var reactThis = this;

    fetch('/companies', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data)
        reactThis.setState({ company: data })
      })


  }


  render() {

    const names = this.state.company.map((test, index) => {
      return <div key={index}>
        <h1>{test.name}</h1>
        <p>{test.contact}</p>
        <p>{test.location}</p>
        <p>{test.description}</p>
        <button onClick={this.deleteHandler}>Delete</button>
      </div>
    })

    return (
      <div>
        <nav>

          {names}
          <Link to="/newitems">New items </Link>
          <Link to="/useraccept">Users to accept </Link>
          <Link to="/new">New Company</Link>
          
        </nav>
        <main>
          <Switch>
            <Route exact path="/new" component={Newcompany} />
          </Switch>
          <Route
            path='/newitems'
            render={() => (
              <Newitems />
            )}
          />
          <Route
            path='/useraccept'
            render={() => (
              <Useraccept />
            )}
          // />
          // <Route
          //   path='/newcompany'
          //   render={() => (
          //     <Newcompany />
          //   )}
          />
        </main>
      </div>
    )
  }
}

export default App