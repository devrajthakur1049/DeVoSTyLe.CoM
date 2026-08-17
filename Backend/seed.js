const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const Product = require("./models/productModel");
const User = require("./models/userModel");

dotenv.config();

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    // Delete old data
    await Product.deleteMany();
    await User.deleteMany();

    console.log("🗑️ Old Data Deleted");

    // Hash passwords
    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("user123", 10);

    // Users
    await User.insertMany([
      // Admins
      {
        name: "Admin One",
        email: "admin1@gmail.com",
        password: adminPassword,
        role: "admin",
      },
      {
        name: "Admin Two",
        email: "admin2@gmail.com",
        password: adminPassword,
        role: "admin",
      },
      {
        name: "Admin Three",
        email: "admin3@gmail.com",
        password: adminPassword,
        role: "admin",
      },
      {
        name: "Admin Four",
        email: "admin4@gmail.com",
        password: adminPassword,
        role: "admin",
      },
      {
        name: "Admin Five",
        email: "admin5@gmail.com",
        password: adminPassword,
        role: "admin",
      },

      // Users
      {
        name: "Rahul Sharma",
        email: "user1@gmail.com",
        password: userPassword,
        role: "user",
      },
      {
        name: "Aman Verma",
        email: "user2@gmail.com",
        password: userPassword,
        role: "user",
      },
      {
        name: "Priya Singh",
        email: "user3@gmail.com",
        password: userPassword,
        role: "user",
      },
      {
        name: "Neha Patel",
        email: "user4@gmail.com",
        password: userPassword,
        role: "user",
      },
      {
        name: "Devraj Thakur",
        email: "user5@gmail.com",
        password: userPassword,
        role: "user",
      },
    ]);

    console.log("✅ 10 Users Imported");

    // Products
    await Product.insertMany([
      {
        name: "iPhone 15",
        description: "Apple Smartphone",
        price: 70000,
        category: "Mobile",
        stock: 10,
        imagesUrls: [],
      },
      {
        name: "Samsung Galaxy S24",
        description: "Samsung Flagship",
        price: 65000,
        category: "Mobile",
        stock: 15,
        imagesUrls: [],
      },
      {
        name: "OnePlus 13",
        description: "OnePlus Smartphone",
        price: 55000,
        category: "Mobile",
        stock: 20,
        imagesUrls: [],
      },
      {
        name: "MacBook Air M3",
        description: "Apple Laptop",
        price: 120000,
        category: "Laptop",
        stock: 8,
        imagesUrls: [],
      },
      {
        name: "Dell XPS 15",
        description: "Dell Laptop",
        price: 98000,
        category: "Laptop",
        stock: 6,
        imagesUrls: [],
      },
      {
        name: "Sony WH-1000XM5",
        description: "Wireless Headphones",
        price: 28000,
        category: "Accessories",
        stock: 30,
        imagesUrls: [],
      },
      {
        name: "Apple Watch Series 10",
        description: "Smart Watch",
        price: 45000,
        category: "Watch",
        stock: 12,
        imagesUrls: [],
      },
      {
        name: "iPad Air",
        description: "Apple Tablet",
        price: 60000,
        category: "Tablet",
        stock: 10,
        imagesUrls: [],
      },
      {
        name: "Logitech MX Master 3S",
        description: "Wireless Mouse",
        price: 9000,
        category: "Accessories",
        stock: 40,
        imagesUrls: [],
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB Gaming Keyboard",
        price: 5500,
        category: "Accessories",
        stock: 25,
        imagesUrls: [],
      },
    ]);

    console.log("✅ 10 Products Imported");

    console.log("\n🎉 Seed Completed Successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedData();