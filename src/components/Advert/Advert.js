import React from 'react';
import './Advert.css';
import { get } from '../../services/MultilingualService';

function Advert(props) {
  return (
    <>
      <p className="advertTime">{props.counter}</p>
      <a href="https://davinci.edu.ar">
        <img
          src={require('./../../images/advice.jpg')}
          className="advert"
          alt={get('advert')}
        />
      </a>
    </>
  );
}

export default Advert;
