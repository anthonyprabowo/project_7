import React from 'react';
import Photo from './Photo';
import {withRouter} from 'react-router'

const Gallery = (props) => {
  const data = props.photos
  let photos;
  if(data.length > 0) {
    photos = data.map(photo => {
      return <Photo 
                photo={photo}
                key={photo.id} />
    });
  }

  return (
    <div className="photo-container">
      <ul>
        {photos}
      </ul>
    </div>
  );
  
}

export default withRouter(Gallery);