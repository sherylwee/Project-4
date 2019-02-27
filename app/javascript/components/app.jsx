import React from 'react';
import PropTypes from 'prop-types'
import Newitems from './newitems'
import Newcompany from './newcompany'

import { Route, Link, HashRouter as Router, Switch, NavLink } from "react-router-dom";
import 'whatwg-fetch'

class App extends React.Component {
  constructor() {
    super();
    this.deleteHandler = this.deleteHandler.bind(this);
    this.state = {
      company: [],
      loadData: false,
      name: "",
      contact: "",
      location: "",
      description: "",
      id: ""
    };
  }


  deleteHandler(e) {
    var reactThis = this;
console.log("deleting")
    fetch(`/companies/${e.target.dataset.id}`, {
      method: 'delete',

    })
      .then(function (response) {
        console.log("delete")

        fetch('/companies', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
          .then(function (response) {
            reactThis.setState({ loadData: true })
            return response.json();
          })
          .then(function (data) {
            console.log(data)
            reactThis.setState({ company: data, loadData: false })
          })
        return response.json()
      })
      .catch(function (error) {
        console.log(error)
      })

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
        reactThis.setState({ loadData: true })
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        reactThis.setState({ company: data, loadData: false })
      })


  }


  render() {
    const names = this.state.company.map((test, index) => {
      // console.log(test)
      return (

        <div key={index} >
          <h1>{test.name}</h1>
          <p>{test.contact}</p>
          <p>{test.location}</p>
          <p>{test.description}</p>
          <button data-id={test.id} onClick={this.deleteHandler}>Delete</button>


        </div>
      )
    })

    return (
      <div>
        <nav>
          {names}
          <Link to="/newitems">New items </Link>
          <Link to="/useraccept">Users to accept </Link>
          <Link to="/new">New company </Link>
       
        </nav>
        <main>
          <Switch>
            {/* <Route exact path="/new" component={Company} />
            <Route path="/profile" conponent={Newcompany} /> */}

            <Route path="/new" render={() => <Newcompany refreshPage={this.refreshPage} />} />
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