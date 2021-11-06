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

export default function AboutUs(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');
   
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                <h1>About Us</h1>
            </div>
            <div>
              <h1></h1>
                <p1>
                    <a href="http://localhost:3000/"> allinOne </a>e-commerce website is a website 
                     allows you to buy and sell tangible goods, digital products or services online.

Trade, be it barter exchange or buying and selling of goods 
 has been prevalent for centuries. No one can be self-sufficient.
  And this brings out the need for demand and supply of goods and services. <p></p>

Transactions have been going on all over the world for centuries, 
locally, and across locations. Keeping the same concept in mind, now think electronic. <p></p>
<p></p>
<a href="http://localhost:3000/"> allinOne</a> e-commerce website is a website that allows you to buy and sell tangible goods, digital products or services online.<p></p>

<p></p>This system can be implemented to any shop but we need to implement for some trusted specific shop that have retail outlet chains.<p></p>
Our System only focus on online shopping and not the paying system; the paying system is done by redirecting to banks sites (PayPal).<p></p>
The system recommends a facility to accept the orders and a home delivery system which can make customers happy. <p></p>
During checking out what they buy they can use the Add and Remove feature to select or remove item they don’t want.<p></p>
<h1>
A Home for Your Online Business</h1>
E-commerce is fast gaining ground as an accepted and used business paradigm.<p></p>
 More and more business houses are implementing web sites providing functionality for performing commercial transactions over the web. It is reasonable to say that the process of shopping on the web is becoming commonplace.<p></p>

This E-commerce website is an online store on the Internet where customers can browse the catalog and select products of interest. The selected items collected from a shopping store.
<p></p> At checkout time, the items in the shopping store will be presented as an order. At that time, more information will be needed to complete the transaction. Usually, the customer will be asked to fill or select a billing address, a shipping address, a shipping option, and payment information such as credit card number. An e-mail notification is sent to the customer as soon as the order is placed.
The central concept of this project is to develop a general purpose e-commerce store where product like shoes, closes, and any technology products can be bought from the comfort of home through the Internet. However, we need to implement this website for some special trusted stores only.


              <p></p></p1>
            </div>
            <div className='card'>
                <p1>
                <a href="http://localhost:3000/"> allinOne</a> e-commerce website is a website that allows you to buy and sell tangible goods, digital products or services online.

                <p></p>This system can be implemented to any shop but we need to implement for some trusted specific shop that have retail outlet chains.
Our System only focus on online shopping and not the paying system; the paying system is done by redirecting to banks sites (PayPal).
The system recommends a facility to accept the orders and a home delivery system which can make customers happy. 
During checking out what they buy they can use the Add and Remove feature to select or remove item they don’t want.
 </p1>
                <p1>
             
                </p1>
            </div>
        </div>
      
        
    </div>
  );
}
