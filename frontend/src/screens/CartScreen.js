import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import Axios from 'axios';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
export default function CartScreen(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'; 
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };


  //upload seller profile
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

    //upload seller profile
    const uploadFileHandler = async (e) => {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append('image', file);
      setLoadingUpload(true);
      try {
        const { data } = await Axios.post('/api/uploads', bodyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setSellerLogo(data);
        setLoadingUpload(false);
      } catch (error) {
        setErrorUpload(error.message);
        setLoadingUpload(false);
      }
      dispatch(
        updateUserProfile({
        })
      );
    };




  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      updateUserProfile({
      })
    );
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    // if(userInfo._id===null){
    //   dispatch(signin(email, password));

    // }
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser());
    } else {
      setName(user.name);
      setEmail(user.email);
      if (productId) {
        dispatch(addToCart(productId, qty));
      }
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
      // dispatch(
      //   updateUserProfile({
      //   })
      // );
    }









  }, [dispatch, productId, qty, user]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };
  

  const checkoutHandler = () => {
    
    if( successUpdate){
    props.history.push('/signin?redirect=shipping');
  }else{
    alert('make sure you are loged in');
    props.history.push('/signin?redirect=cart');
    dispatch(
      updateUserProfile({
      })
    );
  }
  };
  return (
    
    <div>
       <h2>  </h2>
       <Link to="/">Back to Shopping</Link>
      <h2>  </h2>

      
    <div className="row top">
       <h2>  </h2>
       {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
            <></>
            )}
      <div className="card">
        
      <div className="">
        
        <h1>Shopping Cart</h1>
        {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Ready To Checkout
              </MessageBox>
            )}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="">
                <div className="card">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  </div>
                  

                  <div className="card">
                  <div className="row">
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>ETB {item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                    </div>
                  </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>

      <div className="col-1">
      
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ETB 
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Ready To Checkout
              </MessageBox>
            )}
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0&&!successUpdate}
              >
                Proceed to Checkout
              </button>
              
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}
