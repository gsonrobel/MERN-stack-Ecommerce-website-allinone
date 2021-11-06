import React, { useEffect  ,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  createProduct,
  deleteProduct,
  listProducts,
  listProductsAll,
} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants';
import uploadFileHandler from './ProfileScreen';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProductListScreen(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { pageNumber = 1 } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const {user } = userDetails;

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      updateUserProfile({
      })
    );
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
      

    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
      
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProductsAll({ seller: sellerMode ? userInfo._id : '', pageNumber })
    );
    
  }, [createdProduct,
    dispatch, 
    userInfo._id,
     user,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
    
    
    
    
    ]);
    const deleteHandler = (product) => {
      if (window.confirm('Are you sure to delete?')) {
        dispatch(deleteProduct(product._id));
      }
    };
    const createHandler = () => {
      if(successUpdate){
        dispatch(createProduct());

      }else{
      alert('try again .. or login')
      props.history.push('/signin?redirect=profile');
      }
      
    };
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   // dispatch update profile
  //   if (password !== confirmPassword) {
  //     alert('Password and Confirm Password Are Not Matched');
  //   } else {
  //     dispatch(
  //       updateUserProfile({
  //         userId: user._id,
  //         name,
  //         email,
  //         password,
  //         sellerName,
  //         sellerLogo,
  //         sellerDescription,
  //       })
  //     );
  //   }
  // };
  return (
    <div>
       <h2>  </h2>
      <h2>  </h2>
      {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Create Product.. don't leav the page befor commpleate product setup please.. use 4:3(8MB) 3264x2448 recomendede picture size 
              </MessageBox>
            )}
      
             <button   type="button" className="primary" onClick={createHandler}>
          Create Product
        </button>
             
             
           
            

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
           

                <div>
                
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row center pagination">
          
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? 'active' : ''}
                key={x + 1}
                to={`/productlist/pageNumber/${x + 1}`}
              >
                {x + 1}
                
              </Link>
            ))}
          </div>

          </div>
          
          
        </>
      )}
    </div>
  );
}
