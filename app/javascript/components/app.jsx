import React from "react";
import PropTypes from "prop-types";
import Newitems from "./newitems";
import Newcompany from "./newcompany";
import Edit from "./edit";
import Logo from "../../assets/images/logo";
import Companyitems from "./companyitems";

import {
  Header,
  Icon,
  Button,
  Container,
  Image,
  Menu
} from "semantic-ui-react";

import { Route, HashRouter as Router, Switch, NavLink } from "react-router-dom";

import "whatwg-fetch";
import { CloudinaryContext } from "cloudinary-react";

class App extends React.Component {
  constructor() {
    super();
    // this.editHandler = this.editHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.companyHandler = this.companyHandler.bind(this);
    this.state = {
      company: [],
      loadData: false,
      name: "",
      contact: "",
      location: "",
      description: "",
      redirect: false,
      companyItems: []
    };
  }

  refreshPage() {
    this.setState({ redirect: true });
    window.location.reload();
  }

  // editHandler(e) {
  //   e.preventDefault();
  //   console.log(e.target.dataset.id)
  //   var reactThis = this;

  //   fetch(`/companies/${e.target.dataset.id}`, {
  //     method: 'put',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: this.state.name,
  //       contact: this.state.contact,
  //       location: this.state.location,
  //       description: this.state.description,
  //     })

  //   })

  //     .then(function (data) {
  //       console.log('post req', data);
  //       fetch('/companies', {
  //         method: 'get',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json'
  //         }
  //       })

  //     })

  //     .catch(function (error) {
  //       console.log('request failed', error);
  //       // reactThis.setState({ redirect: false })
  //     })

  // }

  deleteHandler(e) {
    console.log(e.target.dataset.id);
    var reactThis = this;
    // console.log("deleting")
    fetch(`/companies/${e.target.dataset.id}`, {
      method: "delete"
    })
      .then(function(response) {
        console.log("delete");

        fetch("/companies", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
          .then(function(response) {
            reactThis.setState({ loadData: true });
            return response.json();
          })
          .then(function(data) {
            console.log(data);
            reactThis.setState({ company: data, loadData: false });
          });
        return response.json();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    var reactThis = this;

    fetch("/companies", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(function(response) {
        reactThis.setState({ loadData: true });
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        reactThis.setState({ company: data, loadData: false });
      });
  }

  companyHandler(e) {

    var reactThis = this;
    console.log(e.target)

    fetch("/items", {
      method: "get",
      headers: {
        "Content-Type": "application/json", 
        Accept: "application/json"
      }
    })
    .then(function(data) {
      console.log(data)
      reactThis.setState({companyItems: data})
    })
  }

  render() {
    const names = this.state.company.map((test, index) => {
      return (
        <div key={index}>
          <p />
          <Header as="h2">
            <Icon
              name="building"
              style={{ fontSize: "0.8em", color: "#444444" }}
            />
            <Header.Content>{test.name}</Header.Content>
          </Header>

          <p>
            <Icon
              name="phone"
              style={{ color: "#444444", marginRight: "18px" }}
            />
            {test.contact}
          </p>
          <p>
            <Icon
              name="location arrow"
              style={{ color: "#444444", marginRight: "18px" }}
            />
            {test.location}
          </p>
          <p>
            <Icon
              name="list ul"
              style={{ color: "#444444", marginRight: "18px" }}
            />
            {test.description}
          </p>
          <Button
            basic
            color="orange"
            animated="fade"
            as={NavLink}
            to={"/newitems"}
          >
            <Button.Content visible>New items</Button.Content>
            <Button.Content hidden>
              <Icon name="camera retro" />
            </Button.Content>
          </Button>

          <Button
            basic
            color="orange"
            animated="fade"
            as={NavLink}
            to={"/useraccept"}
          >
            <Button.Content visible>Users to accept</Button.Content>
            <Button.Content hidden>
              <Icon name="check circle outline" />
            </Button.Content>
          </Button>

          <Button
            basic
            color="orange"
            animated="fade"
            as={NavLink}
            to={"/edit"}
            data-id={test.id}
          >
            <Button.Content visible>Edit</Button.Content>
            <Button.Content hidden>
              <Icon name="edit" />
            </Button.Content>
          </Button>

          <Button
            basic
            color="orange"
            animated="fade"
            as={NavLink}
            to={"/delete"}
            data-id={test.id}
            onClick={this.deleteHandler}
          >
            <Button.Content visible>Delete</Button.Content>
            <Button.Content hidden>
              <Icon name="trash alternate" />
            </Button.Content>
          </Button>

          <Button 
            basic
            color="orange" 
            animated="fade"
            as={NavLink}
            to={"/existingitems"}
            onClick={this.companyHandler}
          >
          
            <Button.Content visible>Existing Items</Button.Content>
            <Button.Content hidden>
              <Icon name="camera"/>
            </Button.Content>

          </Button>
          

          <Menu fixed="top" style={{ backgroundColor: "#eca400" }}>
            <Container>
              <Menu.Item as="a" header>
                <Image
                  // size="small"
                  width={115}
                  src={Logo}
                  style={{ marginRight: "1.5em" }}
                  // as={NavLink}
                  // to={"/profile"}
                />
              </Menu.Item>
              <Menu.Item as={NavLink} to={"/new"} style={{ color: "white" }}>
                New company
              </Menu.Item>
            </Container>
          </Menu>

          <Switch><Route path="/existingitems" render={() => <Companyitems/>} /></Switch>

          
        </div>
      );
    });
        
        
      // console.log(test)
      
    

    return (
      <div style={{ marginTop: "80px", marginLeft: "80px" }}>
        {names}
        

        <main>
          <Switch>
            {/* <Route path="/profile"/> */}
            <Route
              path="/new"
              render={() => <Newcompany refreshPage={this.refreshPage} />}
            />
            

            {/* <Route path="/edit" render={() => <Edit editHandler={this.editHandler} />} /> */}
          </Switch>
          
          <Route path="/edit" render={() => <Edit />} />

          <Route path="/newitems" render={() => <Newitems />} />
          <Route path="/useraccept" render={() => <Useraccept />} />
        </main>
      </div>
    );
  }
}

export default App;
