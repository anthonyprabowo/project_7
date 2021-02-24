import React, { Component } from 'react';
import './css/index.css';
import apiKey from './config';
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

// app component
import Search from './components/Search';
import Nav from './components/Nav';
import Gallery from './components/Gallery';
import Home from './components/Home';

class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      photoSunset: [],
      photoDog: [],
      photoLake: [],
      query: '',
      path: ''
    }
    this.handleApiCall = (query) => {
      if(query) {
        this.setState({query})
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
        .then(response => this.setState({
          photos: response.data.photos.photo,
          query: query
        }))
        .catch(err => console.log(err));
      } else {
        // cats photo

        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunset&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
        .then(response => this.setState({
          photoSunset: response.data.photos.photo,
          query: ''
        }))
        .catch(err => console.log(err));

        // dogs photo
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
        .then(response => this.setState({
          photoDog: response.data.photos.photo,
          query: ''
        }))
        .catch(err => console.log(err));

        // Lakes photo
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=lakes&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
        .then(response => this.setState({
          photoLake: response.data.photos.photo,
          query: ''
        }))
        .catch(err => console.log(err));
      }
    }
    this.handleQuery = (query) => {
      this.setState({query: query});
    }
  }
  
  componentDidMount() {
    this.handleApiCall(this.state.query);
  }

  render() {
    return(
      <div className="container">
        <BrowserRouter>
          <Search callApi={this.handleApiCall} handleQuery = {this.handleQuery} />
          <Nav />
          <Home path={this.path} query={this.state.query} />
          
          {/* Routes */}
          <Switch>
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
            <Route exact path="/search/:query" component={() => 
              <Gallery photos={this.state.photos} />
            }></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
