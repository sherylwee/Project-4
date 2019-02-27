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
      data: [],
      loadData: false
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
        reactThis.setState({ loadData: true })
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        reactThis.setState({ company: data, loadData: false })
      })


  }


  render() {
    // let newcompany = [...this.state.data]
    const names = this.state.company.map((test, index) => {
      return (
        <div key={index}>
          <h1>{test.name}</h1>
          <p>{test.contact}</p>
          <p>{test.location}</p>
          <p>{test.description}</p>
          <button onClick={this.deleteHandler}>Delete</button>

          
          {/* <Company allData={this.state.data} /> */}
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
          {/* <NavLink to={{
            pathname: "/new",
            state: {
              data: newcompany
            }
          }}>
            New Company
              </NavLink> */}
        </nav>
        <main>
          <Switch>
            {/* <Route exact path="/new" component={Company} />
            <Route path="/profile" conponent={Newcompany} /> */}

            <Route path="/new" render={() => <Newcompany refreshPage={this.refreshPage}/>}  />
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

// class Company extends React.Component {
//   constructor(props) {
//     super(props)
//     this.allData = this.allData.bind(this);
//   }

//   allData() {
//     console.log(this.props.allData);
//     if (this.props.allData.length > 0) {
//       return (this.props.allData.map(item => {
//         return (
//           <div>
//             <h1>{item.name}</h1>
//             <p>{item.contact}</p>
//             <p>{item.location}</p>
//             <p>{item.description}</p>
//           </div>

//         );
//       }))
//     }
//   }

//   render() {
//     console.log(this.props)
//     // let company = this.props.location.state.data
//     return (
//       <div>
//         {/* {company.name} */}
//         {this.allData()}
//       </div>
//     )
//   }
// }

// App.propTypes = {
//   allData: PropTypes.array
// };

export default App