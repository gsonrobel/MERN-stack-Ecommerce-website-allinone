import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
//upload seller profile
import Axios from 'axios';
import { addToCart, removeFromCart } from '../actions/cartActions';

export default function ProfileScreen(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerpay, setSellerpay] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerPayid, setSellerPayid] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');


  //upload seller profile
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
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
  };
  //Verify order
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  // const checkoutHandler = () => {
  //   if(successUpdate){
  //   props.history.push('/shipping');
  // }else{
  //   alert('Confirm Your Password');
  // }
  // };
  
  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (productId) {
        dispatch(addToCart(productId, qty));
      }
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerpay(user.seller.sellerpay);
        setSellerLogo(user.seller.logo);
        setSellerPayid(user.seller.payid);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch,productId, qty, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          sellerName,
          sellerpay,
          sellerLogo,
          sellerPayid,
          sellerDescription,
        })
      );
    }
  };
  return (
    <div>
      <h1></h1>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div>
              
            {/* <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={!successUpdate&& password.length === 0 && confirmPassword.length===0&&cartItems.length === 0 }
              >
                Proceed to Checkout
              </button> */}
              
            
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                required
                minLength='5'
            maxLength='100'
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <view htmlFor="password">Password</view>
              <input
                id="password"
                type="password"
                minLength='8'
            maxLength='100'
                required
                onClick
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                minLength='8'
            maxLength='100'
                required
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
              
            </div>


            
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            {user.isSeller &&   (
              <>
                <h1>Seller Profile</h1>
                <div>
                  <label htmlFor="sellerName">Seller Name</label>
                  <input
                    id="sellerName"
                    type="text"
                    minLength='6'
            maxLength='100'
                    placeholder="Enter Seller Name"
                    required
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerPayid">Paypal ID</label>
                  <input
                    id="sellerPayid"
                    value={sellerpay}
                    type="text"
                    minLength='6'
                    maxLength='100'
                    placeholder="Enter PayPal Id"
                    required
                    onChange={(e) => setSellerpay(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="sellerLogo">Seller Logo</label>
                  <input
                    id="sellerLogo"
                    type="text"
                    placeholder="Enter Seller Logo"
                    required
                    value={sellerLogo}
                    onChange={(e) => setSellerLogo(e.target.value)}
                  ></input>
                  <div>
                <input
                type="file"
                id="sellerLogo"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
                </div>
                
                </div>
               
                <div>
                  <label htmlFor="sellerDescription">Seller Description</label>
                  <input
                    id="sellerDescription"
                    type="text"
                     minLength='5'
                     maxLength='50'
                    placeholder="Enter Seller Description"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  ></input>
                </div>
              </>
            )}
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
            
          </>
        )}
      </form>
    </div>
  );
}
