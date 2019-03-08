import React from 'react'
import { withRouter } from 'react-router-dom';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class Newitems extends React.Component {
    constructor() {
        super();
        this.newItems = this.newItems.bind(this);
        this.itemDetails = this.itemDetails.bind(this);
        this.fileSelect = this.fileSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            newItem: "",
            value: "",
            selectFile: null
        };
    }

    newItems(e) {
        this.setState({ newItem: e.target.value })
        console.log(e.target.value)
    }

    itemDetails(e) {
        this.setState({ value: e.target.value })
        console.log(e.target.value)
    }

    fileSelect(e) {
        console.log(e.target.files[0])
        this.setState({ selectFile: e.target.files[0] })
    }


    handleSubmit(e) {
        e.preventDefault();
        console.log('hey')

        fetch('/items.json', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Hello',
            })
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p>Name <input type="text" value={this.state.newItem} onChange={this.newItems} /></p>
                        <p>Item photo <input type="file" onChange={this.fileSelect}/></p>
                        <p>Details <textarea value={this.state.value} onChange={this.itemDetails} /></p>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>);
    }
}

export default withRouter(Newitems);