import React from 'react';

const Photo = (props) => {
  return(
    <li>
      <img src={`https://live.staticflickr.com/${props.photo.server}/${props.photo.id}_${props.photo.secret}.jpg`} alt={props.photo.title} />
    </li>
  );
}

export default Photo;