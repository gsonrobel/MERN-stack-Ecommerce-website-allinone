import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { listTopSellers } from '../actions/userActions';

import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav,Col ,Row,Card, Container, NavDropdown } from 'react-bootstrap'

export default function HomeScreen(props) {
  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listTopSellers());
    dispatch( 
      listProducts({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  const { product } = props;
  return (
    <>
    <h1></h1>

    <div>
      <div>
        <h1></h1>
      </div>
      
      <div className="cardsort">
        <div className='cardsort'><p> </p>
            Sort by{' '}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Customer Reviews</option>
          </select>
          
          <p1>You can sort in Newst Arrivals in the site , Price Low to High and High to Low with Avarage Customer Reviews </p1>
        </div>
        <p> </p>
      </div>
      
      <div className="row top">
      
     
        
        
        <div className="col-3">
        {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
              <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? 'active' : ''}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        { <div className='card'>
        <div className="col-1">
        {/* <p>Product Filter <Link to="/search/category/all/name/all/">List All Products</Link></p> */}
        
        
          <div className='cards'>
          {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <carouselbl showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img className='cs' src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </carouselbl>
        </>
      )}
          </div>
        </div>
        </div> }
      </div>
    </div>
    </>
  );
}







{loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
<>
  {products.length === 0 && <MessageBox>No Seller Found</MessageBox>}
  <Carousel className='cardrr' showArrows autoPlay showThumbs={false}>
    {products.map((product) => (
      
      <div  class="slider-wrapper axis-horizontal"  key={product._id}>
        <div >
        <Link to={`/product/${product._id}`}>
        <img className='ss' src={product.image} alt={product.name} /> 
        </Link>
        <Link to={`/product/${product._id}`}>
          <p1 className="legend">ETB {product.price} <p>  </p>{product.name}</p1>
        </Link>
        </div>
      </div>
      
    ))}
  </Carousel>
  
</>
)}