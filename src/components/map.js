import React from "react";
import Forms from "./form.js";

class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="map">
        <h3>{this.props.location}</h3>
        <h3>Latitude: {this.props.latitude}</h3>
        <h3>Longitude: {this.props.longitude}</h3>
        <img id="mapIMG" src={this.props.mapURL} />
      </div>
    );
  }
}

export default Map;
