import React from 'react';
import Photo from './Photo';
import {withRouter} from 'react-router'
import NoPhotos from './NoPhotos'

const Gallery = (props) => {
  const data = props.photos
  let photos;
  if(data.length > 0) {
    photos = data.map(photo => {
      return <Photo 
                photo={photo}
                key={photo.id} />
    });
  } else {
    photos = <NoPhotos />
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