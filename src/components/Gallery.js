import React from 'react';
import Photo from './Photo';

const Gallery = (props) => {
  const data = props.photos
  let photos;
  if(data.length > 0) {
    
    photos = data.map(photo => {
      console.log(photo);
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

export default Gallery;