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
        <Link to={`/product/${product._id}`}>
        <img className='sss' src={product.image} alt={product.name} /> 
        </Link>
        {/* <Link to={`/product/${product._id}`}>
          <p1 className="legend">ETB {product.price} <p>  </p>{product.name}</p1>
        </Link> */}
        </div>
        </div>
      </div>
      
    ))}
  </Carousel>
  
</>
)}
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
                  <img className='cs' src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
              
            ))}
             </carouselbl>
        </>
      )}