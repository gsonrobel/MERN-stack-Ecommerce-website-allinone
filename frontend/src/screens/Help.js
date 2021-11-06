import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter, Link, Route } from 'react-router-dom';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
//upload seller profile
import Axios from 'axios';
import { addToCart, removeFromCart } from '../actions/cartActions';

export default function Help(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
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
  
  return (
    <div className='row center'>
        <div className='cardt '>
            <h1> </h1>
            <div className='card top center'>
                <h1>Help Center of <a href="http://localhost:3000/"> allinOne </a></h1>
            </div>
            <div>
                <p1>
 <p></p>

Cart?<div className="dropdownhelp">
<Link to="/cart">Cart  </Link>
                 <i className="fa fa-caret-down"></i>
                <ul className="dropdownhelp-content">For one shooping add to Cart with 
        the same Company or Seller Name.
                </ul>
              </div><p></p>
         </p1>
         <p1>
 <p></p>
 
Where is my order?<div className="dropdownhelp">
<Link to="/orderhistory">Order History  </Link>
                 <i className="fa fa-caret-down"></i>
                <ul className="dropdownhelp-content">Your Order is send to the Seller and To the Admin if you have a problem in the delivery you can contact you admin.
                </ul>
              </div><p></p>
              <p></p>
If You Want to be a seller?<div className="dropdownhelp">
<Link to="/">Seller</Link>
                 <i className="fa fa-caret-down"></i>
                <ul className="dropdownhelp-content"> Complete legale Policies and contact the Admin </ul>
              </div><p></p>
         </p1>
            </div>
            <div className='card'>
            Registering customers - the system should enable the registration of customers to buy a product.
             So the system should be able to let customers register for the special account.<p></p>
The system should be able to store all the necessary information regarding the buyer and the product that the buyer bought.<p></p>
The system shall give full information regarding the merchandise - when requested upon the information regarding the merchandise.<p></p>
The system should display the entire information related to that specific merchandise.
The system to allow for visitor: <p></p>
•	Can view available products. <p></p> 
The system to allow for user:<p></p>
•	Can view and purchase products. <p></p>
•	Can contact Admin for queries. <p></p>
The system to allow for admin:<p></p>
•	To give all privilege of visitor and user.<p></p>
•	Can add products, edit product information and add/remove product.<p></p>

            </div>
            <div >
                <p1>
                Allinone e-commerce website is a website that allows you to buy and sell tangible goods, digital products  online.

Trade, be it barter exchange or buying and selling of goods and services has been prevalent for centuries. No one can be self-sufficient. And this brings out the need for demand and supply of goods and services. 

Transactions have been going on all over the world for centuries, locally, and across locations. Keeping the same concept in mind, now think electronic.
                </p1>
                <p1>
                </p1>
            </div>
        </div>
      
        
    </div>
  );
}
