import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
//upload seller profile
import Axios from 'axios';
import { addToCart, removeFromCart } from '../actions/cartActions';

export default function PrivacyPolicy(props) {
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
                <h1>Policies</h1>
            </div>
            <div>

                <p1>
These are the legal policies of <a href="http://localhost:3000/"> allinOne </a>, <p></p>
<p>We know that you care how information about you is used and shared, and we appreciate your trust that we will do so carefully and sensibly.
   This Privacy Notice describes how<a href="http://localhost:3000/"> Allinone </a> and its Sellers collect and process your personal information 
   through Allinon websites, devices, products, services, online and physical stores, and applications that reference this Privacy Notice (together "Allinone Services"). 
   By using Allinone Services, you are consenting to the practices described in this Privacy Notice.
</p>


Are Children Allowed to Use Allinone Services?<p></p>
Here are the types of personal information we collect:

Information You Give Us: We receive and store any information you provide in relation to Allinone Services. 
Automatic Information: We automatically collect and store personal address types of information about your use of Allinone Services, including information about your interaction with content and services available through Allinone Services. 
<p></p>
For What Purposes Does Allinone Use Your Personal Information?<p></p>
We use your personal information to operate, provide, develop, and improve the products and services that we offer our customers. These purposes include:
<p></p>
Purchase and delivery of products and services.<p></p>
 We use your personal information to take and handle orders,<p></p>
  Deliver products and services, process payments, and communicate with you about orders, products and services, and promotional offers.<p></p>

We use your personal information to communicate with you in relation to Allinone Services via different channels (e.g., email, chat).

<p></p>
We work to protect the security of your personal information during transmission by using encryption protocols .<p></p>
We follow the Payment policies of  <a href="http://www.paypal.com/">Paypal </a>.


<p></p> Children Allowed to Use Allinone Services?
Allinone does not sell products for purchase by children. We sell children's products for purchase by adults. <p></p>
            </p1>
                
            </div>
        </div>
      
        
    </div>
  );
}
