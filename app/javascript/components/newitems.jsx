import React from 'react'
import { withRouter } from 'react-router-dom';

class Newitems extends React.Component {
    constructor() {
        super();
        this.newItems = this.newItems.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            newItem: ""
        };
    }

    newItems(e) {
        this.setState({ newItem: e.target.value })
        console.log(e.target.value)
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('hey')
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name <input type="text" value={this.state.newItem} onChange={this.newItems} />
                    </label>
                </form>
            </div>);
    }
}

export default withRouter(Newitems);