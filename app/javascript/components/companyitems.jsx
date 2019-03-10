import React from 'react'
import { withRouter, Redirect } from 'react-router-dom';
import { Image, Segment, Grid, Header, Icon } from 'semantic-ui-react';
import 'whatwg-fetch';


class Companyitems extends React.Component {
    constructor() {
        super();
        // this.companyHandler = this.companyHandler.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.state = {
            companyItems: [],
            redirect: false,
            loadData: false,
            refresh: []
        };
    }

    refreshPage() {
        this.setState({ redirect: true })
        window.location.reload();
    }


    componentDidMount() {
        var reactThis = this;
    
        fetch("/items", {
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
            reactThis.setState({ companyItems: data, loadData: false });
          });
      }

    // companyHandler(e) {

    //     var reactThis = this;
    //     console.log(e.target)
    
    //     fetch("/items", {
    //       method: "get",
    //       headers: {
    //         "Content-Type": "application/json", 
    //         Accept: "application/json"
    //       }
    //     })
    //     .then(function(data) {
    //       console.log(data)
    //       reactThis.setState({companyItems: data})
    //     })
    //   }
    
    render() {

        if (this.state.redirect) {
            return <Redirect to='/profile' />
        }

        const items = this.state.companyItems.map((item, index) => {
            return (
                <div key={index}>
                <Grid>
                <Grid.Row columns={2}>
                <Grid.Column width={9}>
                <p/><Segment raised>
                
                <Header as="h3">
                    <Icon name="camera retro" style={{color: '#444444', fontSize: '0.9em'}}/>
                    <Header.Content>{item.name}</Header.Content>
                </Header>
                
                
                    <Image src={item.picture}/>
                    <Icon name="ellipsis horizontal"/>{item.description}
                    </Segment>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
                </div>
            )
        })



        return (
            <div>
                {items}
            </div >
        );
    }
}

export default withRouter(Companyitems);