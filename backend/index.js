const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const connectMongoDB = require('./config/db')
const router = require('./routes')
// const router = require('./routes/index')

const app = express()
app.use(cors({
  origin : process.env.FRONTEND_URL,
  methods :['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  credentials : true,
}))

const userModel = require("./model/userModel");
const bcrypt = require("bcrypt");

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser())
app.use("/api", router)
const createAdminUser = async () => {
  try {
    const existingAdmin = await userModel.findOne({ email: "user@gmail.com" });

    if (existingAdmin) {
      console.log("✅ L'admin existe déjà !");
      return;
    }

    const hashedPassword = await bcrypt.hash("1234", 10);

    const adminUser = new userModel({
      name: "Admin User",
      email: "user@gmail.com",
      contact: "0600000000",
      password: hashedPassword,
      role: "ADMIN",
    });

    await adminUser.save();
    console.log("✅ Admin ajouté avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout de l'admin :", error);
  }
};
const PORT = process.env.PORT || 8080;

connectMongoDB().then(() => {
  createAdminUser();
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
});


