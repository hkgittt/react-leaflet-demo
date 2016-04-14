import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, GeoJson } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './entry.scss';

class MapComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        [37.5668242026754, 126.978652258823],
        [37.5168244026754, 126.978252258823],
      ],
      geojsons: [
        'songpa.json',
        'gangnam.json',
      ],
      geoOn: true,
    };
  }
  render() {
    const markers = this.state.markers.map((position) => (
        <Marker position={position}>
          <Popup>
            <div onClick={() => (this.setState({ geoOn: !this.state.geoOn }))}>
              CLICK ME
            </div>
          </Popup>
        </Marker>
      )
    );
    let geojsons = null;
    if (this.state.geoOn) {
      geojsons = this.state.geojsons.map((geojson) => (
          <GeoJson data={require(`json!./${geojson}`)}
            onClick={() => alert('WOW')}
          />
        )
      );
    }
    return (
      <Map center={this.state.markers[0]} zoom={13}>
        <TileLayer
          url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        />
        {markers}
        {geojsons}
      </Map>
    );
  }
}

// render(map, document.getElementById('app'));

render(<MapComp />, document.getElementById('app'));
