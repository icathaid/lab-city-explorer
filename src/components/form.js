import React from "react";
// import Map from "./map.js";

const superagent = require("superagent");
let API_URL = "https://city-explorer-backend.herokuapp.com/location/";

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = async e => {
    e.preventDefault();
    console.log("this props curry", this.props.query);
    let data = await superagent
      .get(API_URL)
      .query({
        data: this.props.query
      })
      .then(res => {
        let latitude = JSON.parse(res.text).latitude;
        let longitude = JSON.parse(res.text).longitude;
        let location = JSON.parse(res.text).formatted_query;
        console.log("response: ", latitude, longitude, location);
        this.props.handler(latitude, longitude, location);
        // console.log(latitude, longitude, location);
      });
  };

  // handleSubmit(event) {
  //   console.log("A name was submitted: " + this.state.value);
  //   event.preventDefault();
  //   let searchQuery = this.state.value;
  //   superagent
  //     .get(API_URL)
  //     .query({
  //       data: this.state.value
  //     })
  //     .then(res => {
  //       let location = JSON.parse(res.text).formatted_query;
  //       let latitude = JSON.parse(res.text).latitude;
  //       let longitude = JSON.parse(res.text).longitude;
  //       console.log({ location });
  //       this.setState({ longitude, latitude, location });
  //     })
  //     .catch(err => {
  //       console.log("OH SHIT:    ", err);
  //     });
  // }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter city to search:
            <input
              id="inputField"
              type="text"
              value={this.props.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div id="map">
          {this.props.longitude}, {this.props.latitude}
        </div>
      </>
    );
  }
}

export default Form;
