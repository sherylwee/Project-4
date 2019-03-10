import React from 'react'
import { withRouter, Redirect } from 'react-router-dom';
import { Input, Button } from 'semantic-ui-react';
import 'whatwg-fetch';


class Newcompany extends React.Component {
    constructor() {
        super();
        this.newName = this.newName.bind(this);
        this.newContact = this.newContact.bind(this);
        this.newLocation = this.newLocation.bind(this);
        this.newDescription = this.newDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.state = {
            name: "",
            contact: "",
            location: "",
            description: "",
            company: [],
            redirect: false,
            refresh: []
        };
    }

    newName(e) {
        this.setState({ name: e.target.value })
        console.log(e.target.value)
    }

    newContact(e) {
        this.setState({ contact: e.target.value })
        console.log(e.target.value)
    }


    newLocation(e) {
        this.setState({ location: e.target.value })
        console.log(e.target.value)
    }


    newDescription(e) {
        this.setState({ description: e.target.value })
        console.log(e.target.value)
    }

    refreshPage() {
        this.setState({ redirect: true })
        window.location.reload();
    }


    handleSubmit(e) {

        e.preventDefault();
        console.log('hey')
        var reactThis = this;

        fetch('/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                contact: this.state.contact,
                location: this.state.location,
                description: this.state.description,
            })

        })
            .then(function (response) {
                console.log(response)


                fetch('/companies', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data)
                        reactThis.setState({ company: data, redirect: true, refresh: reactThis.refreshPage() })
                    })
            })
            .catch(function (error) {
                console.log('request failed', error);
                reactThis.setState({ redirect: false })
            })


    }




    render() {

        if (this.state.redirect) {
            return <Redirect to='/profile' />
        }



        return (
            <div>
                <br/><h3>Create a new company</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <Input icon="building" iconPosition='left' placeholder='Name' value={this.state.newName} onChange={this.newName}/>
                        <p/><Input icon="phone" iconPosition='left' placeholder='Contact' type='number' value={this.state.newContact} onChange={this.newContact}/>
                        <p/><Input icon="location arrow" iconPosition='left' placeholder='Location' value={this.state.newLocation} onChange={this.newLocation}/>
                        <p/><Input icon="list ul" iconPosition='left' placeholder='Description' value={this.state.newDescription} onChange={this.newDescription}/><p/>
                    </label>
                    <p/><Button color='orange' value='Submit' content='Submit'/>

                </form>
            </div >
        );
    }
}

export default withRouter(Newcompany);