import React from 'react';
import './JigsawSizes.css';
import { Link } from 'react-router-dom';
import { get } from '../../services/MultilingualService';

function JigsawSizes(props) {
  let jigsawId = props.match.params.jigsawId;
  let sizes = [3, 4];
  return (
    <main className="text-center">
      <h1 className="h3 mb-4">
        {get('choose')} {get('size')}
      </h1>
      <ul className="list-unstyled w-50 m-auto">
        {sizes.map((size, index) => (
          <li key={index} className="size border-rounded mx-auto my-3">
            <Link
              to={`/jigsaws/${jigsawId}/${size}/start`}
              className="text-white font-weight-light"
            >
              {size}
            </Link>
          </li>
        ))}
      </ul>
      <Link to={`/jigsaws`} className="btn btn-icon btn-back mt-2"></Link>
    </main>
  );
}
export default JigsawSizes;
