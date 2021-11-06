import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Robel',
      email: 'webadmin@example.com',
      password: bcrypt.hashSync('12345678', 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: 'Samsung',
        sellerpay: 'AYPcdzQDsN3utpFAgEBLQj1PBwH3ge1XA-CVCoz4TsyROp8Er4xaTVYEc5xrjSB3xgNOk5fsw_pnCzGO',
        logo: '/logo1.png',
        description: 'best seller',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'Nardos',
      email: 'userseller@example.com',
      password: bcrypt.hashSync('12345678', 8),
      isAdmin: false,
      isSeller:true,
      seller: {
        name: 'DELL',
        logo: '/images/logo1.png',
        description: 'best seller',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'Muse',
      email: 'user@example.com',
      password: bcrypt.hashSync('12345678', 8),
      isAdmin: false,
      isSeller:false,
    },
  ],
  products: [
    {
      name: 'Samsung A17',
      category: 'Phone',
      image: '/images/pc/p1.jpg',
      price: 12000,
      countInStock: 100,
      brand: 'Samsung',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Dell CORE i5',
      category: 'Computer',
      image: '/images/pc/p2.jpg',
      price: 17000,
      countInStock: 50,
      brand: 'Dell',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'TOSHIBA CORE i7',
      category: 'Computer',
      image: '/images/pc/p3.jpg',
      price: 21000,
      countInStock: 0,
      brand: 'TOSHIBA',
      rating: 4.8,
      numReviews: 17,
      description: 'high quality product',
    },
    {
      name: 'i phone 6',
      category: 'Phone',
      image: '/images/p/iphone.jpg',
      price: 4000,
      countInStock: 50,
      brand: 'iphone',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      name: 'i phone old',
      category: 'Phone',
      image: '/images/p/iphone mobile.jpg',
      price: 1000,
      countInStock: 50,
      brand: 'iphone',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },

    {
      name: 'i phone 6',
      category: 'Phone',
      image: '/images/p/iphone.jpg',
      price: 4000,
      countInStock: 50,
      brand: 'iphone',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },







    {
      name: 'Puma Slim Pant',
      category: 'Pants',
      image: '/images/p5.jpg',
      price: 65,
      countInStock: 5,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      name: 'Adidas Fit Pant',
      category: 'Pants',
      image: '/images/p6.jpg',
      price: 139,
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality product',
    },
  ],
};
export default data;
