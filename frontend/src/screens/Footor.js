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

export default function Footor(props) {
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
  return (
    <footer className="footer">
              
    <div className='row'>
    <div className=''>
        <h1></h1>
        <ul>
          <h1></h1>
          <li>
            <h1></h1>
    
          </li>
        </ul>
    
      </div>
      <div className=''>
        <h1>Get to Know Us</h1>
        <ul>
          <h1>ul</h1>
          <li>
            <h1>li</h1>
    
          </li>
        </ul>
    
      </div>
      <div className=''>
        <h1>Make Money with Us</h1>
        <ul>
          <p>Sell products on this website</p>
          <p>Sell products on this website</p>
          <li>
            <h1>li</h1>
    
          </li>
        </ul>
    
      </div>
      <div className=''>
        <h1>Payment Products</h1>
        <ul>
          <h1>ul</h1>
          <li>
            <h1>li</h1>
    
          </li>
        </ul>
    
      </div>
      <div className=''>
        <h1></h1>
        <ul>
          <h1></h1>
          <li>
            <h1></h1>
    
          </li>
        </ul>
    
      </div>
    
    </div>
    
      <div className='row center'>
        <div class="social-icons">
    
      
      <a href="" >
        <i class="fa fa-twitter"></i> 
        <div class="tooltip">Followers:13K</div>
      </a>
      
      <a href="" >
        <i class="fa fa-youtube"></i> 
        <div class="tooltip">Subscriber:22K</div>
      </a>
      
      <a href="" >
        <i class="fa fa-instagram"></i> 
        <div class="tooltip">Followers:1.2K</div>
      </a>
      
      <a href="">
        <i class="fa fa-facebook"></i> 
        <div class="tooltip">Friends:7K</div>
      </a>
      </div>
      <div>
      
      <div> <p  > &copy; {new Date().getFullYear()} Copyright 
      <a href="http://localhost:3000/"> allinOne </a></p></div>{' '}
      </div>
      </div>
    
      {/* ሑሉን ∆ንድ ቦታ */}
      
    </footer>
  );
}
