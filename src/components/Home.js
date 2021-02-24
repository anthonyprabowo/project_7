import React from 'react';
import {withRouter} from 'react-router';

const Home = (props) => {
  const path = props.location.pathname.replace('/', '');
  return(
    <div>
      <h2>Welcome to Anthony's Photo Gallery</h2>
      {!path.includes('search') ? <h3>{path.charAt(0).toUpperCase() + path.substr(1)} Photos</h3> : <h3>{props.query.charAt(0).toUpperCase() + props.query.substr(1)} Photos</h3>}
    </div>
  );
}

export default withRouter(Home);