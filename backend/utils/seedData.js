const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');

const seedProducts = [
  {
    name: 'Samsung Galaxy S23 Ultra',
    description: 'Flagship Android phone with premium camera, strong battery life and stunning AMOLED display.',
    price: 99999,
    category: 'Mobile Phones',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple iPhone 14 Pro',
    description: 'Powerful Apple smartphone with a gorgeous display and advanced camera system.',
    price: 129999,
    category: 'Mobile Phones',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1512499617640-c2f9997681c6?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'OnePlus Nord CE 3 Lite',
    description: 'Affordable performance smartphone with fast charging and clean OxygenOS experience.',
    price: 22999,
    category: 'Mobile Phones',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1510557880182-3a93528c2fa7?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Xiaomi Redmi Note 12 Pro',
    description: 'Mid-range best seller with a powerful chipset and bright display for gaming and media.',
    price: 24999,
    category: 'Mobile Phones',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1512499617640-c2f9997681c6?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Realme 11 Pro+',
    description: 'Stylish smartphone with premium camera and strong battery backup.',
    price: 27999,
    category: 'Mobile Phones',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple MacBook Air M2',
    description: 'Lightweight laptop with excellent battery life and powerful Apple silicon.',
    price: 114999,
    category: 'Laptops',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dell Inspiron 15',
    description: 'Reliable laptop for work and study with a full HD display and solid performance.',
    price: 45999,
    category: 'Laptops',
    stock: 14,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation headphones with premium comfort and sound.',
    price: 29999,
    category: 'Audio',
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1517430816045-df4b7de01d17?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Fire-Boltt Smartwatch',
    description: 'Feature-rich smartwatch with heart-rate tracking and long battery life.',
    price: 3999,
    category: 'Wearables',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1580910051076-3efe3d8f88a6?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Logitech Wireless Mouse',
    description: 'Ergonomic wireless mouse with precise tracking and long battery life.',
    price: 2499,
    category: 'Accessories',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'JBL Portable Bluetooth Speaker',
    description: 'Portable speaker with rich bass, waterproof design and wireless convenience.',
    price: 3999,
    category: 'Audio',
    stock: 28,
    imageUrl: 'https://images.unsplash.com/photo-1515438607-4b0b21f88b70?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Canon EOS M50 Camera',
    description: 'Compact mirrorless camera ideal for vlogging and photography beginners.',
    price: 52999,
    category: 'Cameras',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1519183071298-a2962f4b6e33?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple AirPods Pro',
    description: 'Wireless earbuds with active noise cancellation and superior audio quality.',
    price: 24999,
    category: 'Audio',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1512499617640-c2f9997681c6?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Nike Running Shoes',
    description: 'Comfortable and sporty running shoes designed for everyday training.',
    price: 5499,
    category: 'Footwear',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Adidas Sports Jacket',
    description: 'Lightweight, breathable jacket perfect for workouts and street style.',
    price: 4999,
    category: 'Clothing',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Fossil Leather Backpack',
    description: 'Durable leather backpack designed to carry your laptop and daily essentials.',
    price: 6899,
    category: 'Bags',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Apple iPhone SE',
    description: 'Compact Apple phone with powerful performance and an affordable price point.',
    price: 31999,
    category: 'Mobile Phones',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Samsung Galaxy A54',
    description: 'Value-focused Samsung phone with strong camera performance and battery life.',
    price: 27999,
    category: 'Mobile Phones',
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1510557880182-3a93528c2fa7?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Google Pixel 8',
    description: 'Google smartphone with excellent camera and clean Android experience.',
    price: 61999,
    category: 'Mobile Phones',
    stock: 16,
    imageUrl: 'https://images.unsplash.com/photo-1512499617640-c2f9997681c6?auto=format&fit=crop&w=800&q=80'
  }
];

const seedInitialData = async () => {
  try {
    const adminExists = await User.exists({ role: 'admin' });
    const userExists = await User.exists({ email: 'testcustomer@example.com' });
    const productCount = await Product.countDocuments();

    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      await User.create({
        name: 'Admin User',
        email: 'kamalbhagat882@gmail.com',
        password: hashedPassword,
        role: 'admin',
        isVerified: true
      });
      console.log('Seed: admin user created');
    } else {
      console.log('Seed: admin user already exists');
    }

    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      await User.create({
        name: 'Test Customer',
        email: 'testcustomer@example.com',
        password: hashedPassword,
        role: 'user',
        isVerified: true
      });
      console.log('Seed: test customer created');
    } else {
      console.log('Seed: test customer already exists');
    }

    if (productCount === 0) {
      await Product.insertMany(seedProducts);
      console.log(`Seed: ${seedProducts.length} products added`);
    } else {
      console.log(`Seed: ${productCount} products already exist`);
    }
  } catch (error) {
    console.error('Seed error:', error.message);
  }
};

module.exports = { seedInitialData };
