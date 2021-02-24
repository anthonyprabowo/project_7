import React, { Component } from 'react';
import './css/index.css';
import apiKey from './config';
import axios from 'axios';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import {withRouter} from 'react-router';

// app component
import Search from './components/Search';
import Nav from './components/Nav';
import Gallery from './components/Gallery';
import Home from './components/Home';
import NotFound from './components/NotFound';

class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      photoSunset: [],
      photoDog: [],
      photoLake: [],
      query: '',
      path: '',
      loading: true
    }
    this.handleApiCall = (query) => {
      if(query) {
        this.setState({query})
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
        .then(response => {
          if(response.status === 200) {
            return this.setState({
              photos: response.data.photos.photo,
              query: query,
              loading: false
            })
          }
        })
        .catch(err => console.log(err));
      } else {
        // cats photo

        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunset&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
        .then(response => this.setState({
          photoSunset: response.data.photos.photo
        }))
        .catch(err => console.log(err));

        // dogs photo
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
        .then(response => this.setState({
          photoDog: response.data.photos.photo
        }))
        .catch(err => console.log(err));

        // Lakes photo
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=lakes&per_page=24&extras=url_o&format=json&nojsoncallback=1`)
        .then(response => {
          if(response.status === 200) {
            return this.setState({
              photoLake: response.data.photos.photo,
              loading: false
            });
          }
            
        })
        .catch(err => console.log(err));
      }
      
    }
    this.handleLoading = () => {
      this.setState({loading: true});
    }
    
  }
  
  componentDidMount() {
    const query = this.props.location.pathname.replace('/search/', '');
    const path = this.props.location.pathname;
    if(this.props.location.pathname.includes('/search') && this.state.photos.length === 0) {
      this.setState({loading: true, query: query, path: path});
      this.handleApiCall(query);
      while(this.state.photos.length !== 0){this.setState({loading: true})};
      return;
    } 
    if(this.state.loading){
      this.handleApiCall();
    }
  }

  render() {
    return(
      <div className="container">
        <Search callApi={this.handleApiCall} handleQuery = {this.handleQuery} handleLoading = {this.handleLoading} />
        <Nav />
        <Home path={this.path} query={this.state.query} searchPhoto={this.state.photos} />
        
        {/* Routes */}
        {this.state.loading ? <p>Loading...</p> : 
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/sunset" />}></Route>
            <Route path="/sunset" component={() => 
              <Gallery photos={this.state.photoSunset} loading={this.state.loading} />
            }></Route>
            <Route path="/dogs" render={() =>
              <Gallery photos={this.state.photoDog} loading={this.state.loading} />
            }></Route>
            <Route path="/lake" render={() => 
              <Gallery photos={this.state.photoLake} loading={this.state.loading} />
            }></Route>
            <Route path="/search/:query" render={() => 
              <Gallery photos={this.state.photos} loading={this.state.loading} />
            }></Route>
            <Route component={NotFound} />
          </Switch>
        }
      </div>
    );
  }
}

export default withRouter(App);
