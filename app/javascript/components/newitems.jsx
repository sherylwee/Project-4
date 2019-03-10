import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Input, Button } from "semantic-ui-react";

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";

class Newitems extends React.Component {
  constructor() {
    super();
    this.newItems = this.newItems.bind(this);
    this.itemDetails = this.itemDetails.bind(this);
    this.fileSelect = this.fileSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.state = {
      name: "",
      value: "",
      selectFile: null,
      redirect: false,
      allItems: []
    };
  }


  newItems(e) {
    this.setState({ name: e.target.value });
    console.log(e.target.value);
  }

  itemDetails(e) {
    this.setState({ value: e.target.value });
    console.log(e.target.value);
  }

  fileSelect(e) {
    console.log(e.target.files[0]);
    this.setState({ selectFile: e.target.files[0] });
  }

  refreshPage() {
    this.setState({ redirect: true });
    window.location.reload();
  }

  handleUpload(e) {

    e.preventDefault();
    var reactThis = this;
    const formData = new FormData();
    formData.append("file", this.state.selectFile);
    formData.append(
      "upload_preset",
      "sqtnerng"
    );
    
    fetch("https://api.cloudinary.com/v1_1/dximobcdx/image/upload", {
        method: "post",
        body: formData
    })
    .then(function(res) {
        console.log('requestttt');
        console.log(res);
        return res.json();
      })
    //   .then(function(data) {
    //     console.log(data);
    //     reactThis.setState({
    //       allItems: data,
    //     //   redirect: true,
    //       refresh: reactThis.refreshPage()
    //     });
    //   })
      .catch(function(err) {
        console.log('request failed', err);
        // reactThis.setState({ redirect: false })
      })
      .then(data => {
          console.log('data', data.secure_url);
          this.handleSubmit(data.secure_url);
      })
      ;
  }

  handleSubmit(img_url) {
    // e.preventDefault();
    // console.log("hey");


    var reactThis = this;
    console.log(this.state.name, this.state.value)

    fetch('/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: this.state.name,
            description: this.state.value,
            picture: img_url,
            company_id: 1
        })

    })
        .then(function (response) {
            console.log(response)


            fetch('/items', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                // .then(function (response) {
                //     return response.json();
                // })
                .then(function (data) {
                    console.log(data)
                    reactThis.setState({ allItems: data, redirect: true, refresh: reactThis.refreshPage() })
                })
        })
        .catch(function (error) {
            console.log('request failed', error);
            reactThis.setState({ redirect: false })
        })

  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/profile" />
    }
    return (
      <div>
        <br />
        <h3>Create a new product</h3>
        <form onSubmit={this.handleUpload}>
          <label>
            <Input
              icon="camera retro"
              iconPosition="left"
              type="text"
              value={this.state.name}
              onChange={this.newItems}
              placeholder="Product Name"
            />
            <p />
            <Input
              icon="file outline"
              iconPosition="left"
              type="file"
              onChange={this.fileSelect}
            />

            <p />
            <Input
              icon="ellipsis horizontal"
              iconPosition="left"
              value={this.state.value}
              onChange={this.itemDetails}
              placeholder="Details"
            />
          </label>
          <p />
          <Button color="orange" onClick={this.handleUpload} content="Submit" value={this.state.allItems}/>
          {/* <input type="submit" value="Submit" /> */}
        </form>
      </div>
    );
  }
}

export default withRouter(Newitems);
