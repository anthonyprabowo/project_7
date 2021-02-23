import React, { Component } from 'react';
import './css/index.css';
import apiKey from './config';
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom';

// app component
import Search from './components/Search';
import Nav from './components/Nav';
import Gallery from './components/Gallery';

class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      photoSunset: [],
      photoDog: [],
      photoLake: [],
      query: ''
    }
    this.handleApiCall = (query) => {
      if(query) {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
        .then(response => this.setState({
          photos: response.data.photos.photo,
          query: query
        }))
        .catch(err => console.err(err));
      } else {
        // cats photo
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunset&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
        .then(response => this.setState({
          photoSunset: response.data.photos.photo,
        }))
        .catch(err => console.err(err));

        // dogs photo
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
        .then(response => this.setState({
          photoDog: response.data.photos.photo,
        }))
        .catch(err => console.err(err));

        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=lakes&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
        .then(response => this.setState({
          photoLake: response.data.photos.photo,
        }))
        .catch(err => console.err(err));
      }
      
    }
  }
  
  componentDidMount() {
    this.handleApiCall();
  }

  render() {
    return(
      <div className="container">
        <BrowserRouter>
          <Search />
          <Nav />
          <Route exact path="/"> {<Redirect to="/sunset" />} </Route>
          <Route path="/sunset" component={() => 
            <Gallery photos={this.state.photoSunset} />
          }></Route>
          <Route path="/dogs" component={() => 
            <Gallery photos={this.state.photoDog} />
          }></Route>
          <Route path="/lake" component={() => 
            <Gallery photos={this.state.photoLake} />
          }></Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
