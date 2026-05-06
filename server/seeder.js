const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

// بيانات تجريبية للمنتجات
const products = [
  {
    name: 'Samsung Galaxy S22 Ultra',
    price: 1780,
    description: 'احدث هواتف سامسونج بكاميرا 108 ميغابيكسل',
    category: 'هواتف',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'iPhone 15 Pro',
    price: 1999,
    description: 'ايفون 15 برو بشريحة A17',
    category: 'هواتف',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    countInStock: 5,
    rating: 4.8,
    numReviews: 20,
  },
  {
    name: 'Camon 30 Premier',
    price: 850,
    description: 'تيكنو كامون 30 بكاميرا احترافية',
    category: 'هواتف',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    countInStock: 8,
    rating: 4.2,
    numReviews: 7,
  },
  {
    name: 'Eufy Clean L60',
    price: 650,
    description: 'مكنسة روبوت ذكية هايبرد',
    category: 'اجهزة منزلية',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    countInStock: 3,
    rating: 4.6,
    numReviews: 15,
  },

];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
  
    await Product.deleteMany();
    
    
    await Product.insertMany(products);
    
    console.log('تم اضافة المنتجات بنجاح');
    process.exit();
  })
  .catch(err => {
    console.log('في مشكلة بالاتصال', err);
    process.exit(1);
  });