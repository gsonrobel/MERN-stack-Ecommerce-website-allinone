import React, { useEffect ,useState } from 'react';
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
import { signin } from '../actions/userActions';
import { signout } from '../actions/userActions';

export default function HomeScreen(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  //signin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
  //signin
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <>
    <div className='row center'>
    <div className='topcarser'>
    {loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
<>
  {products.length === 0 && <MessageBox>No Seller Found</MessageBox>}
  <Carousel className='cardrr' showArrows autoPlay showThumbs={false}>
    {products.map((product) => (
      
      <div key={product._id}>
        <div className='row center'>
        
        <div className='row top'>
          <ul>
        <p1><img className='css' src={product.image}/></p1>
        {/* <p1><img className='css' src={product.imagetwo}/></p1>
        <p1><img className='css' src={product.imagethr}/></p1> */}
        <li>
        <p1> ETB {product.price}</p1>
        </li>
        <li>
        <Link>{product.name}  </Link>
        </li>
        <li>
        <p1> {product.rating} </p1>
        </li>
        <li>
        <p1> <h1></h1> </p1>
        </li>
        </ul>
        
        </div>
        <div >
        <a href="">{product.name} </a>
        <Link to={`/product/${product._id}`}>
        <img className='sss' src={product.image} alt={product.name} />  
        </Link>
         <Link to={`/product/${product._id}`}>
          <p1 className="legend">ETB {product.price} <p>  </p>{product.name}</p1>
        </Link>
        </div>
        </div>
      </div>
      
    ))}
  </Carousel>
  
</>
)}
</div>
    </div>
     <div>
       <h1></h1><h1></h1>
      <div className="row top">
        <h1></h1>
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


        <div className="col-1">
          
          <div className='cardrob'>
          <div className='cardlogin'>
          Tips For Shopping 
        <Link to='/help'>more Tips
        <p></p>
         </Link>
         <div className="dropdownhom">
<Link to="/orderhistory">Cart</Link>
                 <i className="fa fa-caret-down"></i>
                <ul className="dropdownhom-content"> For one shooping add to Cart with 
        the same Company or Seller Name.
                </ul>
              </div>
              <div className="dropdownhom">
             <h1></h1>
<Link to="/orderhistory">Order</Link>
                 <i className="fa fa-caret-down"></i>
                <ul className="dropdownhom-content">Your Order is send to the Seller and To the Admin if you have a problem in the delivery you can contact you admin.
                </ul>
              </div>
              <div className="dropdownhom">
<Link to="/">Seller</Link>
                 <i className="fa fa-caret-down"></i>
                <ul className="dropdownhom-content">Want to be a seller, Complete legale Policies and contact the Admin</ul>
              </div>
        </div>
        
          <div className='card'>
            <p>Top Sellers</p>
            {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <carouselbl showArrows autoPlay showThumbs={true}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img className='cssell' src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
              
            ))}
             </carouselbl>
        </>
      )}
            </div>
        <div className="">
        <div>
          {' '}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div>
      </div>
      <p>Product Filter <Link to="/search/category/all/name/all/">List All Products</Link></p>
      {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
          
          
          <div className='cards'>
          <h1>Department</h1>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === category ? 'active' : ''}
                    to={getFilterUrl({ category: 'all' })}
                  >
                    List All Categories
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className='cards'>
            <h1>Price</h1>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='cards'>
            <h1>Avg. Customer Review</h1>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          </div>
          
        
        </div>
        
      </div>
    </div>

    <div className='row center'>
                  {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  Profile <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className='cardloginto'>
       
      <form className="form" onSubmit={submitHandler}>
      
        <p1>Get Start Online Business</p1>
        <div>
          
          <label htmlFor="email"></label>
          
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            minLength='8'
            maxLength='100'
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>{''}
          {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
            <Link className='center' to={`/register?`}>
              Create account
            </Link>
        </div>
        <div>
          <label />
          <div>
            
          </div>
        </div>
      </form>
    </div>
            )}
            </div>
    </>
  );
}
