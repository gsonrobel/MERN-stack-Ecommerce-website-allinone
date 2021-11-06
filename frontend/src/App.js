import React, { useEffect,useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';
import socketIOClient from 'socket.io-client';
//import CartScreenProfile from './screens/CartScreenProfile';
import { Container ,Row } from 'react-bootstrap'
import Navbar from '../node_modules/react-bootstrap/esm/Navbar';
import { Carousel } from 'react-responsive-carousel';
import { listProducts } from './actions/productActions';
import { signin } from './actions/userActions';
import { detailsUser, updateUserProfile } from './actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from './constants/userConstants';
import AboutUs from './screens/AboutUs';
import AllProduct from './screens/AllProducts';
import PrivacyPolicy from './screens/PrivacyPolicy';
import BackToTop from "react-back-to-top";
import Help from './screens/Help';

let allUsers = [];
let allMessages = [];
let allSelectedUser = {};
const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host;

function App(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;

  //signin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState([
    { name: 'Admin', body: 'Hello there, Please ask your question.' },
  ]);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  //signin
  
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch, props.history, userInfo]);
  return (
    <BrowserRouter>
    <BackToTop
        showOnScrollUp
        showAt={100}
        speed={1500}
        easing="easeInOutQuint"
      >
        <span>scroll up</span>
      </BackToTop>
      <div className="grid-container">
        <div className='header'>
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>

            </button>
            <a href="http://localhost:3000/"> አንድ ቦታ </a>
            
            
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div>
          {/* <Link className="" to="/">
            Home
            </Link> */}
            <Link to="/cart">
            <i class="fa fa-shopping-cart" style={{fontSize:'3rem'}} aria-hidden="true"></i>
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
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
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
             
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                 
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                    <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  </li>
                  
                  
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
              <Link to="/support">
               <a href="#" class="notificationad">Chat
{/*           
          <span class="badgead"> {ChatBox.length}</span> */}
         
          </a>
              </Link>
              </div>
             )}
          </div>
        </header>
        </div>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <div className='card'>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
            
          </ul>
          </div>
        </aside>
        <div class="site-content" >

<div class="container" className='site-content'>
    <div class="row" className='site-content'>
        <div class="content-column col-xl-9 col-lg-8" >
            <div class="content-area" >
        <main>
          <Container>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/about" component={AboutUs}></Route>
          <Route path="/allproduct" component={AllProduct}></Route>
          <Route path="/privacypolicy" component={PrivacyPolicy}></Route>
          <Route path="/help" component={Help}></Route>
          <Route path="/contact" component={ChatBox}></Route>

          
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>

          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
          <AdminRoute path="/support" component={SupportScreen}></AdminRoute>

          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>

          <Route path="/" component={HomeScreen} exact></Route>
          </Container>
        </main>
        </div>
        </div>
        </div>
        </div>
        </div>

       

        <Navbar>
          
                  <footer className="">
                 
                    
        <div className='row'>
        <div className='cardt'>
            <h1>Get to Know Us</h1>
            <ul>
            <li>
            <p1><Link  to='/allproduct'>Allinone Products</Link></p1>
              </li>
              <li>
            <p1><Link to='/about'>About Allinone</Link></p1>
            </li>
            <li>
            <p1><Link to='/privacypolicy'>Privacy Policies</Link></p1>
            </li>
            <li>
              <p1>
              {userInfo ? (
              <div className="dropdown">
                <a href={`mailto:${'gsenbetrobel@gmail.com'}`}>Contact</a>
              </div>
            ) : (
              <>
              <Link to="/signin">Sign In to Contact</Link><p></p>
              
              </>
            )}
            </p1>
              </li>
            </ul>

          </div>
          <div className='cardt'>
            <h1>Let Us Help You</h1>
            <ul>
              <li>
              <p1><Link to="/profile">Your Account</Link></p1>
              </li>
              <li>
            <p1><Link to='/orderhistory'>Your Orders</Link></p1>
            </li>
            
            <li>
            <p1><Link>Cart Assistant</Link></p1>
              </li>
            <li>
            <p1><Link to='/help'>Help</Link></p1>
            </li>
            </ul>

          </div>
          <div className='cardt'>
            <h1>Make Money with Us</h1>
            <ul>
              <li>
              <p1><Link to="/profile">Sell Product</Link></p1>
              </li>
              <li>
            <p1><Link to='/'>Buy Product</Link></p1>
            </li>
            
            <li>
            <p1><Link to='/cart'>Your Cart</Link></p1>
              </li>
            <li>
            <p1><Link>Cart Assistant</Link></p1>
            </li>
            </ul>

          </div>
          <div className='cardt'>
            <h1>About Payment</h1>
            <ul>
              <li>
              <p1><a href="http://www.paypal.com/">Paypal Credit Card</a></p1>
              </li>
              <li>
              <p1><a href="http://www.paypal.com/">Paypal Debit Card</a></p1>
            </li>
            <li>
            <p1><Link>Business Card</Link></p1>
            </li>
            <li>
            <p1><Link>Other Payment</Link></p1>
              </li>
            </ul>

          </div>
          <div className='cardt'>
            <h1>Social Follow</h1>
            <ul>
              <li>
              <p1><a href="" >
            <i class="fa fa-twitter">  twitter</i> 
            <div class="tooltip">twitter</div>
          </a></p1>
              </li>
              <li>
              <p1><a href="" >
            <i class="fa fa-youtube">  youtube</i> 
            <div class="tooltip">youtube</div>
          </a></p1>
            </li>
            <li>
            <p1><a href="" >
            <i class="fa fa-instagram">  instagram</i> 
            <div class="tooltip">instagram</div>
          </a></p1>
            </li>
            <li>
            <p1><a href="">
            <i class="fa fa-facebook">  facebook</i> 
            <div class="tooltip">facebook</div>
          </a></p1>
              </li>
            </ul>

          </div>
          <div className='cardt'>
            <h1></h1>
            <ul>
              <h1></h1>
              <li>
              <BackToTop
        showOnScrollUp
        showAt={100}
        speed={1500}
        easing="easeInOutQuint"
      >
        <span>scroll up</span>
      </BackToTop>

              </li>
            </ul>

          </div>

        </div>
        
      <div className='row center'>
        
      {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div className='cardt'>
            <ul>
              <li>
                <h1></h1>
              </li>
              <li>
                <h1></h1>
              </li>
          <li>
          email:
            <a href={`mailto:${'gsenbetrobel@gmail.com'}`}>gsenbetrobel@gmail.com</a>
          </li>
          <li>
          <p1>phone:+251 984 215 01</p1>
          </li>
          <li>
            <h1></h1>
          </li>
          <li>
          <div> <p  > &copy; {new Date().getFullYear()} Copyright 
          <a href="http://localhost:3000/"> allinOne </a> Ethiopia</p></div>{' '}
          </li>
          </ul>
          
          </div>
          </div>
        </footer>
        </Navbar>

      </div>
    </BrowserRouter>
  );
}

export default App;
