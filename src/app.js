import React from "react";

import Map from "./components/map.js";

import "./styles.css";

const superagent = require("superagent");
let API_URL = "https://city-explorer-backend.herokuapp.com/location/";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      query: "",
      latitude: 0,
      longitude: 0,
      location: "",
      mapURL: ""
    };
  }
  handleSubmit = async e => {
    e.preventDefault();
    let data = await superagent
      .get(API_URL)
      .query({
        data: this.state.query
      })
      .then(data => {
        let latitude = JSON.parse(data.text).latitude;
        let longitude = JSON.parse(data.text).longitude;
        let location = JSON.parse(data.text).formatted_query;
        console.log("response: ", latitude, longitude, location);
        this.setState({ latitude, longitude, location });
        let urlString =
          "https://maps.googleapis.com/maps/api/staticmap?center=" +
          latitude +
          "%2c%20" +
          longitude +
          "&zoom=14&size=600x300&maptype=roadmap%20&key=AIzaSyDp0Caae9rkHUHwERAFzs6WN4_MuphTimk";
        this.setState({ mapURL: urlString });
      });
  };

  handleChange(e) {
    e.preventDefault();
    this.setState({
      query: e.target.value
    });
  }

  render() {
    return (
      <div id="app">
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
        <Map
          query={this.state.query}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          location={this.state.location}
          mapURL={this.state.mapURL}
        />
      </div>
    );
  }
}

export default App;
