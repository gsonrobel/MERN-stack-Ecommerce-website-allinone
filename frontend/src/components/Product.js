import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';


export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="cardp">
      <Link to={`/product/${product._id}`}>
        <img className="cs" src={product.image} alt={product.name} />
        {/* <img className="cs" src={product.imagetwo} alt={product.name} />
        <img className="cs" src={product.imagethr} alt={product.name} /> */}
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="row">
          <div className="price">ETB {product.price}</div>
          <div key={product.seller._id}>
            <Link to={`/seller/${product.seller._id}`}>
              {product.seller.seller.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
